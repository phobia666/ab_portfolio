function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#06070d]/95 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-6">
        <div className="loader-ring" />
        <p className="text-sm tracking-[0.35em] text-fuchsia-200">IGNITING ORBIT</p>
      </div>
    </div>
  )
}

export default Loader
