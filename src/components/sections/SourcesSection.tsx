import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import AnimatedTitle from '../AnimatedTitle'
import { useCanHover, useIsMobile } from '../../hooks/useMedia'

interface Museum {
  id: string
  name: string
  location: string
  description: string
  link: string
  color: string
  textColor: string
  activeColor: string
}

interface ResourceGroup {
  id: string
  title: string
  items: string[]
  color: string
  textColor: string
}

const MUSEUMS: Museum[] = [
  {
    id: 'guggenheim',
    name: 'Guggenheim Museum',
    location: 'New York, USA',
    description:
      'The 2018–19 exhibition Paintings for the Future brought global recognition to Hilma af Klint’s work.',
    link: 'https://www.guggenheim.org',
    color: '#829EB1',
    textColor: '#FBEFDF',
    activeColor: '#394A8B',
  },
  {
    id: 'moderna',
    name: 'Moderna Museet',
    location: 'Stockholm, Sweden',
    description:
      'Home to the Hilma af Klint Foundation archive — the largest collection of her paintings.',
    link: 'https://www.modernamuseet.se',
    color: '#F1BC3E',
    textColor: '#403B37',
    activeColor: '#ED740C',
  },
  {
    id: 'agnsw',
    name: 'Art Gallery of NSW',
    location: 'Sydney, Australia',
    description:
      'Australian presentations of The Ten Largest and Paintings for the Temple in a museum context.',
    link: 'https://www.artgallery.nsw.gov.au',
    color: '#E7E0D2',
    textColor: '#403B37',
    activeColor: '#403B37',
  },
]

const RESOURCES: ResourceGroup[] = [
  {
    id: 'publications',
    title: 'Catalogues & books',
    color: '#394A8B',
    textColor: '#FBEFDF',
    items: [
      'Hilma af Klint: Paintings for the Future (Guggenheim, 2018)',
      'Hilma af Klint: Catalogue Raisonné',
      'The Five: The Spiritual Art of Hilma af Klint',
    ],
  },
  {
    id: 'exhibitions',
    title: 'Key exhibitions',
    color: '#ED740C',
    textColor: '#FBEFDF',
    items: [
      'Paintings for the Future — Guggenheim, 2018–19',
      'The Secret Pictures — Moderna Museet, 2013',
      'A Pioneer of Abstraction — touring exhibitions',
    ],
  },
]

function isDarkColor(hex: string): boolean {
  const h = hex.replace('#', '')
  const r = parseInt(h.slice(0, 2), 16) / 255
  const g = parseInt(h.slice(2, 4), 16) / 255
  const b = parseInt(h.slice(4, 6), 16) / 255
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b
  return luminance < 0.55
}

const MORE_LINKS = [
  {
    label: 'Hilma af Klint Foundation',
    href: 'https://hilmaafklint.se',
    sub: 'Archive & image rights',
  },
  {
    label: 'Wikimedia Commons',
    href: 'https://commons.wikimedia.org/wiki/Category:Paintings_by_Hilma_af_Klint',
    sub: 'Paintings on this site',
  },
]

