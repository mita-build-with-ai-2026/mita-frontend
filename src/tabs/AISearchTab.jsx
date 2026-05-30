import React from 'react'

function AISearchTab({
  searchQuery,
  setSearchQuery,
  searchExamples,
  isSearching,
  searchResult,
  selectedForComparison,
  toggleComparison,
  openDetailModal,
  handleAISearch
}) {
  return (
    <div className="flex flex-col items-center gap-8 py-8 animate-fadeIn">
      <div className="text-center max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 border border-[#4FA75A]/20 text-[#2E7D43] font-bold text-xs shadow-sm backdrop-blur-md mb-4">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          Digitalizando la Industria Inmobiliaria
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none mb-6">
          Encuentra tu espacio con <span className="bg-gradient-to-r from-[#2E7D43] via-[#4FA75A] to-[#7EE6D8] bg-clip-text text-transparent">Inteligencia Artificial</span>
        </h1>
        <p className="text-zinc-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          Describe el espacio que necesitas en Santa Cruz, ya sea terrenos, departamentos, casas u otros. Mita estructurará tu búsqueda, calculará compatibilidades y te dará respuestas claras.
        </p>
      </div>

      {/* Chat/Search Area */}
      <div className="w-full max-w-3xl bg-white/70 backdrop-blur-xl border border-zinc-200/80 p-5 md:p-6 rounded-3xl shadow-xl">
        <form onSubmit={handleAISearch} className="flex gap-2">
          <div className="flex-grow flex items-center bg-zinc-50 border border-zinc-200 hover:border-zinc-300 transition-colors rounded-2xl px-4 py-3 shadow-inner">
            <svg className="w-5 h-5 text-zinc-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ej. Necesito un galpón o depósito en zona norte con entrada de camión y seguridad..."
              className="w-full bg-transparent outline-none text-zinc-800 placeholder-zinc-400 text-sm font-medium"
            />
          </div>
          <button
            type="submit"
            disabled={isSearching}
            className="px-6 rounded-2xl bg-gradient-to-r from-[#2E7D43] to-[#4FA75A] hover:from-[#2E7D43]/90 hover:to-[#4FA75A]/90 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 active:scale-95 disabled:opacity-70"
          >
            {isSearching ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                <span>Buscar</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </>
            )}
          </button>
        </form>

        {/* Suggestions */}
        <div className="mt-5">
          <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block mb-2.5">Sugerencias de búsqueda industrial/comercial:</span>
          <div className="flex flex-wrap gap-2">
            {searchExamples.map((ex, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setSearchQuery(ex)
                  handleAISearch(null, ex)
                }}
                className="text-left text-xs bg-zinc-50 border border-zinc-200/80 hover:border-[#4FA75A]/30 hover:bg-[#4FA75A]/5 text-zinc-600 hover:text-[#2E7D43] px-3.5 py-2 rounded-xl transition-all duration-300 cursor-pointer font-semibold max-w-full truncate"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Conversational Results */}
      {isSearching && (
        <div className="w-full max-w-3xl flex flex-col items-center py-12 gap-4 animate-fadeIn">
          <div className="relative w-16 h-16">
            <span className="absolute inset-0 bg-[#4FA75A]/20 rounded-full animate-ping"></span>
            <div className="absolute inset-2 bg-gradient-to-br from-[#2E7D43] to-[#4FA75A] rounded-full flex items-center justify-center text-white shadow-md">
              <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
            </div>
          </div>
          <div className="text-center">
            <p className="text-zinc-800 text-sm font-bold animate-pulse">Mita está analizando tu búsqueda conversacional...</p>
            <p className="text-zinc-400 text-xs mt-1">Extrayendo criterios estructurados y cruzando embeddings vectoriales de Santa Cruz.</p>
          </div>
        </div>
      )}

      {!isSearching && searchResult && (
        <div className="w-full max-w-3xl flex flex-col gap-6 animate-fadeIn">

          {/* Search Metadata & Extracted Criteria Card */}
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 text-white p-6 rounded-3xl shadow-xl relative overflow-hidden">
            <div className="absolute right-0 top-0 w-64 h-64 bg-emerald-500/10 blur-[60px] rounded-full pointer-events-none"></div>

            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Criterios de IA extraídos</span>
            </div>

            <h3 className="text-xl font-bold tracking-tight mb-4">Mita interpretó tu intención de búsqueda:</h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
              <div>
                <span className="block text-[10px] text-zinc-400 uppercase font-semibold">Tipo de espacio</span>
                <strong className="text-sm text-zinc-100">{searchResult.criteria.tipoPropiedad || 'Indeterminado'}</strong>
              </div>
              <div>
                <span className="block text-[10px] text-zinc-400 uppercase font-semibold">Giro / Uso sugerido</span>
                <strong className="text-sm text-zinc-100">{searchResult.criteria.tipoUsoEspacio || 'Cualquiera'}</strong>
              </div>
              <div>
                <span className="block text-[10px] text-zinc-400 uppercase font-semibold">Zona detectada</span>
                <strong className="text-sm text-zinc-100">{searchResult.criteria.zonas.join(', ') || 'Todo Santa Cruz'}</strong>
              </div>
              <div>
                <span className="block text-[10px] text-zinc-400 uppercase font-semibold">Presupuesto máximo</span>
                <strong className="text-sm text-zinc-100">{searchResult.criteria.precioMaximo ? `$${searchResult.criteria.precioMaximo} USD` : 'Flexible'}</strong>
              </div>
            </div>

            {searchResult.criteria.aptoPara && searchResult.criteria.aptoPara.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2 items-center">
                <span className="text-[10px] text-zinc-400 uppercase font-semibold mr-1">Apto para:</span>
                {searchResult.criteria.aptoPara.map((ap, idx) => (
                  <span key={idx} className="text-xs bg-[#4FA75A]/20 text-[#8EF0B5] px-2.5 py-1 rounded-md font-semibold border border-[#4FA75A]/30">
                    {ap}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Match Results List */}
          <h3 className="text-lg font-bold text-zinc-800 mt-2 px-1">Espacios encontrados y puntuados por compatibilidad:</h3>

          <div className="flex flex-col gap-5">
            {searchResult.results.length === 0 ? (
              <div className="text-center py-8 bg-zinc-50 border border-zinc-200 rounded-3xl">
                <p className="text-zinc-500 font-semibold text-sm">No encontramos coincidencias exactas para esta búsqueda.</p>
                <p className="text-zinc-400 text-xs mt-1">Prueba describiendo zonas alternativas o flexibilizando tu presupuesto.</p>
              </div>
            ) : (
              searchResult.results.map((res) => (
                <div
                  key={res.property.id}
                  className="bg-white border border-zinc-200/80 rounded-3xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row"
                >
                  {/* Left Card Image */}
                  <div className="relative md:w-64 h-48 md:h-auto bg-zinc-100 flex-shrink-0">
                    <img
                      src={res.property.urlImagen}
                      alt={res.property.titulo}
                      className="w-full h-full object-cover"
                    />
                    {/* Match Badge */}
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-md border border-zinc-100 flex items-center gap-1.5">
                      <span className={`w-2.5 h-2.5 rounded-full ${res.puntajeCoincidencia >= 90 ? 'bg-emerald-500' : res.puntajeCoincidencia >= 75 ? 'bg-amber-500' : 'bg-rose-500'
                        }`}></span>
                      <span className="text-sm font-black text-zinc-900">{res.puntajeCoincidencia}% Match</span>
                    </div>
                  </div>

                  {/* Right Card Content */}
                  <div className="p-5 md:p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-4 mb-2">
                        <div>
                          <span className="text-[10px] text-[#2E7D43] font-bold bg-[#DDF1D5] px-2.5 py-1 rounded-full uppercase border border-[#4FA75A]/20 tracking-wider">
                            {res.property.tipoPropiedad} • {res.property.tipoUsoEspacio}
                          </span>
                          <h4 className="text-lg font-black tracking-tight text-zinc-900 mt-2 hover:text-[#2E7D43] transition-colors">
                            {res.property.titulo}
                          </h4>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-black text-[#2E7D43] leading-none">
                            ${res.property.precio} {res.property.moneda}
                          </div>
                          <span className="text-[9px] text-zinc-400 font-bold block mt-1 uppercase tracking-wide">
                            {res.property.areaM2} m² • {res.property.zona}
                          </span>
                        </div>
                      </div>

                      {/* RAG Explicación */}
                      <p className="text-zinc-600 text-xs font-semibold leading-relaxed bg-[#F8FAF8] border border-zinc-200/50 p-3 rounded-xl mt-3">
                        💡 <span className="text-zinc-800 font-black">Por qué encaja:</span> {res.resumen}
                      </p>

                      {/* Razones & Advertencias */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mt-3.5">
                        <div>
                          <span className="text-[9px] text-emerald-600 font-black block uppercase tracking-wider mb-1.5">Ventajas operativas</span>
                          <ul className="space-y-1">
                            {res.reasons.slice(0, 3).map((r, i) => (
                              <li key={i} className="text-[11px] text-zinc-600 font-semibold flex items-start gap-1">
                                <span className="text-emerald-500 font-bold">✓</span> {r}
                              </li>
                            ))}
                          </ul>
                        </div>
                        {res.advertencias.length > 0 && (
                          <div>
                            <span className="text-[9px] text-rose-500 font-black block uppercase tracking-wider mb-1.5">Advertencias / Vacíos</span>
                            <ul className="space-y-1">
                              {res.advertencias.slice(0, 2).map((w, i) => (
                                <li key={i} className="text-[11px] text-zinc-500 font-semibold flex items-start gap-1">
                                  <span className="text-rose-500 font-bold">⚠</span> {w}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* CTA Row */}
                    <div className="p-4 border-t border-zinc-100 flex justify-between items-center gap-4 mt-6 pt-4">
                      <span className="text-[9px] bg-amber-50 text-amber-700 font-bold border border-amber-200/50 px-2 py-1 rounded">
                        {res.etiquetaCorta}
                      </span>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => toggleComparison(res.property)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${selectedForComparison.some(p => p.id === res.property.id)
                            ? 'bg-rose-50 border border-rose-200 text-rose-600'
                            : 'bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-zinc-700'
                            }`}
                        >
                          {selectedForComparison.some(p => p.id === res.property.id) ? 'Quitar' : 'Comparar'}
                        </button>
                        <button
                          type="button"
                          onClick={() => openDetailModal(res.property)}
                          className="px-4 py-1.5 rounded-xl bg-[#2E7D43] hover:bg-[#2E7D43]/90 text-white font-bold text-xs shadow-sm transition-all duration-300 active:scale-95 cursor-pointer"
                        >
                          Contactar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default AISearchTab
