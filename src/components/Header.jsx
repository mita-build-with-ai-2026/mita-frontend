import mitaLogo from '../assets/mita_logo.png'

function Header({ currentTab, setCurrentTab, selectedCompareCount, darkMode, toggleDarkMode, appUser, onUserLogout, onLoginClick }) {
  const tabs = [
    { key: 'search', label: 'Busqueda IA' },
    { key: 'explore', label: 'Explorar' },
    { key: 'compare', label: 'Comparador' },
    { key: 'enhance', label: 'Publicar' },
    { key: 'admin', label: 'Admin' },
  ]

  return (
    <header className="w-full max-w-6xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-5 flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4 z-20">
      <div className="flex items-center justify-between gap-3 select-none">
        <div className="flex items-center gap-3 min-w-0">
          <img
            src={mitaLogo}
            alt="Mita logo"
            className="h-10 sm:h-11 w-auto object-contain drop-shadow-sm"
          />
          <div className="min-w-0">
            <div className="text-lg sm:text-xl font-black tracking-tight flex flex-wrap items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              Mita <span className="text-[10px] bg-[#4FA75A]/15 text-[#2E7D43] font-bold px-2 py-0.5 rounded-full border border-[#4FA75A]/25">AI Real Estate</span>
            </div>
            <p className="text-[10px] font-semibold tracking-wide uppercase truncate" style={{ color: 'var(--text-muted)' }}>
              Bolivia - Mencion Industria 2026
            </p>
          </div>
        </div>

        <button
          onClick={toggleDarkMode}
          title={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          className="lg:hidden h-10 w-10 shrink-0 rounded-xl border backdrop-blur-md transition-all cursor-pointer grid place-items-center text-xs font-black"
          style={{
            background: 'var(--bg-surface-2)',
            borderColor: 'var(--border-subtle)',
            color: 'var(--text-secondary)',
          }}
        >
          {darkMode ? 'N' : 'D'}
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 min-w-0">
        {appUser ? (
          <div
            className="flex items-center justify-between gap-3 rounded-2xl border px-3 py-2"
            style={{ background: 'var(--bg-surface-2)', borderColor: 'var(--border-subtle)' }}
          >
            <div className="min-w-0">
              <p className="text-[10px] uppercase font-black tracking-wider" style={{ color: 'var(--text-muted)' }}>Usuario</p>
              <p className="text-xs font-bold truncate max-w-[180px]" style={{ color: 'var(--text-primary)' }}>
                {appUser.name}
              </p>
            </div>
            <button
              type="button"
              onClick={onUserLogout}
              className="px-3 py-1.5 rounded-xl bg-zinc-900 text-white text-[11px] font-bold cursor-pointer"
            >
              Salir
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={onLoginClick}
            className="rounded-2xl border px-4 py-2 text-xs font-bold cursor-pointer"
            style={{ background: 'var(--bg-surface-2)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}
          >
            Ingresar
          </button>
        )}

        <div className="flex items-center gap-2 min-w-0">
          <nav
            className="flex items-center gap-1.5 p-1 backdrop-blur-lg border rounded-2xl sm:rounded-full shadow-sm max-w-full overflow-x-auto whitespace-nowrap"
            style={{ background: 'var(--bg-surface-2)', borderColor: 'var(--border-subtle)' }}
          >
            {tabs.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => {
                  if (key === 'compare' && selectedCompareCount < 2) {
                    alert('Selecciona al menos 2 propiedades en "Explorar Espacios" para usar el Comparador.')
                    return
                  }
                  setCurrentTab(key)
                }}
                className={`relative shrink-0 px-3 sm:px-4 py-2 rounded-xl sm:rounded-full text-xs md:text-sm font-semibold transition-all duration-300 cursor-pointer ${currentTab === key
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

          <button
            onClick={toggleDarkMode}
            title={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            className="hidden lg:flex items-center gap-2.5 px-3 py-2 rounded-xl border backdrop-blur-md transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95"
            style={{
              background: 'var(--bg-surface-2)',
              borderColor: 'var(--border-subtle)',
              color: 'var(--text-secondary)',
            }}
          >
            <span
              className="relative w-8 h-4 rounded-full flex items-center transition-colors duration-300"
              style={{ background: darkMode ? '#2E7D43' : '#D1D5DB' }}
            >
              <span
                className="absolute w-3 h-3 bg-white rounded-full shadow-sm transition-all duration-300"
                style={{ left: darkMode ? '18px' : '2px' }}
              />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider select-none" style={{ color: 'var(--text-muted)' }}>
              {darkMode ? 'Noche' : 'Dia'}
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
