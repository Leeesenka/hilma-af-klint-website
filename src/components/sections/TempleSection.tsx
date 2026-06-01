import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import AnimatedTitle from '../AnimatedTitle'
import { useCanHover, useIsMobile } from '../../hooks/useMedia'

type BlockId = 'concept' | 'unity' | 'ground' | 'first' | 'top' | 'architecture'

interface TempleBlock {
  id: BlockId
  title: string
  subtitle?: string
  body?: string
  year?: string
  color: string
  activeColor: string
  textColor: string
  activeTextColor?: string
  flexBasis?: string
  minHeight?: number
  titleSize?: 'lg' | 'md' | 'sm'
}

function isDarkColor(hex: string): boolean {
  const h = hex.replace('#', '')
  const r = parseInt(h.slice(0, 2), 16) / 255
  const g = parseInt(h.slice(2, 4), 16) / 255
  const b = parseInt(h.slice(4, 6), 16) / 255
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b
  return luminance < 0.55
}

const TEMPLE_BLOCKS: TempleBlock[] = [
  {
    id: 'concept',
    title: 'Paintings for the Temple',
    subtitle: 'The central series',
    body:
      'Between 1906 and 1915 Hilma af Klint created more than 190 works as one spiritual building — a temple of images where each series occupies its own level.',
    year: '1906–1915',
    color: '#829EB1',
    activeColor: '#394A8B',
    textColor: '#FBEFDF',
    flexBasis: '56.522%',
    minHeight: 420,
    titleSize: 'lg',
  },
  {
    id: 'unity',
    title: 'Unity beyond duality',
    subtitle: 'The invisible made visible',
    body:
      'Material and spiritual, seen and unseen meet in harmony. Each painting is a map of an inner world — forms, colours, and symbols speaking beyond words.',
    color: '#E7E0D2',
    activeColor: '#403B37',
    textColor: '#403B37',
    activeTextColor: '#FBEFDF',
    flexBasis: '43.478%',
    minHeight: 420,
    titleSize: 'md',
  },
  {
    id: 'ground',
    title: 'Ground Level',
    subtitle: 'Paintings for the Temple',
    body: 'The foundation — the series that anchors the spiritual journey.',
    color: '#394A8B',
    activeColor: '#829EB1',
    textColor: '#FBEFDF',
    flexBasis: '35%',
    minHeight: 360,
    titleSize: 'md',
  },
  {
    id: 'first',
    title: 'First Level',
    subtitle: 'The Ten Largest',
    body: 'Four stages of life: childhood, youth, adulthood, old age.',
    color: '#ED740C',
    activeColor: '#394A8B',
    textColor: '#FBEFDF',
    flexBasis: '32.5%',
    minHeight: 360,
    titleSize: 'md',
  },
  {
    id: 'top',
    title: 'Top Level',
    subtitle: 'Altarpieces',
    body: 'The culmination — the highest point of the spiritual path.',
    color: '#F1BC3E',
    activeColor: '#ED740C',
    textColor: '#403B37',
    activeTextColor: '#FBEFDF',
    flexBasis: '32.5%',
    minHeight: 360,
    titleSize: 'md',
  },
  {
    id: 'architecture',
    title: 'Temple as architecture',
    subtitle: 'Levels of ascent',
    body:
      'The temple is not a building in stone but an architecture of consciousness — each level a chamber of meaning, each series a step upward.',
    color: '#403B37',
    activeColor: '#829EB1',
    textColor: '#FBEFDF',
    flexBasis: '100%',
    minHeight: 280,
    titleSize: 'lg',
  },
]

const titleFontSize = {
  lg: 'clamp(2rem, 6vw, 4rem)',
  md: 'clamp(1.5rem, 4vw, 2.5rem)',
  sm: 'clamp(1.25rem, 3vw, 2rem)',
}

