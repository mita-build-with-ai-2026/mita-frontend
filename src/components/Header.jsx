import React from 'react'
import mitaLogo from '../assets/mita_logo.png'

function Header({ currentTab, setCurrentTab, selectedCompareCount, clientMode, darkMode, toggleDarkMode }) {
  return (
    <header className="w-full max-w-6xl mx-auto px-4 md:px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-4 z-20">

      {/* Brand */}
      <div className="flex items-center gap-3 select-none">
        <img
          src={mitaLogo}
          alt="Mita logo"
          className="h-11 w-auto object-contain drop-shadow-sm"
        />
        <div>
          <div className="text-xl font-black tracking-tight flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            Mita <span className="text-[10px] bg-[#4FA75A]/15 text-[#2E7D43] font-bold px-2 py-0.5 rounded-full border border-[#4FA75A]/25">AI Real Estate</span>
          </div>
          <p className="text-[10px] font-semibold tracking-wide uppercase" style={{ color: 'var(--text-muted)' }}>Bolivia • Mención Industria 2026</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav
        className="flex items-center gap-1.5 p-1 backdrop-blur-lg border rounded-full shadow-sm max-w-full overflow-x-auto"
        style={{ background: 'var(--bg-surface-2)', borderColor: 'var(--border-subtle)' }}
      >
        {[
          { key: 'search', label: 'Búsqueda IA' },
          { key: 'explore', label: 'Explorar Espacios' },
          { key: 'compare', label: 'Comparador' },
          { key: 'enhance', label: 'Publicar (IA)' },
          { key: 'admin', label: 'Admin' },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => {
              if (key === 'compare' && selectedCompareCount < 2) {
                alert('Selecciona al menos 2 propiedades en "Explorar Espacios" para usar el Comparador.')
                return
              }
              setCurrentTab(key)
            }}
            className={`relative px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 cursor-pointer ${currentTab === key
              ? 'bg-[#2E7D43] text-white shadow-sm'
              : 'hover:bg-[#4FA75A]/10 hover:text-[#2E7D43]'
              }`}
            style={currentTab !== key ? { color: 'var(--text-secondary)' } : {}}
          >
            {label}
            {key === 'compare' && selectedCompareCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white w-4 h-4 rounded-full text-[9px] flex items-center justify-center font-bold">
                {selectedCompareCount}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Dark Mode Toggle (replaces client-mode badge) */}
      <button
        onClick={toggleDarkMode}
        title={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        className="hidden lg:flex items-center gap-2.5 px-3 py-2 rounded-xl border backdrop-blur-md transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 group"
        style={{
          background: 'var(--bg-surface-2)',
          borderColor: 'var(--border-subtle)',
          color: 'var(--text-secondary)',
        }}
      >
        {/* Sun / Moon icon */}
        <span className="relative w-8 h-4 rounded-full flex items-center transition-colors duration-300"
          style={{ background: darkMode ? '#2E7D43' : '#D1D5DB' }}
        >
          <span
            className="absolute w-3 h-3 bg-white rounded-full shadow-sm transition-all duration-300"
            style={{ left: darkMode ? '18px' : '2px' }}
          />
        </span>

        <span className="text-[11px] font-bold uppercase tracking-wider select-none transition-colors" style={{ color: 'var(--text-muted)' }}>
          {darkMode ? '🌙' : '☀️'}
        </span>

      </button>

    </header>
  )
}

export default Header
