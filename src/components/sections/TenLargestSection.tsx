import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import AnimatedTitle from '../AnimatedTitle'
import { useCanHover, useIsMobile } from '../../hooks/useMedia'

type StageKey = 'childhood' | 'youth' | 'adulthood' | 'old-age'

interface StageWork {
  id: number
  title: string
  year: number
  image: string
  alt: string
}

const tenLargestImage = (id: number, stage: string): Pick<StageWork, 'image' | 'alt'> => ({
  image: `/images/ten-largest/no-${String(id).padStart(2, '0')}.jpg`,
  alt: `Hilma af Klint, The Ten Largest, No. ${id}, ${stage}, 1907`,
})

interface Stage {
  key: StageKey
  title: string
  years: string
  description: string
  color: string
  textColor: string
  flexBasis: string
  works: StageWork[]
}

const STAGES: Stage[] = [
  {
    key: 'childhood',
    title: 'Childhood',
    years: '1907 · Nos. 1–3',
    description:
      'The opening works explore the beginning of life — clarity and innocence. Forms stay simple, colours light and transparent.',
    color: '#E7E0D2',
    textColor: '#403B37',
    flexBasis: '50%',
    works: [
      { id: 1, title: 'No. 1', year: 1907, ...tenLargestImage(1, 'Childhood') },
      { id: 2, title: 'No. 2', year: 1907, ...tenLargestImage(2, 'Childhood') },
      { id: 3, title: 'No. 3', year: 1907, ...tenLargestImage(3, 'Youth') },
    ],
  },
  {
    key: 'youth',
    title: 'Youth',
    years: '1907 · Nos. 4–6',
    description:
      'Energy and growth — the period of becoming. Compositions grow more complex; dynamic forms appear.',
    color: '#F1BC3E',
    textColor: '#403B37',
    flexBasis: '50%',
    works: [
      { id: 4, title: 'No. 4', year: 1907, ...tenLargestImage(4, 'Youth') },
      { id: 5, title: 'No. 5', year: 1907, ...tenLargestImage(5, 'Adulthood') },
      { id: 6, title: 'No. 6', year: 1907, ...tenLargestImage(6, 'Youth') },
    ],
  },
  {
    key: 'adulthood',
    title: 'Adulthood',
    years: '1907 · Nos. 7–8',
    description:
      'Maturity and balance — full realisation of potential. Harmony of form and colour reaches its peak.',
    color: '#829EB1',
    textColor: '#FBEFDF',
    flexBasis: '50%',
    works: [
      { id: 7, title: 'No. 7', year: 1907, ...tenLargestImage(7, 'Adulthood') },
      { id: 8, title: 'No. 8', year: 1907, ...tenLargestImage(8, 'Adulthood') },
    ],
  },
  {
    key: 'old-age',
    title: 'Old Age',
    years: '1907 · Nos. 9–10',
    description:
      'Wisdom and the close of the cycle — a return to simplicity, now charged with the whole journey.',
    color: '#394A8B',
    textColor: '#FBEFDF',
    flexBasis: '50%',
    works: [
      { id: 9, title: 'No. 9', year: 1907, ...tenLargestImage(9, 'Old Age') },
      { id: 10, title: 'No. 10', year: 1907, ...tenLargestImage(10, 'Old Age') },
    ],
  },
]

const DEEP_DIVE = [
  {
    title: 'Composition & form',
    body:
      'How geometric shapes meet organic curves — a visual language of transformation across the ten panels.',
    color: '#ED740C',
    textColor: '#FBEFDF',
    image: '/images/ten-largest/no-01.jpg',
    alt: 'Hilma af Klint, The Ten Largest, No. 1, Childhood, 1907',
  },
  {
    title: 'Colour palette',
    body:
      'Each life stage carries its own chromatic character, reflecting emotional and spiritual states.',
    color: '#829EB1',
    textColor: '#FBEFDF',
    image: '/images/ten-largest/no-07.jpg',
    alt: 'Hilma af Klint, The Ten Largest, No. 7, Adulthood, 1907',
  },
]

const TenLargestSection = () => {
  const isMobile = useIsMobile()
  const canHover = useCanHover()
  const [activeStage, setActiveStage] = useState<StageKey>('childhood')
  const [hoveredKey, setHoveredKey] = useState<StageKey | null>(null)
  const [prevHoveredKey, setPrevHoveredKey] = useState<StageKey | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [showStick, setShowStick] = useState(false)
  const [showArrowHead, setShowArrowHead] = useState(false)

  const current = STAGES.find((s) => s.key === activeStage)!

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const isFirstHover = prevHoveredKey === null && hoveredKey !== null
    if (hoveredKey !== null) {
      if (isFirstHover) {
        const t1 = setTimeout(() => setShowStick(true), 500)
        const t2 = setTimeout(() => setShowArrowHead(true), 800)
        return () => {
          clearTimeout(t1)
          clearTimeout(t2)
        }
      }
      setShowStick(true)
      setShowArrowHead(true)
    } else {
      setShowStick(false)
      setShowArrowHead(false)
    }
    setPrevHoveredKey(hoveredKey)
  }, [hoveredKey, prevHoveredKey])

  const renderStageBlock = (stage: Stage, index: number) => {
    const isActive = activeStage === stage.key
    const isHovered = canHover && hoveredKey === stage.key

    return (
      <motion.button
        key={stage.key}
        type="button"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.08 }}
        onClick={() => setActiveStage(stage.key)}
        className="flex flex-col justify-between relative w-full max-w-full text-left border-0"
        style={{
          minHeight: isMobile ? 200 : 280,
          flexBasis: isMobile ? '100%' : stage.flexBasis,
          flexShrink: 0,
          flexGrow: 0,
          borderBottomRightRadius: isMobile ? '2rem' : '50px',
          backgroundColor: stage.color,
          color: stage.textColor,
          overflow: 'hidden',
          padding: isHovered ? '24px 24px 5px 0' : '20px 20px 16px 20px',
          cursor: canHover ? 'none' : 'pointer',
          outline: isActive ? `2px solid ${stage.textColor}` : 'none',
          outlineOffset: isActive ? -2 : 0,
        }}
        onMouseEnter={() => canHover && setHoveredKey(stage.key)}
        onMouseLeave={() => canHover && setHoveredKey(null)}
      >
        <span className="text-sm font-medium opacity-80">{stage.years}</span>
        <div className="flex-1 min-h-[8px]" />
        <div className="flex justify-between items-end gap-3">
          <div className="min-w-0 flex-1" style={{ wordBreak: 'break-word' }}>
            {isHovered ? (
              <motion.div
                className="flex whitespace-nowrap overflow-hidden"
                animate={{ x: ['0%', '-100%'] }}
                transition={{
                  x: { duration: 20, ease: 'linear', repeat: Infinity, repeatType: 'loop' },
                }}
              >
                <h3 className="font-bold text-xl md:text-3xl inline-block mr-8">{stage.title}</h3>
                <h3 className="font-bold text-xl md:text-3xl inline-block mr-8">{stage.title}</h3>
              </motion.div>
            ) : (
              <h3 className="font-bold text-xl md:text-3xl leading-tight">{stage.title}</h3>
            )}
          </div>
          <span
            className="text-xl font-medium shrink-0 tabular-nums"
            style={{ opacity: isHovered ? 0 : 1 }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden" style={{ height: 1 }}>
          <motion.div
            className="h-px opacity-30"
            style={{ width: '100%', backgroundColor: 'currentColor' }}
            animate={isHovered ? { x: ['100%', '-100%'] } : { x: 0 }}
            transition={
              isHovered ? { duration: 1.5, repeat: Infinity, ease: 'linear' } : { duration: 0 }
            }
          />
        </div>
      </motion.button>
    )
  }

  const cursorStroke =
    hoveredKey &&
    STAGES.find((s) => s.key === hoveredKey)?.textColor === '#403B37'
      ? '#403B37'
      : '#FBEFDF'

  return (
    <section
      id="ten-largest"
      className="relative min-h-screen py-12 md:py-20 px-4 md:px-6 overflow-x-hidden"
      style={{ backgroundColor: '#403B37', zIndex: 1 }}
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="mb-6 md:mb-12 overflow-hidden w-full">
          <AnimatedTitle text="The Ten Largest" align="left" className="!text-[#FBEFDF]" />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl text-base md:text-lg leading-relaxed mb-8 md:mb-12"
          style={{ color: '#FBEFDF' }}
        >
          Ten monumental paintings exploring four stages of human life — each panel a meditation
          on development and transformation, created in 1907 as part of Paintings for the Temple.
        </motion.p>

        {/* Stage selectors — 2×2 grid */}
        <div className="flex flex-col md:flex-row md:flex-wrap gap-0 w-full max-w-full mb-0">
          <div className="flex flex-col md:flex-row gap-0 w-full md:w-[90%] max-w-full">
            {STAGES.slice(0, 2).map((stage, i) => renderStageBlock(stage, i))}
          </div>
          <div className="flex flex-col md:flex-row gap-0 w-full md:w-[90%] max-w-full">
            {STAGES.slice(2, 4).map((stage, i) => renderStageBlock(stage, i + 2))}
          </div>
        </div>

        {/* Active stage detail */}
        <motion.div
          key={activeStage}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-0 w-full max-w-full"
          style={{
            backgroundColor: current.color,
            color: current.textColor,
            borderBottomRightRadius: isMobile ? '2rem' : '50px',
            padding: '24px 20px',
            minHeight: isMobile ? 'auto' : 320,
          }}
        >
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
            <div>
              <h3 className="font-bold text-2xl md:text-4xl leading-tight">{current.title}</h3>
              <p className="text-sm opacity-80 mt-1">{current.years}</p>
            </div>
            <span className="text-sm uppercase tracking-widest opacity-60 hidden md:block">
              Active stage
            </span>
          </div>

          <p className="text-sm md:text-base leading-relaxed opacity-95 mb-8 max-w-3xl">
            {current.description}
          </p>

          <div
            className={`grid gap-0 w-full max-w-full ${
              current.works.length === 2
                ? 'grid-cols-1 sm:grid-cols-2'
                : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
            }`}
          >
            {current.works.map((work, wi) => {
              const workBg =
                current.textColor === '#403B37'
                  ? 'rgba(64, 59, 55, 0.08)'
                  : 'rgba(251, 239, 223, 0.12)'

              return (
                <motion.div
                  key={work.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: wi * 0.06 }}
                  className="flex flex-col justify-between relative overflow-hidden"
                  style={{
                    minHeight: isMobile ? 280 : 320,
                    backgroundColor: workBg,
                    borderBottomRightRadius: isMobile ? '1.5rem' : '2rem',
                    padding: '12px',
                  }}
                >
                  <div
                    className="flex-1 rounded-lg mb-3 overflow-hidden"
                    style={{
                      minHeight: isMobile ? 180 : 220,
                      backgroundColor:
                        current.textColor === '#403B37'
                          ? 'rgba(64, 59, 55, 0.06)'
                          : 'rgba(251, 239, 223, 0.08)',
                    }}
                  >
                    <img
                      src={work.image}
                      alt={work.alt}
                      className="w-full h-full object-cover object-center"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="flex justify-between items-end gap-2 w-full overflow-hidden pt-1">
                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-lg leading-tight m-0">{work.title}</h4>
                      <p className="text-sm opacity-80 m-0 mt-0.5">{work.year}</p>
                    </div>
                    <span className="text-sm opacity-50 shrink-0 tabular-nums pl-2">
                      #{work.id}
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Deep dive */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sm uppercase tracking-[0.2em] py-8 md:py-10"
          style={{ color: '#FBEFDF', opacity: 0.6 }}
        >
          Deep dive
        </motion.p>

        <div className="flex flex-col md:flex-row gap-0 w-full max-w-full">
          {DEEP_DIVE.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col justify-between relative w-full"
              style={{
                minHeight: isMobile ? 200 : 240,
                flexBasis: isMobile ? '100%' : '50%',
                flexShrink: 0,
                backgroundColor: item.color,
                color: item.textColor,
                borderBottomRightRadius: isMobile ? '2rem' : '50px',
                padding: '24px 20px',
              }}
            >
              <div
                className="rounded-lg overflow-hidden mb-4 w-full"
                style={{ aspectRatio: '4/3', maxHeight: isMobile ? 200 : 240 }}
              >
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>
              <h4 className="font-bold text-xl md:text-2xl leading-tight mb-3">{item.title}</h4>
              <p className="text-sm md:text-base leading-relaxed opacity-90">{item.body}</p>
              <span className="text-xl font-medium mt-6 opacity-40 tabular-nums">
                {String(index + 1).padStart(2, '0')}
              </span>
            </motion.div>
          ))}
        </div>

        <p
          className="text-xs leading-relaxed mt-10 max-w-3xl"
          style={{ color: '#FBEFDF', opacity: 0.45 }}
        >
          Paintings: Hilma af Klint, The Ten Largest (1907), Group IV. Images from{' '}
          <a
            href="https://commons.wikimedia.org/wiki/Category:Paintings_by_Hilma_af_Klint"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
            style={{ color: '#FBEFDF' }}
          >
            Wikimedia Commons
          </a>
          . Courtesy of The Hilma af Klint Foundation / Moderna Museet.
        </p>
      </div>

      <AnimatePresence>
        {canHover && hoveredKey !== null && (
          <motion.div
            className="fixed pointer-events-none z-[99999999] hidden md:block"
            style={{
              left: mousePosition.x,
              top: mousePosition.y,
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.3 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
              <motion.circle
                cx="64"
                cy="64"
                r="56"
                fill="none"
                stroke={cursorStroke}
                strokeWidth="1.5"
                initial={{ scale: 0.3, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.3, opacity: 0 }}
              />
              <g transform="rotate(60 64 64)">
                <motion.path
                  d="M64 36 L64 92"
                  stroke={cursorStroke}
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  animate={{ opacity: showStick ? 1 : 0, pathLength: showStick ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                />
                <motion.path
                  d="M44 64 L64 36 L84 64"
                  stroke={cursorStroke}
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  animate={{ opacity: showArrowHead ? 1 : 0, pathLength: showArrowHead ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                />
              </g>
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default TenLargestSection
