import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 font-sans selection:bg-red-500/30 selection:text-red-200 relative overflow-hidden flex flex-col items-center justify-between">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-red-500/10 blur-[130px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-rose-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Main Container */}
      <div className="w-full max-w-5xl px-6 py-12 flex flex-col items-center justify-center flex-grow z-10">
        
        {/* Center / Hero Section */}
        <section id="center" className="flex flex-col items-center text-center gap-8 max-w-2xl py-12">
          {/* Logo Showcase with animations */}
          <div className="relative w-48 h-48 flex items-center justify-center">
            <img 
              src={heroImg} 
              className="w-36 h-auto relative z-0 filter drop-shadow-[0_0_20px_rgba(239,68,68,0.2)] transition-all duration-700 hover:scale-105" 
              alt="Mita Logo Base" 
            />
            <img 
              src={reactLogo} 
              className="absolute top-6 left-14 z-10 w-9 h-9 animate-[spin_12s_linear_infinite] filter drop-shadow-[0_0_10px_rgba(6,182,212,0.4)]" 
              alt="React logo" 
            />
            <img 
              src={viteLogo} 
              className="absolute bottom-6 right-14 z-10 w-8 h-8 filter drop-shadow-[0_0_10px_rgba(234,179,8,0.4)] transition-transform hover:scale-110" 
              alt="Vite logo" 
            />
          </div>

          <div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-red-500 via-rose-500 to-orange-500 bg-clip-text text-transparent mb-4">
              Get started
            </h1>
            <p className="text-zinc-400 text-lg leading-relaxed">
              Edit <code className="px-2 py-0.5 bg-zinc-900/80 border border-zinc-800 text-red-400 rounded font-mono text-sm">src/App.jsx</code> and save to test <code className="px-2 py-0.5 bg-zinc-900/80 border border-zinc-800 text-rose-400 rounded font-mono text-sm">HMR</code>
            </p>
          </div>

          <button
            type="button"
            className="px-8 py-3.5 font-mono text-sm font-semibold rounded-full border border-red-500/30 bg-red-950/20 text-red-400 hover:text-white hover:bg-red-500 hover:border-red-400 transition-all duration-300 transform active:scale-95 hover:scale-105 shadow-[0_0_20px_rgba(239,68,68,0.1)] hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] cursor-pointer"
            onClick={() => setCount((count) => count + 1)}
          >
            Count is {count}
          </button>
        </section>

        {/* Dynamic glow divider */}
        <div className="w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-zinc-800/60 to-transparent my-10"></div>

        {/* Next Steps / Docs & Community Grid */}
        <section id="next-steps" className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          {/* Documentation Card */}
          <div id="docs" className="p-8 rounded-2xl border border-zinc-900/80 bg-zinc-950/40 backdrop-blur-md hover:border-red-500/20 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-3 text-red-500">
              <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <h2 className="text-2xl font-bold text-zinc-100">Documentation</h2>
            </div>
            <p className="text-zinc-500 text-sm mb-6">Your questions, answered</p>
            <ul className="flex flex-wrap gap-3">
              <li>
                <a 
                  href="https://vite.dev/" 
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900/50 hover:bg-zinc-900 text-zinc-300 hover:text-red-400 border border-zinc-800/80 hover:border-red-500/20 transition-all duration-300 text-sm"
                >
                  <img className="w-5 h-5 object-contain" src={viteLogo} alt="" />
                  Explore Vite
                </a>
              </li>
              <li>
                <a 
                  href="https://react.dev/" 
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900/50 hover:bg-zinc-900 text-zinc-300 hover:text-red-400 border border-zinc-800/80 hover:border-red-500/20 transition-all duration-300 text-sm"
                >
                  <img className="w-5 h-5 object-contain" src={reactLogo} alt="" />
                  Learn more
                </a>
              </li>
            </ul>
          </div>

          {/* Social Card */}
          <div id="social" className="p-8 rounded-2xl border border-zinc-900/80 bg-zinc-950/40 backdrop-blur-md hover:border-red-500/20 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-3 text-red-500">
              <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h2 className="text-2xl font-bold text-zinc-100">Connect with us</h2>
            </div>
            <p className="text-zinc-500 text-sm mb-6">Join the Vite community</p>
            <ul className="flex flex-wrap gap-2.5">
              <li>
                <a 
                  href="https://github.com/vitejs/vite" 
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900/50 hover:bg-zinc-900 text-zinc-300 hover:text-red-400 border border-zinc-800/80 hover:border-red-500/20 transition-all duration-300 text-sm"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.193 22 16.44 22 12.017 22 6.484 17.522 2 12 2z" />
                  </svg>
                  GitHub
                </a>
              </li>
              <li>
                <a 
                  href="https://chat.vite.dev/" 
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900/50 hover:bg-zinc-900 text-zinc-300 hover:text-red-400 border border-zinc-800/80 hover:border-red-500/20 transition-all duration-300 text-sm"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 127.14 96.36" aria-hidden="true">
                    <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.86,54.65,1,77.53A105.73,105.73,0,0,0,32,96.36a77.7,77.7,0,0,0,6.63-10.85,68.43,68.43,0,0,1-10.5-5c.88-.65,1.72-1.34,2.51-2.06a75.45,75.45,0,0,0,73.1,0c.8.72,1.63,1.41,2.51,2.06a68.43,68.43,0,0,1-10.5,5,77.7,77.7,0,0,0,6.63,10.85,105.73,105.73,0,0,0,31-18.83C129.07,49.82,123.1,26.9,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.9,46,53.9,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.14,46,96.14,53,91,65.69,84.69,65.69Z"/>
                  </svg>
                  Discord
                </a>
              </li>
              <li>
                <a 
                  href="https://x.com/vite_js" 
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900/50 hover:bg-zinc-900 text-zinc-300 hover:text-red-400 border border-zinc-800/80 hover:border-red-500/20 transition-all duration-300 text-sm"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  X.com
                </a>
              </li>
              <li>
                <a 
                  href="https://bsky.app/profile/vite.dev" 
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900/50 hover:bg-zinc-900 text-zinc-300 hover:text-red-400 border border-zinc-800/80 hover:border-red-500/20 transition-all duration-300 text-sm"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 512 512" aria-hidden="true">
                    <path d="M111.8 77.2C167.3 118.8 221.7 186.8 247.9 226.7c2.6 4 3.9 6 8.1 6s5.5-2 8.1-6c26.2-39.9 80.6-107.9 136.1-149.5c36.2-27.1 76.6-43.7 112-25.2c30.2 15.8 38.6 57.7 28.5 101.1c-13.3 56.8-63.5 137.9-106.8 190.7c-25 30.5-56.9 66.8-89.8 101c-32.9 34.2-64.8 67.5-74.8 76.9c-2.4 2.2-5.5 3.5-8.7 3.5s-6.3-1.3-8.7-3.5c-10-9.4-41.9-42.7-74.8-76.9c-32.9-34.2-64.8-70.5-89.8-101C116.6 291.5 66.4 210.4 53.1 153.6C43 110.2 51.4 68.3 81.6 52.5c35.4-18.5 75.8-1.9 112 25.2z"/>
                  </svg>
                  Bluesky
                </a>
              </li>
            </ul>
          </div>
        </section>

      </div>

      {/* Footer / Spacer spacer */}
      <footer className="w-full max-w-4xl py-6 border-t border-zinc-900/60 text-center text-xs text-zinc-600 z-10">
        Build with Tailwind CSS v4 & React
      </footer>
    </div>
  )
}

export default App
