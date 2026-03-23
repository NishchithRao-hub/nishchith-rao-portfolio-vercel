import Navbar            from '@/components/Navbar'
import HeroSection       from '@/components/HeroSection'
import MetricsWall       from '@/components/MetricsWall'
import AboutSection      from '@/components/AboutSection'
import ExperienceSection from '@/components/ExperienceSection'
import ProjectsSection   from '@/components/ProjectsSection'
import EducationSection  from '@/components/EducationSection'
import SkillsSection     from '@/components/SkillsSection'
import LifeSection       from '@/components/LifeSection'
import ContactSection    from '@/components/ContactSection'

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <HeroSection />
      <MetricsWall />

      <AboutSection />

      <ExperienceSection />

      <ProjectsSection />

      <EducationSection />

      <SkillsSection />

      <LifeSection />

      {/* Placeholder sections — filled in upcoming phases */}






      <ContactSection />
    </main>
  )
}