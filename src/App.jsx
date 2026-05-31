import { useState, useEffect, useCallback } from 'react'
import './App.css'

// API
import {
  getZones,
  getSearchExamples,
  getProperties,
  createProperty,
  aiSearch,
  aiCompare,
  aiEnhanceListing,
  ragReindex,
  getLeads,
  getImports,
  runImport,
  loginAdmin,
  logoutAdmin,
  getCurrentUser,
  getClientMode,
  checkBackend
} from './api'

// Shared Components
import Header from './components/Header'
import Footer from './components/Footer'
import PropertyDetailModal from './components/PropertyDetailModal'
import LoginPage from './components/LoginPage'

// Tab Views
import AISearchTab from './tabs/AISearchTab'
import ExploreTab from './tabs/ExploreTab'
import CompareTab from './tabs/CompareTab'
import EnhanceTab from './tabs/EnhanceTab'
import AdminTab from './tabs/AdminTab'

function App() {
  // ─── Navigation ──────────────────────────────────────────────
  const [currentTab, setCurrentTab] = useState('search')
  const [clientMode, setClientMode] = useState(() => getClientMode())
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('mita_dark') === 'true')
  const [appUser, setAppUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('mita_app_user')) || null
    } catch {
      return null
    }
  })
  const [showLogin, setShowLogin] = useState(false)

  // ─── Auth ────────────────────────────────────────────────────
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false)
  const [adminUser, setAdminUser] = useState(null)
  const [loginEmail, setLoginEmail] = useState('admin@mita.ai')
  const [loginPassword, setLoginPassword] = useState('admin123')
  const [loginError, setLoginError] = useState('')

  // ─── Search ──────────────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState('')
  const [searchExamples, setSearchExamples] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [searchResult, setSearchResult] = useState(null)

  // ─── Explore ─────────────────────────────────────────────────
  const [properties, setProperties] = useState([])
  const [zones, setZones] = useState([])
  const [exploreLoading, setExploreLoading] = useState(false)
  const [filters, setFilters] = useState({
    zone: '', maxPrice: '', propertyType: '', usageType: '', minAreaM2: '', hasGarage: false, petsAllowed: false
  })

  // ─── Compare ─────────────────────────────────────────────────
  const [selectedForComparison, setSelectedForComparison] = useState([])
  const [compareQuery, setCompareQuery] = useState('¿Cuál de estas opciones me conviene más si quiero abrir una cafetería pequeña y necesito buena visibilidad?')
  const [isComparing, setIsComparing] = useState(false)
  const [comparisonResult, setComparisonResult] = useState(null)

  // ─── Enhance ─────────────────────────────────────────────────
  const [rawEnhanceText, setRawEnhanceText] = useState('alquilo local zona norte 800$ ideal negocio avenida transitada bano privado consultas whatsapp')
  const [isEnhancing, setIsEnhancing] = useState(false)
  const [enhancedResult, setEnhancedResult] = useState(null)

  // ─── Admin ───────────────────────────────────────────────────
  const [leads, setLeads] = useState([])
  const [imports, setImports] = useState([])
  const [importUrl, setImportUrl] = useState('https://facebook.com/marketplace/santacruz/alquileres')
  const [importLimit, setImportLimit] = useState(15)
  const [isImporting, setIsImporting] = useState(false)
  const [importSourceId, setImportSourceId] = useState(1)
  const [ragStatus, setRagStatus] = useState('')

  // ─── Detail Modal ─────────────────────────────────────────────
  const [selectedProperty, setSelectedProperty] = useState(null)

  // ─── Dark mode persistence ─────────────────────────────
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light')
    localStorage.setItem('mita_dark', darkMode)
  }, [darkMode])

  // Detect and update client mode after health check resolves
  useEffect(() => {
    checkBackend().then(mode => setClientMode(mode))
  }, [])

  const toggleDarkMode = () => setDarkMode(prev => !prev)

  const handleUserLogin = (user) => {
    localStorage.setItem('mita_app_user', JSON.stringify(user))
    setAppUser(user)
    setShowLogin(false)
  }

  const handleUserLogout = () => {
    localStorage.removeItem('mita_app_user')
    setAppUser(null)
    setSelectedProperty(null)
    setCurrentTab('search')
  }

  const loadProperties = useCallback(() => {
    setExploreLoading(true)
    getProperties(filters)
      .then(res => { setProperties(res.data); setExploreLoading(false) })
      .catch(() => setExploreLoading(false))
  }, [filters])

  const loadAdminData = useCallback(() => {
    getLeads().then(res => setLeads(res.data))
    getImports().then(res => setImports(res.data))
  }, [])

  // ─── Bootstrap ───────────────────────────────────────────────
  useEffect(() => {
    getZones().then(data => setZones(data.zones))
    getSearchExamples().then(data => setSearchExamples(data.examples))

    const token = localStorage.getItem('mita_token')
    if (token) {
      getCurrentUser()
        .then(res => { setIsAdminLoggedIn(true); setAdminUser(res.user) })
        .catch(() => localStorage.removeItem('mita_token'))
    }

  }, [])

  useEffect(() => {
    if (isAdminLoggedIn && currentTab === 'admin') loadAdminData()
  }, [isAdminLoggedIn, currentTab, loadAdminData])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadProperties()
  }, [loadProperties])

  // ─── Helpers ─────────────────────────────────────────────────
  // ─── Search Handlers ─────────────────────────────────────────
  const handleAISearch = (e, customQuery) => {
    if (e) e.preventDefault()
    const q = customQuery || searchQuery
    if (!q.trim()) return
    setIsSearching(true)
    aiSearch(q)
      .then(res => { setSearchResult(res); setIsSearching(false) })
      .catch(() => setIsSearching(false))
  }

  // ─── Compare Handlers ────────────────────────────────────────
  const toggleComparison = (property) => {
    const exists = selectedForComparison.some(p => p.id === property.id)
    if (exists) {
      setSelectedForComparison(prev => prev.filter(p => p.id !== property.id))
    } else {
      if (selectedForComparison.length >= 3) {
        alert('Solo puedes seleccionar un máximo de 3 propiedades para comparar.')
        return
      }
      setSelectedForComparison(prev => [...prev, property])
    }
  }

  const triggerAIComparison = () => {
    if (selectedForComparison.length < 2) {
      alert('Selecciona al menos 2 propiedades para comparar.')
      return
    }
    setIsComparing(true)
    setCurrentTab('compare')
    aiCompare(compareQuery, selectedForComparison.map(p => p.id))
      .then(res => { setComparisonResult(res); setIsComparing(false) })
      .catch(() => setIsComparing(false))
  }

  // ─── Enhance Handlers ────────────────────────────────────────
  const handleEnhancement = (e) => {
    e.preventDefault()
    if (!rawEnhanceText.trim()) return
    setIsEnhancing(true)
    aiEnhanceListing(rawEnhanceText)
      .then(res => { setEnhancedResult(res); setIsEnhancing(false) })
      .catch(() => setIsEnhancing(false))
  }

  const saveEnhancedDraft = () => {
    if (!enhancedResult) return
    createProperty(enhancedResult.propertyDraft)
      .then(() => {
        alert('¡Borrador guardado en la base de datos de Mita!')
        loadProperties()
        setCurrentTab('explore')
      })
      .catch(err => alert(`Error al guardar: ${err.message}`))
  }

  // ─── Admin Handlers ──────────────────────────────────────────
  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target
    setFilters(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const resetFilters = () => {
    setFilters({ zone: '', maxPrice: '', propertyType: '', usageType: '', minAreaM2: '', hasGarage: false, petsAllowed: false })
  }

  const handleAdminLogin = (e) => {
    e.preventDefault()
    setLoginError('')
    loginAdmin(loginEmail, loginPassword)
      .then(res => { setIsAdminLoggedIn(true); setAdminUser(res.user) })
      .catch(err => setLoginError(err.message))
  }

  const handleAdminLogout = () => {
    logoutAdmin()
    setIsAdminLoggedIn(false)
    setAdminUser(null)
  }

  const handleRunImport = (e) => {
    e.preventDefault()
    setIsImporting(true)
    runImport(Number(importSourceId), importUrl, Number(importLimit))
      .then(() => { setIsImporting(false); loadAdminData(); loadProperties(); alert('¡Importación completada!') })
      .catch(() => setIsImporting(false))
  }

  const triggerReindex = () => {
    setRagStatus('Reindexando vectores semánticos...')
    ragReindex()
      .then(res => { setRagStatus(res.message); setTimeout(() => setRagStatus(''), 4000) })
      .catch(err => setRagStatus(`Error: ${err.message}`))
  }

  // ─── Modal Handlers ──────────────────────────────────────────
  const openDetailModal = (property) => setSelectedProperty(property)
  const closeDetailModal = () => setSelectedProperty(null)

  // ─── Render ──────────────────────────────────────────────────
  if (showLogin) {
    return (
      <LoginPage
        onLogin={handleUserLogin}
        onSkip={() => setShowLogin(false)}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
    )
  }

  return (
    <div className="min-h-screen flex flex-col justify-between overflow-x-hidden selection:bg-[#4FA75A]/20 selection:text-[#2E7D43]">

      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        selectedCompareCount={selectedForComparison.length}
        clientMode={clientMode}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        appUser={appUser}
        onUserLogout={handleUserLogout}
        onLoginClick={() => setShowLogin(true)}
      />

      <main className="w-full max-w-6xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 flex-grow z-10">
        {currentTab === 'search' && (
          <AISearchTab
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searchExamples={searchExamples}
            isSearching={isSearching}
            searchResult={searchResult}
            selectedForComparison={selectedForComparison}
            toggleComparison={toggleComparison}
            openDetailModal={openDetailModal}
            handleAISearch={handleAISearch}
          />
        )}

        {currentTab === 'explore' && (
          <ExploreTab
            properties={properties}
            zones={zones}
            filters={filters}
            handleFilterChange={handleFilterChange}
            resetFilters={resetFilters}
            exploreLoading={exploreLoading}
            selectedForComparison={selectedForComparison}
            toggleComparison={toggleComparison}
            triggerAIComparison={triggerAIComparison}
            openDetailModal={openDetailModal}
          />
        )}

        {currentTab === 'compare' && (
          <CompareTab
            compareQuery={compareQuery}
            setCompareQuery={setCompareQuery}
            isComparing={isComparing}
            comparisonResult={comparisonResult}
            selectedForComparison={selectedForComparison}
            triggerAIComparison={triggerAIComparison}
            onAddPropertyClick={() => setCurrentTab('explore')}
            onOpenDetailModal={openDetailModal}
          />
        )}

        {currentTab === 'enhance' && (
          <EnhanceTab
            rawEnhanceText={rawEnhanceText}
            setRawEnhanceText={setRawEnhanceText}
            isEnhancing={isEnhancing}
            enhancedResult={enhancedResult}
            handleEnhancement={handleEnhancement}
            saveEnhancedDraft={saveEnhancedDraft}
          />
        )}

        {currentTab === 'admin' && (
          <AdminTab
            isAdminLoggedIn={isAdminLoggedIn}
            adminUser={adminUser}
            loginEmail={loginEmail}
            setLoginEmail={setLoginEmail}
            loginPassword={loginPassword}
            setLoginPassword={setLoginPassword}
            loginError={loginError}
            handleAdminLogin={handleAdminLogin}
            handleAdminLogout={handleAdminLogout}
            leads={leads}
            imports={imports}
            importUrl={importUrl}
            setImportUrl={setImportUrl}
            importLimit={importLimit}
            setImportLimit={setImportLimit}
            isImporting={isImporting}
            importSourceId={importSourceId}
            setImportSourceId={setImportSourceId}
            handleRunImport={handleRunImport}
            triggerReindex={triggerReindex}
            ragStatus={ragStatus}
          />
        )}
      </main>

      <Footer />

      {/* Global Detail Modal */}
      {selectedProperty && (
        <PropertyDetailModal
          key={selectedProperty.id}
          property={selectedProperty}
          onClose={closeDetailModal}
        />
      )}
    </div>
  )
}

export default App
