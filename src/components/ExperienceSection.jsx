

function ExperienceSection({ experiences, certificates }) {
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
        <div className="flex flex-wrap gap-5">
          {certificates.map((certi) => (
            <a 
            key={certi.title}
            href={certi.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col gap-3 justify-center items-center  w-80 card-nebula rounded-2xl border border-white/10 p-4">
              <img className="w-auto" src= {certi.img} alt= "" />
              <p className="text-sm text-slate-300">{certi.title}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExperienceSection
