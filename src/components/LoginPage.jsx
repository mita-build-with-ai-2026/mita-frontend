import { useState } from 'react'
import mitaLogo from '../assets/mita_logo.png'

function LoginPage({ onLogin, onSkip, darkMode, toggleDarkMode }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!email.trim() || !password.trim()) {
      setError('Completa tu correo y contrasena para ingresar.')
      return
    }

    onLogin({
      name: name.trim() || email.split('@')[0],
      email: email.trim(),
    })
  }

  return (
    <main className="min-h-screen grid place-items-center px-4 py-8 selection:bg-[#4FA75A]/20 selection:text-[#2E7D43]">
      <section className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] overflow-hidden rounded-[28px] border border-zinc-200/80 bg-white/75 shadow-2xl backdrop-blur-xl">
        <div className="relative min-h-[260px] bg-zinc-900 p-6 sm:p-8 lg:p-10 text-white flex flex-col justify-between overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop"
            alt="Espacio inmobiliario moderno"
            className="absolute inset-0 h-full w-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-950/85 via-zinc-900/65 to-[#2E7D43]/65" />

          <div className="relative flex items-center gap-3">
            <img src={mitaLogo} alt="Mita logo" className="h-12 w-auto object-contain" />
            <div>
              <p className="text-xl font-black leading-none">Mita</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-white/65">AI Real Estate</p>
            </div>
          </div>

          <div className="relative mt-16 max-w-md">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight">
              Encuentra y gestiona espacios con IA.
            </h1>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-white/78">
              Inicia sesion para explorar propiedades, comparar opciones y contactar espacios comerciales o residenciales en Santa Cruz.
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center" style={{ background: 'var(--bg-surface)' }}>
          <div className="flex items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-black tracking-tight text-zinc-900">Ingreso de usuario</h2>
              <p className="text-xs text-zinc-500 font-semibold mt-1">Usa cualquier correo para la demo local.</p>
            </div>
            <button
              type="button"
              onClick={toggleDarkMode}
              className="h-10 w-10 shrink-0 rounded-xl border border-zinc-200 bg-white text-zinc-700 grid place-items-center text-sm font-bold shadow-sm"
              title={darkMode ? 'Modo claro' : 'Modo oscuro'}
            >
              {darkMode ? 'N' : 'D'}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-1.5">Nombre</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre"
                className="w-full bg-zinc-50 border border-zinc-200 p-3.5 rounded-xl text-sm font-semibold text-zinc-800 outline-none focus:border-[#4FA75A]"
              />
            </div>
            <div>
              <label className="block text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-1.5">Correo electronico</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="usuario@mita.ai"
                required
                className="w-full bg-zinc-50 border border-zinc-200 p-3.5 rounded-xl text-sm font-semibold text-zinc-800 outline-none focus:border-[#4FA75A]"
              />
            </div>
            <div>
              <label className="block text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-1.5">Contrasena</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimo 4 caracteres"
                minLength="4"
                required
                className="w-full bg-zinc-50 border border-zinc-200 p-3.5 rounded-xl text-sm font-semibold text-zinc-800 outline-none focus:border-[#4FA75A]"
              />
            </div>

            {error && (
              <div className="text-xs text-rose-600 font-semibold p-3 bg-rose-50 border border-rose-100 rounded-xl">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="mt-2 w-full py-3.5 bg-[#2E7D43] hover:bg-[#2E7D43]/90 text-white font-bold text-sm rounded-xl shadow-md transition-all cursor-pointer active:scale-95"
            >
              Ingresar a Mita
            </button>
            <button
              type="button"
              onClick={onSkip}
              className="w-full py-3 border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 font-bold text-sm rounded-xl transition-all cursor-pointer active:scale-95"
            >
              Continuar sin iniciar sesion
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}

export default LoginPage
