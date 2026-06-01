import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useCanHover, useIsMobile } from '../../hooks/useMedia'
import AnimatedTitle from '../AnimatedTitle'

const AboutSection = () => {
  const isMobile = useIsMobile()
  const canHover = useCanHover()
  const [isHovered, setIsHovered] = useState(false)
  const [isSpiritualHovered, setIsSpiritualHovered] = useState(false)
  const [isWhyHovered, setIsWhyHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [showStick, setShowStick] = useState(false)
  const [showArrowHead, setShowArrowHead] = useState(false)
  const [showSpiritualStick, setShowSpiritualStick] = useState(false)
  const [showSpiritualArrowHead, setShowSpiritualArrowHead] = useState(false)
  const [showWhyStick, setShowWhyStick] = useState(false)
  const [showWhyArrowHead, setShowWhyArrowHead] = useState(false)
  const [prevHovered, setPrevHovered] = useState(false)
  const [prevSpiritualHovered, setPrevSpiritualHovered] = useState(false)
  const [prevWhyHovered, setPrevWhyHovered] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const isFirstHover = !prevHovered && isHovered
    
    if (isHovered) {
      if (isFirstHover) {
        const timer1 = setTimeout(() => {
          setShowStick(true)
        }, 500)
        const timer2 = setTimeout(() => {
          setShowArrowHead(true)
        }, 800)
        return () => {
          clearTimeout(timer1)
          clearTimeout(timer2)
        }
      } else {
        setShowStick(true)
        setShowArrowHead(true)
      }
    } else {
      setShowStick(false)
      setShowArrowHead(false)
    }
    
    setPrevHovered(isHovered)
  }, [isHovered, prevHovered])

  useEffect(() => {
    const isFirstHover = !prevSpiritualHovered && isSpiritualHovered
    
    if (isSpiritualHovered) {
      if (isFirstHover) {
        const timer1 = setTimeout(() => {
          setShowSpiritualStick(true)
        }, 500)
        const timer2 = setTimeout(() => {
          setShowSpiritualArrowHead(true)
        }, 800)
        return () => {
          clearTimeout(timer1)
          clearTimeout(timer2)
        }
      } else {
        setShowSpiritualStick(true)
        setShowSpiritualArrowHead(true)
      }
    } else {
      setShowSpiritualStick(false)
      setShowSpiritualArrowHead(false)
    }
    
    setPrevSpiritualHovered(isSpiritualHovered)
  }, [isSpiritualHovered, prevSpiritualHovered])

  useEffect(() => {
    const isFirstHover = !prevWhyHovered && isWhyHovered
    
    if (isWhyHovered) {
      if (isFirstHover) {
        const timer1 = setTimeout(() => {
          setShowWhyStick(true)
        }, 500)
        const timer2 = setTimeout(() => {
          setShowWhyArrowHead(true)
        }, 800)
        return () => {
          clearTimeout(timer1)
          clearTimeout(timer2)
        }
      } else {
        setShowWhyStick(true)
        setShowWhyArrowHead(true)
      }
    } else {
      setShowWhyStick(false)
      setShowWhyArrowHead(false)
    }
    
    setPrevWhyHovered(isWhyHovered)
  }, [isWhyHovered, prevWhyHovered])
  return (
    <section
      id="about"
      className="relative min-h-screen py-16 md:py-32 px-4 md:px-0 rounded-2xl md:rounded-[3rem] overflow-x-hidden"
      style={{ backgroundColor: '#403B37', zIndex: 1 }}
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="mb-6 md:mb-12 overflow-hidden w-full">
          <AnimatedTitle text="About" align="left" className="!text-[#FBEFDF]" />
        </div>

        <div className="flex flex-col md:flex-row gap-0 items-stretch w-full">
          {/* Biography Block */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="backdrop-blur-sm p-6 md:p-12 shadow-xl border-2 relative overflow-hidden flex flex-col justify-between w-full"
            style={{ 
              backgroundColor: '#403B37', 
              borderColor: '#FBEFDF',
              borderTopLeftRadius: '0',
              borderTopRightRadius: '0',
              borderBottomLeftRadius: '0',
              borderBottomRightRadius: isMobile ? '2rem' : '3rem',
              cursor: canHover ? 'none' : 'default',
              height: isMobile ? 'auto' : '400px',
              minHeight: isMobile ? 'min(70vh, 420px)' : '400px',
              padding: isHovered && canHover ? '24px 24px 5px 0px' : '24px 24px 15px 24px',
              flexBasis: isMobile ? '100%' : '65%',
              flexShrink: 0,
              flexGrow: 0,
              width: isMobile ? '100%' : '65%',
              maxWidth: isMobile ? '100%' : '65%',
              minWidth: isMobile ? '0' : '65%'
            }}
            whileHover={canHover ? 'hover' : undefined}
            onMouseEnter={() => canHover && setIsHovered(true)}
            onMouseLeave={() => canHover && setIsHovered(false)}
          >
            {/* Default content - visible when not hovered */}
            {(!isHovered || !canHover) && (
              <>
                <h3 className="text-3xl font-serif font-semibold mb-6" style={{ color: '#FBEFDF' }}>
                  Biography
                </h3>
                <div className="space-y-4 leading-relaxed" style={{ color: '#FBEFDF' }}>
                  <p>
                    Hilma af Klint (1862–1944) was a Swedish artist and one of the first
                    abstract painters in the history of art. Born in Stockholm, she received
                    a classical art education at the Royal Academy of Fine Arts.
                  </p>
                  <p>
                    In 1896, together with four friends, she created the group "The Five" (De Fem),
                    which engaged in spiritualist séances and automatic writing.
                    From 1906 to 1915, she created more than 190 paintings for the series "Paintings for the
                    Temple" under the guidance of spiritual mentors she called "High Masters."
                  </p>
                  <p>
                    Hilma af Klint bequeathed that her abstract works should not be shown until 20 years
                    after her death. True recognition came after the exhibition at the Guggenheim in 2018.
                  </p>
                </div>
              </>
            )}
            
            {/* Hover content - visible when hovered (desktop only) */}
            {isHovered && canHover && (
              <>
                <div className="flex-1"></div>
                <div className="flex justify-between items-end relative" style={{ marginBottom: '0px' }}>
                    <motion.div
                      className="whitespace-nowrap flex items-end overflow-hidden"
                      style={{ transformOrigin: 'bottom left', width: '100%', maxWidth: '100%', overflow: 'hidden' }}
                      initial={{ y: 20 }}
                      animate={{
                        scale: isHovered ? 2.5 : 1,
                        y: isHovered ? 100 : 20,
                        transition: { 
                          scale: { duration: 0.3 },
                          y: { duration: 0.3 }
                        }
                      }}
                    >
                    <motion.div 
                      className="flex whitespace-nowrap"
                      initial={{ x: 0 }}
                      animate={{
                        x: ['0%', '-100%'],
                        transition: { 
                          x: { 
                            duration: 20,
                            ease: 'linear',
                            repeat: Infinity,
                            repeatType: 'loop'
                          }
                        }
                      }}
                    >
                      <div className="inline-block mr-8">
                        <h3 className="font-bold mb-2 inline-block" style={{ color: '#FBEFDF', fontSize: 'clamp(2.5rem, 10vw, 8rem)' }}>Biography</h3>
                      </div>
                      <motion.div 
                        className="inline-block mr-8 overflow-hidden"
                        initial={{ opacity: 0, width: 0 }}
                        animate={{
                          opacity: 1,
                          width: 'auto',
                          transition: { duration: 0.3 }
                        }}
                      >
                        <motion.div className="whitespace-nowrap inline-block"
                          animate={{
                            x: ['100%', '-100%']
                          }}
                          transition={{ 
                            x: { 
                              duration: 20,
                              ease: 'linear',
                              repeat: Infinity,
                              repeatType: 'loop'
                            }
                          }}
                        >
                          <h3 className="font-bold text-3xl mb-2 inline-block" style={{ color: '#FBEFDF' }}>Biography</h3>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 overflow-hidden" style={{ height: '1px' }}>
                  <motion.div
                    className="h-px bg-current opacity-30"
                    style={{ width: '100%' }}
                    animate={{
                      x: ['100%', '-100%'],
                      transition: {
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'linear'
                      }
                    }}
                  />
                </div>
              </>
            )}
          </motion.div>
          
          {/* Custom cursor for Biography */}
          <AnimatePresence>
            {isHovered && canHover && (
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
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                <svg
                  width="128"
                  height="128"
                  viewBox="0 0 128 128"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <motion.circle
                    cx="64"
                    cy="64"
                    r="56"
                    fill="none"
                    stroke="#FBEFDF"
                    strokeWidth="1.5"
                    initial={{ scale: 0.3, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.3, opacity: 0 }}
                    transition={{ 
                      duration: 0.6,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                  />
                  <g transform="rotate(60 64 64)">
                    <motion.path
                      d="M64 36 L64 92"
                      stroke="#FBEFDF"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      initial={{ opacity: 0, pathLength: 0, scale: 0.5 }}
                      animate={{ 
                        opacity: showStick ? 1 : 0,
                        pathLength: showStick ? 1 : 0,
                        scale: showStick ? 1 : 0.5
                      }}
                      transition={{ 
                        duration: 0.4,
                        ease: "easeInOut"
                      }}
                    />
                    <motion.path
                      d="M44 64 L64 36 L84 64"
                      stroke="#FBEFDF"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ opacity: 0, pathLength: 0, scale: 0.5 }}
                      animate={{ 
                        opacity: showArrowHead ? 1 : 0,
                        pathLength: showArrowHead ? 1 : 0,
                        scale: showArrowHead ? 1 : 0.5
                      }}
                      transition={{ 
                        duration: 0.4,
                        ease: "easeInOut"
                      }}
                    />
                  </g>
                </svg>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Right Column - Context Blocks */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-0 w-full"
            style={{
              flexBasis: isMobile ? '100%' : '35%',
              flexShrink: 0,
              flexGrow: 0,
              height: isMobile ? 'auto' : '400px',
              width: isMobile ? '100%' : '35%',
              maxWidth: isMobile ? '100%' : '35%',
              minWidth: isMobile ? '0' : '35%'
            }}
          >
            <motion.div 
              className="p-6 md:p-8 border-2 relative overflow-hidden flex flex-col justify-between w-full"
              style={{ 
                backgroundColor: '#403B37', 
                borderColor: '#FBEFDF',
                borderTopLeftRadius: '0',
                borderTopRightRadius: '0',
                borderBottomLeftRadius: '0',
                borderBottomRightRadius: isMobile ? '2rem' : '3rem',
                cursor: canHover ? 'none' : 'default',
                padding: isSpiritualHovered && canHover ? '24px 24px 5px 0px' : '24px 24px 15px 24px',
                marginTop: '0',
                height: isMobile ? 'auto' : '50%',
                minHeight: isMobile ? '200px' : undefined,
                flexShrink: 0
              }}
              whileHover={canHover ? 'hover' : undefined}
              onMouseEnter={() => canHover && setIsSpiritualHovered(true)}
              onMouseLeave={() => canHover && setIsSpiritualHovered(false)}
            >
              {(!isSpiritualHovered || !canHover) && (
                <>
                  <h4 className="text-lg font-semibold mb-0" style={{ color: '#FBEFDF' }}>
                    Spiritual Ideas
                  </h4>
                  <p className="leading-relaxed text-sm" style={{ color: '#FBEFDF' }}>
                    Hilma af Klint's work is based on theosophical and anthroposophical ideas,
                    spiritualism and occultism. She believed in the existence of an invisible world
                    that can be visualized through abstract forms and symbols.
                  </p>
                </>
              )}
              
              {isSpiritualHovered && canHover && (
                <>
                  <div className="flex-1"></div>
                  <div className="flex justify-between items-end relative" style={{ marginBottom: '0px' }}>
                    <motion.div
                      className="whitespace-nowrap flex items-end overflow-hidden"
                      style={{ transformOrigin: 'bottom left', width: '100%', maxWidth: '100%', overflow: 'hidden' }}
                      initial={{ y: 20 }}
                      animate={{
                        scale: isSpiritualHovered && canHover ? 2.5 : 1,
                        y: isSpiritualHovered ? 30 : 0,
                        transition: { 
                          scale: { duration: 0.3 },
                          y: { duration: 0.3 }
                        }
                      }}
                    >
                      <motion.div 
                        className="flex whitespace-nowrap"
                        initial={{ x: 0 }}
                        animate={{
                          x: ['0%', '-100%'],
                          transition: { 
                            x: { 
                              duration: 20,
                              ease: 'linear',
                              repeat: Infinity,
                              repeatType: 'loop'
                            }
                          }
                        }}
                      >
                        <div className="inline-block mr-8">
                          <h4 className="font-bold mb-2 inline-block" style={{ color: '#FBEFDF', fontSize: 'clamp(1.5rem, 5vw, 3rem)' }}>Spiritual Ideas</h4>
                        </div>
                        <motion.div 
                          className="inline-block mr-8 overflow-hidden"
                          initial={{ opacity: 0, width: 0 }}
                          animate={{
                            opacity: 1,
                            width: 'auto',
                            transition: { duration: 0.3 }
                          }}
                        >
                          <motion.div className="whitespace-nowrap inline-block"
                            animate={{
                              x: ['100%', '-100%']
                            }}
                            transition={{ 
                              x: { 
                                duration: 20,
                                ease: 'linear',
                                repeat: Infinity,
                                repeatType: 'loop'
                              }
                            }}
                          >
                            <h4 className="font-bold mb-2 inline-block" style={{ color: '#FBEFDF', fontSize: 'clamp(1.25rem, 4vw, 2.5rem)' }}>Spiritual Ideas</h4>
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 overflow-hidden" style={{ height: '1px' }}>
                    <motion.div
                      className="h-px bg-current opacity-30"
                      style={{ width: '100%' }}
                      animate={{
                        x: ['100%', '-100%'],
                        transition: {
                          duration: 1.5,
                          repeat: Infinity,
                          ease: 'linear'
                        }
                      }}
                    />
                  </div>
                </>
              )}
            </motion.div>
            
            {/* Custom cursor for Spiritual Ideas block */}
            <AnimatePresence>
              {isSpiritualHovered && canHover && (
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
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                >
                  <svg
                    width="128"
                    height="128"
                    viewBox="0 0 128 128"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <motion.circle
                      cx="64"
                      cy="64"
                      r="56"
                      fill="none"
                      stroke="#FBEFDF"
                      strokeWidth="1.5"
                      initial={{ scale: 0.3, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.3, opacity: 0 }}
                      transition={{ 
                        duration: 0.6,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }}
                    />
                    <g transform="rotate(60 64 64)">
                      <motion.path
                        d="M64 36 L64 92"
                        stroke="#FBEFDF"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        initial={{ opacity: 0, pathLength: 0, scale: 0.5 }}
                        animate={{ 
                          opacity: showSpiritualStick ? 1 : 0,
                          pathLength: showSpiritualStick ? 1 : 0,
                          scale: showSpiritualStick ? 1 : 0.5
                        }}
                        transition={{ 
                          duration: 0.4,
                          ease: "easeInOut"
                        }}
                      />
                      <motion.path
                        d="M44 64 L64 36 L84 64"
                        stroke="#FBEFDF"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ opacity: 0, pathLength: 0, scale: 0.5 }}
                        animate={{ 
                          opacity: showSpiritualArrowHead ? 1 : 0,
                          pathLength: showSpiritualArrowHead ? 1 : 0,
                          scale: showSpiritualArrowHead ? 1 : 0.5
                        }}
                        transition={{ 
                          duration: 0.4,
                          ease: "easeInOut"
                        }}
                      />
                    </g>
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div 
              className="p-6 md:p-8 border-2 relative overflow-hidden flex flex-col justify-between w-full"
              style={{ 
                backgroundColor: '#403B37', 
                borderColor: '#FBEFDF',
                borderTopLeftRadius: '0',
                borderTopRightRadius: '0',
                borderBottomLeftRadius: '0',
                borderBottomRightRadius: isMobile ? '2rem' : '3rem',
                cursor: canHover ? 'none' : 'default',
                padding: isWhyHovered && canHover ? '24px 24px 5px 0px' : '24px 24px 15px 24px',
                marginTop: '0',
                height: isMobile ? 'auto' : '50%',
                minHeight: isMobile ? '200px' : undefined,
                flexShrink: 0
              }}
              whileHover={canHover ? 'hover' : undefined}
              onMouseEnter={() => canHover && setIsWhyHovered(true)}
              onMouseLeave={() => canHover && setIsWhyHovered(false)}
            >
              {(!isWhyHovered || !canHover) && (
                <>
                  <h4 className="text-lg font-semibold mb-2" style={{ color: '#FBEFDF' }}>
                    Why It Matters
                  </h4>
                  <p className="leading-relaxed text-sm" style={{ color: '#FBEFDF' }}>
                    Hilma af Klint created abstract works several years before Kandinsky,
                    Malevich, and Mondrian, but her work remained unknown for a long time.
                    Her works open a new chapter in the history of abstract art and show
                    that abstraction can be not only a formal experiment but also a deep
                    spiritual exploration.
                  </p>
                </>
              )}
              
              {isWhyHovered && canHover && (
                <>
                  <div className="flex-1"></div>
                  <div className="flex justify-between items-end relative" style={{ marginBottom: '0px' }}>
                    <motion.div
                      className="whitespace-nowrap flex items-end overflow-hidden"
                      style={{ transformOrigin: 'bottom left', width: '100%', maxWidth: '100%', overflow: 'hidden' }}
                      initial={{ y: 20 }}
                      animate={{
                        scale: isWhyHovered && canHover ? 2.5 : 1,
                        y: isWhyHovered ? 30 : 0,
                        transition: { 
                          scale: { duration: 0.3 },
                          y: { duration: 0.3 }
                        }
                      }}
                    >
                      <motion.div 
                        className="flex whitespace-nowrap"
                        initial={{ x: 0 }}
                        animate={{
                          x: ['0%', '-100%'],
                          transition: { 
                            x: { 
                              duration: 20,
                              ease: 'linear',
                              repeat: Infinity,
                              repeatType: 'loop'
                            }
                          }
                        }}
                      >
                        <div className="inline-block mr-8">
                          <h4 className="font-bold mb-2 inline-block" style={{ color: '#FBEFDF', fontSize: 'clamp(1.5rem, 5vw, 3rem)' }}>Why It Matters</h4>
                        </div>
                        <motion.div 
                          className="inline-block mr-8 overflow-hidden"
                          initial={{ opacity: 0, width: 0 }}
                          animate={{
                            opacity: 1,
                            width: 'auto',
                            transition: { duration: 0.3 }
                          }}
                        >
                          <motion.div className="whitespace-nowrap inline-block"
                            animate={{
                              x: ['100%', '-100%']
                            }}
                            transition={{ 
                              x: { 
                                duration: 20,
                                ease: 'linear',
                                repeat: Infinity,
                                repeatType: 'loop'
                              }
                            }}
                          >
                            <h4 className="font-bold mb-2 inline-block" style={{ color: '#FBEFDF', fontSize: 'clamp(1.25rem, 4vw, 2.5rem)' }}>Why It Matters</h4>
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 overflow-hidden" style={{ height: '1px' }}>
                    <motion.div
                      className="h-px bg-current opacity-30"
                      style={{ width: '100%' }}
                      animate={{
                        x: ['100%', '-100%'],
                        transition: {
                          duration: 1.5,
                          repeat: Infinity,
                          ease: 'linear'
                        }
                      }}
                    />
                  </div>
                </>
              )}
            </motion.div>
            
            {/* Custom cursor for Why It Matters block */}
            <AnimatePresence>
              {isWhyHovered && canHover && (
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
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                >
                  <svg
                    width="128"
                    height="128"
                    viewBox="0 0 128 128"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <motion.circle
                      cx="64"
                      cy="64"
                      r="56"
                      fill="none"
                      stroke="#FBEFDF"
                      strokeWidth="1.5"
                      initial={{ scale: 0.3, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.3, opacity: 0 }}
                      transition={{ 
                        duration: 0.6,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }}
                    />
                    <g transform="rotate(60 64 64)">
                      <motion.path
                        d="M64 36 L64 92"
                        stroke="#FBEFDF"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        initial={{ opacity: 0, pathLength: 0, scale: 0.5 }}
                        animate={{ 
                          opacity: showWhyStick ? 1 : 0,
                          pathLength: showWhyStick ? 1 : 0,
                          scale: showWhyStick ? 1 : 0.5
                        }}
                        transition={{ 
                          duration: 0.4,
                          ease: "easeInOut"
                        }}
                      />
                      <motion.path
                        d="M44 64 L64 36 L84 64"
                        stroke="#FBEFDF"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ opacity: 0, pathLength: 0, scale: 0.5 }}
                        animate={{ 
                          opacity: showWhyArrowHead ? 1 : 0,
                          pathLength: showWhyArrowHead ? 1 : 0,
                          scale: showWhyArrowHead ? 1 : 0.5
                        }}
                        transition={{ 
                          duration: 0.4,
                          ease: "easeInOut"
                        }}
                      />
                    </g>
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection

