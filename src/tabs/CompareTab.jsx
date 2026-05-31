function formatMarkdown(text) {
  if (!text) return '';
  const parts = text.split(/\*\*([^*]+)\*\*/g);
  return parts.map((part, i) => {
    return i % 2 === 1 ? <strong key={i}>{part}</strong> : part;
  });
}

function CompareTab({
  compareQuery,
  setCompareQuery,
  isComparing,
  comparisonResult,
  selectedForComparison,
  triggerAIComparison,
  onAddPropertyClick,
  onOpenDetailModal
}) {
  return (
    <div className="flex flex-col gap-6 py-4 animate-fadeIn">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Comparador de Espacios IA</h1>
        <p className="text-zinc-500 text-sm mt-1 font-medium">Nuestra IA analiza comparativamente las propiedades y genera una recomendación comercial óptima.</p>
      </div>

      {/* Input query and selection */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 items-stretch">
        
        {/* Query & Trigger Box */}
        <div className="lg:col-span-1 bg-white border border-zinc-200/80 p-5 rounded-3xl shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-zinc-800 uppercase tracking-wider mb-2.5">Contexto del negocio</h3>
            <textarea
              value={compareQuery}
              onChange={(e) => setCompareQuery(e.target.value)}
              rows="4"
              className="w-full bg-zinc-50 border border-zinc-200 hover:border-zinc-300 p-3.5 rounded-2xl text-xs font-semibold text-zinc-700 outline-none focus:border-[#4FA75A] resize-none leading-relaxed"
              placeholder="Describe qué pretendes instalar o de qué forma utilizarás el espacio físico..."
            />
            <div className="mt-4 p-3.5 bg-zinc-50 dark:bg-zinc-900/50 border border-[#4FA75A]/20 dark:border-[#4FA75A]/10 rounded-2xl text-[11px] text-zinc-500 dark:text-zinc-400 font-semibold leading-relaxed">
              <span className="text-[#2E7D43] dark:text-[#8EF0B5] font-bold">Consejo:</span> Mita comparará aspectos de logística (trifásica, entrada de camiones), exposición comercial (avenidas, tránsito) y costos.
            </div>
          </div>

          <button
            onClick={triggerAIComparison}
            disabled={isComparing || selectedForComparison.length < 2}
            className="w-full mt-6 py-3 bg-[#2E7D43] hover:bg-[#2E7D43]/90 text-white font-bold text-xs rounded-2xl shadow-md transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isComparing ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                <span>Generar Comparación IA</span>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </>
            )}
          </button>
        </div>

        {/* Selected Cards quick review */}
        <div className="lg:col-span-2 bg-zinc-50 border border-zinc-200/80 p-5 rounded-3xl flex flex-col justify-center">
          <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block mb-4">Espacios a comparar:</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(Array.isArray(selectedForComparison) ? selectedForComparison : []).map(p => (
              <div key={p.id} className="bg-white border border-zinc-200/80 p-4 rounded-2xl shadow-sm flex flex-col justify-between">
                <div>
                  <span className="text-[9px] text-[#2E7D43] dark:text-[#8EF0B5] font-bold bg-[#DDF1D5] dark:bg-[#2E7D43]/30 px-2 py-0.5 rounded border border-[#4FA75A]/20 dark:border-[#4FA75A]/10 uppercase">
                    {p.tipoPropiedad || 'Inmueble'}
                  </span>
                  <h4 className="font-bold text-xs text-zinc-800 line-clamp-2 mt-2 leading-snug">{p.titulo}</h4>
                </div>
                <div className="mt-4 pt-3 border-t border-zinc-100 flex justify-between items-end">
                  <span className="text-[9px] text-zinc-400 font-bold uppercase">{p.zona || 'No especificada'}</span>
                  <span className="text-xs font-black text-[#2E7D43]">
                    {p.precio && Number(p.precio) > 0 ? `$${p.precio}` : 'Consultar'} /mes
                  </span>
                </div>
              </div>
            ))}
            {Array.isArray(selectedForComparison) && selectedForComparison.length < 3 && (
              <button
                onClick={onAddPropertyClick}
                className="border-2 border-dashed border-zinc-300 hover:border-[#4FA75A]/50 bg-white hover:bg-[#4FA75A]/5 p-4 rounded-2xl flex flex-col items-center justify-center text-zinc-400 hover:text-[#2E7D43] transition-all cursor-pointer min-h-[120px]"
              >
                <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path>
                </svg>
                <span className="text-[10px] font-bold uppercase">Añadir otro espacio</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Comparison results */}
      {isComparing && (
        <div className="flex flex-col items-center py-20 gap-4">
          <span className="w-10 h-10 border-4 border-[#2E7D43] border-t-transparent rounded-full animate-spin"></span>
          <p className="text-zinc-500 text-sm font-semibold">Generando matriz y reporte comparativo...</p>
        </div>
      )}

      {!isComparing && comparisonResult && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mt-4">
          
          {/* AI Executive Verdict */}
          <div className="lg:col-span-1 bg-gradient-to-br from-[#2E7D43] to-[#4FA75A] text-white p-5 sm:p-6 rounded-3xl shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute right-0 top-0 w-48 h-48 bg-white/10 blur-[40px] rounded-full pointer-events-none"></div>
            
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse"></div>
                <span className="text-[10px] text-white/90 font-bold uppercase tracking-wider">Veredicto del Agente IA</span>
              </div>

              <h3 className="text-2xl font-black tracking-tight mb-4">Recomendación Final:</h3>
              
              <p className="text-white/90 text-sm leading-relaxed mb-6 font-medium">
                {comparisonResult.decisionSummary}
              </p>

              {Array.isArray(comparisonResult.tradeoffs) && comparisonResult.tradeoffs.length > 0 && (
                <div className="bg-white/10 border border-white/20 p-4.5 rounded-2xl mb-6">
                  <span className="text-[9px] text-[#8EF0B5] font-black uppercase tracking-wider block mb-1">Tradeoffs detectados:</span>
                  <ul className="space-y-2">
                    {comparisonResult.tradeoffs.map((t, idx) => (
                      <li key={idx} className="text-xs text-white/95 leading-relaxed font-semibold flex items-start gap-1.5">
                        <span className="text-[#8EF0B5] font-black">•</span> <span>{formatMarkdown(t)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {comparisonResult.finalRecommendation && (
              <p className="text-xs text-[#8EF0B5] font-semibold bg-white/10 border border-white/15 p-3 rounded-xl leading-relaxed">
                {formatMarkdown(comparisonResult.finalRecommendation)}
              </p>
            )}
          </div>

          {/* Side-by-Side Comparison Table */}
          <div className="lg:col-span-2 bg-white border border-zinc-200/80 p-5 md:p-6 rounded-3xl shadow-sm min-w-0">
            <h3 className="text-sm font-bold text-zinc-800 uppercase tracking-wider mb-4">Matriz comparativa de infraestructura:</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-100">
                    {Array.isArray(comparisonResult.comparisonTable) && comparisonResult.comparisonTable.length > 0 &&
                      Object.keys(comparisonResult.comparisonTable[0]).map((key, idx) => (
                        <th key={idx} className="pb-3 text-[10px] text-zinc-400 font-bold uppercase tracking-wider">{key}</th>
                      ))
                    }
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50">
                  {Array.isArray(comparisonResult.comparisonTable) && comparisonResult.comparisonTable.map((row, idx) => (
                    <tr key={idx} className="hover:bg-zinc-50/55 transition-colors">
                      {Object.values(row).map((val, cellIdx) => (
                        <td key={cellIdx} className="py-4 text-xs font-semibold text-zinc-700">
                          {cellIdx === 0 ? (
                            <strong className="text-zinc-900 block truncate max-w-[200px]">{val}</strong>
                          ) : (
                            val || 'N/A'
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 flex justify-stretch sm:justify-end">
              <button
                onClick={() => {
                  const recProp = selectedForComparison.find(p => p.id === comparisonResult.recommendedPropertyId)
                  if (recProp) onOpenDetailModal(recProp)
                }}
                className="w-full sm:w-auto px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs rounded-2xl shadow-md cursor-pointer transition-all duration-300 active:scale-95"
              >
                Contactar Opción Recomendada
              </button>
            </div>

          </div>

        </div>
      )}
    </div>
  )
}

export default CompareTab
