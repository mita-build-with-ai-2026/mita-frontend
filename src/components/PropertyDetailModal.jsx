import { useState, useRef } from 'react'
import { createLead } from '../api'
import { getPropertyImages } from './imageHelper'

function PropertyDetailModal({ property, onClose }) {
  const contactName = property?.nombreContacto || 'Agente';
  
  const [leadName, setLeadName] = useState('')
  const [leadPhone, setLeadPhone] = useState('59178012345')
  const [leadMessage, setLeadMessage] = useState(() => (
    property
      ? `Hola ${contactName}, vi tu publicacion del espacio "${property.titulo}" en Mita AI. Me interesa agendar una visita tecnica para evaluar las condiciones operativas.`
      : ''
  ))
  const [leadSubmittedUrl, setLeadSubmittedUrl] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef(null)

  if (!property) return null

  const submitLead = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    createLead({
      propertyId: property.id,
      origen: 'WHATSAPP_CLICK',
      nombreUsuario: leadName,
      telefonoUsuario: leadPhone,
      mensaje: leadMessage || `Hola, vi el espacio "${property.titulo}" en Mita AI y quisiera solicitar mas informacion.`
    })
      .then(res => {
        setLeadSubmittedUrl(res.lead.urlWhatsapp)
        setIsSubmitting(false)
        if (res.lead.urlWhatsapp) {
          const newTab = window.open(res.lead.urlWhatsapp, '_blank')
          if (!newTab || newTab.closed || typeof newTab.closed === 'undefined') {
            window.location.href = res.lead.urlWhatsapp
          }
        }
      })
      .catch(err => {
        console.error(err)
        setIsSubmitting(false)
        alert('Error al registrar lead.')
      })
  }

  // Focus the form on click contactar
  const handleFocusForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const firstInput = formRef.current.querySelector('input');
      if (firstInput) firstInput.focus();
    }
  }

  const aptoParaList = Array.isArray(property.aptoPara) ? property.aptoPara : [];
  const requisitosFaltantesList = Array.isArray(property.requisitosFaltantes) ? property.requisitosFaltantes : [];
  const images = getPropertyImages(property);

  return (
    <div className="w-full max-w-5xl mx-auto py-2 animate-fadeIn text-zinc-900 dark:text-zinc-100">
      <div className="bg-white dark:bg-zinc-950 rounded-3xl overflow-hidden shadow-md border border-zinc-200 dark:border-zinc-800 flex flex-col">
        
        {/* Modal Top Header (Breadcrumbs + Close) */}
        <div className="px-6 py-3 border-b border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider">
            <span>Inicio</span>
            <span>/</span>
            <span>Alquileres</span>
            <span>/</span>
            <span className="text-[#2E7D43] dark:text-[#8EF0B5]">{property.zona || 'Santa Cruz'}</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-500 dark:text-zinc-400 rounded-full flex items-center justify-center transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        {/* Title and Address Area */}
        <div className="px-6 pt-4 pb-2 shrink-0 text-left">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-550 leading-tight tracking-tight">
            {property.titulo}
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{property.direccionTexto ? `${property.direccionTexto} (${property.zona})` : property.zona || 'Zona no especificada'}, Santa Cruz, Bolivia</span>
            </p>
            {property.latitud && property.longitud && (
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${property.latitud},${property.longitud}`}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[#2E7D43] dark:text-[#8EF0B5] hover:underline font-black flex items-center gap-1"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span>Ver en Google Maps</span>
              </a>
            )}
          </div>
        </div>

        {/* Photo Collage Grid (Roomix 5-photo style) */}
        <div className="px-6 py-2 shrink-0 select-none">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-44 sm:h-56 md:h-[260px] rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900">
            {/* Main large left image */}
            <div className="md:col-span-2 md:row-span-2 h-full w-full overflow-hidden bg-zinc-200 dark:bg-zinc-800">
              <img
                src={images[0]}
                alt="Principal"
                className="w-full h-full object-cover hover:scale-102 transition-transform duration-300"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = getPropertyImage({ ...property, urlImagen: null });
                }}
              />
            </div>
            {/* Top row right 2 images */}
            <div className="hidden md:block h-full w-full overflow-hidden bg-zinc-200 dark:bg-zinc-800">
              <img
                src={images[1]}
                alt="Detalle 1"
                className="w-full h-full object-cover hover:scale-102 transition-transform duration-300"
              />
            </div>
            <div className="hidden md:block h-full w-full overflow-hidden bg-zinc-200 dark:bg-zinc-800">
              <img
                src={images[2]}
                alt="Detalle 2"
                className="w-full h-full object-cover hover:scale-102 transition-transform duration-300"
              />
            </div>
            {/* Bottom row right 2 images */}
            <div className="hidden md:block h-full w-full overflow-hidden bg-zinc-200 dark:bg-zinc-800">
              <img
                src={images[3]}
                alt="Detalle 3"
                className="w-full h-full object-cover hover:scale-102 transition-transform duration-300"
              />
            </div>
            <div className="hidden md:block h-full w-full overflow-hidden bg-zinc-200 dark:bg-zinc-800 relative">
              <img
                src={images[4]}
                alt="Detalle 4"
                className="w-full h-full object-cover hover:scale-102 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 backdrop-blur-xs flex flex-col items-center justify-center text-white cursor-pointer select-none">
                <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <span className="text-[9px] font-black uppercase tracking-wider">Ver mas fotos</span>
              </div>
            </div>
          </div>
        </div>

        {/* Roomix Sticky Action Bar (Price + Action buttons) */}
        <div className="px-6 py-4 bg-zinc-50/50 dark:bg-zinc-900/50 border-y border-zinc-100 dark:border-zinc-800/80 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 shrink-0">
          <div className="flex items-baseline gap-1.5 text-left">
            <span className="text-2xl font-black text-zinc-900 dark:text-zinc-50 leading-none">
              {property.precio && Number(property.precio) > 0 ? `$${property.precio}` : 'Consultar'}
            </span>
            <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider">
              {property.moneda || 'USD'} / mes (Alquiler)
            </span>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={handleFocusForm}
              className="flex-grow sm:flex-grow-0 px-6 py-2.5 bg-[#2E7D43] hover:bg-[#2E7D43]/90 text-white font-bold text-xs rounded-xl shadow-sm hover:shadow transition-all cursor-pointer text-center flex items-center justify-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span>Contactar Agente</span>
            </button>
            
            <div className="px-3 py-2.5 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-[10px] font-black text-zinc-650 dark:text-zinc-350 uppercase flex items-center justify-center">
              {property.tipoPropiedad || 'Inmueble'}
            </div>
          </div>
        </div>

        {/* Two Column Content Area */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 text-left">
          
          {/* LEFT COLUMN: SPECS + DESCRIPTION */}
          <div className="flex flex-col gap-6">
            
            {/* Tech Specs Icon Grid (Roomix style) */}
            <div>
              <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-black uppercase tracking-wider block mb-3">Especificaciones Tecnicas</span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-200/40 dark:border-zinc-850 p-4.5 rounded-2xl">
                {/* Spec 1: Tipo */}
                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-500 shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-[8px] text-zinc-400 dark:text-zinc-500 font-bold uppercase">Tipo</span>
                    <strong className="text-xs text-zinc-850 dark:text-zinc-250 font-black capitalize leading-none block mt-0.5">{property.tipoPropiedad?.replace('_', ' ') || 'Inmueble'}</strong>
                  </div>
                </div>

                {/* Spec 2: Area */}
                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-500 shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-[8px] text-zinc-400 dark:text-zinc-500 font-bold uppercase">Superficie</span>
                    <strong className="text-xs text-zinc-850 dark:text-zinc-250 font-black leading-none block mt-0.5">{property.areaM2 ? `${property.areaM2} m²` : '-- m²'}</strong>
                  </div>
                </div>

                {/* Spec 3: Banos */}
                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-500 shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l1.5-1.5L6 7h12l1.5-1.5L21 7M4 10v7a2 2 0 002 2h12a2 2 0 002-2v-7" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-[8px] text-zinc-400 dark:text-zinc-500 font-bold uppercase">Banos Privados</span>
                    <strong className="text-xs text-zinc-850 dark:text-zinc-250 font-black leading-none block mt-0.5">{property.caracteristicasOperativas?.banos || property.cantidadBanos || 'No especificado'}</strong>
                  </div>
                </div>

                {/* Spec 4: Energia Trifasica */}
                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-500 shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-[8px] text-zinc-400 dark:text-zinc-500 font-bold uppercase">Luz Trifasica</span>
                    <strong className="text-xs text-zinc-850 dark:text-zinc-250 font-black leading-none block mt-0.5">{property.caracteristicasOperativas?.energiaTrifasica ? 'Instalada' : 'Monofasica'}</strong>
                  </div>
                </div>

                {/* Spec 5: Acceso Camiones */}
                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-500 shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0zM13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 011 1v.5M19 16h1.5a1.5 1.5 0 001.5-1.5v-3.5L20 9.5a1.5 1.5 0 00-1.2-.6H13" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-[8px] text-zinc-400 dark:text-zinc-500 font-bold uppercase">Acceso Camion</span>
                    <strong className="text-xs text-zinc-850 dark:text-zinc-250 font-black leading-none block mt-0.5">{property.caracteristicasOperativas?.accesoCamion ? 'Apto' : 'No especificado'}</strong>
                  </div>
                </div>

                {/* Spec 6: Sobre Avenida */}
                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-500 shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-[8px] text-zinc-400 dark:text-zinc-500 font-bold uppercase">Sobre Avenida</span>
                    <strong className="text-xs text-zinc-850 dark:text-zinc-250 font-black leading-none block mt-0.5">{property.caracteristicasOperativas?.sobreAvenida ? 'Si' : 'No'}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Condiciones del Alquiler */}
            <div className="border-t border-zinc-100 dark:border-zinc-800/80 pt-5">
              <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-black uppercase tracking-wider block mb-3.5">Condiciones del Alquiler</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-200/40 dark:border-zinc-850 p-4.5 rounded-2xl">
                <div>
                  <span className="text-[8px] text-zinc-400 dark:text-zinc-500 font-black uppercase tracking-wider block mb-2">Giro ideal comercial</span>
                  <div className="flex flex-wrap gap-1.5">
                    {aptoParaList.length === 0 ? (
                      <span className="text-xs text-zinc-400 dark:text-zinc-500 font-semibold italic">Giro libre comercial</span>
                    ) : (
                      aptoParaList.map((ap, i) => (
                        <span key={i} className="text-[10px] bg-[#4FA75A]/10 dark:bg-[#4FA75A]/20 text-[#2E7D43] dark:text-[#8EF0B5] font-black px-2.5 py-1 rounded-lg border border-[#4FA75A]/20 dark:border-[#4FA75A]/10 uppercase">
                          {ap}
                        </span>
                      ))
                    )}
                  </div>
                </div>
                <div>
                  <span className="text-[8px] text-rose-500 dark:text-rose-400 font-black uppercase tracking-wider block mb-2">Informacion Faltante (IA Alert)</span>
                  <ul className="space-y-1.5 pl-4 list-disc text-zinc-550 dark:text-zinc-400 text-[11px] font-semibold leading-relaxed">
                    {requisitosFaltantesList.length === 0 ? (
                      <li className="list-none text-zinc-400 dark:text-zinc-500 italic pl-0">Toda la informacion confirmada</li>
                    ) : (
                      requisitosFaltantesList.map((req, i) => (
                        <li key={i}>{req}</li>
                      ))
                    )}
                  </ul>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="border-t border-zinc-100 dark:border-zinc-800/80 pt-5">
              <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-black uppercase tracking-wider block mb-2">Descripcion del Inmueble</span>
              <p className="text-zinc-650 dark:text-zinc-350 text-xs leading-relaxed font-semibold bg-zinc-50/20 dark:bg-zinc-950/20 p-4 rounded-xl border border-zinc-100 dark:border-zinc-850">
                {property.descripcion || 'Sin descripcion disponible.'}
              </p>
            </div>

          </div>

          {/* RIGHT COLUMN: WHATSAPP LEAD DRAWER */}
          <div className="flex flex-col gap-4">
            <div ref={formRef} className="p-5 bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200/50 dark:border-zinc-850 rounded-2xl flex flex-col gap-3.5 shadow-xs sticky top-4">
              <div>
                <span className="text-[10px] text-[#2E7D43] dark:text-[#8EF0B5] font-black uppercase tracking-wider block">Agendar visita comercial</span>
                <p className="text-[9px] text-zinc-400 dark:text-zinc-500 font-semibold leading-relaxed mt-0.5">
                  Complete los datos abajo. La IA notificara al agente y preparara la conversacion de WhatsApp.
                </p>
              </div>

              <form onSubmit={submitLead} className="flex flex-col gap-3">
                <div className="flex flex-col gap-3">
                  <div>
                    <label className="block text-[8px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider mb-1 px-1">Nombre Completo</label>
                    <input
                      type="text"
                      placeholder="Ej. Daniel Perez"
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      required
                      className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-2.5 rounded-xl text-xs font-semibold text-zinc-800 dark:text-zinc-200 outline-none focus:border-[#4FA75A] dark:focus:border-[#8EF0B5]"
                    />
                  </div>
                  <div>
                    <label className="block text-[8px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider mb-1 px-1">WhatsApp de Contacto</label>
                    <input
                      type="text"
                      placeholder="Ej. 59178012345"
                      value={leadPhone}
                      onChange={(e) => setLeadPhone(e.target.value)}
                      required
                      className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-2.5 rounded-xl text-xs font-semibold text-zinc-800 dark:text-zinc-200 outline-none focus:border-[#4FA75A] dark:focus:border-[#8EF0B5]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[8px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider mb-1 px-1">Mensaje de Propuesta</label>
                  <textarea
                    rows="3"
                    placeholder="Escriba su propuesta o mensaje..."
                    value={leadMessage}
                    onChange={(e) => setLeadMessage(e.target.value)}
                    className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-2.5 rounded-xl text-xs font-semibold text-zinc-800 dark:text-zinc-200 outline-none focus:border-[#4FA75A] dark:focus:border-[#8EF0B5] resize-none leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-[#4FA75A] hover:bg-[#2E7D43] text-white font-bold text-xs rounded-xl shadow-md transition-colors cursor-pointer text-center flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    'Enviar Mensaje & Abrir Whatsapp'
                  )}
                </button>
              </form>

              {leadSubmittedUrl && (
                <p className="text-[9px] text-emerald-600 dark:text-emerald-400 font-bold text-center mt-1 leading-relaxed">
                  Lead registrado. Si WhatsApp no se abrio automaticamente, <a href={leadSubmittedUrl} target="_blank" rel="noreferrer" className="underline text-emerald-700 dark:text-emerald-400 font-black">haga clic aqui</a>.
                </p>
              )}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-zinc-50 dark:bg-zinc-900/80 border-t border-zinc-100 dark:border-zinc-800/80 text-center text-[9px] text-zinc-400 dark:text-zinc-500 font-semibold uppercase flex flex-col sm:flex-row justify-between items-center gap-1 px-6 shrink-0">
          <span>Publicado por Agente: {contactName}</span>
          <span>ID Ficha: {property.id}</span>
        </div>

      </div>
    </div>
  )
}

export default PropertyDetailModal
