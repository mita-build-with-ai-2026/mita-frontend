import React, { useState, useEffect } from 'react'
import { createLead } from '../api'

function PropertyDetailModal({ property, onClose }) {
  const [leadName, setLeadName] = useState('')
  const [leadPhone, setLeadPhone] = useState('59178012345')
  const [leadMessage, setLeadMessage] = useState('')
  const [leadSubmittedUrl, setLeadSubmittedUrl] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (property) {
      setLeadSubmittedUrl('')
      setLeadName('')
      setLeadMessage(`Hola ${property.nombreContacto}, vi tu publicación del espacio "${property.titulo}" en Mita AI. Me interesa agendar una visita técnica para evaluar las condiciones operativas.`)
    }
  }, [property])

  if (!property) return null

  const submitLead = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    createLead({
      propertyId: property.id,
      origen: 'WHATSAPP_CLICK',
      nombreUsuario: leadName,
      telefonoUsuario: leadPhone,
      mensaje: leadMessage || `Hola, vi el espacio "${property.titulo}" en Mita AI y quisiera solicitar más información.`
    })
      .then(res => {
        setLeadSubmittedUrl(res.lead.urlWhatsapp)
        setIsSubmitting(false)
        window.open(res.lead.urlWhatsapp, '_blank')
      })
      .catch(err => {
        console.error(err)
        setIsSubmitting(false)
        alert('Error al registrar lead.')
      })
  }

  return (
    <div className="fixed inset-0 bg-zinc-950/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white max-w-2xl w-full rounded-3xl overflow-hidden shadow-2xl border border-zinc-200 max-h-[90vh] flex flex-col">
        
        {/* Modal Header Image */}
        <div className="h-52 relative bg-zinc-100 flex-shrink-0">
          <img
            src={property.urlImagen}
            alt={property.titulo}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 bg-black/50 hover:bg-black/60 text-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>

          <div className="absolute bottom-4 left-4 bg-gradient-to-r from-zinc-900 to-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 text-xs font-bold text-white uppercase">
            {property.tipoPropiedad} • {property.tipoUsoEspacio}
          </div>
        </div>

        {/* Modal Content Scroll */}
        <div className="p-6 overflow-y-auto flex-grow flex flex-col gap-5">
          
          {/* Row 1: Title and Price */}
          <div className="flex justify-between items-start gap-4 pb-4 border-b border-zinc-100">
            <div>
              <h2 className="text-xl font-black text-zinc-900 leading-snug">{property.titulo}</h2>
              <div className="flex items-center gap-3 text-xs text-zinc-400 font-bold uppercase mt-1">
                <span>📍 {property.zona}</span>
                <span>•</span>
                <span>📐 {property.areaM2} m²</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-[#2E7D43] block leading-none">
                ${property.precio}
              </span>
              <span className="text-[10px] text-zinc-400 font-bold block uppercase mt-1">
                {property.moneda} / mes
              </span>
            </div>
          </div>

          {/* Row 2: Description */}
          <div>
            <span className="text-[10px] text-zinc-400 font-black uppercase tracking-wider block mb-1.5">Descripción completa:</span>
            <p className="text-zinc-600 text-xs leading-relaxed font-semibold">
              {property.descripcion}
            </p>
          </div>

          {/* Row 3: Technical operational traits */}
          <div>
            <span className="text-[10px] text-zinc-400 font-black uppercase tracking-wider block mb-2">Características Operativas (Ficha Técnica):</span>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-zinc-50 border border-zinc-200/50 p-4 rounded-2xl">
              <div>
                <span className="block text-[9px] text-zinc-400 font-bold uppercase">Luz Trifásica</span>
                <strong className="text-xs text-zinc-800 font-bold">{property.caracteristicasOperativas.energiaTrifasica ? 'Instalada' : 'Monofásica'}</strong>
              </div>
              <div>
                <span className="block text-[9px] text-zinc-400 font-bold uppercase">Acceso Camiones</span>
                <strong className="text-xs text-zinc-800 font-bold">{property.caracteristicasOperativas.accesoCamion ? 'Apto' : 'No apto'}</strong>
              </div>
              <div>
                <span className="block text-[9px] text-zinc-400 font-bold uppercase">Sobre Avenida</span>
                <strong className="text-xs text-zinc-800 font-bold">{property.caracteristicasOperativas.sobreAvenida ? 'Sí' : 'No'}</strong>
              </div>
              <div>
                <span className="block text-[9px] text-zinc-400 font-bold uppercase">Baños Privados</span>
                <strong className="text-xs text-zinc-800 font-bold">{property.caracteristicasOperativas.banos || property.cantidadBanos || 1}</strong>
              </div>
            </div>
          </div>

          {/* Row 4: Apto Para & Requisitos Faltantes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-[10px] text-zinc-400 font-black uppercase tracking-wider block mb-1.5">Giro ideal comercial:</span>
              <div className="flex flex-wrap gap-1.5">
                {property.aptoPara.map((ap, i) => (
                  <span key={i} className="text-xs bg-[#4FA75A]/10 text-[#2E7D43] font-bold px-2.5 py-1 rounded-lg border border-[#4FA75A]/20">
                    {ap}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <span className="text-[10px] text-rose-500 font-black uppercase tracking-wider block mb-1.5">Información faltante (IA Alert):</span>
              <ul className="space-y-1 pl-4 list-disc text-zinc-500 text-[11px] font-semibold leading-relaxed">
                {property.requisitosFaltantes.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Row 5: WhatsApp Lead Form */}
          <div className="p-4 bg-[#F8FAF8] border border-zinc-200/80 rounded-2xl mt-2">
            <span className="text-[10px] text-[#2E7D43] font-black uppercase tracking-wider block mb-2.5">Agendar visita o solicitar requisitos:</span>
            
            <form onSubmit={submitLead} className="flex flex-col gap-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Tu nombre completo"
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  required
                  className="bg-white border border-zinc-200 p-2.5 rounded-xl text-xs font-semibold text-zinc-800 outline-none focus:border-[#4FA75A]"
                />
                <input
                  type="text"
                  placeholder="Tu WhatsApp (ej. 59178012345)"
                  value={leadPhone}
                  onChange={(e) => setLeadPhone(e.target.value)}
                  required
                  className="bg-white border border-zinc-200 p-2.5 rounded-xl text-xs font-semibold text-zinc-800 outline-none focus:border-[#4FA75A]"
                />
              </div>
              <textarea
                rows="2"
                placeholder="Escribe tu mensaje..."
                value={leadMessage}
                onChange={(e) => setLeadMessage(e.target.value)}
                className="bg-white border border-zinc-200 p-2.5 rounded-xl text-xs font-semibold text-zinc-800 outline-none focus:border-[#4FA75A] resize-none"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="py-3 bg-[#4FA75A] hover:bg-[#2E7D43] text-white font-bold text-xs rounded-xl shadow-md transition-colors cursor-pointer text-center flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  'Enviar Mensaje Directo & Abrir WhatsApp'
                )}
              </button>
            </form>

            {leadSubmittedUrl && (
              <p className="text-[10px] text-emerald-600 font-bold text-center mt-2.5">
                ✔ Lead registrado. Si WhatsApp no se abrió automáticamente, <a href={leadSubmittedUrl} target="_blank" rel="noreferrer" className="underline text-emerald-700">haz clic aquí</a>.
              </p>
            )}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-zinc-50 border-t border-zinc-100 text-center text-[10px] text-zinc-400 font-semibold uppercase flex justify-between items-center px-6">
          <span>Publicado por: {property.nombreContacto}</span>
          <span>ID: {property.id}</span>
        </div>

      </div>
    </div>
  )
}

export default PropertyDetailModal
