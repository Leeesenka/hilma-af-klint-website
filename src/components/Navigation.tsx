import { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Navigation = () => {
  const [isSticky, setIsSticky] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const isStickyRef = useRef(false)

  useEffect(() => {
    const pageElement = document.getElementById('page');
    
    const handleScroll = () => {
      // Получаем scrollTop из элемента #page или window
      const pageScrollTop = pageElement?.scrollTop || 0;
      const windowScrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      
      // Используем значение из #page, если оно больше 0, иначе из window
      const scrollY = pageScrollTop > 0 ? pageScrollTop : windowScrollY;
      
      const shouldBeSticky = scrollY >= 100;

      if (isStickyRef.current !== shouldBeSticky) {
        isStickyRef.current = shouldBeSticky;
        setIsSticky(shouldBeSticky);
      }
    };

    // Проверяем сразу при загрузке
    handleScroll();

    // Слушаем скролл на обоих элементах
    if (pageElement) {
      pageElement.addEventListener("scroll", handleScroll, { passive: true });
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      if (pageElement) {
        pageElement.removeEventListener("scroll", handleScroll);
      }
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [])


  // Синхронизация ref с состоянием
  useEffect(() => {
    isStickyRef.current = isSticky
  }, [isSticky])


  const navLinks = [
    { name: 'Home', href: '/', anchor: '#home' },
    { name: 'About', href: '/', anchor: '#about' },
    { name: 'The Temple', href: '/', anchor: '#temple' },
    { name: 'Ten Largest', href: '/', anchor: '#ten-largest' },
    { name: 'Symbols', href: '/', anchor: '#symbols' },
    { name: 'Timeline', href: '/', anchor: '#timeline' },
    { name: 'Sources', href: '/', anchor: '#sources' },
    { name: 'Gallery', href: '/gallery' },
  ]

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, anchor?: string) => {
    e.preventDefault()
    
    if (anchor && location.pathname === '/') {
      const element = document.querySelector(anchor)
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    } else if (href !== location.pathname) {
      navigate(href)
    }
  }

  const toggleMenu = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    // При клике на кнопку: просто возвращаем меню к длинному виду
    setIsSticky(false)
    isStickyRef.current = false
  }

  return (
    <header id="myHeader" className={isSticky ? 'sticky' : ''} style={{ position: 'relative', zIndex: 1 }}>
      {/* Navigation */}
      <nav
        id="nav-menu"
        className={isSticky ? 'nav-sticky' : 'nav-normal'}
        style={isSticky ? {
          // Применяем стили напрямую через inline для гарантии
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '90px',
          height: '90px',
          maxWidth: '90px',
          minWidth: '90px',
          minHeight: '90px',
          borderRadius: '45px',
          backgroundColor: 'transparent',
          border: 'none',
          boxShadow: 'none',
          padding: '0',
          opacity: 1,
          visibility: 'visible',
          backdropFilter: 'blur(20px)',
          display: 'flex',
          zIndex: 9999999
        } : {}}
      >
        {/* Navigation Links */}
        <div 
          className="flex items-center gap-4 transition-all duration-300 ease-out"
          style={{
            opacity: isSticky ? '0' : '1',
            transform: isSticky ? 'scale(0)' : 'scale(1)',
            transitionDelay: isSticky ? '0s' : '0.3s',
            pointerEvents: isSticky ? 'none' : 'auto',
            zIndex: 10,
            position: 'absolute'
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                handleLinkClick(e, link.href, link.anchor)
              }}
              className="no-underline font-bold block py-2.5 px-5 leading-none text-sm tracking-wider lowercase transition-all duration-300 ease-out hover:opacity-80 cursor-pointer"
              style={{
                padding: isSticky ? '0' : '10px 20px',
                letterSpacing: isSticky ? '0px' : '2px',
                color: '#fff',
                pointerEvents: 'auto',
                position: 'relative',
                zIndex: 11
              }}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Menu Button - показывается только когда sticky */}
        <button
          id="openmenu"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            toggleMenu()
          }}
          className="absolute z-[100] left-0 right-0 mx-auto top-0 bottom-0 rounded-full outline-none border-0 cursor-pointer transition-all duration-400 ease-out"
          style={{
            background: 'transparent',
            backdropFilter: 'none',
            border: 'none',
            width: '60px',
            height: '60px',
            boxShadow: 'none',
            transform: isSticky ? 'scale(1)' : 'scale(0)',
            opacity: isSticky ? '1' : '0',
            visibility: isSticky ? 'visible' : 'hidden',
            transitionDelay: isSticky ? '0.2s' : '0s',
            display: isSticky ? 'flex' : 'none',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            pointerEvents: isSticky ? 'auto' : 'none',
            margin: 'auto',
            zIndex: 100000
          }}
        >
          <span 
            className="block transition-all duration-500 ease-out"
            style={{
              width: isSticky ? '50%' : '0%',
              height: '5px',
              transform: isSticky ? 'scalex(1)' : 'scalex(0)',
              transitionDelay: isSticky ? '0.4s' : '0s',
              margin: '4px auto',
              backgroundColor: '#fff',
              borderRadius: '3px',
              boxShadow: '0 2px 4px rgba(0,0,0,.3)'
            }}
          />
          <span 
            className="block transition-all duration-500 ease-out"
            style={{
              width: isSticky ? '50%' : '0%',
              height: '5px',
              transform: isSticky ? 'scalex(1)' : 'scalex(0)',
              transitionDelay: isSticky ? '0.4s' : '0s',
              margin: '4px auto',
              backgroundColor: '#fff',
              borderRadius: '3px',
              boxShadow: '0 2px 4px rgba(0,0,0,.3)'
            }}
          />
        </button>
      </nav>

    </header>
  )
}

export default Navigation
