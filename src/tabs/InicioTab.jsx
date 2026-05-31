import { useState, useEffect } from 'react'
import { getProperties } from '../api'
import PropertyCard from '../components/PropertyCard'
import { getPropertyImage } from '../components/imageHelper'

function InicioTab({
  setCurrentTab,
  onLoginClick,
  selectedForComparison,
  toggleComparison,
  openDetailModal,
  searchQuery,
  setSearchQuery,
  searchExamples,
  isSearching,
  searchResult,
  handleAISearch,
  onResetSearch,
  filters,
  setFilters
}) {
  const [featuredProperties, setFeaturedProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingTextIdx, setLoadingTextIdx] = useState(0)

  const loadingTexts = [
    'Analizando tu intención de búsqueda con IA...',
    'Extrayendo criterios de infraestructura (luz trifásica, m², accesos)...',
    'Buscando afinidades semánticas en la base de datos vectorial...',
    'Calculando compatibilidad y ventajas para tu negocio...',
    'Filtrando por zonas de Santa Cruz y rangos de presupuesto...'
  ];

  useEffect(() => {
    if (!isSearching) {
      setLoadingTextIdx(0)
      return
    }
    const interval = setInterval(() => {
      setLoadingTextIdx((prev) => (prev + 1) % loadingTexts.length)
    }, 1800)
    return () => clearInterval(interval)
  }, [isSearching])

  useEffect(() => {
    getProperties()
      .then(res => {
        if (res && res.data) {
          setFeaturedProperties(res.data.slice(0, 3))
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching properties for landing:', err)
        setLoading(false)
      })
  }, [])

  // ─── CASE A: SEARCH RESULTS ONLY VIEW ───
  if (isSearching || searchResult) {
    const filteredResults = (searchResult?.results || []).filter(res => {
      if (filters?.transactionType && filters.transactionType !== 'ALQUILER') {
        return false;
      }
      return true;
    });

    return (
      <div className="flex flex-col gap-6 py-4 animate-fadeIn">
        {/* Centered search input directly at the top of results view */}
        <div className="w-full max-w-3xl mx-auto text-left">
          {/* Transaction Type Selector Pills (Theme aware) */}
          <div className="flex gap-2 mb-3.5 justify-start">
            {[
              { key: 'ALQUILER', label: 'Alquiler' },
              { key: 'ANTICRETICO', label: 'Anticrético' },
              { key: 'VENTA', label: 'Venta' }
            ].map(t => (
              <button
                key={t.key}
                type="button"
                onClick={() => {
                  setFilters(prev => ({ ...prev, transactionType: t.key }))
                }}
                className={`px-4.5 py-2 rounded-2xl text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer select-none border ${
                  (filters?.transactionType || 'ALQUILER') === t.key
                    ? 'bg-[#2E7D43] text-white border-[#2E7D43] shadow-sm'
                    : 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-650 dark:text-zinc-400 hover:border-zinc-350 dark:hover:border-zinc-700 hover:text-zinc-800 dark:hover:text-zinc-100'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <form onSubmit={handleAISearch} className="flex flex-col sm:flex-row gap-2.5">
            <div className="flex-grow flex items-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors rounded-2xl px-5 py-4 shadow-inner">
              <svg className="w-5 h-5 text-zinc-400 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ej. Busco un local para cafetería en Equipetrol con parqueo, max 1000$..."
                className="w-full bg-transparent outline-none text-zinc-800 dark:text-white placeholder-zinc-500 text-sm sm:text-base font-semibold"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors mr-1 shrink-0 cursor-pointer"
                  title="Limpiar búsqueda"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              )}
            </div>
            <button
              type="submit"
              disabled={isSearching}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#2E7D43] hover:bg-[#2E7D43]/90 text-white font-black text-sm sm:text-base shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 active:scale-95 disabled:opacity-75"
            >
              {isSearching ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <span>Buscar</span>
              )}
            </button>
          </form>
          
          {/* Quick back link */}
          <div className="text-left mt-2.5 px-1.5">
            <button
              onClick={onResetSearch}
              className="text-xs sm:text-sm font-bold text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors flex items-center gap-1 cursor-pointer"
            >
              ← Volver a la página principal
            </button>
          </div>
        </div>

        {/* AI Loading Experience with dynamic message and skeleton grids */}
        {isSearching && (
          <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 animate-fadeIn">
            {/* Pulsing AI Analysis banner with base gradient */}
            <div className="bg-gradient-mita-ai animate-glow text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center gap-4 sm:gap-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px] pointer-events-none" />
              <div className="relative w-16 h-16 shrink-0 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                <span className="absolute inset-0 bg-white/15 rounded-full animate-ping"></span>
                <svg className="w-8 h-8 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
              </div>
              <div className="text-center sm:text-left z-10">
                <span className="text-xs bg-white/20 border border-white/25 px-3 py-1 rounded-xl uppercase font-black tracking-wider">Agente Inmobiliario Activo</span>
                <h3 className="text-lg sm:text-xl md:text-2xl font-black mt-2.5 transition-all duration-300">
                  {loadingTexts[loadingTextIdx]}
                </h3>
                <p className="text-white/90 text-xs sm:text-sm md:text-base mt-1.5 font-semibold">
                  Mita está buscando coincidencias en la base de datos de PostgreSQL e indexando las mejores propiedades por compatibilidad.
                </p>
              </div>
            </div>

            {/* Pulsing Skeleton Cards Grid */}
            <div className="flex flex-col gap-4">
              <span className="text-sm font-black text-zinc-400 dark:text-zinc-500 px-1.5 uppercase tracking-wider">Buscando inmuebles coincidentes...</span>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl overflow-hidden shadow-sm flex flex-col md:flex-row justify-between h-auto md:h-44 p-4 md:p-0"
                >
                  <div className="md:w-60 h-40 md:h-full bg-gradient-pulse shrink-0 rounded-2xl md:rounded-none"></div>
                  <div className="p-5 md:p-6 flex-grow flex flex-col justify-between text-left gap-4 md:gap-0">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="h-4 w-1/3 bg-gradient-pulse rounded"></div>
                        <div className="h-4 w-1/4 bg-gradient-pulse rounded"></div>
                      </div>
                      <div className="h-5 w-3/4 bg-gradient-pulse rounded mt-2"></div>
                      <div className="h-4.5 w-full bg-gradient-pulse rounded mt-2"></div>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-zinc-50 dark:border-zinc-800">
                      <div className="h-3 w-1/4 bg-gradient-pulse rounded"></div>
                      <div className="flex gap-2">
                        <div className="h-8 w-20 bg-gradient-pulse rounded-xl"></div>
                        <div className="h-8 w-24 bg-gradient-pulse rounded-xl"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results layout */}
        {!isSearching && searchResult && (
          <section className="w-full max-w-4xl mx-auto flex flex-col gap-6 animate-fadeIn">
            
            {/* Extracted Criteria Card */}
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 text-white p-5 sm:p-6 rounded-3xl shadow-xl relative overflow-hidden">
              <div className="absolute right-0 top-0 w-64 h-64 bg-emerald-500/10 blur-[60px] rounded-full pointer-events-none" />
              
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
                <span className="text-xs text-emerald-400 font-black uppercase tracking-wider">Criterios Extraídos por IA</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 bg-white/5 p-5 rounded-2xl border border-white/10">
                <div>
                  <span className="block text-[11px] text-zinc-400 uppercase font-bold">Tipo de espacio</span>
                  <strong className="text-sm sm:text-base text-zinc-100">{searchResult.criteria?.tipoPropiedad || 'Indeterminado'}</strong>
                </div>
                <div>
                  <span className="block text-[11px] text-zinc-400 uppercase font-bold">Giro sugerido</span>
                  <strong className="text-sm sm:text-base text-zinc-100">{searchResult.criteria?.tipoUsoEspacio || 'Cualquiera'}</strong>
                </div>
                <div>
                  <span className="block text-[11px] text-zinc-400 uppercase font-bold">Zonas detectadas</span>
                  <strong className="text-sm sm:text-base text-zinc-100">
                    {Array.isArray(searchResult.criteria?.zonas) ? searchResult.criteria.zonas.join(', ') : 'Todo Santa Cruz'}
                  </strong>
                </div>
                <div>
                  <span className="block text-[11px] text-zinc-400 uppercase font-bold">Presupuesto Máximo</span>
                  <strong className="text-sm sm:text-base text-zinc-100">{searchResult.criteria?.precioMaximo ? `$${searchResult.criteria.precioMaximo} USD` : 'Flexible'}</strong>
                </div>
              </div>

              {Array.isArray(searchResult.criteria?.aptoPara) && searchResult.criteria.aptoPara.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2 items-center">
                  <span className="text-xs text-zinc-400 uppercase font-bold mr-1">Giros aptos:</span>
                  {searchResult.criteria.aptoPara.map((ap, idx) => (
                    <span key={idx} className="text-xs bg-[#4FA75A]/20 text-[#8EF0B5] px-3.5 py-1 rounded-xl border border-[#4FA75A]/30 font-bold">
                      {ap}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Results Grid List */}
            <div className="flex flex-col gap-4">
              <h3 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100 px-1.5 text-left">Resultados Encontrados:</h3>
              
              {filteredResults.length === 0 ? (
                <div className="text-center py-16 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-[28px]">
                  <p className="text-zinc-500 dark:text-zinc-400 font-black text-base sm:text-lg">No encontramos coincidencias para tu búsqueda en la base de datos.</p>
                  <p className="text-zinc-400 dark:text-zinc-500 text-xs sm:text-sm mt-1.5">Prueba describiendo zonas alternativas o flexibilizando tu presupuesto.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-5">
                  {filteredResults.map((res) => (
                    <div
                      key={res.property.id}
                      className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row justify-between"
                    >
                      {/* Image Block */}
                      <div className="relative md:w-60 h-48 md:h-auto bg-zinc-100 dark:bg-zinc-800 shrink-0">
                        <img
                          src={getPropertyImage(res.property)}
                          alt={res.property.titulo}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = getPropertyImage({ ...res.property, urlImagen: null });
                          }}
                        />
                        <div className="absolute top-3 left-3 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow border border-zinc-100 dark:border-zinc-800 flex items-center gap-1.5">
                          <span className={`w-2.5 h-2.5 rounded-full ${res.puntajeCoincidencia >= 90 ? 'bg-emerald-500' : res.puntajeCoincidencia >= 75 ? 'bg-amber-500' : 'bg-rose-500'
                            }`} />
                          <span className="text-xs sm:text-sm font-black text-zinc-900 dark:text-zinc-100">{res.puntajeCoincidencia}% Match</span>
                        </div>
                      </div>

                      {/* Content Block */}
                      <div className="p-5 sm:p-6 md:p-8 flex-grow flex flex-col justify-between text-left">
                        <div>
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-3">
                            <div>
                              <span className="text-[11px] text-[#2E7D43] dark:text-[#8EF0B5] font-black bg-[#DDF1D5] dark:bg-[#2E7D43]/30 px-3 py-1 rounded-xl uppercase border border-[#4FA75A]/20">
                                {res.property.tipoPropiedad || 'Inmueble'} • {res.property.tipoUsoEspacio || 'Giro Libre'}
                              </span>
                              <h4 className="text-lg sm:text-xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 mt-2">
                                {res.property.titulo}
                              </h4>
                            </div>
                            <div className="sm:text-right shrink-0">
                              <div className="text-xl sm:text-2xl font-black text-[#2E7D43] dark:text-[#8EF0B5] leading-none">
                                {res.property.precio && Number(res.property.precio) > 0 ? `$${res.property.precio}` : 'Consultar'} {res.property.moneda || 'USD'}
                              </div>
                              <span className="text-[11px] text-zinc-400 dark:text-zinc-500 font-bold block mt-1.5 uppercase">
                                {res.property.areaM2 ? `${res.property.areaM2} m²` : '-- m²'} • {res.property.zona || 'No especificada'}
                              </span>
                            </div>
                          </div>

                          <p className="text-zinc-700 dark:text-zinc-300 text-xs sm:text-sm font-semibold leading-relaxed bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/50 dark:border-zinc-700/50 p-4 rounded-xl mt-4">
                            <span className="text-zinc-900 dark:text-zinc-100 font-black">Por qué encaja:</span> {res.resumen}
                          </p>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div>
                              <span className="text-[11px] text-emerald-600 dark:text-[#8EF0B5] font-black block uppercase tracking-wider mb-1.5">Ventajas</span>
                              <ul className="space-y-1">
                                {(Array.isArray(res.reasons) ? res.reasons : []).slice(0, 2).map((r, i) => (
                                  <li key={i} className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-semibold">
                                    <span className="text-emerald-500 font-bold mr-1">✓</span> {r}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            {Array.isArray(res.advertencias) && res.advertencias.length > 0 && (
                              <div>
                                <span className="text-[11px] text-rose-500 font-black block uppercase tracking-wider mb-1.5">Advertencias</span>
                                <ul className="space-y-1">
                                  {res.advertencias.slice(0, 2).map((w, i) => (
                                    <li key={i} className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-semibold">
                                      <span className="text-rose-500 font-bold mr-1">!</span> {w}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Action buttons footer */}
                        <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                          <span className="text-[10px] bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-300 font-black border border-amber-200 dark:border-amber-900/50 px-2.5 py-0.5 rounded uppercase self-start">
                            {res.etiquetaCorta}
                          </span>
                          <div className="grid grid-cols-2 sm:flex gap-2 w-full sm:w-auto">
                            <button
                              type="button"
                              onClick={() => toggleComparison(res.property)}
                              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${selectedForComparison.some(p => p.id === res.property.id)
                                ? 'bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-400'
                                : 'bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300'
                                }`}
                            >
                              {selectedForComparison.some(p => p.id === res.property.id) ? 'Quitar' : 'Comparar'}
                            </button>
                            <button
                              type="button"
                              onClick={() => openDetailModal(res.property)}
                              className="px-6 py-2 rounded-xl bg-[#2E7D43] hover:bg-[#2E7D43]/90 text-white font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer"
                            >
                              Contactar
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    )
  }

  // ─── CASE B: LANDING VIEW (DEFAULT HOME SCREEN) ───
  return (
    <div className="flex flex-col gap-12 sm:gap-16 py-4 sm:py-8 animate-fadeIn">
      
      {/* ── HERO SECTION (CENTERED & LARGER FONTS) ── */}
      <section className="relative w-full rounded-[32px] overflow-hidden bg-zinc-950 text-white p-6 sm:p-12 md:p-20 shadow-2xl flex flex-col items-center text-center">
        {/* Decorative background vectors/gradients */}
        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-gradient-to-br from-[#4FA75A]/25 via-[#2E7D43]/15 to-transparent blur-[80px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#7EE6D8]/15 via-transparent to-transparent blur-[70px] rounded-full pointer-events-none" />

        <div className="relative max-w-4xl flex flex-col items-center gap-6 z-10 mx-auto">
          {/* Main title: Centered, larger font */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-tight sm:leading-none max-w-3xl">
            Encuentra tu espacio comercial con <span className="bg-gradient-to-r from-[#8EF0B5] via-[#4FA75A] to-[#7EE6D8] bg-clip-text text-transparent">IA</span>
          </h1>
          
          {/* Subtitle: Centered, larger font */}
          <p className="text-zinc-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl font-medium">
            Describe el local, galpón u oficina que necesitas en Santa Cruz usando tus propias palabras. Mita extraerá tus requisitos operativos e indexará las mejores opciones de forma semántica.
          </p>

          {/* Centered Search Input Form */}
          <div className="w-full max-w-3xl mt-4 bg-white/10 backdrop-blur-xl border border-white/15 p-3.5 rounded-[22px] shadow-2xl text-left">
            {/* Transaction Type Selector Pills (Dark hero themed) */}
            <div className="flex gap-2 mb-3.5 justify-start">
              {[
                { key: 'ALQUILER', label: 'Alquiler' },
                { key: 'ANTICRETICO', label: 'Anticrético' },
                { key: 'VENTA', label: 'Venta' }
              ].map(t => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => {
                    setFilters(prev => ({ ...prev, transactionType: t.key }))
                  }}
                  className={`px-4.5 py-2 rounded-2xl text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer select-none border ${
                    (filters?.transactionType || 'ALQUILER') === t.key
                      ? 'bg-[#2E7D43] text-white border-[#2E7D43] shadow-sm'
                      : 'bg-white/5 border-white/10 hover:border-white/20 text-zinc-300 hover:text-white'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <form onSubmit={handleAISearch} className="flex flex-col sm:flex-row gap-2">
              <div className="flex-grow flex items-center bg-white/5 border border-white/10 hover:border-white/20 transition-colors rounded-xl px-4 py-3 shadow-inner">
                <svg className="w-5 h-5 text-zinc-400 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ej. Busco un local para cafetería en Equipetrol con parqueo, max 1000$..."
                  className="w-full bg-transparent outline-none text-white placeholder-zinc-500 text-sm sm:text-base md:text-lg font-semibold"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="p-1.5 hover:bg-white/10 rounded-full text-zinc-400 hover:text-white transition-colors mr-1 shrink-0 cursor-pointer"
                    title="Limpiar búsqueda"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                )}
              </div>
              <button
                type="submit"
                disabled={isSearching}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#2E7D43] hover:bg-[#2E7D43]/90 text-white font-black text-sm sm:text-base shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 active:scale-95 disabled:opacity-75"
              >
                {isSearching ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <span>Buscar</span>
                )}
              </button>
            </form>

            {/* Examples / Suggestions */}
            {Array.isArray(searchExamples) && searchExamples.length > 0 && (
              <div className="mt-4">
                <span className="text-xs text-zinc-400 dark:text-zinc-500 font-black uppercase tracking-wider block mb-2.5 text-left">Prueba estas sugerencias:</span>
                <div className="flex flex-wrap gap-2 max-h-[105px] overflow-y-auto pr-1">
                  {searchExamples.map((ex, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setSearchQuery(ex)
                        handleAISearch(null, ex)
                      }}
                      className="text-left text-xs bg-white/5 border border-white/10 hover:border-[#8EF0B5]/45 hover:bg-[#4FA75A]/15 text-zinc-300 hover:text-white px-3.5 py-2.5 rounded-xl transition-all duration-300 cursor-pointer font-semibold truncate max-w-full"
                    >
                      {ex}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── CÓMO FUNCIONA ── */}
      <section className="flex flex-col gap-8 sm:gap-10">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">Cómo funciona Mita AI</h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base mt-2.5 font-semibold">
            Nuestra plataforma redefine la búsqueda tradicional en 3 pasos clave para optimizar tu toma de decisiones.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 p-6 sm:p-8 rounded-[28px] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-5 text-left">
            <div className="w-14 h-14 rounded-2xl bg-[#4FA75A]/10 text-[#2E7D43] dark:text-[#8EF0B5] grid place-items-center font-black text-2xl">
              1
            </div>
            <div>
              <h3 className="font-black text-lg sm:text-xl text-zinc-950 dark:text-zinc-50 tracking-tight">Pregunta en tu lenguaje</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base leading-relaxed mt-2.5 font-medium">
                Usa nuestro buscador conversacional ("Busco un galpón de 200m² en zona norte para camiones"). Mita extrae las variables técnicas y filtra por ti.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 p-6 sm:p-8 rounded-[28px] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-5 text-left">
            <div className="w-14 h-14 rounded-2xl bg-[#7EE6D8]/15 text-[#2E7D43] dark:text-[#7EE6D8] grid place-items-center font-black text-2xl">
              2
            </div>
            <div>
              <h3 className="font-black text-lg sm:text-xl text-zinc-950 dark:text-zinc-50 tracking-tight">Compara técnicamente</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base leading-relaxed mt-2.5 font-medium">
                Selecciona hasta 3 propiedades del catálogo y usa el Comparador IA. Recibe ventajas, desventajas técnicas y advertencias de viabilidad para tu rubro.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 p-6 sm:p-8 rounded-[28px] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-5 text-left">
            <div className="w-14 h-14 rounded-2xl bg-[#B8A7FF]/15 text-[#5B21B6] dark:text-[#B8A7FF] grid place-items-center font-black text-2xl">
              3
            </div>
            <div>
              <h3 className="font-black text-lg sm:text-xl text-zinc-950 dark:text-zinc-50 tracking-tight">Conecta por WhatsApp</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base leading-relaxed mt-2.5 font-medium">
                Una vez decidido, solicita requisitos de alquiler y agenda visitas técnicas. Mita crea un enlace directo y automatiza la generación de leads.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── DESTACADOS EN TIEMPO REAL ── */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 px-1.5 text-left">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">Inmuebles destacados</h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base mt-2 font-semibold">
              Datos 100% reales en vivo desde nuestra base de datos en PostgreSQL.
            </p>
          </div>
          <button
            onClick={() => setCurrentTab('explore')}
            className="text-sm font-bold text-[#2E7D43] dark:text-[#8EF0B5] hover:underline cursor-pointer"
          >
            Ver todos los espacios →
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-[28px] h-85 animate-pulse flex flex-col justify-between">
                <div className="w-full h-40 bg-zinc-100 dark:bg-zinc-800 rounded-xl" />
                <div className="h-4 bg-zinc-100 dark:bg-zinc-800 rounded w-3/4 mt-4" />
                <div className="h-4 bg-zinc-100 dark:bg-zinc-800 rounded w-1/2 mt-2" />
                <div className="h-8 bg-zinc-100 dark:bg-zinc-800 rounded w-full mt-4" />
              </div>
            ))}
          </div>
        ) : featuredProperties.length === 0 ? (
          <div className="text-center py-16 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-[28px]">
            <p className="text-zinc-500 dark:text-zinc-400 font-semibold text-sm">No hay propiedades disponibles en este momento.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProperties.map(property => (
              <PropertyCard
                key={property.id}
                property={property}
                isSelectedForComparison={selectedForComparison.some(p => p.id === property.id)}
                onToggleComparison={toggleComparison}
                onOpenDetail={openDetailModal}
              />
            ))}
          </div>
        )}
      </section>

      {/* ── SECCIÓN DE AGENTES ── */}
      <section className="bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-950 border border-zinc-200/80 dark:border-zinc-800/80 p-8 sm:p-12 rounded-[32px] flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-10 shadow-inner">
        <div className="max-w-2xl text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-950 dark:text-zinc-50 tracking-tight">¿Eres Agente o Propietario Inmobiliario?</h2>
          <p className="text-zinc-600 dark:text-zinc-350 text-sm sm:text-base mt-3 leading-relaxed font-semibold">
            Inicia sesión con tu cuenta oficial para normalizar tus listados desordenados de WhatsApp, estructurar descripciones automáticamente con IA y hacer scraping directo de portales inmobiliarios para centralizar tus leads de WhatsApp en tiempo real.
          </p>
        </div>
        
        <button
          onClick={onLoginClick}
          className="shrink-0 px-8 py-4.5 rounded-2xl bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-900 font-black text-base shadow-md transition-all duration-300 active:scale-95 cursor-pointer text-center w-full md:w-auto"
        >
          Acceso Inmobiliario
        </button>
      </section>

    </div>
  )
}

export default InicioTab
