function SkillsSection({ skillCards, techSkills, familiarTech }) {
  return (
    <section id="skills" className="rounded-3xl border border-white/10 bg-[#0d0f16]/75 p-6 backdrop-blur-sm sm:p-8">
      <h2 className="mb-5 text-2xl font-semibold">My Skills and Development</h2>
      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {skillCards.map((item) => (
          <article key={item.title} className="card-orbit rounded-2xl border border-white/10 p-4">
            <h3 className="mb-2 font-medium text-fuchsia-200">{item.title}</h3>
            <p className="text-sm text-slate-300">{item.desc}</p>
          </article>
        ))}
      </div>
      <h3 className="mb-3 text-lg font-medium text-fuchsia-200">Tech Stack</h3>
      <div className="flex flex-wrap gap-3">
        {techSkills.map((skill) => (
          <a key={skill.name} href={skill.link} target="_blank" rel="noreferrer" className="transition-transform hover:-translate-y-1">
            <img src={skill.badge} alt={skill.name} className="h-8 rounded shadow-md" />
          </a>
        ))}
      </div>
      <h3 className="mb-3 mt-6 text-lg font-medium text-indigo-200">Familiar With</h3>
      <div className="flex flex-wrap gap-3">
        {familiarTech.map((skill) => (
          <a key={skill.name} href={skill.link} target="_blank" rel="noreferrer" className="transition-transform hover:-translate-y-1">
            <img src={skill.badge} alt={skill.name} className="h-8 rounded shadow-md" />
          </a>
        ))}
      </div>
    </section>
  )
}

export default SkillsSection
