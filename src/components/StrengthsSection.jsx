function StrengthsSection({ strengths }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-[#0d0f16]/75 p-6 backdrop-blur-sm sm:p-8">
      <h2 className="mb-5 text-2xl font-semibold">Strengths</h2>
      <div className="flex flex-wrap gap-3">
        {strengths.map((item) => (
          <span key={item} className="chip-astro">
            {item}
          </span>
        ))}
      </div>
    </section>
  )
}

export default StrengthsSection
