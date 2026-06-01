import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useCanHover, useIsMobile } from '../../hooks/useMedia'

interface GridItem {
  id: number
  title: string
  subtitle?: string
  year?: string
  year2?: string
  textColor: string
}

type TitleSize = 'sm' | 'md' | 'lg'

const gridItems: GridItem[] = [
  { id: 1, title: 'Group I', subtitle: 'Primordial Chaos', year: '1906', textColor: 'text-gray-800' },
  { id: 2, title: 'Group IV', subtitle: 'The Ten Largest', year: '1907', textColor: 'text-gray-800' },
  { id: 3, title: 'Paintings for the Temple', year: '1906', year2: '1915', textColor: 'text-white' },
  { id: 4, title: 'Group X', subtitle: 'Altarpieces', year: '1915', textColor: 'text-white' },
  { id: 5, title: 'Group VII', subtitle: 'Series US', year: '1907', textColor: 'text-white' },
  { id: 6, title: '1915', subtitle: 'Series', year: '1915', textColor: 'text-white' },
]

const titleSizeClasses: Record<TitleSize, { title: string; subtitle: string }> = {
  sm: { title: 'text-lg font-bold', subtitle: 'text-sm opacity-90' },
  md: { title: 'text-xl md:text-2xl font-bold', subtitle: 'text-sm opacity-90' },
  lg: { title: 'text-xl md:text-4xl font-bold leading-tight', subtitle: 'text-sm md:text-lg opacity-90' },
}

const GridSection = () => {
  const isMobile = useIsMobile()
  const canHover = useCanHover()
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [prevHoveredId, setPrevHoveredId] = useState<number | null>(null)
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

  const renderGridBlock = (
    item: GridItem,
    blockColor: string,
    flexBasis: string,
    titleSize: TitleSize,
    displayIndex: number,
    animationDelay: number
  ) => {
    const isHovered = canHover && hoveredId === item.id
    const sizes = titleSizeClasses[titleSize]
    const isLongTitle = item.title.length > 18

    return (
      <motion.div
        key={item.id}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: animationDelay }}
        className={`${item.textColor} flex flex-col justify-between relative w-full max-w-full`}
        style={{
          minHeight: isMobile ? (isLongTitle ? 240 : 220) : 400,
          flexBasis: isMobile ? '100%' : flexBasis,
          flexShrink: 0,
          flexGrow: 0,
          width: isMobile ? '100%' : undefined,
          maxWidth: '100%',
          borderBottomRightRadius: isMobile ? '2rem' : '50px',
          backgroundColor: blockColor,
          overflow: 'hidden',
          padding: isHovered ? '24px 24px 5px 0' : '20px 20px 16px 20px',
          cursor: canHover ? 'none' : 'default',
        }}
        onMouseEnter={() => canHover && setHoveredId(item.id)}
        onMouseLeave={() => canHover && setHoveredId(null)}
      >
        <div className="flex justify-end mb-auto gap-2 flex-wrap">
          {item.year && <span className="text-sm font-medium">{item.year}</span>}
          {item.year2 && <span className="text-sm font-medium">{item.year2}</span>}
        </div>

        <div className="flex-1 min-h-[8px]" />

        <div
          className="flex justify-between items-end gap-3 relative"
          style={{ marginBottom: isHovered ? 0 : isMobile ? 8 : 30 }}
        >
          <div className="min-w-0 flex-1">
            {isHovered ? (
              <motion.div
                className="flex whitespace-nowrap overflow-hidden w-full"
                animate={{ x: ['0%', '-100%'] }}
                transition={{
                  x: { duration: 20, ease: 'linear', repeat: Infinity, repeatType: 'loop' },
                }}
              >
                <div className="inline-block mr-8 shrink-0">
                  <h3 className={`${sizes.title} inline-block`}>{item.title}</h3>
                  {item.subtitle && (
                    <p className={`${sizes.subtitle} inline-block ml-2`}>{item.subtitle}</p>
                  )}
                </div>
                <div className="inline-block mr-8 shrink-0">
                  <h3 className={`${sizes.title} inline-block`}>{item.title}</h3>
                  {item.subtitle && (
                    <p className={`${sizes.subtitle} inline-block ml-2`}>{item.subtitle}</p>
                  )}
                </div>
              </motion.div>
            ) : (
              <div style={{ wordBreak: 'break-word' }}>
                <h3 className={`${sizes.title} leading-tight`}>{item.title}</h3>
                {item.subtitle && (
                  <p className={`${sizes.subtitle} mt-1 block`}>{item.subtitle}</p>
                )}
              </div>
            )}
          </div>

          <span
            className="text-xl md:text-2xl font-medium shrink-0 tabular-nums"
            style={{ opacity: isHovered ? 0 : 1, transition: 'opacity 0.2s' }}
          >
            {displayIndex}
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 overflow-hidden" style={{ height: 1 }}>
          <motion.div
            className="h-px bg-current opacity-30"
            style={{ width: '100%' }}
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

  const row1Colors = ['#F1BC3E', '#E7E0D2']
  const row2Colors = ['#829EB1', '#ED740C']
  const row2Basis = ['56.522%', '43.478%']
  const row3Colors = ['#394A8B', '#F1BC3E']
  const row3Basis = ['35%', '65%']

  return (
    <section
      id="grid-section"
      className="relative min-h-screen py-12 md:py-20 px-4 md:px-3 overflow-x-hidden"
      style={{ backgroundColor: '#C1C0B6' }}
    >
      <div className="pb-12 md:pb-20 max-w-full">
        <div className="w-full max-w-full">
          {/* Row 1 */}
          <div className="flex flex-col md:flex-row gap-0 justify-start mb-0 w-full md:w-[80%] max-w-full">
            {gridItems.slice(0, 2).map((item, index) =>
              renderGridBlock(
                item,
                row1Colors[index],
                '50%',
                'md',
                index + 1,
                index * 0.1
              )
            )}
          </div>

          {/* Row 2 */}
          <div className="flex flex-col md:flex-row gap-0 justify-start mb-0 w-full md:w-[90%] max-w-full">
            {gridItems.slice(2, 4).map((item, index) =>
              renderGridBlock(
                item,
                row2Colors[index],
                row2Basis[index],
                index === 0 ? 'lg' : 'lg',
                index + 3,
                (index + 2) * 0.1
              )
            )}
          </div>

          {/* Row 3 */}
          <div className="flex flex-col md:flex-row gap-0 justify-start mb-0 w-full max-w-full">
            {gridItems.slice(4, 6).map((item, index) =>
              renderGridBlock(
                item,
                row3Colors[index],
                row3Basis[index],
                'lg',
                index + 5,
                (index + 4) * 0.1
              )
            )}
          </div>
        </div>
      </div>

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
                stroke="#403B37"
                strokeWidth="1.5"
                initial={{ scale: 0.3, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.3, opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
              <g transform="rotate(60 64 64)">
                <motion.g
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{
                    scale: showStick || showArrowHead ? 1 : 0.5,
                    opacity: showStick || showArrowHead ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <motion.path
                    d="M64 36 L64 92"
                    stroke="#403B37"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ opacity: 0, pathLength: 0 }}
                    animate={{ opacity: showStick ? 1 : 0, pathLength: showStick ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                  />
                  <motion.path
                    d="M44 64 L64 36 L84 64"
                    stroke="#403B37"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ opacity: 0, pathLength: 0 }}
                    animate={{ opacity: showArrowHead ? 1 : 0, pathLength: showArrowHead ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                  />
                </motion.g>
              </g>
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default GridSection
