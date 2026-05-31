import PropertyCard from '../components/PropertyCard'

function ExploreTab({
  properties,
  zones,
  filters,
  handleFilterChange,
  resetFilters,
  exploreLoading,
  selectedForComparison,
  toggleComparison,
  triggerAIComparison,
  openDetailModal
}) {
  return (
    <div className="flex flex-col gap-6 py-4 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-zinc-900">Directorio de Espacios</h1>
          <p className="text-zinc-500 text-sm mt-1 font-medium">Explora la oferta inmobiliaria industrial, logística y residencial de Santa Cruz con filtros avanzados.</p>
        </div>
        <div className="grid grid-cols-1 sm:flex gap-2.5 w-full md:w-auto">
          <button
            onClick={resetFilters}
            className="px-4 py-2 border border-zinc-200/80 rounded-2xl bg-white hover:bg-zinc-50 text-zinc-600 text-xs font-bold shadow-sm transition-colors cursor-pointer"
          >
            Limpiar Filtros
          </button>
          {selectedForComparison.length >= 2 && (
            <button
              onClick={triggerAIComparison}
              className="px-5 py-2 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white text-xs font-bold rounded-2xl shadow-md transition-all duration-300 active:scale-95 flex items-center gap-1.5 cursor-pointer"
            >
              <span>Comparar Selección ({selectedForComparison.length})</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Traditional Filters */}
      <div className="flex flex-col gap-4 p-4 sm:p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          <div>
            <label className="block text-[10px] text-zinc-400 dark:text-zinc-500 uppercase font-black tracking-wider mb-1.5">Tipo de Contrato</label>
            <div className="flex gap-1 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-1 rounded-xl h-10 w-full">
              {[
                { key: 'ALQUILER', label: 'Alquiler' },
                { key: 'ANTICRETICO', label: 'Anticrético' },
                { key: 'VENTA', label: 'Venta' }
              ].map(t => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => {
                    handleFilterChange({ target: { name: 'transactionType', value: t.key } })
                  }}
                  className={`flex-1 rounded-lg text-[9px] font-black uppercase tracking-tighter transition-all duration-200 cursor-pointer ${
                    (filters.transactionType || 'ALQUILER') === t.key
                      ? 'bg-[#2E7D43] text-white shadow-sm'
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-150 dark:hover:bg-zinc-700'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[10px] text-zinc-400 uppercase font-black tracking-wider mb-1.5">Zona de Santa Cruz</label>
            <select
              name="zone"
              value={filters.zone}
              onChange={handleFilterChange}
              className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-2.5 rounded-xl text-xs font-semibold text-zinc-700 dark:text-zinc-300 outline-none focus:border-[#4FA75A]"
            >
              <option value="">Todas las zonas</option>
              {(Array.isArray(zones) ? zones : []).map((z, i) => (
                <option key={i} value={z}>{z}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] text-zinc-400 uppercase font-black tracking-wider mb-1.5">Presupuesto Máx (USD)</label>
            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              placeholder="Ej. 1000"
              className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-2.5 rounded-xl text-xs font-semibold text-zinc-700 dark:text-zinc-300 outline-none focus:border-[#4FA75A]"
            />
          </div>

          <div>
            <label className="block text-[10px] text-zinc-400 uppercase font-black tracking-wider mb-1.5">Tipo de Espacio</label>
            <select
              name="propertyType"
              value={filters.propertyType}
              onChange={handleFilterChange}
              className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-2.5 rounded-xl text-xs font-semibold text-zinc-700 dark:text-zinc-300 outline-none focus:border-[#4FA75A]"
            >
              <option value="">Cualquiera</option>
              <option value="LOCAL_COMERCIAL">Local Comercial</option>
              <option value="GALPON">Depósito / Galpón</option>
              <option value="TALLER">Taller Operativo</option>
              <option value="OFICINA">Oficina Empresarial</option>
              <option value="DEPARTAMENTO">Departamento Residencial</option>
              <option value="CASA">Casa</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] text-zinc-400 uppercase font-black tracking-wider mb-1.5">Giro / Uso del Espacio</label>
            <select
              name="usageType"
              value={filters.usageType}
              onChange={handleFilterChange}
              className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-2.5 rounded-xl text-xs font-semibold text-zinc-700 dark:text-zinc-300 outline-none focus:border-[#4FA75A]"
            >
              <option value="">Cualquiera</option>
              <option value="COMERCIAL">Comercial</option>
              <option value="INDUSTRIAL">Industrial</option>
              <option value="LOGISTICO">Logístico</option>
              <option value="RESIDENCIAL">Residencial / Habitación</option>
              <option value="OFICINA">Oficina / Corporativo</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] text-zinc-400 uppercase font-black tracking-wider mb-1.5">Mínimo Área (m²)</label>
            <input
              type="number"
              name="minAreaM2"
              value={filters.minAreaM2}
              onChange={handleFilterChange}
              placeholder="Ej. 100"
              className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-2.5 rounded-xl text-xs font-semibold text-zinc-700 dark:text-zinc-300 outline-none focus:border-[#4FA75A]"
            />
          </div>
        </div>

        {/* Boolean toggle switches styled as pills */}
        <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-zinc-100 dark:border-zinc-800">
          <span className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase font-black tracking-wider">Filtros Operativos:</span>
          
          <label className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer select-none ${
            filters.hasGarage 
              ? 'bg-[#2E7D43] text-white border-[#2E7D43] shadow-sm' 
              : 'bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-[#4FA75A]/40'
          }`}>
            <input
              type="checkbox"
              name="hasGarage"
              checked={filters.hasGarage}
              onChange={handleFilterChange}
              className="sr-only"
            />
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
            </svg>
            <span>Con Parqueo</span>
          </label>

          <label className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer select-none ${
            filters.petsAllowed 
              ? 'bg-[#2E7D43] text-white border-[#2E7D43] shadow-sm' 
              : 'bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-[#4FA75A]/40'
          }`}>
            <input
              type="checkbox"
              name="petsAllowed"
              checked={filters.petsAllowed}
              onChange={handleFilterChange}
              className="sr-only"
            />
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>Mascotas Permitidas</span>
          </label>
        </div>
      </div>

      {/* Properties Grid */}
      {exploreLoading ? (
        <div className="flex flex-col items-center py-20 gap-4">
          <span className="w-10 h-10 border-4 border-[#2E7D43] border-t-transparent rounded-full animate-spin"></span>
          <p className="text-zinc-500 text-sm font-semibold">Cargando propiedades...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-2">
          {properties.length === 0 ? (
            <div className="col-span-1 md:col-span-3 text-center py-16 bg-white border border-zinc-200 rounded-3xl">
              <p className="text-zinc-500 text-sm font-semibold">No se encontraron propiedades con los filtros seleccionados.</p>
              <p className="text-zinc-400 text-xs mt-1">Intenta restablecer los filtros para ver el catálogo completo.</p>
            </div>
          ) : (
            (Array.isArray(properties) ? properties : []).map(property => (
              <PropertyCard
                key={property.id}
                property={property}
                isSelectedForComparison={Array.isArray(selectedForComparison) ? selectedForComparison.some(p => p.id === property.id) : false}
                onToggleComparison={toggleComparison}
                onOpenDetail={openDetailModal}
              />
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default ExploreTab
