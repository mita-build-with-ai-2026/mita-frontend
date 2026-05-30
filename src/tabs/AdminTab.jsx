function AdminTab({
  isAdminLoggedIn,
  adminUser,
  loginEmail,
  setLoginEmail,
  loginPassword,
  setLoginPassword,
  loginError,
  handleAdminLogin,
  handleAdminLogout,
  leads,
  imports,
  importUrl,
  setImportUrl,
  importLimit,
  setImportLimit,
  isImporting,
  handleRunImport,
  triggerReindex,
  ragStatus
}) {
  return (
    <div className="flex flex-col gap-6 py-4 animate-fadeIn">
      {!isAdminLoggedIn ? (
        // Login form
        <div className="max-w-md mx-auto w-full bg-white border border-zinc-200/80 p-6 md:p-8 rounded-3xl shadow-xl">
          <div className="text-center mb-6">
            <div className="w-10 h-10 mx-auto grid place-items-center rounded-xl bg-gradient-to-br from-[#2E7D43] to-[#4FA75A] text-white font-black text-lg mb-3">
              M
            </div>
            <h2 className="text-2xl font-black tracking-tight text-zinc-900">Ingreso Administrativo</h2>
            <p className="text-zinc-500 text-xs mt-1 font-medium">Accede a las herramientas de scraping, leads y reindexación de Mita.</p>
          </div>

          <form onSubmit={handleAdminLogin} className="flex flex-col gap-4">
            <div>
              <label className="block text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-1.5">Correo Electrónico</label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
                className="w-full bg-zinc-50 border border-zinc-200 p-3 rounded-xl text-xs font-semibold text-zinc-800 outline-none focus:border-[#4FA75A]"
              />
            </div>
            <div>
              <label className="block text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-1.5">Contraseña</label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
                className="w-full bg-zinc-50 border border-zinc-200 p-3 rounded-xl text-xs font-semibold text-zinc-800 outline-none focus:border-[#4FA75A]"
              />
            </div>

            {loginError && (
              <div className="text-xs text-rose-500 font-semibold p-2 bg-rose-50 border border-rose-100 rounded-lg animate-shake">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-[#2E7D43] hover:bg-[#2E7D43]/90 text-white font-bold text-xs rounded-xl shadow-md mt-2 transition-all cursor-pointer active:scale-95"
            >
              Ingresar Consola
            </button>
            <p className="text-[9px] text-zinc-400 text-center leading-relaxed">
              Credenciales demo del hackathon: <strong className="text-zinc-600">admin@mita.ai</strong> / <strong className="text-zinc-600">admin123</strong>
            </p>
          </form>
        </div>
      ) : (
        // Admin dashboard panel
        <div className="flex flex-col gap-6">
          
          {/* Header row */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 bg-white border border-zinc-200/80 rounded-3xl shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 grid place-items-center rounded-xl bg-zinc-900 text-white font-bold text-base">
                A
              </div>
              <div>
                <h2 className="text-lg font-black text-zinc-900">Consola de Administración</h2>
                <p className="text-xs text-zinc-500 font-medium">Operador: <strong className="text-zinc-800">{adminUser?.nombre || 'Administrador'}</strong> ({adminUser?.rol})</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:flex gap-2 w-full lg:w-auto">
              <button
                type="button"
                onClick={triggerReindex}
                className="px-4 py-2 border border-zinc-200/80 hover:border-[#4FA75A]/40 hover:bg-[#4FA75A]/5 text-zinc-700 hover:text-[#2E7D43] text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Regenerar RAG Vectors
              </button>
              <button
                type="button"
                onClick={handleAdminLogout}
                className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>

          {ragStatus && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-2xl animate-pulse">
              🛠️ {ragStatus}
            </div>
          )}

          {/* Dashboard stats / grids */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 items-start">
            
            {/* Scraper / Run scraper */}
            <div className="lg:col-span-1 bg-white border border-zinc-200/80 p-5 rounded-3xl shadow-sm flex flex-col gap-4">
              <h3 className="text-sm font-bold text-zinc-800 uppercase tracking-wider">Simular Scraper / Importador</h3>
              
              <form onSubmit={handleRunImport} className="flex flex-col gap-3">
                <div>
                  <label className="block text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-1">Fuente Demo</label>
                  <select className="w-full bg-zinc-50 border border-zinc-200 p-2.5 rounded-xl text-xs font-semibold text-zinc-700 outline-none">
                    <option value="1">Facebook Marketplace Santa Cruz</option>
                    <option value="2">WhatsApp Inmobiliario de Grupos</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-1">URL de scraping</label>
                  <input
                    type="text"
                    value={importUrl}
                    onChange={(e) => setImportUrl(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 p-2.5 rounded-xl text-xs font-semibold text-zinc-800 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-1">Límite de propiedades</label>
                  <input
                    type="number"
                    value={importLimit}
                    onChange={(e) => setImportLimit(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 p-2.5 rounded-xl text-xs font-semibold text-zinc-800 outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isImporting}
                  className="w-full mt-2 py-3 bg-[#2E7D43] hover:bg-[#2E7D43]/90 text-white font-bold text-xs rounded-xl shadow cursor-pointer transition-all active:scale-95 disabled:opacity-50 font-semibold"
                >
                  {isImporting ? 'Ejecutando importación...' : 'Ejecutar Scraper IA'}
                </button>
              </form>

              {/* Import history table */}
              <div className="mt-4 pt-4 border-t border-zinc-100">
                <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block mb-2">Historial de importación:</span>
                <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
                  {imports.map(imp => (
                    <div key={imp.id} className="p-3 bg-zinc-50 border border-zinc-200/50 rounded-xl flex justify-between items-center text-[11px]">
                      <div>
                        <strong className="text-zinc-800 block">{imp.fuente}</strong>
                        <span className="text-zinc-400 text-[10px]">{new Date(imp.fecha).toLocaleString()}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[#2E7D43] font-bold block">+{imp.totalImportados}</span>
                        <span className="text-rose-500 text-[9px]">-{imp.totalFallidos} fallidos</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Registered Leads Monitor */}
            <div className="lg:col-span-2 bg-white border border-zinc-200/80 p-5 md:p-6 rounded-3xl shadow-sm min-w-0">
              <h3 className="text-sm font-bold text-zinc-800 uppercase tracking-wider mb-4">Monitor de Leads de Contacto (WhatsApp)</h3>
              
              {leads.length === 0 ? (
                <div className="text-center py-12 text-zinc-400">
                  <svg className="w-10 h-10 mx-auto mb-2 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
                  </svg>
                  <p className="text-xs font-bold uppercase tracking-wider">Sin leads registrados</p>
                  <p className="text-[10px] mt-1">Los contactos de WhatsApp simulados se reportarán aquí en tiempo real.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-zinc-100">
                        <th className="pb-2.5 text-[9px] text-zinc-400 font-bold uppercase tracking-wider">Interesado</th>
                        <th className="pb-2.5 text-[9px] text-zinc-400 font-bold uppercase tracking-wider">Espacio</th>
                        <th className="pb-2.5 text-[9px] text-zinc-400 font-bold uppercase tracking-wider">Mensaje</th>
                        <th className="pb-2.5 text-[9px] text-zinc-400 font-bold uppercase tracking-wider">Fecha</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50">
                      {leads.map(lead => (
                        <tr key={lead.id} className="hover:bg-zinc-50/50 transition-colors">
                          <td className="py-3 text-xs font-semibold text-zinc-900">
                            {lead.nombreUsuario}
                            <span className="block text-[10px] text-zinc-400 font-semibold">{lead.telefonoUsuario}</span>
                          </td>
                          <td className="py-3 text-xs font-medium text-zinc-700">
                            <span className="block font-bold text-zinc-900 truncate max-w-[150px]">{lead.propertyTitulo}</span>
                            <span className="text-[10px] text-[#2E7D43] font-semibold">{lead.propertyZona} • ${lead.propertyPrecio}</span>
                          </td>
                          <td className="py-3 text-[11px] text-zinc-500 font-semibold max-w-[200px] truncate" title={lead.mensaje}>
                            {lead.mensaje}
                          </td>
                          <td className="py-3 text-[10px] text-zinc-400 font-bold">
                            {new Date(lead.creadoEn).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>

        </div>
      )}
    </div>
  )
}

export default AdminTab
