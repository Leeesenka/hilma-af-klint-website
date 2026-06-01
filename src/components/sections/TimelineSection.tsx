import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import AnimatedTitle from '../AnimatedTitle'
import { useIsMobile } from '../../hooks/useMedia'

interface TimelineEvent {
  year: number
  title: string
  subtitle: string
  detail: string
  era: 'early' | 'spiritual' | 'temple' | 'legacy'
  image?: string
  /** Year-rail colors — each event unique so neighbours never match */
  railColor: string
  railActiveColor: string
  railTextColor: string
}

const EVENTS: TimelineEvent[] = [
  {
    year: 1862,
    title: 'Birth',
    subtitle: 'Stockholm',
    detail:
      'Hilma af Klint is born into a naval family. A conventional upbringing will later meet radical spiritual and artistic inquiry.',
    era: 'early',
    railColor: '#E7E0D2',
    railActiveColor: '#403B37',
    railTextColor: '#403B37',
  },
  {
    year: 1882,
    title: 'Royal Academy',
    subtitle: 'Fine Arts, Stockholm',
    detail:
      'She trains as a landscape and portrait painter — the classical foundation from which her abstract work will eventually depart.',
    era: 'early',
    railColor: '#829EB1',
    railActiveColor: '#394A8B',
    railTextColor: '#FBEFDF',
  },
  {
    year: 1896,
    title: 'De Fem — The Five',
    subtitle: 'Spiritual circle',
    detail:
      'With four women friends she forms a group for séances, automatic drawing, and messages from spirits — the seed of her abstract language.',
    era: 'spiritual',
    railColor: '#C1C0B6',
    railActiveColor: '#829EB1',
    railTextColor: '#403B37',
  },
  {
    year: 1906,
    title: 'Temple begins',
    subtitle: 'Paintings for the Temple',
    detail:
      'Under guidance she names the “High Masters,” she starts the cycle of more than 190 works conceived as one spiritual building.',
    era: 'temple',
    image: '/images/ten-largest/no-01.jpg',
    railColor: '#F1BC3E',
    railActiveColor: '#ED740C',
    railTextColor: '#403B37',
  },
  {
    year: 1907,
    title: 'The Ten Largest',
    subtitle: 'Group IV',
    detail:
      'Ten monumental panels map childhood, youth, adulthood, and old age — among the largest abstract works of their time.',
    era: 'temple',
    image: '/images/ten-largest/no-04.jpg',
    railColor: '#ED740C',
    railActiveColor: '#403B37',
    railTextColor: '#FBEFDF',
  },
  {
    year: 1915,
    title: 'Temple completed',
    subtitle: 'Altarpieces & final groups',
    detail:
      'The series reaches its conclusion with altarpieces and late groups — a full architecture of images for an imagined temple.',
    era: 'temple',
    image: '/images/ten-largest/no-10.jpg',
    railColor: '#829EB1',
    railActiveColor: '#394A8B',
    railTextColor: '#FBEFDF',
  },
  {
    year: 1944,
    title: 'Legacy',
    subtitle: 'Posthumous revelation',
    detail:
      'She dies in Stockholm, leaving instructions that her abstract work stay unseen for twenty years. Recognition arrives with exhibitions from the 1980s, culminating at the Guggenheim in 2018–19.',
    era: 'legacy',
    railColor: '#403B37',
    railActiveColor: '#ED740C',
    railTextColor: '#FBEFDF',
  },
]

const ERA_STYLES: Record<
  TimelineEvent['era'],
  { rail: string; railActive: string; panel: string; text: string; accent: string }
> = {
  early: {
    rail: '#E7E0D2',
    railActive: '#403B37',
    panel: '#E7E0D2',
    text: '#403B37',
    accent: '#829EB1',
  },
  spiritual: {
    rail: '#829EB1',
    railActive: '#394A8B',
    panel: '#829EB1',
    text: '#FBEFDF',
    accent: '#FBEFDF',
  },
  temple: {
    rail: '#F1BC3E',
    railActive: '#ED740C',
    panel: '#403B37',
    text: '#FBEFDF',
    accent: '#F1BC3E',
  },
  legacy: {
    rail: '#C1C0B6',
    railActive: '#403B37',
    panel: '#394A8B',
    text: '#FBEFDF',
    accent: '#F1BC3E',
  },
}

const TimelineSection = () => {
  const isMobile = useIsMobile()
  const [activeYear, setActiveYear] = useState(1907)
  const active = EVENTS.find((e) => e.year === activeYear) ?? EVENTS[0]
  const styles = ERA_STYLES[active.era]

  return (
    <section
      id="timeline"
      className="relative min-h-screen py-12 md:py-20 px-4 md:px-6 overflow-x-hidden"
      style={{ backgroundColor: '#FBEFDF', zIndex: 1 }}
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="mb-6 md:mb-10 overflow-hidden">
          <AnimatedTitle text="Timeline" align="left" className="!text-[#403B37]" />
        </div>

        <p
          className="max-w-xl text-base md:text-lg leading-relaxed mb-10 md:mb-14"
          style={{ color: '#403B37', opacity: 0.85 }}
        >
          Select a year — follow the path from academy to spirit, through the temple years, and
          beyond.
        </p>

        <p
          className="text-xs uppercase tracking-[0.25em] mb-3 px-1 hidden lg:block"
          style={{ color: '#403B37', opacity: 0.5 }}
        >
          1862 — 1944
        </p>

        <div className="flex flex-col lg:flex-row lg:items-start gap-0 w-full max-w-full">
          {/* Year rail */}
          <div
            className="lg:w-[38%] shrink-0 flex flex-col min-w-0 pr-0 lg:pr-2"
            style={{ borderRight: isMobile ? 'none' : '1px solid rgba(64,59,55,0.15)' }}
          >
            <div
              className="flex lg:flex-col gap-2 lg:gap-0 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 snap-x snap-mandatory lg:snap-none"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {EVENTS.map((event, i) => {
                const isActive = activeYear === event.year
                const isTemple = event.era === 'temple'
                const prevEra = i > 0 ? EVENTS[i - 1].era : null
                const showTempleLabel = isTemple && prevEra !== 'temple'

                return (
                  <div key={event.year} className="lg:w-full shrink-0 snap-start">
                    {showTempleLabel && (
                      <p
                        className="hidden lg:block text-xs uppercase tracking-[0.2em] py-4 px-2"
                        style={{ color: '#ED740C', opacity: 0.9 }}
                      >
                        1906 – 1915 · Temple
                      </p>
                    )}
                    {showTempleLabel && isMobile && (
                      <p
                        className="lg:hidden text-xs uppercase tracking-widest px-2 py-2 whitespace-nowrap"
                        style={{ color: '#ED740C' }}
                      >
                        Temple
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={() => setActiveYear(event.year)}
                      className="w-full text-left border-0 transition-all duration-300"
                      style={{
                        backgroundColor: isActive ? event.railActiveColor : event.railColor,
                        color: isActive ? '#FBEFDF' : event.railTextColor,
                        padding: isMobile ? '14px 16px' : '16px 20px',
                        borderBottomRightRadius: isMobile ? '1.25rem' : '2rem',
                        minWidth: isMobile ? '120px' : undefined,
                        opacity: isActive ? 1 : 0.92,
                      }}
                    >
                      <span
                        className="block font-light tabular-nums leading-none"
                        style={{
                          fontSize: isMobile ? '1.5rem' : 'clamp(1.75rem, 3.5vw, 2.15rem)',
                          letterSpacing: '-0.02em',
                        }}
                      >
                        {event.year}
                      </span>
                      <span className="block text-sm font-medium mt-1 opacity-90 truncate">
                        {event.title}
                      </span>
                    </button>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Detail spotlight — top-aligned with year rail on desktop */}
          <div className="lg:w-[62%] lg:pl-0 flex flex-col min-h-[320px] lg:min-h-[480px] lg:self-stretch">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.year}
                initial={{ opacity: 0, x: isMobile ? 0 : 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isMobile ? 0 : -16 }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex flex-col flex-1 relative overflow-hidden"
                style={{
                  backgroundColor: styles.panel,
                  color: styles.text,
                  borderBottomRightRadius: isMobile ? '2rem' : '3.5rem',
                  padding: isMobile ? '28px 22px' : '40px 48px',
                  minHeight: isMobile ? (active.image ? 520 : 360) : active.image ? 440 : 480,
                }}
              >
                {/* Watermark year — kept inside panel bounds */}
                <span
                  className="absolute pointer-events-none select-none font-light leading-none tabular-nums"
                  style={{
                    fontSize: 'clamp(3.5rem, 10vw, 7.5rem)',
                    letterSpacing: '-0.04em',
                    color: styles.text,
                    opacity: 0.07,
                    lineHeight: 1,
                    top: isMobile ? '0.5rem' : '1rem',
                    right: isMobile ? '0.75rem' : '1.25rem',
                    maxWidth: '45%',
                    textAlign: 'right',
                  }}
                  aria-hidden
                >
                  {active.year}
                </span>

                <div
                  className={`relative z-10 flex flex-1 gap-6 lg:gap-10 ${
                    active.image ? 'flex-col lg:flex-row lg:items-stretch' : 'flex-col'
                  }`}
                >
                  <div className={`flex flex-col ${active.image ? 'lg:flex-1 lg:min-w-0' : 'flex-1'}`}>
                    <div
                      className="w-12 h-px mb-6"
                      style={{ backgroundColor: styles.accent }}
                    />

                    <p
                      className="text-xs uppercase tracking-[0.25em] mb-2"
                      style={{ opacity: 0.65 }}
                    >
                      {active.subtitle}
                    </p>

                    <h3
                      className="font-bold leading-tight mb-4"
                      style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
                    >
                      {active.title}
                    </h3>

                    <p
                      className="text-sm md:text-base leading-relaxed lg:max-w-md"
                      style={{ opacity: 0.92 }}
                    >
                      {active.detail}
                    </p>
                  </div>

                  {active.image && (
                    <div
                      className="w-full lg:flex-1 lg:max-w-[min(55%,520px)] lg:shrink-0 flex items-center justify-center mt-4 lg:mt-0"
                    >
                      <div
                        className="w-full flex items-center justify-center overflow-hidden"
                        style={{
                          borderBottomRightRadius: isMobile ? '1.5rem' : '2rem',
                          backgroundColor: 'rgba(0, 0, 0, 0.06)',
                          minHeight: isMobile ? 320 : 400,
                          maxHeight: isMobile ? 'min(70vh, 520px)' : 420,
                          padding: '12px',
                        }}
                      >
                        <img
                          src={active.image}
                          alt={`Hilma af Klint, ${active.title}, ${active.year}`}
                          className="w-full h-auto max-h-[min(65vh,480px)] lg:max-h-[396px] object-contain object-center"
                          loading="lazy"
                          style={{ display: 'block' }}
                        />
                      </div>
                    </div>
                  )}

                  {!active.image && (
                    <div className="mt-auto pt-10 flex items-end justify-between w-full">
                      <span
                        className="text-6xl md:text-8xl font-light tabular-nums leading-none"
                        style={{ opacity: 0.15 }}
                      >
                        {active.year}
                      </span>
                      <span
                        className="text-xs uppercase tracking-widest"
                        style={{ opacity: 0.4 }}
                      >
                        {active.era === 'temple' ? 'Paintings for the Temple' : 'Life & work'}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Progress bar 1862–1944 */}
        <div className="mt-10 md:mt-14 w-full max-w-full">
          <div className="flex justify-between text-xs uppercase tracking-widest mb-2" style={{ color: '#403B37', opacity: 0.45 }}>
            <span>1862</span>
            <span style={{ color: '#ED740C', opacity: 0.8 }}>Temple · 1906–1915</span>
            <span>1944</span>
          </div>
          <div
            className="relative h-1 w-full rounded-full overflow-hidden"
            style={{ backgroundColor: 'rgba(64,59,55,0.12)' }}
          >
            <motion.div
              className="absolute top-0 left-0 h-full rounded-full"
              style={{ backgroundColor: '#403B37' }}
              initial={false}
              animate={{
                width: `${((active.year - 1862) / (1944 - 1862)) * 100}%`,
              }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2"
              style={{
                backgroundColor: '#FBEFDF',
                borderColor: '#403B37',
                left: `calc(${((active.year - 1862) / (1944 - 1862)) * 100}% - 6px)`,
              }}
              initial={false}
              animate={{
                left: `calc(${((active.year - 1862) / (1944 - 1862)) * 100}% - 6px)`,
              }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default TimelineSection
