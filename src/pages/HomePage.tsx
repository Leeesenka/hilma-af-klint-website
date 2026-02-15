import Hero from '../components/sections/Hero'
import GridSection from '../components/sections/GridSection'
import AboutSection from '../components/sections/AboutSection'
import TempleSection from '../components/sections/TempleSection'
import TenLargestSection from '../components/sections/TenLargestSection'
import SymbolsSection from '../components/sections/SymbolsSection'
import TimelineSection from '../components/sections/TimelineSection'
import SourcesSection from '../components/sections/SourcesSection'

const HomePage = () => {
  return (
    <main className="w-full relative">
      <Hero />
      <GridSection />
      <AboutSection />
      <TempleSection />
      <TenLargestSection />
      <SymbolsSection />
      <TimelineSection />
      <SourcesSection />
    </main>
  )
}

export default HomePage

