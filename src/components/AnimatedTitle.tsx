import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

interface AnimatedTitleProps {
  text: string
  className?: string
  align?: 'left' | 'center' | 'right'
  delay?: number
}

const AnimatedTitle = ({ text, className = '', align = 'left', delay = 0 }: AnimatedTitleProps) => {
  const [isInView, setIsInView] = useState(false)
  const ref = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold: 0.4 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  }[align]

  return (
    <h2
      ref={ref}
      className={`s-title1 titleLines ${alignClass} ${className}`}
      style={{
        fontSize: 'clamp(4rem, 12.4rem, 15vw)',
        letterSpacing: '-0.04em',
        lineHeight: 1,
        margin: 0,
        fontFamily: 'Inter, sans-serif',
        fontWeight: 400,
        marginBottom: '2.2rem',
        whiteSpace: 'nowrap',
        position: 'relative'
      }}
    >
      {/* Верхняя линия */}
      <span className="line block bg-current mb-4" style={{ opacity: 0.3, height: '3px' }}></span>
      
      <span className="grid-13 js-titleLine inline-block">
        <span className={`titleLines__text col-full js-split ${alignClass} inline-block`}>
          {text.split('').map((char, charIndex) => (
            <motion.span
              key={charIndex}
              className="char inline-block"
              data-char={char}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{
                duration: 0.5,
                delay: delay + (charIndex * 0.03),
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              style={{
                position: 'relative',
                display: 'inline-block'
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </span>
      </span>
      
      {/* Нижняя линия */}
      <span className="line block bg-current mt-4" style={{ opacity: 0.3, height: '3px' }}></span>
    </h2>
  )
}

export default AnimatedTitle