const TempleSection = () => {
  const isMobile = useIsMobile()
  const canHover = useCanHover()
  const [hoveredId, setHoveredId] = useState<BlockId | null>(null)
  const [prevHoveredId, setPrevHoveredId] = useState<BlockId | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [showStick, setShowStick] = useState(false)
  const [showArrowHead, setShowArrowHead] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const isFirstHover = prevHoveredId === null && hoveredId !== null

    if (hoveredId !== null) {
      if (isFirstHover) {
        const timer1 = setTimeout(() => setShowStick(true), 500)
        const timer2 = setTimeout(() => setShowArrowHead(true), 800)
        return () => {
          clearTimeout(timer1)
          clearTimeout(timer2)
        }
      }
      setShowStick(true)
      setShowArrowHead(true)
    } else {
      setShowStick(false)
      setShowArrowHead(false)
    }

    setPrevHoveredId(hoveredId)
  }, [hoveredId, prevHoveredId])

  const hoveredBlock = TEMPLE_BLOCKS.find((b) => b.id === hoveredId)
  const cursorStroke =
    hoveredBlock && isDarkColor(hoveredBlock.activeColor) ? '#FBEFDF' : '#403B37'

  const renderBlock = (block: TempleBlock, index: number, showBody = false) => {
    const isHovered = canHover && hoveredId === block.id
    const fontSize = titleFontSize[block.titleSize ?? 'md']
    const bgColor = isHovered ? block.activeColor : block.color
    const fgColor = isHovered
      ? (block.activeTextColor ?? block.textColor)
      : block.textColor

    return (
      <motion.div
        key={block.id}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.08, duration: 0.6 }}
        className="flex flex-col justify-between relative w-full md:w-auto"
        style={{
          minHeight: isMobile
            ? block.id === 'architecture'
              ? 240
              : 260
            : block.minHeight,
          flexBasis: isMobile ? '100%' : block.flexBasis,
          flexShrink: 0,
          flexGrow: 0,
          borderBottomRightRadius: isMobile ? '2rem' : '50px',
          backgroundColor: bgColor,
          color: fgColor,
          overflow: 'hidden',
          padding: isHovered ? '24px 24px 5px 0' : '20px 20px 16px 20px',
          cursor: canHover ? 'none' : 'default',
          transition: 'background-color 0.45s ease, color 0.45s ease, padding 0.3s ease',
        }}
        onMouseEnter={() => canHover && setHoveredId(block.id)}
        onMouseLeave={() => canHover && setHoveredId(null)}
      >
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
          {block.year && (
            <span className="text-sm font-medium opacity-80">{block.year}</span>
          )}
        </div>

        {showBody && block.body && (
          <p
            className="text-sm leading-relaxed opacity-90 mb-4 pr-2"
            style={{ maxWidth: '100%' }}
          >
            {block.body}
          </p>
        )}

        <div className="flex-1 min-h-[8px]" />

        <div
          className="flex justify-between items-end gap-3 relative"
          style={{ marginBottom: isHovered ? 0 : 8 }}
        >
          <div
            className={`flex flex-col min-w-0 flex-1 ${isMobile ? '' : 'items-end overflow-hidden'}`}
            style={{ transformOrigin: 'bottom left' }}
          >
            {isHovered ? (
              <motion.div
                className="flex whitespace-nowrap overflow-hidden w-full"
                animate={{ x: ['0%', '-100%'] }}
                transition={{
                  x: { duration: 20, ease: 'linear', repeat: Infinity, repeatType: 'loop' },
                }}
              >
                <h3 className="font-bold inline-block mr-8" style={{ fontSize }}>
                  {block.title}
                </h3>
                <h3 className="font-bold inline-block mr-8" style={{ fontSize }}>
                  {block.title}
                </h3>
              </motion.div>
            ) : (
              <>
                <h3
                  className="font-bold leading-tight"
                  style={{
                    fontSize: isMobile ? titleFontSize.sm : fontSize,
                    wordBreak: 'break-word',
                  }}
                >
                  {block.title}
                </h3>
                {block.subtitle && (
                  <p
                    className={`text-sm opacity-90 mt-1 ${isMobile ? 'block' : 'inline-block ml-0 md:ml-2'}`}
                  >
                    {block.subtitle}
                  </p>
                )}
              </>
            )}
          </div>

          <span
            className="text-xl md:text-2xl font-medium shrink-0 tabular-nums"
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
              isHovered
                ? { duration: 1.5, repeat: Infinity, ease: 'linear' }
                : { duration: 0 }
            }
          />
        </div>
      </motion.div>
    )
  }

  const conceptRow = TEMPLE_BLOCKS.filter((b) => b.id === 'concept' || b.id === 'unity')
  const levelRow = TEMPLE_BLOCKS.filter((b) => ['ground', 'first', 'top'].includes(b.id))
  const archBlock = TEMPLE_BLOCKS.find((b) => b.id === 'architecture')!

  return (
    <section
      id="temple"
      className="relative min-h-screen py-12 md:py-20 px-4 md:px-6 overflow-x-hidden"
      style={{ backgroundColor: '#C1C0B6', zIndex: 1 }}
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Animated title */}
        <div className="mb-6 md:mb-12 overflow-hidden w-full">
          <AnimatedTitle
            text="The Temple"
            align="left"
            className="!text-[#403B37]"
          />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl text-base md:text-lg leading-relaxed mb-8 md:mb-16"
          style={{ color: '#403B37' }}
        >
          The temple concept is central to Hilma af Klint&apos;s work — paintings as
          architecture of an invisible world, where each series occupies its own level
          in a spiritual building.
        </motion.p>

        {/* Row 1 — concept + unity (GridSection 90% row) */}
        <div className="flex flex-col md:flex-row gap-0 justify-start mb-0 w-full md:w-[90%] max-w-full">
          {conceptRow.map((block, i) => renderBlock(block, i, true))}
        </div>

        {/* Row 2 — three temple levels */}
        <div className="mt-0 mb-0">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm uppercase tracking-[0.2em] py-6 md:py-8"
            style={{ color: '#403B37', opacity: 0.7 }}
          >
            Levels of the temple
          </motion.p>
          <div className="flex flex-col md:flex-row gap-0 justify-start w-full">
            {levelRow.map((block, i) => renderBlock(block, i + 2, true))}
          </div>
        </div>

        {/* Row 3 — architecture banner */}
        <div className="mt-0 w-full">{renderBlock(archBlock, 5, true)}</div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-12 md:mt-16"
        >
          <a
            href="#ten-largest"
            className="inline-block px-8 py-4 font-semibold rounded-full transition-all duration-300 hover:opacity-90 no-underline"
            style={{
              backgroundColor: '#403B37',
              color: '#FBEFDF',
              letterSpacing: '0.05em',
            }}
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#ten-largest')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Explore The Ten Largest
          </a>
        </motion.div>
      </div>

      {/* Custom cursor */}
      <AnimatePresence>
        {canHover && hoveredId !== null && (
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
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
              <g transform="rotate(60 64 64)">
                <motion.path
                  d="M64 36 L64 92"
                  stroke={cursorStroke}
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ opacity: 0, pathLength: 0 }}
                  animate={{ opacity: showStick ? 1 : 0, pathLength: showStick ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                />
                <motion.path
                  d="M44 64 L64 36 L84 64"
                  stroke={cursorStroke}
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ opacity: 0, pathLength: 0 }}
                  animate={{ opacity: showArrowHead ? 1 : 0, pathLength: showArrowHead ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                />
              </g>
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default TempleSection
