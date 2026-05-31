import { getPropertyImage } from './imageHelper'

function PropertyCard({ property, isSelectedForComparison, onToggleComparison, onOpenDetail }) {
  // Safe contact name extraction
  const contactName = property.nombreContacto 
    ? property.nombreContacto.split(' ')[0] 
    : 'Agente';

  return (
    <div
      className={`bg-white border border-zinc-200/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between ${
        isSelectedForComparison ? 'ring-2 ring-rose-500 border-rose-300' : ''
      }`}
    >
      <div>
        {/* Image Header */}
        <div className="h-44 relative bg-zinc-100">
          <img
            src={getPropertyImage(property)}
            alt={property.titulo}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = getPropertyImage({ ...property, urlImagen: null });
            }}
          />
          {/* Comparison Checkbox */}
          <button
            onClick={() => onToggleComparison(property)}
            className={`absolute top-3 right-3 w-8 h-8 rounded-full shadow-md flex items-center justify-center transition-transform hover:scale-105 active:scale-95 cursor-pointer ${
              isSelectedForComparison ? 'bg-rose-500 text-white' : 'bg-white text-zinc-400'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isSelectedForComparison ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path>
              )}
            </svg>
          </button>

          <div className="absolute bottom-3 left-3 bg-[#1C1F1D]/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-md border border-white/10 uppercase">
            {property.tipoPropiedad || 'Inmueble'}
          </div>
        </div>

        {/* Info Body */}
        <div className="p-5 sm:p-6">
          <div className="flex justify-between items-start gap-3 mb-3 min-w-0">
            <h3 className="font-black text-lg sm:text-xl text-zinc-900 dark:text-zinc-50 tracking-tight leading-snug line-clamp-2" title={property.titulo}>
              {property.titulo}
            </h3>
            <div className="text-right shrink-0">
              <span className="text-lg sm:text-xl font-black text-[#2E7D43] dark:text-[#8EF0B5] block leading-none">
                {property.precio && Number(property.precio) > 0 ? `$${property.precio}` : 'Consultar'}
              </span>
              <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold uppercase block mt-1.5 tracking-wider">
                {property.moneda || 'USD'} / mes (Alquiler)
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1 text-xs text-zinc-450 dark:text-zinc-500 font-bold mb-3.5 uppercase tracking-wider">
            <span className="truncate" title={property.direccionTexto || property.zona || 'No especificada'}>
              {property.direccionTexto ? `${property.direccionTexto} (${property.zona})` : property.zona || 'No especificada'}
            </span>
            <span>Superficie: {property.areaM2 ? `${property.areaM2} m²` : '-- m²'}</span>
          </div>

          <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed line-clamp-3 mb-4 font-medium">
            {property.descripcion || 'Sin descripción disponible.'}
          </p>

          {/* Apto Para */}
          {Array.isArray(property.aptoPara) && property.aptoPara.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-2">
              {property.aptoPara.slice(0, 3).map((ap, i) => (
                <span key={i} className="text-[11px] bg-[#4FA75A]/10 dark:bg-[#4FA75A]/20 text-[#2E7D43] dark:text-[#8EF0B5] font-bold px-3 py-1 rounded-xl border border-[#4FA75A]/15">
                  {ap}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer Row */}
      <div className="p-5 sm:p-6 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 bg-zinc-50/50 dark:bg-zinc-900/50">
        <span className="text-[11px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider truncate">
          Contacto: {contactName}
        </span>
        <button
          onClick={() => onOpenDetail(property)}
          className="px-5 py-2 bg-[#2E7D43] hover:bg-[#2E7D43]/90 text-white font-bold text-sm rounded-xl shadow-sm cursor-pointer transition-all duration-300"
        >
          Ver Ficha
        </button>
      </div>
    </div>
  )
}

export default PropertyCard
