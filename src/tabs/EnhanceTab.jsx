import React from 'react'

function EnhanceTab({
  rawEnhanceText,
  setRawEnhanceText,
  isEnhancing,
  enhancedResult,
  handleEnhancement,
  saveEnhancedDraft
}) {
  return (
    <div className="flex flex-col gap-6 py-4 animate-fadeIn">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Publicador e Importador IA</h1>
        <p className="text-zinc-500 text-sm mt-1 font-medium">
          ¿Tienes una publicación informal de WhatsApp o Facebook? Pégala abajo. Nuestra IA la estructurará, estimará los metros cuadrados, identificará la información faltante clave y generará formatos listos para republicar.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {/* Input raw text */}
        <div className="bg-white border border-zinc-200/80 p-5 md:p-6 rounded-3xl shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-zinc-800 uppercase tracking-wider mb-2.5">Ingresar publicación desordenada</h3>
            <form onSubmit={handleEnhancement}>
              <textarea
                value={rawEnhanceText}
                onChange={(e) => setRawEnhanceText(e.target.value)}
                rows="6"
                className="w-full bg-zinc-50 border border-zinc-200 hover:border-zinc-300 p-4 rounded-2xl text-xs font-semibold text-zinc-700 outline-none focus:border-[#4FA75A] resize-none leading-relaxed mb-4 shadow-inner"
                placeholder="Ej. alquilo local zona norte 800$ ideal negocio..."
              />
              <button
                type="submit"
                disabled={isEnhancing}
                className="w-full py-3.5 bg-gradient-to-r from-[#2E7D43] to-[#4FA75A] hover:from-[#2E7D43]/90 hover:to-[#4FA75A]/90 text-white font-bold text-xs rounded-2xl shadow-md transition-all duration-300 cursor-pointer active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isEnhancing ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    <span>Normalizar y Estructurar con IA</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="mt-6 p-4 bg-[#F8FAF8] border border-[#4FA75A]/20 rounded-2xl text-[11px] text-zinc-500 font-semibold leading-relaxed">
            📢 **Alerta de valor**: La IA no solo limpia el texto. Te advertirá qué campos le faltan al anuncio (ej. parqueo, luz trifásica) antes de que lo subas a la base de datos oficial.
          </div>
        </div>

        {/* Display structured result */}
        <div className="bg-zinc-50 border border-zinc-200/80 p-5 md:p-6 rounded-3xl flex flex-col justify-center min-h-[300px]">
          {isEnhancing && (
            <div className="flex flex-col items-center gap-3">
              <span className="w-8 h-8 border-3 border-[#2E7D43] border-t-transparent rounded-full animate-spin"></span>
              <p className="text-zinc-500 text-xs font-semibold animate-pulse">Normalizando estructura de datos...</p>
            </div>
          )}

          {!isEnhancing && !enhancedResult && (
            <div className="text-center text-zinc-400">
              <svg className="w-12 h-12 mx-auto mb-2 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <p className="text-xs font-bold uppercase tracking-wider">Esperando datos de entrada</p>
              <p className="text-[10px] mt-1">Completa el texto informal de la izquierda y haz clic en procesar.</p>
            </div>
          )}

          {!isEnhancing && enhancedResult && (
            <div className="flex flex-col justify-between h-full animate-fadeIn">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[9px] bg-emerald-100 text-emerald-700 font-bold border border-emerald-200 px-2 py-0.5 rounded uppercase">
                    Resultados de Estructuración
                  </span>
                  <span className="text-[9px] text-zinc-400 font-semibold uppercase">Santa Cruz de la Sierra</span>
                </div>

                <h3 className="text-base font-black text-zinc-900 tracking-tight leading-snug mb-3">
                  {enhancedResult.titulo}
                </h3>

                <div className="grid grid-cols-2 gap-3 bg-white p-3.5 rounded-2xl border border-zinc-200/50 mb-4">
                  <div>
                    <span className="block text-[9px] text-zinc-400 font-bold uppercase">Tipo de espacio:</span>
                    <strong className="text-xs text-zinc-800 uppercase font-semibold">{enhancedResult.propertyDraft.tipoPropiedad}</strong>
                  </div>
                  <div>
                    <span className="block text-[9px] text-zinc-400 font-bold uppercase">Precio mensual:</span>
                    <strong className="text-xs text-[#2E7D43] font-bold">${enhancedResult.propertyDraft.precio} {enhancedResult.propertyDraft.moneda}</strong>
                  </div>
                  <div>
                    <span className="block text-[9px] text-zinc-400 font-bold uppercase">Ubicación / Zona:</span>
                    <strong className="text-xs text-zinc-800 font-semibold">{enhancedResult.propertyDraft.zona}</strong>
                  </div>
                  <div>
                    <span className="block text-[9px] text-zinc-400 font-bold uppercase">Área Estimada:</span>
                    <strong className="text-xs text-zinc-800 font-semibold">{enhancedResult.propertyDraft.areaM2} m²</strong>
                  </div>
                </div>

                {/* Warnings / Faltantes */}
                {enhancedResult.informacionFaltante && enhancedResult.informacionFaltante.length > 0 && (
                  <div className="p-3.5 bg-amber-50 border border-amber-200 text-amber-900 rounded-2xl text-[11px] font-semibold mb-4 leading-relaxed">
                    ⚠️ **Información crítica ausente en el texto original:**
                    <ul className="mt-1 space-y-0.5 list-disc pl-4 text-zinc-600 text-[10px]">
                      {enhancedResult.informacionFaltante.map((inf, i) => (
                        <li key={i}>{inf}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(enhancedResult.versionWhatsapp)
                    alert('¡Copiado al portapapeles!')
                  }}
                  className="flex-grow py-2.5 bg-zinc-900 text-white font-bold text-xs rounded-xl shadow hover:bg-zinc-850 cursor-pointer text-center font-semibold"
                >
                  Copiar WhatsApp
                </button>
                <button
                  type="button"
                  onClick={saveEnhancedDraft}
                  className="flex-grow py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs rounded-xl shadow cursor-pointer text-center font-semibold"
                >
                  Guardar Borrador
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default EnhanceTab
