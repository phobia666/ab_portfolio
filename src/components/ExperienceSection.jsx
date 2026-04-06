function ExperienceSection({ experiences }) {
  return (
    <section id="experience" className="rounded-3xl border border-white/10 bg-[#0d0f16]/75 p-6 backdrop-blur-sm sm:p-8">
      <h2 className="mb-5 text-2xl font-semibold">Experience</h2>
      <div className="space-y-4">
        {experiences.map((item) => (
          <article key={item.role} className="card-nebula rounded-2xl border border-white/10 p-4">
            <div className="mb-2 flex items-center justify-between gap-4">
              <h3 className="font-medium">{item.role}</h3>
              <span className="chip-astro">{item.date}</span>
            </div>
            <p className="text-sm text-slate-300">{item.details}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ExperienceSection
