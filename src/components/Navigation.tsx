import { useState, useEffect, useRef, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useIsMobile } from '../hooks/useMedia'

const SCROLL_THRESHOLD = 80
const MENU_CLOSE_SCROLL_DELAY_MS = 120
const MENU_CLOSE_SCROLL_DELAY_MOBILE_MS = 280

function scrollToSection(anchor: string, afterMenuClose: boolean, isMobile: boolean) {
  const id = anchor.startsWith('#') ? anchor.slice(1) : anchor
  const el = document.getElementById(id)
  if (!el) return

  const run = () => {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    if (window.location.pathname === '/') {
      window.history.replaceState(null, '', `#${id}`)
    }
  }

  if (afterMenuClose) {
    const delay = isMobile ? MENU_CLOSE_SCROLL_DELAY_MOBILE_MS : MENU_CLOSE_SCROLL_DELAY_MS
    window.setTimeout(run, delay)
  } else {
    requestAnimationFrame(() => requestAnimationFrame(run))
  }
}

const navLinks = [
  { name: 'Home', href: '/', anchor: '#home' },
  { name: 'About', href: '/', anchor: '#about' },
  { name: 'The Temple', href: '/', anchor: '#temple' },
  { name: 'Ten Largest', href: '/', anchor: '#ten-largest' },
  { name: 'Timeline', href: '/', anchor: '#timeline' },
  { name: 'Sources', href: '/', anchor: '#sources' },
]

const Navigation = () => {
  const isMobile = useIsMobile()
  const [isSticky, setIsSticky] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const isStickyRef = useRef(false)
  const menuOpenRef = useRef(false)

  const getScrollY = useCallback(() => {
    const pageElement = document.getElementById('page')
    const pageScroll = pageElement?.scrollTop ?? 0
    const windowScroll =
      window.scrollY || window.pageYOffset || document.documentElement.scrollTop
    return Math.max(pageScroll, windowScroll)
  }, [])

  useEffect(() => {
    menuOpenRef.current = menuOpen
  }, [menuOpen])

  useEffect(() => {
    const pageElement = document.getElementById('page')

    const handleScroll = () => {
      if (menuOpenRef.current) return

      const shouldBeSticky = getScrollY() >= SCROLL_THRESHOLD

      if (isStickyRef.current !== shouldBeSticky) {
        isStickyRef.current = shouldBeSticky
        setIsSticky(shouldBeSticky)
      }
    }

    handleScroll()

    if (pageElement) {
      pageElement.addEventListener('scroll', handleScroll, { passive: true })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    return () => {
      if (pageElement) {
        pageElement.removeEventListener('scroll', handleScroll)
      }
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [getScrollY])

  useEffect(() => {
    isStickyRef.current = isSticky
  }, [isSticky])

  useEffect(() => {
    const page = document.getElementById('page')
    if (menuOpen) {
      page?.classList.add('menuopen')
      document.body.classList.add('stop')
    } else {
      page?.classList.remove('menuopen')
      document.body.classList.remove('stop')
    }
    return () => {
      page?.classList.remove('menuopen')
      document.body.classList.remove('stop')
    }
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        menuOpenRef.current = false
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  const closeMenu = useCallback(() => {
    setMenuOpen(false)
    menuOpenRef.current = false
  }, [])

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    anchor?: string
  ) => {
    e.preventDefault()
    const wasMenuOpen = menuOpenRef.current
    closeMenu()

    const scrollY = getScrollY()
    const shouldBeSticky = scrollY >= SCROLL_THRESHOLD
    isStickyRef.current = shouldBeSticky
    setIsSticky(shouldBeSticky)

    if (anchor && location.pathname === '/') {
      scrollToSection(anchor, wasMenuOpen, isMobile)
      return
    }

    if (anchor) {
      navigate(`${href}${anchor}`)
      window.setTimeout(() => scrollToSection(anchor, false, isMobile), 150)
      return
    }

    if (href !== location.pathname) {
      navigate(href)
    }
  }

  const toggleMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (menuOpen) {
      closeMenu()
      const shouldBeSticky = getScrollY() >= SCROLL_THRESHOLD
      isStickyRef.current = shouldBeSticky
      setIsSticky(shouldBeSticky)
      return
    }

    setMenuOpen(true)
    menuOpenRef.current = true
  }

  const useCompactNav = isMobile || isSticky || menuOpen
  const showInlineLinks = !isMobile && !isSticky && !menuOpen
  const showMenuButton = isMobile || isSticky || menuOpen

  const navClassName = menuOpen
    ? 'nav-open'
    : useCompactNav
      ? 'nav-sticky'
      : 'nav-normal'

  const linkClassName =
    'no-underline font-bold block leading-none tracking-wider lowercase transition-opacity hover:opacity-80 cursor-pointer'
  const linkStyle = { color: '#fff', letterSpacing: '2px' } as const

  return (
    <header
      id="myHeader"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10000000,
        pointerEvents: 'none',
        height: 0,
      }}
    >
      {menuOpen && (
        <div
          id="nav-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="nav-overlay fixed inset-0 flex flex-col items-center justify-center gap-1 sm:gap-2 px-6 py-24"
          style={{
            zIndex: 9999998,
            backgroundColor: 'rgba(64, 59, 55, 0.97)',
            pointerEvents: 'auto',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeMenu()
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.anchor ? `${link.href}${link.anchor}` : link.href}
              onClick={(e) => handleLinkClick(e, link.href, link.anchor)}
              className={`${linkClassName} py-4 px-6 text-xl sm:text-2xl min-h-[48px] flex items-center justify-center`}
              style={linkStyle}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}

      <nav
        id="nav-menu"
        className={navClassName}
        style={{
          position: 'fixed',
          top: useCompactNav ? (isMobile ? '16px' : '20px') : '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: useCompactNav ? (isMobile ? '64px' : '90px') : 'min(900px, calc(100vw - 32px))',
          height: useCompactNav ? (isMobile ? '64px' : '90px') : 'auto',
          minHeight: useCompactNav ? (isMobile ? '64px' : '90px') : 'auto',
          maxWidth: useCompactNav ? (isMobile ? '64px' : '90px') : 'calc(100vw - 32px)',
          borderRadius: useCompactNav ? (isMobile ? '32px' : '45px') : '200px',
          backgroundColor: useCompactNav
            ? 'rgba(64, 59, 55, 0.92)'
            : 'rgba(130, 158, 177, 0.15)',
          backdropFilter: 'blur(16px)',
          border: 'none',
          boxShadow: useCompactNav ? '0 4px 24px rgba(0,0,0,0.2)' : 'none',
          padding: useCompactNav ? '0' : '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'auto',
          zIndex: 10000000,
          transition: 'all 0.5s ease-out',
        }}
      >
        <div
          className="flex items-center justify-center flex-wrap gap-1 transition-all duration-300 ease-out"
          style={{
            opacity: showInlineLinks ? 1 : 0,
            transform: showInlineLinks ? 'scale(1)' : 'scale(0.8)',
            pointerEvents: showInlineLinks ? 'auto' : 'none',
            position: showInlineLinks ? 'relative' : 'absolute',
            width: showInlineLinks ? 'auto' : 0,
            height: showInlineLinks ? 'auto' : 0,
            overflow: 'hidden',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.anchor ? `${link.href}${link.anchor}` : link.href}
              onClick={(e) => handleLinkClick(e, link.href, link.anchor)}
              className={`${linkClassName} py-2.5 px-4 text-sm`}
              style={linkStyle}
            >
              {link.name}
            </a>
          ))}
        </div>

        <button
          id="openmenu"
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls={menuOpen ? 'nav-overlay' : undefined}
          onClick={toggleMenu}
          className="absolute z-[100] left-0 right-0 mx-auto top-0 bottom-0 rounded-full outline-none border-0 cursor-pointer transition-all duration-400 ease-out touch-manipulation"
          style={{
            background: 'transparent',
            width: isMobile ? '52px' : '60px',
            height: isMobile ? '52px' : '60px',
            transform: showMenuButton ? 'scale(1)' : 'scale(0)',
            opacity: showMenuButton ? 1 : 0,
            visibility: showMenuButton ? 'visible' : 'hidden',
            transitionDelay: showMenuButton ? '0.15s' : '0s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            pointerEvents: showMenuButton ? 'auto' : 'none',
            margin: 'auto',
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          <span
            className="block transition-all duration-300 ease-out"
            style={{
              width: showMenuButton ? '50%' : '0%',
              height: '4px',
              margin: '3px auto',
              backgroundColor: '#fff',
              borderRadius: '3px',
              boxShadow: '0 2px 4px rgba(0,0,0,.3)',
              transform: menuOpen ? 'rotate(45deg) translateY(5px)' : 'none',
            }}
          />
          <span
            className="block transition-all duration-300 ease-out"
            style={{
              width: showMenuButton ? '50%' : '0%',
              height: '4px',
              margin: '3px auto',
              backgroundColor: '#fff',
              borderRadius: '3px',
              boxShadow: '0 2px 4px rgba(0,0,0,.3)',
              transform: menuOpen ? 'rotate(-45deg) translateY(-5px)' : 'none',
            }}
          />
        </button>
      </nav>
    </header>
  )
}

export default Navigation
