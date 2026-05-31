function Header({ currentTab, setCurrentTab, selectedCompareCount, darkMode, toggleDarkMode, appUser, onUserLogout, onLoginClick, onLogoClick }) {
  // Dynamically render tabs based on whether the agent is logged in
  const tabs = appUser
    ? [
        { key: 'inicio', label: 'Inicio' },
        { key: 'explore', label: 'Explorar' },
        { key: 'compare', label: 'Comparador' },
        { key: 'admin', label: 'Panel Agente' },
      ]
    : [
        { key: 'inicio', label: 'Inicio' },
        { key: 'explore', label: 'Explorar' },
        { key: 'compare', label: 'Comparador' },
      ]

  const handleLogoClick = () => {
    if (onLogoClick) {
      onLogoClick()
    } else {
      setCurrentTab('inicio')
    }
  }

  return (
    <header className="w-full max-w-6xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-5 flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4 z-20">
      <div className="flex items-center justify-between gap-3 select-none">
        {/* Circular logo & wordmark */}
        <div className="cursor-pointer flex items-center gap-2 min-w-0" onClick={handleLogoClick}>
          <div className="w-8 h-8 rounded-full overflow-hidden shadow-md shrink-0 border border-zinc-200/80 dark:border-zinc-700">
            <img src="/mita_logo.png" alt="mita logo" className="w-full h-full object-cover" />
          </div>
          <span className="text-3xl font-black tracking-tighter text-[#2E7D43] dark:text-[#8EF0B5] lowercase select-none">
            mita
          </span>
        </div>

        {/* Responsive dark mode button with Sun/Moon SVG icons instead of letters */}
        <button
          onClick={toggleDarkMode}
          title={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          className="lg:hidden h-10 w-10 shrink-0 rounded-xl border backdrop-blur-md transition-all cursor-pointer grid place-items-center text-zinc-700 dark:text-zinc-300"
          style={{
            background: 'var(--bg-surface-2)',
            borderColor: 'var(--border-subtle)',
          }}
        >
          {darkMode ? (
            // Sun icon (for dark mode)
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.364l-.707-.707M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          ) : (
            // Moon icon (for light mode)
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
            </svg>
          )}
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 min-w-0">
        {appUser ? (
          <div
            className="flex items-center justify-between gap-3 rounded-2xl border px-3 py-2"
            style={{ background: 'var(--bg-surface-2)', borderColor: 'var(--border-subtle)' }}
          >
            <div className="min-w-0">
              <p className="text-[9px] uppercase font-black tracking-wider" style={{ color: 'var(--text-muted)' }}>Agente Logueado</p>
              <p className="text-xs font-bold truncate max-w-[150px]" style={{ color: 'var(--text-primary)' }}>
                {appUser.nombre || appUser.name || appUser.email}
              </p>
            </div>
            <button
              type="button"
              onClick={onUserLogout}
              className="px-3 py-1.5 rounded-xl bg-zinc-900 text-white text-[11px] font-bold cursor-pointer hover:bg-zinc-800 transition-colors"
            >
              Salir
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={onLoginClick}
            className="rounded-2xl border px-4 py-2 text-xs font-bold cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 text-center"
            style={{ background: 'var(--bg-surface-2)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}
          >
            Ingreso Agentes
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
                    alert('Selecciona al menos 2 propiedades en "Explorar" para usar el Comparador.')
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

          {/* Desktop dark mode button switch with Sun/Moon icons next to the toggle */}
          <button
            onClick={toggleDarkMode}
            title={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            className="hidden lg:flex items-center gap-2 px-2.5 py-1.5 h-10 rounded-xl border backdrop-blur-md transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95"
            style={{
              background: 'var(--bg-surface-2)',
              borderColor: 'var(--border-subtle)',
              color: 'var(--text-secondary)',
            }}
          >
            {/* Sun Icon */}
            <svg className={`w-4 h-4 transition-colors duration-300 ${darkMode ? 'text-zinc-500' : 'text-amber-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.364l-.707-.707M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>

            {/* Toggle Switch */}
            <span
              className="relative w-8 h-4 rounded-full flex items-center transition-colors duration-300 shrink-0"
              style={{ background: darkMode ? '#2E7D43' : '#D1D5DB' }}
            >
              <span
                className="absolute w-3 h-3 bg-white rounded-full shadow-sm transition-all duration-300"
                style={{ left: darkMode ? '18px' : '2px' }}
              />
            </span>

            {/* Moon Icon */}
            <svg className={`w-4 h-4 transition-colors duration-300 ${darkMode ? 'text-indigo-400' : 'text-zinc-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
