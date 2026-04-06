function ProjectsSection({ projects }) {
  return (
    <section id="projects" className="rounded-3xl border border-white/10 bg-[#0d0f16]/75 p-6 backdrop-blur-sm sm:p-8">
      <h2 className="mb-5 text-2xl font-semibold">Projects</h2>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <article
            key={project.title}
            className="group card-nebula overflow-hidden rounded-2xl border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:border-fuchsia-300/50 flex flex-col"
          >
            <div className="relative h-48 border-b border-white/10 overflow-hidden bg-slate-900 border-b border-white/10 shrink-0">
              {project.image ? (
                <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-100" />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600/30 via-indigo-600/20 to-cyan-500/20 p-4" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#02040b] to-transparent opacity-80" />
              
              <div className="absolute bottom-4 left-4 right-4 z-10">
                <p className="text-xs uppercase tracking-[0.15em] text-fuchsia-200">{project.tag}</p>
                <h3 className="mt-1 text-xl font-medium">{project.title}</h3>
              </div>
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <p className="text-sm text-slate-300">{project.description}</p>
              <div className="mt-4 flex items-center gap-3 text-sm">
                <a className="link-orbit" href={project.github} target="_blank" rel="noreferrer">
                  GitHub
                </a>
                <a className="link-orbit" href={project.website} target="_blank" rel="noreferrer">
                  Live Website
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ProjectsSection
