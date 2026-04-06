const shootingStars = Array.from({ length: 7 }, (_, i) => ({
  id: i,
  top: `${8 + i * 11}%`,
  delay: `${i * 1.8}s`,
  duration: `${2.7 + (i % 3) * 0.8}s`,
}))

function CelestialBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="space-gradient absolute inset-0" />
      <div className="stars-layer stars-sm absolute inset-0" />
      <div className="stars-layer stars-md absolute inset-0" />
      <div className="nebula-glow nebula-a absolute" />
      <div className="nebula-glow nebula-b absolute" />
      {shootingStars.map((star) => (
        <span
          key={star.id}
          className="shooting-star absolute"
          style={{
            top: star.top,
            animationDelay: star.delay,
            animationDuration: star.duration,
          }}
        />
      ))}
    </div>
  )
}

export default CelestialBackground
