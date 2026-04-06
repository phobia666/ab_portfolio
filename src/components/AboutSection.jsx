function AboutSection() {
  return (
    <section id="about" className="card-comet rounded-3xl border border-white/10 bg-[#0d0f16]/75 p-6 backdrop-blur-sm sm:p-8">
      <h2 className="mb-3 text-2xl font-semibold">About Me</h2>
      <p className="text-slate-300">
        To contribute technical skills, creativity and problem-solving ability in impactful teams, while
        learning from mentors and building real solutions.
      </p>
      <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
        <a className="link-plasma" href="mailto:abhyanshuab05@gmail.com">
          abhyanshuab05@gmail.com
        </a>
        <a className="link-plasma" href="https://github.com/phobia666" target="_blank" rel="noreferrer">
          github.com/phobia666
        </a>
        <a
          className="link-plasma"
          href="https://www.linkedin.com/in/abhyanshu-shah-557267362/"
          target="_blank"
          rel="noreferrer"
        >
          linkedin.com/in/abhyanshu-shah-557267362
        </a>
        <p className="rounded-xl border border-white/10 px-4 py-3 text-slate-300">Madhya Pradesh, India</p>
      </div>
    </section>
  )
}

export default AboutSection
