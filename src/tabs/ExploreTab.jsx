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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 sm:p-5 rounded-3xl bg-white border border-zinc-200/80 shadow-md">
        <div>
          <label className="block text-[10px] text-zinc-400 uppercase font-black tracking-wider mb-1.5">Zona de Santa Cruz</label>
          <select
            name="zone"
            value={filters.zone}
            onChange={handleFilterChange}
            className="w-full bg-zinc-50 border border-zinc-200 p-2.5 rounded-xl text-xs font-semibold text-zinc-700 outline-none focus:border-[#4FA75A]"
          >
            <option value="">Todas las zonas</option>
            {zones.map((z, i) => (
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
            className="w-full bg-zinc-50 border border-zinc-200 p-2.5 rounded-xl text-xs font-semibold text-zinc-700 outline-none focus:border-[#4FA75A]"
          />
        </div>

        <div>
          <label className="block text-[10px] text-zinc-400 uppercase font-black tracking-wider mb-1.5">Tipo de Espacio</label>
          <select
            name="propertyType"
            value={filters.propertyType}
            onChange={handleFilterChange}
            className="w-full bg-zinc-50 border border-zinc-200 p-2.5 rounded-xl text-xs font-semibold text-zinc-700 outline-none focus:border-[#4FA75A]"
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
          <label className="block text-[10px] text-zinc-400 uppercase font-black tracking-wider mb-1.5">Mínimo Área (m²)</label>
          <input
            type="number"
            name="minAreaM2"
            value={filters.minAreaM2}
            onChange={handleFilterChange}
            placeholder="Ej. 100"
            className="w-full bg-zinc-50 border border-zinc-200 p-2.5 rounded-xl text-xs font-semibold text-zinc-700 outline-none focus:border-[#4FA75A]"
          />
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
            properties.map(property => (
              <PropertyCard
                key={property.id}
                property={property}
                isSelectedForComparison={selectedForComparison.some(p => p.id === property.id)}
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
