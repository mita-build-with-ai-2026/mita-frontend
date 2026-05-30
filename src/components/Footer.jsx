function Footer() {
  return (
    <footer className="w-full max-w-6xl mx-auto px-4 md:px-6 py-6 border-t border-zinc-200/60 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-zinc-500 font-semibold mt-8 sm:mt-12 z-20 text-center md:text-left">
      <div className="leading-relaxed">
        (c) 2026 Mita AI - Desarrollado para Build With AI Santa Cruz.
      </div>
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
        <span className="hover:text-zinc-800 transition-colors">Bolivia Inmobiliaria</span>
        <span>-</span>
        <span className="hover:text-zinc-800 transition-colors">Gemini LLM Scoring</span>
      </div>
    </footer>
  )
}

export default Footer
