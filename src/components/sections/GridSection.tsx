import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const GridSection = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
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
    // Анимация запускается только если переход с null на блок (первое наведение)
    const isFirstHover = prevHoveredId === null && hoveredId !== null
    
    if (hoveredId !== null) {
      if (isFirstHover) {
        // Первое наведение - запускаем анимацию
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
        // Переход между блоками - сразу показываем стрелку
        setShowStick(true)
        setShowArrowHead(true)
      }
    } else {
      // Убрали курсор с блока
      setShowStick(false)
      setShowArrowHead(false)
    }
    
    // Обновляем предыдущее значение после обработки
    setPrevHoveredId(hoveredId)
  }, [hoveredId, prevHoveredId])
  const gridItems = [
    // Первая строка
    { id: 1, title: 'Group I', subtitle: 'Primordial Chaos', year: '1906', color: 'bg-gray-800', textColor: 'text-white', width: 'col-span-1', height: 'row-span-4' },
    { id: 2, title: 'Group IV', subtitle: 'The Ten Largest', year: '1907', color: 'bg-red-600', textColor: 'text-white', width: 'col-span-1', height: 'row-span-4' },
    
    // Вторая строка
    { id: 3, title: 'Paintings for the Temple', year: '1906', year2: '1915', color: 'bg-stone-100', textColor: 'text-gray-800', width: 'col-span-2', height: 'row-span-6' },
    
    // Третья строка
    { id: 4, title: 'Group X', subtitle: 'Altarpieces', year: '1915', color: 'bg-stone-100', textColor: 'text-gray-800', width: 'col-span-1', height: 'row-span-2' },
    { id: 5, title: 'Group VII', subtitle: 'Series US', year: '1907', color: 'bg-yellow-300', textColor: 'text-gray-800', width: 'col-span-1', height: 'row-span-2' },
    
    // Четвертая строка
    { id: 6, title: '1915', subtitle: 'Series', year: '1915', color: 'bg-red-600', textColor: 'text-gray-800', width: 'col-span-1', height: 'row-span-2' },
  ]

  return (
    <section id="grid-section" className="relative min-h-screen py-20 px-3" style={{ backgroundColor: '#C1C0B6' }}>
      {/* Grid Container */}
      <div className="pb-20">
        <div className="px-4">
          {/* First row - 80% width */}
          <div className="flex flex-col md:flex-row gap-0 justify-start mb-0 w-full md:w-[80%]">
            {gridItems.slice(0, 2).map((item, index) => {
              // Цвета для первой линии: F1BC3E и E7E0D2
              const blockColor = index === 0 ? '#F1BC3E' : '#E7E0D2'
              const blockTextColor = index === 0 ? 'text-gray-800' : 'text-gray-800'
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`${blockTextColor} ${item.height} flex flex-col justify-between relative w-full md:w-1/2`}
                  style={{ 
                    minHeight: isMobile ? '200px' : '400px',
                    borderBottomRightRadius: '50px',
                    backgroundColor: blockColor,
                    overflow: 'hidden',
                    padding: hoveredId === item.id ? '24px 24px 5px 0px' : '24px 24px 15px 24px',
                    cursor: 'none'
                  }}
                  whileHover="hover"
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                <div className="flex justify-end mb-auto">
                  {item.year && (
                    <span className="text-sm font-medium">{item.year}</span>
                  )}
                  {item.year2 && (
                    <span className="text-sm font-medium ml-2">{item.year2}</span>
                  )}
                </div>
                <div className="flex-1"></div>
                <div className="flex justify-between items-end relative" style={{ marginBottom: hoveredId === item.id ? '0px' : '30px' }}>
                  <motion.div
                    className="whitespace-nowrap flex items-end overflow-hidden"
                    style={{ transformOrigin: 'bottom left', width: '100%' }}
                    initial={{ y: 20 }}
                    variants={{
                      hover: {
                        scale: 8,
                        y: 80,
                        transition: { 
                          scale: { duration: 0.3 },
                          y: { duration: 0.3 }
                        }
                      }
                    }}
                  >
                    <motion.div 
                      className="flex whitespace-nowrap"
                      initial={{ x: 0 }}
                      animate={
                        hoveredId === item.id
                          ? {
                              x: ['0%', '-100%']
                            }
                          : { x: 0 }
                      }
                      transition={{
                        x: hoveredId === item.id ? {
                          duration: 20,
                          ease: 'linear',
                          repeat: Infinity,
                          repeatType: 'loop'
                        } : {
                          duration: 0
                        }
                      }}
                    >
                      <div className="inline-block mr-8">
                        <h3 className="font-bold text-2xl mb-2 inline-block">{item.title}</h3>
                        {item.subtitle && (
                          <p className="text-sm opacity-90 inline-block ml-2">{item.subtitle}</p>
                        )}
                      </div>
                      <motion.div 
                        className="inline-block mr-8 overflow-hidden"
                        initial={{ opacity: 0, width: 0 }}
                        animate={
                          hoveredId === item.id
                            ? {
                                opacity: 1,
                                width: 'auto'
                              }
                            : {
                                opacity: 0,
                                width: 0
                              }
                        }
                        transition={{
                          opacity: { duration: 0.3 },
                          width: { duration: 0.5 }
                        }}
                      >
                        <motion.div
                          className="whitespace-nowrap inline-block"
                          initial={{ x: '100%' }}
                          animate={
                            hoveredId === item.id
                              ? {
                                  x: ['100%', '-100%']
                                }
                              : { x: '100%' }
                          }
                          transition={{
                            x: hoveredId === item.id ? {
                              duration: 2,
                              ease: 'linear',
                              repeat: Infinity,
                              repeatType: 'loop'
                            } : {
                              duration: 0
                            }
                          }}
                        >
                          <h3 className="font-bold text-xl mb-2 inline-block">{item.title}</h3>
                          {item.subtitle && (
                            <p className="text-sm opacity-90 inline-block ml-2">{item.subtitle}</p>
                          )}
                        </motion.div>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                    <motion.span 
                      className="text-2xl font-medium"
                      variants={{
                        hover: {
                          opacity: 0,
                          transition: { duration: 0.2 }
                        }
                      }}
                    >
                      {index + 1}
                    </motion.span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 overflow-hidden" style={{ height: '1px' }}>
                  <motion.div
                    className="h-px bg-current opacity-30"
                    style={{ width: '100%' }}
                    variants={{
                      hover: {
                        x: ['100%', '-100%'],
                        transition: {
                          duration: 1.5,
                          repeat: Infinity,
                          ease: 'linear'
                        }
                      }
                    }}
                  />
                </div>
              </motion.div>
              )
            })}
          </div>
          
          {/* Second row - 90% width, left 30% wider than right */}
          <div className="flex flex-col md:flex-row gap-0 justify-start mb-0 w-full md:w-[90%]">
            {gridItems.slice(2, 4).map((item, index) => {
              // Левый блок (index 0) на 30% шире правого (index 1)
              // Если правый = x, левый = 1.3x, вместе = 2.3x = 100% контейнера
              // x = 100/2.3 ≈ 43.478%, левый = 1.3 * 43.478 ≈ 56.522%
              // Цвета для второго ряда: 829EB1 и ED740C
              const blockColor = index === 0 ? '#829EB1' : '#ED740C'
              const blockTextColor = index === 0 ? 'text-white' : 'text-white'
              const flexBasis = index === 0 ? '56.522%' : '43.478%'
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (index + 2) * 0.1 }}
                  className={`${blockTextColor} ${item.height} flex flex-col justify-between relative w-full md:w-auto`}
                  style={{ 
                    minHeight: isMobile ? '200px' : '400px', 
                    flexBasis: flexBasis, 
                    flexShrink: 0, 
                    flexGrow: 0,
                    borderBottomRightRadius: '50px',
                    backgroundColor: blockColor,
                    overflow: 'hidden',
                    padding: hoveredId === item.id ? '24px 24px 5px 0px' : '24px 24px 15px 24px',
                    cursor: 'none'
                  }}
                  whileHover="hover"
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div className="flex justify-end mb-auto">
                    {item.year && (
                      <span className="text-sm font-medium">{item.year}</span>
                    )}
                    {item.year2 && (
                      <span className="text-sm font-medium ml-2">{item.year2}</span>
                    )}
                  </div>
                  <div className="flex-1"></div>
                  <div className="flex justify-between items-end relative" style={{ marginBottom: hoveredId === item.id ? '0px' : '30px' }}>
                    <motion.div
                      className="whitespace-nowrap flex items-end overflow-hidden"
                      style={{ transformOrigin: 'bottom left', width: '100%' }}
                      initial={{ y: 20 }}
                      variants={{
                        hover: {
                          scale: 8,
                          y: 80,
                          transition: { 
                            scale: { duration: 0.3 },
                            y: { duration: 0.3 }
                          }
                        }
                      }}
                    >
                      <motion.div 
                        className="flex whitespace-nowrap"
                        initial={{ x: 0 }}
                        animate={
                          hoveredId === item.id
                            ? {
                                x: ['0%', '-100%']
                              }
                            : { x: 0 }
                        }
                        transition={{
                          x: hoveredId === item.id ? {
                            duration: 20,
                            ease: 'linear',
                            repeat: Infinity,
                            repeatType: 'loop'
                          } : {
                            duration: 0
                          }
                        }}
                      >
                        <div className="inline-block mr-8">
                          <h3 className="font-bold text-4xl mb-2 inline-block">{item.title}</h3>
                          {item.subtitle && (
                            <p className="text-lg opacity-90 inline-block ml-2">{item.subtitle}</p>
                          )}
                        </div>
                        <motion.div 
                          className="inline-block mr-8 overflow-hidden"
                          initial={{ opacity: 0, width: 0 }}
                          animate={
                            hoveredId === item.id
                              ? {
                                  opacity: 1,
                                  width: 'auto'
                                }
                              : {
                                  opacity: 0,
                                  width: 0
                                }
                          }
                          transition={{
                            opacity: { duration: 0.3 },
                            width: { duration: 0.5 }
                          }}
                        >
                          <motion.div
                            className="whitespace-nowrap inline-block"
                            initial={{ x: '100%' }}
                            animate={
                              hoveredId === item.id
                                ? {
                                    x: ['100%', '-100%']
                                  }
                                : { x: '100%' }
                            }
                            transition={{
                              x: hoveredId === item.id ? {
                                duration: 2,
                                ease: 'linear',
                                repeat: Infinity,
                                repeatType: 'loop'
                              } : {
                                duration: 0
                              }
                            }}
                          >
                            <h3 className="font-bold text-3xl mb-2 inline-block">{item.title}</h3>
                            {item.subtitle && (
                              <p className="text-lg opacity-90 inline-block ml-2">{item.subtitle}</p>
                            )}
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                    <motion.span 
                      className="text-2xl font-medium"
                      variants={{
                        hover: {
                          opacity: 0,
                          transition: { duration: 0.2 }
                        }
                      }}
                    >
                      {index + 3}
                    </motion.span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 overflow-hidden" style={{ height: '1px' }}>
                    <motion.div
                      className="h-px bg-current opacity-30"
                      style={{ width: '100%' }}
                      variants={{
                        hover: {
                          x: ['100%', '-100%'],
                          transition: {
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'linear'
                          }
                        }
                      }}
                    />
                  </div>
                </motion.div>
              )
            })}
          </div>
          
          {/* Third row - 100% width, right 65% of total width */}
          <div className="flex flex-col md:flex-row gap-0 justify-start mb-0 w-full">
            {gridItems.slice(4, 6).map((item, index) => {
              // Правый блок (index 1) занимает 65% от общей ширины
              // Левый блок (index 0) занимает 35%
              // Цвета для третьего ряда: 394A8B и F1BC3E
              const blockColor = index === 0 ? '#394A8B' : '#F1BC3E'
              const blockTextColor = index === 0 ? 'text-white' : 'text-white'
              const flexBasis = index === 0 ? '35%' : '65%'
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (index + 4) * 0.1 }}
                  className={`${blockTextColor} ${item.height} flex flex-col justify-between relative w-full md:w-auto`}
                  style={{ 
                    minHeight: isMobile ? '200px' : '400px',
                    flexBasis: flexBasis,
                    flexShrink: 0,
                    flexGrow: 0,
                    borderBottomRightRadius: '50px',
                    backgroundColor: blockColor,
                    overflow: 'hidden',
                    padding: hoveredId === item.id ? '24px 24px 15px 0px' : '24px 24px 15px 24px',
                    cursor: 'none'
                  }}
                  whileHover="hover"
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  >
                  <div className="flex justify-end mb-auto">
                    {item.year && (
                      <span className="text-sm font-medium">{item.year}</span>
                    )}
                    {item.year2 && (
                      <span className="text-sm font-medium ml-2">{item.year2}</span>
                    )}
                  </div>
                  <div className="flex-1"></div>
                  <div className="flex justify-between items-end relative" style={{ marginBottom: hoveredId === item.id ? '0px' : '30px' }}>
                    <motion.div
                      className="whitespace-nowrap flex items-end overflow-hidden"
                      style={{ transformOrigin: 'bottom left', width: '100%' }}
                      initial={{ y: 20 }}
                      variants={{
                        hover: {
                          scale: 8,
                          y: 80,
                          transition: { 
                            scale: { duration: 0.3 },
                            y: { duration: 0.3 }
                          }
                        }
                      }}
                    >
                      <motion.div 
                        className="flex whitespace-nowrap"
                        initial={{ x: 0 }}
                        animate={
                          hoveredId === item.id
                            ? {
                                x: ['0%', '-100%']
                              }
                            : { x: 0 }
                        }
                        transition={{
                          x: hoveredId === item.id ? {
                            duration: 20,
                            ease: 'linear',
                            repeat: Infinity,
                            repeatType: 'loop'
                          } : {
                            duration: 0
                          }
                        }}
                      >
                        <div className="inline-block mr-8">
                          <h3 className="font-bold text-4xl mb-2 inline-block">{item.title}</h3>
                          {item.subtitle && (
                            <p className="text-lg opacity-90 inline-block ml-2">{item.subtitle}</p>
                          )}
                        </div>
                        <motion.div 
                          className="inline-block mr-8 overflow-hidden"
                          initial={{ opacity: 0, width: 0 }}
                          animate={
                            hoveredId === item.id
                              ? {
                                  opacity: 1,
                                  width: 'auto'
                                }
                              : {
                                  opacity: 0,
                                  width: 0
                                }
                          }
                          transition={{
                            opacity: { duration: 0.3 },
                            width: { duration: 0.5 }
                          }}
                        >
                          <motion.div
                            className="whitespace-nowrap inline-block"
                            initial={{ x: '100%' }}
                            animate={
                              hoveredId === item.id
                                ? {
                                    x: ['100%', '-100%']
                                  }
                                : { x: '100%' }
                            }
                            transition={{
                              x: hoveredId === item.id ? {
                                duration: 2,
                                ease: 'linear',
                                repeat: Infinity,
                                repeatType: 'loop'
                              } : {
                                duration: 0
                              }
                            }}
                          >
                            <h3 className="font-bold text-3xl mb-2 inline-block">{item.title}</h3>
                            {item.subtitle && (
                              <p className="text-lg opacity-90 inline-block ml-2">{item.subtitle}</p>
                            )}
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                    <motion.span 
                      className="text-2xl font-medium"
                      variants={{
                        hover: {
                          opacity: 0,
                          transition: { duration: 0.2 }
                        }
                      }}
                    >
                      {index + 5}
                    </motion.span>
                  </div>
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-px bg-current opacity-30"
                    variants={{
                      hover: {
                        x: ['100%', '-100%'],
                        transition: {
                          duration: 1.5,
                          repeat: Infinity,
                          ease: 'linear'
                        }
                      }
                    }}
                  />
                </motion.div>
              )
            })}
          </div>
          
        </div>
      </div>
      
      {/* Custom cursor */}
      <AnimatePresence>
        {hoveredId !== null && (
          <motion.div
            className="fixed pointer-events-none z-[99999999]"
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
              stroke="#403B37"
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
            <motion.g 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ 
                scale: (showStick || showArrowHead) ? 1 : 0.5,
                opacity: (showStick || showArrowHead) ? 1 : 0
              }}
              transition={{ 
                duration: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              {/* Палочка (вертикальная линия) */}
              <motion.path
                d="M64 36 L64 92"
                stroke="#403B37"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                initial={{ opacity: 0, pathLength: 0 }}
                animate={{ 
                  opacity: showStick ? 1 : 0,
                  pathLength: showStick ? 1 : 0
                }}
                transition={{ 
                  duration: 0.4,
                  ease: "easeInOut"
                }}
              />
              {/* Наконечник стрелы */}
              <motion.path
                d="M44 64 L64 36 L84 64"
                stroke="#403B37"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ opacity: 0, pathLength: 0 }}
                animate={{ 
                  opacity: showArrowHead ? 1 : 0,
                  pathLength: showArrowHead ? 1 : 0
                }}
                transition={{ 
                  duration: 0.4,
                  ease: "easeInOut"
                }}
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

