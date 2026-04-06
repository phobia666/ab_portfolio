function ContactSection() {
  return (
    <section
      id="contact"
      className="card-orbit rounded-3xl border border-white/10 bg-gradient-to-r from-fuchsia-700/25 to-indigo-600/25 p-6 backdrop-blur-sm sm:p-8"
    >
      <h2 className="mb-2 text-2xl font-semibold">Let&apos;s Build Something Great</h2>
      <p className="mb-5 text-slate-200">
        Open to internships, collaborations and hackathons. Let&apos;s connect and create impact.
      </p>
      <div className="flex flex-wrap gap-3">
        <a href="mailto:abhyanshuab05@gmail.com" className="link-orbit inline-flex">
          abhyanshuab05@gmail.com
        </a>
        <a href="https://github.com/phobia666" className="link-orbit inline-flex" target="_blank" rel="noreferrer">
          github.com/phobia666
        </a>
        <a
          href="https://www.linkedin.com/in/abhyanshu-shah-557267362/"
          className="link-orbit inline-flex"
          target="_blank"
          rel="noreferrer"
        >
          linkedin.com/in/abhyanshu-shah-557267362
        </a>
      </div>
    </section>
  )
}

export default ContactSection
