function HeroSection({ navLinks }) {
  return (
    <header className="card-nebula overflow-hidden rounded-3xl border border-white/10 bg-[#0d0f16]/80 p-6 backdrop-blur-sm sm:p-10">
      <nav className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm font-medium tracking-[0.2em] text-fuchsia-300">ABHYANSHU SHAH</p>
        <div className="flex flex-wrap gap-3 text-xs">
          {navLinks.map((item) => (
            <a key={item.href} href={item.href} className="link-orbit">
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <div className="grid items-center gap-8 md:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-slate-300">Hello, I am</p>
          <h1 className="mb-4 text-4xl font-semibold leading-tight sm:text-5xl">Abhyanshu Shah</h1>
          <p className="max-w-xl text-sm text-slate-300 sm:text-base">
            Aspiring software engineer focused on building responsive, scalable and user-friendly
            products. I enjoy turning ideas into polished web experiences.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-xs">
            <span className="chip-astro">Hackathon Participant</span>
            <span className="chip-astro">Problem Solver</span>
            <span className="chip-astro">Web Developer</span>
          </div>
        </div>

        <div className="hero-orb relative mx-auto h-64 w-64 rounded-full p-2">
        <div className="flex h-full w-full items-center justify-center rounded-full bg-[#0a0c12] overflow-hidden">
          <img
            src="ab1.png"   // change to your image path
            alt="Profile"
            className="h-full w-full object-cover rounded-full"
          />
          </div>
          <span className="absolute -left-2 top-10 h-3 w-3 rounded-full bg-fuchsia-400 shadow-[0_0_18px_2px_#d946ef]" />
          <span className="absolute -right-1 bottom-12 h-3 w-3 rounded-full bg-indigo-400 shadow-[0_0_18px_2px_#818cf8]" />
        </div>
      </div>
    </header>
  )
}

export default HeroSection