const SourcesSection = () => {
  const isMobile = useIsMobile()
  const canHover = useCanHover()
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [prevHoveredId, setPrevHoveredId] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [showStick, setShowStick] = useState(false)
  const [showArrowHead, setShowArrowHead] = useState(false)

  useEffect(() => {
    if (!canHover) return
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [canHover])

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

  const hoveredMuseum = MUSEUMS.find((m) => m.id === hoveredId)
  const cursorStroke =
    hoveredMuseum && isDarkColor(hoveredMuseum.activeColor) ? '#FBEFDF' : '#403B37'

  const renderMuseumBlock = (museum: Museum, index: number) => {
    const isHovered = canHover && hoveredId === museum.id

    return (
      <motion.a
        key={museum.id}
        href={museum.link}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.08 }}
        className="flex flex-col justify-between relative w-full max-w-full no-underline"
        style={{
          minHeight: isMobile ? 220 : 280,
          flexBasis: isMobile ? '100%' : '33.333%',
          flexShrink: 0,
          flexGrow: 0,
          backgroundColor: isHovered ? museum.activeColor : museum.color,
          color: isHovered ? '#FBEFDF' : museum.textColor,
          borderBottomRightRadius: isMobile ? '2rem' : '50px',
          padding: '22px 20px',
          cursor: canHover ? 'none' : 'pointer',
        }}
        onMouseEnter={() => canHover && setHoveredId(museum.id)}
        onMouseLeave={() => canHover && setHoveredId(null)}
      >
        <span className="text-sm font-medium opacity-70 tabular-nums">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="flex-1 min-h-[12px]" />
        <div className="min-w-0" style={{ wordBreak: 'break-word' }}>
          <h3 className="font-bold text-xl md:text-2xl leading-tight mb-1">{museum.name}</h3>
          <p className="text-sm opacity-80 mb-3">{museum.location}</p>
          <p className="text-sm leading-relaxed opacity-95">{museum.description}</p>
        </div>
        <span
          className="text-xs uppercase tracking-widest mt-4 inline-block"
          style={{ opacity: 0.7 }}
        >
          Visit site →
        </span>
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
      </motion.a>
    )
  }

  return (
    <section
      id="sources"
      className="relative min-h-screen py-12 md:py-20 px-4 md:px-6 overflow-x-hidden"
      style={{ backgroundColor: '#C1C0B6', zIndex: 1 }}
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="mb-6 md:mb-10 overflow-hidden">
          <AnimatedTitle text="Sources" align="left" className="!text-[#403B37]" />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl text-base md:text-lg leading-relaxed mb-8 md:mb-12"
          style={{ color: '#403B37', opacity: 0.9 }}
        >
          Museums, publications, and archives for further reading on Hilma af Klint and{' '}
          <em>Paintings for the Temple</em>.
        </motion.p>

        <p
          className="text-xs uppercase tracking-[0.25em] mb-3"
          style={{ color: '#403B37', opacity: 0.5 }}
        >
          Collections
        </p>

        <div className="flex flex-col md:flex-row gap-0 w-full max-w-full mb-0">
          {MUSEUMS.map((m, i) => renderMuseumBlock(m, i))}
        </div>

        <p
          className="text-xs uppercase tracking-[0.25em] py-8 md:py-10"
          style={{ color: '#403B37', opacity: 0.5 }}
        >
          Further reading
        </p>

        <div className="flex flex-col md:flex-row gap-0 w-full max-w-full">
          {RESOURCES.map((group, index) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col w-full md:w-1/2"
              style={{
                backgroundColor: group.color,
                color: group.textColor,
                borderBottomRightRadius: isMobile ? '2rem' : '50px',
                padding: '28px 24px',
                minHeight: isMobile ? 240 : 280,
              }}
            >
              <h3 className="font-bold text-xl md:text-2xl mb-6 leading-tight">{group.title}</h3>
              <ul className="space-y-4 flex-1 list-none m-0 p-0">
                {group.items.map((item, i) => (
                  <li
                    key={i}
                    className="text-sm md:text-base leading-relaxed flex gap-3"
                    style={{ opacity: 0.95 }}
                  >
                    <span className="shrink-0 tabular-nums opacity-50">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Quick links + image rights */}
        <div className="flex flex-col lg:flex-row gap-0 w-full max-w-full mt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 flex flex-col gap-0"
            style={{
              backgroundColor: '#E7E0D2',
              color: '#403B37',
              borderBottomRightRadius: isMobile ? '2rem' : '50px',
              padding: '28px 24px',
              minHeight: isMobile ? 200 : 240,
            }}
          >
            <h3 className="font-bold text-lg md:text-xl mb-6">Online</h3>
            {MORE_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block py-4 border-t no-underline transition-opacity hover:opacity-70"
                style={{ borderColor: 'rgba(64,59,55,0.15)', color: '#403B37' }}
              >
                <span className="font-semibold text-base block">{link.label}</span>
                <span className="text-sm opacity-70">{link.sub}</span>
              </a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="w-full lg:w-1/2"
            style={{
              backgroundColor: '#403B37',
              color: '#FBEFDF',
              borderBottomRightRadius: isMobile ? '2rem' : '50px',
              padding: '28px 24px',
              minHeight: isMobile ? 200 : 240,
            }}
          >
            <h3 className="font-bold text-lg md:text-xl mb-4">Image rights</h3>
            <p className="text-sm leading-relaxed opacity-90">
              Works by Hilma af Klint (1862–1944) are largely in the public domain. Photographic
              rights are held by the Hilma af Klint Foundation and museums such as Moderna
              Museet. Images on this educational site are credited to Wikimedia Commons unless
              otherwise noted. For publication or commercial use, contact the Foundation.
            </p>
            <a
              href="https://hilmaafklint.se/image-rights/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 text-xs uppercase tracking-widest no-underline"
              style={{ color: '#F1BC3E' }}
            >
              Image rights policy →
            </a>
          </motion.div>
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
            transition={{
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
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
                transition={{
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              />
              <g transform="rotate(60 64 64)">
                <motion.path
                  d="M64 36 L64 92"
                  stroke={cursorStroke}
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ opacity: 0, pathLength: 0, scale: 0.5 }}
                  animate={{
                    opacity: showStick ? 1 : 0,
                    pathLength: showStick ? 1 : 0,
                    scale: showStick ? 1 : 0.5,
                  }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                />
                <motion.path
                  d="M44 64 L64 36 L84 64"
                  stroke={cursorStroke}
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ opacity: 0, pathLength: 0, scale: 0.5 }}
                  animate={{
                    opacity: showArrowHead ? 1 : 0,
                    pathLength: showArrowHead ? 1 : 0,
                    scale: showArrowHead ? 1 : 0.5,
                  }}
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

export default SourcesSection
