import { useState, useEffect, useCallback } from 'react'
import './App.css'

// API
import {
  getZones,
  getSearchExamples,
  getProperties,
  getPropertyById,
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
import InicioTab from './tabs/InicioTab'
import ExploreTab from './tabs/ExploreTab'
import CompareTab from './tabs/CompareTab'
import AdminTab from './tabs/AdminTab'

function App() {
  // ─── Navigation ──────────────────────────────────────────────
  const [currentTab, setCurrentTab] = useState('inicio')
  const [clientMode, setClientMode] = useState(() => getClientMode())
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('mita_dark') === 'true')
  const [currentUser, setCurrentUser] = useState(null)
  const [showLogin, setShowLogin] = useState(false)

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
    zone: '', maxPrice: '', propertyType: '', usageType: '', minAreaM2: '', hasGarage: false, petsAllowed: false, transactionType: 'ALQUILER'
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
    const root = document.documentElement
    if (darkMode) {
      root.setAttribute('data-theme', 'dark')
      root.classList.add('dark')
    } else {
      root.setAttribute('data-theme', 'light')
      root.classList.remove('dark')
    }
    localStorage.setItem('mita_dark', darkMode)
  }, [darkMode])

  // Detect and update client mode after health check resolves
  useEffect(() => {
    checkBackend().then(mode => setClientMode(mode))
  }, [])

  const toggleDarkMode = () => setDarkMode(prev => !prev)

  // ─── Unified Authentication ──────────────────────────────────
  const handleUserLogin = (email, password) => {
    return loginAdmin(email, password).then(res => {
      setCurrentUser(res.user)
      setShowLogin(false)
      setCurrentTab('admin')
    })
  }

  const handleUserLogout = () => {
    logoutAdmin()
    setCurrentUser(null)
    setSelectedProperty(null)
    setCurrentTab('inicio')
  }

  const loadProperties = useCallback(() => {
    setExploreLoading(true)
    getProperties(filters)
      .then(res => {
        let data = res.data || [];
        if (filters.transactionType && filters.transactionType !== 'ALQUILER') {
          data = [];
        }
        setProperties(data);
        setExploreLoading(false);
      })
      .catch(() => setExploreLoading(false))
  }, [filters])

  const loadAdminData = useCallback(() => {
    getLeads().then(res => setLeads(res.data))
    getImports().then(res => setImports(res.data))
  }, [])

  // ─── URL-based routing engine ────────────────────────────────
  const handleUrlRoute = useCallback(() => {
    const path = window.location.pathname
    const searchParams = new URLSearchParams(window.location.search)
    const q = searchParams.get('q')

    if (path.startsWith('/propiedad/')) {
      const propertyId = path.split('/')[2]
      if (propertyId) {
        getPropertyById(propertyId)
          .then(res => {
            setSelectedProperty(res.property)
            setCurrentTab('property-detail')
          })
          .catch(() => {
            setCurrentTab('inicio')
          })
      }
    } else if (path.startsWith('/buscar') && q) {
      const decodedQ = decodeURIComponent(q.replace(/\+/g, ' '))
      
      // AVOID re-running the search if we already have searchResult for the SAME query
      if (searchQuery === decodedQ && searchResult) {
        setCurrentTab('inicio')
        return
      }

      setSearchQuery(decodedQ)
      setCurrentTab('inicio')
      setIsSearching(true)
      aiSearch(decodedQ)
        .then(res => { setSearchResult(res); setIsSearching(false) })
        .catch(() => setIsSearching(false))
    } else {
      setSearchResult(null)
      setSearchQuery('')
    }
  }, [searchQuery, searchResult])

  const resetSearch = useCallback(() => {
    setSearchResult(null)
    setSearchQuery('')
    window.history.pushState(null, '', '/')
    setCurrentTab('inicio')
  }, [])

  // ─── Bootstrap ───────────────────────────────────────────────
  useEffect(() => {
    getZones().then(data => setZones(data.zones))
    getSearchExamples().then(data => setSearchExamples(data.examples))

    const token = localStorage.getItem('mita_token')
    if (token) {
      getCurrentUser()
        .then(res => {
          setCurrentUser(res.user)
        })
        .catch(() => {
          localStorage.removeItem('mita_token')
          setCurrentUser(null)
        })
    }
  }, [])

  // Run initial routing once on mount
  useEffect(() => {
    handleUrlRoute()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Listen for browser back/forward navigation popstate events
  useEffect(() => {
    window.addEventListener('popstate', handleUrlRoute)
    return () => window.removeEventListener('popstate', handleUrlRoute)
  }, [handleUrlRoute])

  useEffect(() => {
    if (currentUser && currentTab === 'admin') loadAdminData()
  }, [currentUser, currentTab, loadAdminData])

  useEffect(() => {
    loadProperties()
  }, [loadProperties])

  // ─── Search Handlers ─────────────────────────────────────────
  const handleAISearch = (e, customQuery) => {
    if (e) e.preventDefault()
    const q = customQuery || searchQuery
    if (!q.trim()) return
    setIsSearching(true)
    
    // Construct roomix-like search path
    const querySlug = encodeURIComponent(q).replace(/%20/g, '+')
    const searchPath = `/buscar/alquilar/en-santa-cruz/mas-recientes?q=${querySlug}`
    window.history.pushState(null, '', searchPath)

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
    if (e) e.preventDefault()
    if (!rawEnhanceText.trim()) return
    setIsEnhancing(true)
    aiEnhanceListing(rawEnhanceText)
      .then(res => {
        setEnhancedResult(res)
        setIsEnhancing(false)
      })
      .catch(() => {
        setIsEnhancing(false)
      })
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
    setFilters({ zone: '', maxPrice: '', propertyType: '', usageType: '', minAreaM2: '', hasGarage: false, petsAllowed: false, transactionType: 'ALQUILER' })
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

  // ─── Detail Screen Handlers ──────────────────────────────────
  const openDetailModal = (property) => {
    setSelectedProperty(property)
    setCurrentTab('property-detail')
    window.history.pushState(null, '', `/propiedad/${property.id}`)
  }
  const closeDetailModal = () => {
    setSelectedProperty(null)
    if (searchResult) {
      setCurrentTab('inicio')
      const querySlug = encodeURIComponent(searchQuery).replace(/%20/g, '+')
      let typePath = 'alquilar'
      if (filters.transactionType === 'VENTA') typePath = 'comprar'
      if (filters.transactionType === 'ANTICRETICO') typePath = 'anticretico'
      const searchPath = `/buscar/${typePath}/en-santa-cruz/mas-recientes?q=${querySlug}`
      window.history.pushState(null, '', searchPath)
    } else {
      setCurrentTab('explore')
      window.history.pushState(null, '', '/')
    }
  }

  // ─── Render Helper ───────────────────────────────────────────
  const renderTabContent = () => {
    // Access control: if user is not logged in and attempts to access the admin panel
    if (currentTab === 'admin' && !currentUser) {
      return (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-center animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 mb-2">
            <svg className="w-8 h-8 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
          </div>
          <h2 className="text-xl font-black text-zinc-900 dark:text-zinc-100">Acceso Restringido a Agentes</h2>
          <p className="text-zinc-500 max-w-sm text-xs font-semibold leading-relaxed">
            Esta sección contiene herramientas profesionales de publicación y administración que requieren autenticación.
          </p>
          <button
            onClick={() => setShowLogin(true)}
            className="mt-2 px-6 py-2.5 bg-[#2E7D43] hover:bg-[#2E7D43]/90 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer transition-all active:scale-95"
          >
            Iniciar Sesión
          </button>
        </div>
      )
    }

    switch (currentTab) {
      case 'inicio':
        return (
          <InicioTab
            setCurrentTab={setCurrentTab}
            onLoginClick={() => setShowLogin(true)}
            selectedForComparison={selectedForComparison}
            toggleComparison={toggleComparison}
            openDetailModal={openDetailModal}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searchExamples={searchExamples}
            isSearching={isSearching}
            searchResult={searchResult}
            handleAISearch={handleAISearch}
            onResetSearch={resetSearch}
            filters={filters}
            setFilters={setFilters}
          />
        )
      case 'explore':
        return (
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
        )
      case 'compare':
        return (
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
        )
      case 'admin':
        return (
          <AdminTab
            adminUser={currentUser}
            handleAdminLogout={handleUserLogout}
            leads={leads}
            properties={properties}
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
            
            rawEnhanceText={rawEnhanceText}
            setRawEnhanceText={setRawEnhanceText}
            isEnhancing={isEnhancing}
            enhancedResult={enhancedResult}
            handleEnhancement={handleEnhancement}
            saveEnhancedDraft={saveEnhancedDraft}
          />
        )
      case 'property-detail':
        return (
          <PropertyDetailModal
            property={selectedProperty}
            onClose={closeDetailModal}
          />
        )
      default:
        return null
    }
  }

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
        appUser={currentUser}
        onUserLogout={handleUserLogout}
        onLoginClick={() => setShowLogin(true)}
        onLogoClick={resetSearch}
      />

      <main className="w-full max-w-6xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 flex-grow z-10">
        {renderTabContent()}
      </main>

      <Footer />

    </div>
  )
}

export default App
