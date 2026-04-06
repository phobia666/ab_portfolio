function EducationSection({ education }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-[#0d0f16]/75 p-6 backdrop-blur-sm sm:p-8">
      <h2 className="mb-5 text-2xl font-semibold">Education</h2>
      <div className="space-y-4">
        {education.map((item) => (
          <article key={item.title} className="card-comet rounded-2xl border border-white/10 p-4">
            <h3 className="font-medium">{item.title}</h3>
            <p className="text-sm text-slate-300">{item.details}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default EducationSection
