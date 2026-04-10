import { useEffect, useState } from 'react'
import AboutSection from './components/AboutSection'
import CelestialBackground from './components/CelestialBackground'
import ContactSection from './components/ContactSection'
import CustomCursor from './components/CustomCursor'
import EducationSection from './components/EducationSection'
import ExperienceSection from './components/ExperienceSection'
import HeroSection from './components/HeroSection'
import Loader from './components/Loader'
import ProjectsSection from './components/ProjectsSection'
import SkillsSection from './components/SkillsSection'
import StrengthsSection from './components/StrengthsSection'
import {
  certificates,
  education,
  experiences,
  familiarTech,
  navLinks,
  projects,
  skillCards,
  strengths,
  techSkills,
} from './data/portfolioData'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative min-h-screen text-slate-100">
      <CelestialBackground />
      <CustomCursor />
      {loading && <Loader />}

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-7 px-4 py-6 sm:px-6 lg:py-10">
        <HeroSection navLinks={navLinks} />
        {/* <AboutSection /> */}
        <EducationSection education={education} />
        <ExperienceSection
        experiences={experiences}
        certificates={certificates} />
        <SkillsSection skillCards={skillCards} techSkills={techSkills} familiarTech={familiarTech} />
        <ProjectsSection projects={projects} />
        <StrengthsSection strengths={strengths} />
        <ContactSection />
      </main>
    </div>
  )
}

export default App
