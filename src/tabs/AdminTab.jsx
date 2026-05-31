import { useState } from 'react'

function AdminTab({
  adminUser,
  handleAdminLogout,
  leads = [],
  imports = [],
  importUrl,
  setImportUrl,
  importLimit,
  setImportLimit,
  isImporting,
  importSourceId,
  setImportSourceId,
  handleRunImport,
  triggerReindex,
  ragStatus,
  
  // Listing Enhancer States/Props
  rawEnhanceText,
  setRawEnhanceText,
  isEnhancing,
  enhancedResult,
  handleEnhancement,
  saveEnhancedDraft,
  
  // Properties passed from App.jsx
  properties = []
}) {
  const [activeSubTab, setActiveSubTab] = useState('leads') // 'leads' or 'scraper'

  // Helper to load example real estate text
  const loadExampleText = () => {
    setRawEnhanceText(
      "Alquilo local comercial amplio en Zona Norte, Avenida Banzer entre 3er y 4to anillo. Consta de 120m2, tiene instalacion trifasica ideal para panaderia o gimnasio. Tiene 2 banos privados. Entrada de camiones por el callejon trasero. Precio: 950 USD mensuales. Comunicarse al Whatsapp 78012345"
    );
  };

  // Helper to format WhatsApp link for Bolivia (591)
  const getWhatsappLink = (lead) => {
    let phone = lead.telefonoUsuario ? String(lead.telefonoUsuario).replace(/\D/g, '') : '';
    if (phone.length === 8) {
      phone = '591' + phone;
    }
    const text = `Hola ${lead.nombreUsuario}, vi tu solicitud de visita para el inmueble "${lead.propertyTitulo}" por valor de $${lead.propertyPrecio} en Mita AI. Con gusto te ayudo.`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="flex flex-col gap-6 py-4 animate-fadeIn text-zinc-900 dark:text-zinc-100">
      
      {/* ── HEADER ROW ── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 grid place-items-center rounded-xl bg-zinc-900 dark:bg-zinc-800 text-white font-bold text-base shrink-0 border border-zinc-200/25">
            A
          </div>
          <div>
            <h2 className="text-lg font-black text-zinc-900 dark:text-zinc-50">Panel Inmobiliario de Control</h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
              Agente: <strong className="text-zinc-800 dark:text-zinc-200">{adminUser?.nombre || adminUser?.name || 'Administrador'}</strong> ({adminUser?.rol || 'AGENTE'})
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:flex gap-2 w-full lg:w-auto">
          <button
            type="button"
            onClick={triggerReindex}
            className="px-4 py-2 border border-zinc-200/80 dark:border-zinc-800 hover:border-[#4FA75A]/45 hover:bg-[#4FA75A]/5 text-zinc-700 dark:text-zinc-300 hover:text-[#2E7D43] dark:hover:text-[#8EF0B5] text-xs font-bold rounded-xl transition-all cursor-pointer text-center"
            title="Sincroniza el motor de busqueda de IA con las propiedades mas recientes"
          >
            Sincronizar Buscador IA
          </button>
          <button
            type="button"
            onClick={handleAdminLogout}
            className="px-4 py-2 bg-zinc-900 dark:bg-zinc-800 hover:bg-zinc-800 dark:hover:bg-zinc-750 text-white text-xs font-bold rounded-xl cursor-pointer text-center border border-zinc-700/30"
          >
            Cerrar Sesion
          </button>
        </div>
      </div>

      {ragStatus && (
        <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/35 text-emerald-800 dark:text-emerald-400 text-xs font-bold rounded-2xl animate-pulse">
          {ragStatus}
        </div>
      )}

      {/* ── KPI METRICS GRID ROW ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* KPI 1: Active properties */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 p-5 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#4FA75A]/10 text-[#2E7D43] dark:text-[#8EF0B5] flex items-center justify-center shrink-0 border border-[#4FA75A]/10">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <div>
            <span className="block text-[9px] text-zinc-400 dark:text-zinc-500 font-black uppercase tracking-wider">Propiedades Activas</span>
            <strong className="text-2xl font-black text-zinc-900 dark:text-zinc-50">{properties?.length || 0}</strong>
          </div>
        </div>

        {/* KPI 2: Total leads */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 p-5 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#4FA75A]/10 text-[#2E7D43] dark:text-[#8EF0B5] flex items-center justify-center shrink-0 border border-[#4FA75A]/10">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
            </svg>
          </div>
          <div>
            <span className="block text-[9px] text-zinc-400 dark:text-zinc-500 font-black uppercase tracking-wider">Prospectos (Leads)</span>
            <strong className="text-2xl font-black text-zinc-900 dark:text-zinc-50">{leads?.length || 0}</strong>
          </div>
        </div>

        {/* KPI 3: Scrapings completed */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 p-5 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#4FA75A]/10 text-[#2E7D43] dark:text-[#8EF0B5] flex items-center justify-center shrink-0 border border-[#4FA75A]/10">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </div>
          <div>
            <span className="block text-[9px] text-zinc-400 dark:text-zinc-500 font-black uppercase tracking-wider">Importaciones Red</span>
            <strong className="text-2xl font-black text-zinc-900 dark:text-zinc-50">{imports?.length || 0}</strong>
          </div>
        </div>
      </div>

      {/* ── MAIN TWO-COLUMN DASHBOARD ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 items-stretch">
        
        {/* ── LEFT COLUMN: IA PUBLISHER (ENHANCER) ── */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 p-5 md:p-6 rounded-3xl shadow-sm flex flex-col justify-between min-h-[500px]">
          <div>
            
            {/* Step Indicators */}
            <div className="flex items-center justify-between text-[8px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider border-b border-zinc-100 dark:border-zinc-800/60 pb-3 mb-4">
              <span>Paso 1: Pegar Texto</span>
              <span>-</span>
              <span>Paso 2: Procesar IA</span>
              <span>-</span>
              <span>Paso 3: Borrador</span>
            </div>

            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">Publicador Inteligente</h3>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={loadExampleText}
                  className="text-[9px] text-[#2E7D43] dark:text-[#8EF0B5] bg-[#4FA75A]/10 hover:bg-[#4FA75A]/20 font-bold px-2 py-0.5 rounded-lg border border-[#4FA75A]/20 transition-all cursor-pointer"
                >
                  Cargar Ejemplo
                </button>
                <span className="text-[9px] bg-[#4FA75A]/15 text-[#2E7D43] dark:text-[#8EF0B5] font-bold px-2.5 py-0.5 rounded-full border border-[#4FA75A]/25">
                  Borrador IA
                </span>
              </div>
            </div>
            <p className="text-zinc-400 dark:text-zinc-500 text-[11px] mb-4 font-semibold leading-relaxed">
              Pegue un texto informal o desordenado de WhatsApp o Facebook Marketplace. La Inteligencia Artificial extraera la ficha tecnica, estimara superficies y validara datos indispensables.
            </p>

            <form onSubmit={handleEnhancement}>
              <textarea
                value={rawEnhanceText}
                onChange={(e) => setRawEnhanceText(e.target.value)}
                rows="4"
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 hover:border-zinc-300 dark:hover:border-zinc-700 p-3.5 rounded-xl text-xs font-semibold text-zinc-700 dark:text-zinc-300 outline-none focus:border-[#4FA75A] resize-none leading-relaxed shadow-inner"
                placeholder="Ej. alquilo local comercial zona norte 800$ ideal negocio..."
              />
              <button
                type="submit"
                disabled={isEnhancing}
                className="w-full mt-3 py-3 bg-[#2E7D43] hover:bg-[#2E7D43]/90 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {isEnhancing ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    <span>Normalizar y Estructurar con IA</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Enhancement Results */}
          <div className="mt-5 border-t border-zinc-100 dark:border-zinc-800/60 pt-4 flex-grow flex flex-col justify-center bg-zinc-50/50 dark:bg-zinc-950/20 p-4 rounded-2xl">
            {isEnhancing ? (
              <div className="flex flex-col items-center gap-2 py-10">
                <span className="w-6 h-6 border-3 border-[#2E7D43] border-t-transparent rounded-full animate-spin"></span>
                <p className="text-zinc-500 text-[10px] font-semibold animate-pulse">Normalizando estructura de datos...</p>
              </div>
            ) : !enhancedResult ? (
              /* Dotted preview skeleton loader */
              <div className="py-6 px-4 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50/30 dark:bg-zinc-900/10 text-left animate-fadeIn">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-4 h-4 bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded-full shrink-0"></div>
                  <div className="h-3 bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded w-1/3"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded w-3/4"></div>
                  <div className="h-3 bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded w-1/2"></div>
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="p-3 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg">
                      <div className="h-2 bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded w-1/2 mb-2"></div>
                      <div className="h-3 bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded w-3/4"></div>
                    </div>
                    <div className="p-3 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg">
                      <div className="h-2 bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded w-1/2 mb-2"></div>
                      <div className="h-3 bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded w-3/4"></div>
                    </div>
                  </div>
                </div>
                <p className="text-[10px] font-bold text-center uppercase tracking-wider mt-5 text-zinc-400 dark:text-zinc-500">
                  Previsualizacion del Anuncio
                </p>
                <p className="text-[9px] text-center text-zinc-400 dark:text-zinc-500 mt-1 leading-relaxed">
                  Ingrese el texto en el cuadro superior y presione Procesar para rellenar la ficha tecnica.
                </p>
              </div>
            ) : (
              <div className="flex flex-col justify-between h-full text-left animate-fadeIn">
                <div>
                  <h4 className="text-xs font-black text-zinc-900 dark:text-zinc-100 tracking-tight leading-snug mb-2">
                    {enhancedResult.titulo}
                  </h4>

                  <div className="grid grid-cols-2 gap-2 bg-white dark:bg-zinc-950 p-3 rounded-xl border border-zinc-200/50 dark:border-zinc-850 mb-3 text-[10px]">
                    <div>
                      <span className="block text-[8px] text-zinc-400 dark:text-zinc-500 font-bold uppercase">Tipo de espacio:</span>
                      <strong className="text-zinc-700 dark:text-zinc-300 uppercase font-semibold">{enhancedResult.propertyDraft?.tipoPropiedad}</strong>
                    </div>
                    <div>
                      <span className="block text-[8px] text-zinc-400 dark:text-zinc-500 font-bold uppercase">Precio mensual:</span>
                      <strong className="text-[#2E7D43] dark:text-[#8EF0B5] font-bold">${enhancedResult.propertyDraft?.precio} {enhancedResult.propertyDraft?.moneda}</strong>
                    </div>
                    <div>
                      <span className="block text-[8px] text-zinc-400 dark:text-zinc-500 font-bold uppercase">Ubicacion / Zona:</span>
                      <strong className="text-zinc-700 dark:text-zinc-300 font-semibold">{enhancedResult.propertyDraft?.zona}</strong>
                    </div>
                    <div>
                      <span className="block text-[8px] text-zinc-400 dark:text-zinc-500 font-bold uppercase">Area Estimada:</span>
                      <strong className="text-zinc-700 dark:text-zinc-300 font-semibold">{enhancedResult.propertyDraft?.areaM2 || '--'} m²</strong>
                    </div>
                  </div>

                  {/* Warnings / Faltantes */}
                  {Array.isArray(enhancedResult.informacionFaltante) && enhancedResult.informacionFaltante.length > 0 && (
                    <div className="p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/35 text-amber-900 dark:text-amber-300 rounded-xl text-[10px] font-semibold mb-3">
                      <strong>Informacion critica ausente en el texto:</strong>
                      <ul className="mt-1 space-y-0.5 list-disc pl-3 text-zinc-500 dark:text-zinc-400 text-[9px]">
                        {enhancedResult.informacionFaltante.slice(0, 3).map((inf, i) => (
                          <li key={i}>{inf}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(enhancedResult.versionWhatsapp)
                      alert('Copiado al portapapeles!')
                    }}
                    className="py-2.5 bg-zinc-900 dark:bg-zinc-800 text-white font-bold text-[10px] rounded-lg shadow hover:bg-zinc-800 dark:hover:bg-zinc-700 cursor-pointer text-center"
                  >
                    Copiar Whatsapp
                  </button>
                  <button
                    type="button"
                    onClick={saveEnhancedDraft}
                    className="py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-bold text-[10px] rounded-lg shadow cursor-pointer text-center"
                  >
                    Guardar Borrador
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── RIGHT COLUMN: LEADS FEED & SCRAPER MANAGER ── */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 p-5 md:p-6 rounded-3xl shadow-sm flex flex-col justify-between">
          
          <div>
            {/* Dynamic tabs controller */}
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/60 pb-3 mb-4">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setActiveSubTab('leads')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeSubTab === 'leads' ? 'bg-zinc-900 dark:bg-zinc-800 text-white' : 'text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-850'
                  }`}
                >
                  Prospectos (Leads)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSubTab('scraper')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeSubTab === 'scraper' ? 'bg-zinc-900 dark:bg-zinc-800 text-white' : 'text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-850'
                  }`}
                >
                  Importador de Redes
                </button>
              </div>

              <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider">
                {activeSubTab === 'leads' ? `Leads: ${leads.length}` : 'Scraper'}
              </span>
            </div>

            {/* TAB CONTENT: LEADS FEED */}
            {activeSubTab === 'leads' && (
              <div className="flex flex-col gap-2">
                {(!leads || leads.length === 0) ? (
                  <div className="text-center py-20 text-zinc-400 dark:text-zinc-500">
                    <svg className="w-10 h-10 mx-auto mb-2 text-zinc-300 dark:text-zinc-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
                    </svg>
                    <p className="text-[10px] font-bold uppercase tracking-wider">Sin prospectos registrados</p>
                    <p className="text-[9px] mt-0.5 font-medium leading-relaxed">Los leads de clientes interesados se listaran aquí de manera automática.</p>
                  </div>
                ) : (
                  <div className="max-h-[420px] overflow-y-auto space-y-3.5 pr-1">
                    {leads.map(lead => (
                      /* Dossier styled card for leads */
                      <div key={lead.id} className="p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-850 rounded-2xl flex flex-col gap-2.5 hover:shadow-md transition-all text-left animate-fadeIn">
                        <div className="flex justify-between items-start gap-2">
                          <div>
                            <strong className="text-xs text-zinc-900 dark:text-zinc-100 block font-black leading-tight">{lead.nombreUsuario}</strong>
                            <span className="text-[10px] text-[#2E7D43] dark:text-[#8EF0B5] font-bold mt-0.5 block">{lead.telefonoUsuario}</span>
                          </div>
                          <span className="text-[8px] text-zinc-400 dark:text-zinc-500 font-black uppercase self-start">
                            {new Date(lead.creadoEn).toLocaleDateString()}
                          </span>
                        </div>
                        
                        <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl p-2.5 text-[10px] text-zinc-650 dark:text-zinc-350 leading-relaxed font-semibold">
                          <span className="text-zinc-400 dark:text-zinc-500 block text-[8px] font-black uppercase mb-0.5">Mensaje del cliente:</span>
                          "{lead.mensaje}"
                        </div>
                        
                        <div className="flex justify-between items-center text-[9px] font-bold text-zinc-500 mt-0.5">
                          <span className="truncate max-w-[170px] text-zinc-400 dark:text-zinc-550 font-bold">
                            Inmueble: <strong className="text-zinc-700 dark:text-zinc-300 font-semibold">{lead.propertyTitulo}</strong>
                          </span>
                          <span className="text-[#2E7D43] dark:text-[#8EF0B5] font-black shrink-0">${lead.propertyPrecio}</span>
                        </div>

                        {/* Direct WhatsApp Call to Action (Bolivia 591 formatting, no emojis) */}
                        <a
                          href={getWhatsappLink(lead)}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full mt-1.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] rounded-lg shadow-sm hover:shadow transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.197 1.45 4.817 1.451 5.485 0 9.948-4.461 9.951-9.946.002-2.657-1.018-5.155-2.871-7.012A9.85 9.85 0 0012.008 1.94c-5.49 0-9.953 4.463-9.957 9.95a9.917 9.917 0 001.488 5.176l-.992 3.626 3.712-.974v.001zm10.37-6.985c-.276-.138-1.63-.804-1.882-.897-.252-.092-.436-.139-.62.138-.184.277-.713.897-.874 1.082-.16.185-.322.208-.598.069-.276-.138-1.166-.43-2.22-1.37-1.164-1.037-1.378-1.536-1.562-1.813-.184-.277-.02-.427.118-.564.124-.124.276-.323.414-.485.138-.162.184-.277.276-.462.092-.185.046-.347-.023-.485-.069-.138-.62-1.493-.85-2.047-.224-.54-.47-.466-.62-.474-.15-.007-.321-.008-.492-.008-.17 0-.448.064-.683.315-.236.251-.898.878-.898 2.141 0 1.263.92 2.483 1.047 2.651.127.168 1.808 2.761 4.38 3.869.61.264 1.087.42 1.46.54.614.195 1.173.167 1.615.101.493-.073 1.63-.666 1.86-1.31.23-.643.23-1.196.16-1.31-.07-.113-.252-.18-.528-.318z"/>
                          </svg>
                          <span>Contactar por Whatsapp</span>
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT: SCRAPER */}
            {activeSubTab === 'scraper' && (
              <div className="flex flex-col gap-4 text-left animate-fadeIn">
                
                {/* Steps indicator scraper */}
                <div className="flex items-center justify-between text-[8px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider border-b border-zinc-100 dark:border-zinc-800/60 pb-3 mb-1">
                  <span>Paso 1: Fuente</span>
                  <span>-</span>
                  <span>Paso 2: Pegar Enlace</span>
                  <span>-</span>
                  <span>Paso 3: Extraer</span>
                </div>

                <p className="text-zinc-400 dark:text-zinc-550 text-[11px] font-semibold leading-relaxed">
                  Configure e inicie el importador automatico de redes sociales. La Inteligencia Artificial visitara el listado, estructurara la informacion comercial y la guardara en el RAG.
                </p>

                <form onSubmit={handleRunImport} className="flex flex-col gap-3.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-850 p-4 rounded-2xl">
                  <div>
                    <label className="block text-[8px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider mb-1">Fuente Inmobiliaria</label>
                    <select
                      value={importSourceId}
                      onChange={(e) => setImportSourceId(Number(e.target.value))}
                      className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-2 rounded-lg text-xs font-semibold text-zinc-700 dark:text-zinc-300 outline-none"
                    >
                      <option value="1">Facebook Marketplace Santa Cruz</option>
                      <option value="2">WhatsApp Inmobiliario de Grupos</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-[1.5fr_0.5fr] gap-2">
                    <div>
                      <label className="block text-[8px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider mb-1">URL de Scraping</label>
                      <input
                        type="text"
                        value={importUrl}
                        onChange={(e) => setImportUrl(e.target.value)}
                        className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-2 rounded-lg text-xs font-semibold text-zinc-800 dark:text-zinc-200 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[8px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider mb-1">Limite</label>
                      <input
                        type="number"
                        value={importLimit}
                        onChange={(e) => setImportLimit(e.target.value)}
                        className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-2 rounded-lg text-xs font-semibold text-zinc-800 dark:text-zinc-200 outline-none text-center"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isImporting}
                    className="w-full mt-1.5 py-3 bg-[#2E7D43] hover:bg-[#2E7D43]/90 text-white font-bold text-xs rounded-xl shadow cursor-pointer transition-all disabled:opacity-50"
                  >
                    {isImporting ? 'Ejecutando Scraper IA...' : 'Ejecutar Importador IA'}
                  </button>
                </form>

                {/* Import log feed */}
                <div>
                  <span className="text-[9px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider block mb-2.5 px-1">Historial de Scraping:</span>
                  <div className="space-y-2 max-h-[170px] overflow-y-auto pr-1">
                    {(!imports || imports.length === 0) ? (
                      <span className="text-zinc-400 dark:text-zinc-500 text-[10px] italic p-2.5 block text-center bg-zinc-50 dark:bg-zinc-950/20 border border-dashed border-zinc-250 dark:border-zinc-850 rounded-xl">No hay importaciones registradas.</span>
                    ) : (
                      imports.map(imp => (
                        <div key={imp.id} className="p-3 bg-zinc-50 dark:bg-zinc-950/30 border border-zinc-200/50 dark:border-zinc-850 rounded-xl flex justify-between items-center text-[10px] hover:shadow-inner transition-all">
                          <div>
                            <strong className="text-zinc-800 dark:text-zinc-200 block leading-tight">{imp.fuente}</strong>
                            <span className="text-zinc-400 dark:text-zinc-550 text-[9px] font-semibold mt-0.5 block">{new Date(imp.fecha).toLocaleString()}</span>
                          </div>
                          <div className="text-right font-bold shrink-0">
                            <span className="text-[#2E7D43] dark:text-[#8EF0B5] block">+{imp.totalImportados} importados</span>
                            <span className="text-rose-500 text-[8px]">-{imp.totalFallidos} fallidos</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  )
}

export default AdminTab
