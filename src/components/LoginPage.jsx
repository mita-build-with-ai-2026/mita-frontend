import { useState } from 'react'

function LoginPage({ onLogin, onSkip, darkMode, toggleDarkMode }) {
  const [viewMode, setViewMode] = useState('info') // 'info' or 'login'
  const [email, setEmail] = useState('admin@mita.ai')
  const [password, setPassword] = useState('admin123')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!email.trim() || !password.trim()) {
      setError('Completa tu correo y contraseña para ingresar.')
      setLoading(false)
      return
    }

    onLogin(email.trim(), password)
      .catch(err => {
        setError(err.message || 'Credenciales inválidas. Intente nuevamente.')
        setLoading(false)
      })
  }

  // ─── MODE A: MARKETING & INFO LANDING FOR AGENTS ───
  if (viewMode === 'info') {
    return (
      <main className="min-h-screen bg-zinc-50 dark:bg-[#0F1410] flex flex-col justify-between p-4 sm:p-6 md:p-8 animate-fadeIn text-zinc-900 dark:text-zinc-100 select-none">
        
        {/* Top bar navigation */}
        <div className="w-full max-w-5xl mx-auto flex items-center justify-between py-4 border-b border-zinc-200/80 dark:border-zinc-800/80">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden shadow-md shrink-0 border border-zinc-200/80 dark:border-zinc-700">
              <img src="/mita_logo.png" alt="mita logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-3xl font-black tracking-tighter text-[#2E7D43] dark:text-[#8EF0B5] lowercase select-none">
              mita
            </span>
            <span className="text-[10px] bg-[#4FA75A]/10 text-[#2E7D43] dark:text-[#8EF0B5] font-black px-2 py-0.5 rounded-md border border-[#4FA75A]/25 uppercase">
              Para Inmobiliarios
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Dark Mode switch */}
            <button
              onClick={toggleDarkMode}
              title={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              className="h-10 w-10 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 grid place-items-center cursor-pointer shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            >
              {darkMode ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.364l-.707-.707M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                </svg>
              )}
            </button>
            
            {/* Close / Return Button */}
            <button
              onClick={onSkip}
              className="h-10 w-10 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 grid place-items-center cursor-pointer transition-colors shadow-sm"
              title="Volver al buscador principal"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Info Content Area */}
        <div className="flex-grow w-full max-w-5xl mx-auto flex flex-col justify-center gap-10 md:gap-14 py-8 sm:py-12">
          
          {/* Main Hero Header */}
          <div className="text-center max-w-3xl mx-auto flex flex-col gap-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight">
              Multiplica tus ventas de espacios comerciales con <span className="bg-gradient-to-r from-[#8EF0B5] via-[#4FA75A] to-[#7EE6D8] bg-clip-text text-transparent">IA</span>
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base md:text-lg leading-relaxed font-semibold">
              Mita es la suite de inteligencia artificial diseñada para agentes inmobiliarios. Normaliza listados desordenados de WhatsApp, scrapea ofertas de Marketplace y atiende prospectos las 24 horas del día.
            </p>
          </div>

          {/* Features Grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* normalizer benefit */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 p-6 sm:p-8 rounded-3xl flex items-start gap-4 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#4FA75A]/10 dark:bg-[#4FA75A]/25 text-[#2E7D43] dark:text-[#8EF0B5] grid place-items-center shrink-0 font-black text-lg">
                📋
              </div>
              <div className="text-left">
                <h3 className="font-black text-lg sm:text-xl text-zinc-950 dark:text-zinc-50 tracking-tight">Normalización de Listados</h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mt-1.5 font-medium">
                  Pega cualquier texto informal y desordenado proveniente de WhatsApp o portales. La IA estructurará automáticamente la ficha, estimará superficies e identificará datos faltantes críticos.
                </p>
              </div>
            </div>

            {/* scraper benefit */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 p-6 sm:p-8 rounded-3xl flex items-start gap-4 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#7EE6D8]/15 dark:bg-[#7EE6D8]/25 text-[#2E7D43] dark:text-[#7EE6D8] grid place-items-center shrink-0 font-black text-lg">
                ⚡
              </div>
              <div className="text-left">
                <h3 className="font-black text-lg sm:text-xl text-zinc-950 dark:text-zinc-50 tracking-tight">Importador Automatizado</h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mt-1.5 font-medium">
                  Extrae listados completos de Facebook Marketplace y portales inmobiliarios directamente ingresando la URL. La IA los convertirá en borradores editables listos para el catálogo.
                </p>
              </div>
            </div>

            {/* leads benefit */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 p-6 sm:p-8 rounded-3xl flex items-start gap-4 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 grid place-items-center shrink-0 font-black text-lg">
                💬
              </div>
              <div className="text-left">
                <h3 className="font-black text-lg sm:text-xl text-zinc-950 dark:text-zinc-50 tracking-tight">Embudo e Integración de WhatsApp</h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mt-1.5 font-medium">
                  Los prospectos interesados generan un enlace inteligente que automatiza la agenda. Los detalles de cada lead se guardan en tiempo real en tu feed de control administrativo.
                </p>
              </div>
            </div>

            {/* search benefit */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 p-6 sm:p-8 rounded-3xl flex items-start gap-4 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 grid place-items-center shrink-0 font-black text-lg">
                🔍
              </div>
              <div className="text-left">
                <h3 className="font-black text-lg sm:text-xl text-zinc-950 dark:text-zinc-50 tracking-tight">Buscador y Comparador IA</h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mt-1.5 font-medium">
                  Tus propiedades participan automáticamente de las consultas semánticas y la matriz de viabilidad técnica side-by-side de la IA para acelerar el cierre comercial.
                </p>
              </div>
            </div>

          </div>

          {/* Action buttons footer section */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => setViewMode('login')}
              className="w-full sm:w-auto px-10 py-4 bg-[#2E7D43] hover:bg-[#2E7D43]/90 text-white font-black text-base rounded-2xl shadow-lg transition-all duration-300 active:scale-95 cursor-pointer text-center"
            >
              Ingresar a mi Consola
            </button>
            <button
              onClick={onSkip}
              className="w-full sm:w-auto px-8 py-4 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 font-black text-base rounded-2xl shadow-sm transition-all duration-300 active:scale-95 cursor-pointer text-center"
            >
              Volver al inicio
            </button>
          </div>

        </div>

        {/* Footer info links */}
        <div className="w-full max-w-5xl mx-auto border-t border-zinc-200/50 dark:border-zinc-850 py-4 text-center text-xs text-zinc-400 font-semibold uppercase">
          Mita AI Real Estate • Suite Tecnológica para Profesionales Inmobiliarios
        </div>

      </main>
    )
  }

  // ─── MODE B: ACTUAL LOGIN FORM VIEW ───
  return (
    <main className="min-h-screen grid place-items-center px-4 py-8 bg-zinc-50 dark:bg-[#0F1410] relative select-none">
      
      {/* Absolute close button on the top right of screen to return to main site */}
      <button
        onClick={onSkip}
        className="absolute top-6 right-6 w-11 h-11 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 grid place-items-center shadow-md cursor-pointer hover:scale-105 active:scale-95 transition-all"
        title="Cerrar y volver al inicio"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>

      <section className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] overflow-hidden rounded-[28px] border border-zinc-200/80 dark:border-zinc-800/80 bg-white/75 dark:bg-zinc-900/75 shadow-2xl backdrop-blur-xl animate-fadeIn">
        
        {/* Left Side Info Panel */}
        <div className="relative min-h-[260px] bg-zinc-900 p-6 sm:p-8 lg:p-10 text-white flex flex-col justify-between overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop"
            alt="Espacio inmobiliario moderno"
            className="absolute inset-0 h-full w-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-950/90 via-zinc-900/75 to-[#2E7D43]/65" />

          <div className="relative flex items-center gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden shadow-md shrink-0 border border-zinc-200/80 dark:border-zinc-700">
              <img src="/mita_logo.png" alt="mita logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-3xl font-black tracking-tighter text-white lowercase">
              mita
            </span>
          </div>

          <div className="relative mt-16 max-w-md text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight">
              Consola de Agentes.
            </h1>
            <p className="mt-4 text-xs sm:text-sm leading-relaxed text-white/78 font-medium">
              Inicia sesión para acceder a las herramientas profesionales: optimización de anuncios con IA, importación masiva de listings y monitoreo de leads de WhatsApp.
            </p>
          </div>
        </div>

        {/* Right Side Form Panel */}
        <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center bg-white dark:bg-zinc-900">
          <div className="flex items-center justify-between gap-4 mb-8">
            <div className="text-left">
              <h2 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">Ingreso Inmobiliario</h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold mt-1">Ingresa con tus credenciales asignadas.</p>
            </div>
            
            {/* Switch Darkmode in login mode */}
            <button
              type="button"
              onClick={toggleDarkMode}
              className="h-10 w-10 shrink-0 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 grid place-items-center shadow-sm cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
              title={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            >
              {darkMode ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.364l-.707-.707M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                </svg>
              )}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="text-left">
              <label className="block text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-1.5">Correo electrónico</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="usuario@mita.ai"
                required
                className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-3.5 rounded-xl text-sm font-semibold text-zinc-800 dark:text-zinc-200 outline-none focus:border-[#4FA75A]"
              />
            </div>
            <div className="text-left">
              <label className="block text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-1.5">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-3.5 rounded-xl text-sm font-semibold text-zinc-800 dark:text-zinc-200 outline-none focus:border-[#4FA75A]"
              />
            </div>

            {error && (
              <div className="text-xs text-rose-600 font-semibold p-3.5 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/50 rounded-xl text-left">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full py-3.5 bg-[#2E7D43] hover:bg-[#2E7D43]/90 text-white font-bold text-sm rounded-xl shadow-md transition-all cursor-pointer active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                'Iniciar Sesión'
              )}
            </button>
            
            <button
              type="button"
              onClick={() => setViewMode('info')}
              className="w-full py-3 border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold text-sm rounded-xl transition-all cursor-pointer active:scale-95"
            >
              ← Ver información y beneficios
            </button>

            <div className="mt-2 p-3 bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/50 dark:border-zinc-800/50 rounded-xl text-center">
              <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-semibold">
                Credenciales Demo: <span className="text-zinc-700 dark:text-zinc-300 font-bold">admin@mita.ai</span> / <span className="text-zinc-700 dark:text-zinc-300 font-bold">admin123</span>
              </p>
            </div>
          </form>
        </div>
      </section>
    </main>
  )
}

export default LoginPage
