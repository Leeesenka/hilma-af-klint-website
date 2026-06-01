import { Link, useLocation, useNavigate } from 'react-router-dom'

const EXPLORE_LINKS = [
  { label: 'Home', href: '/', anchor: '#home' },
  { label: 'About', href: '/', anchor: '#about' },
  { label: 'The Temple', href: '/', anchor: '#temple' },
  { label: 'Ten Largest', href: '/', anchor: '#ten-largest' },
  { label: 'Timeline', href: '/', anchor: '#timeline' },
  { label: 'Sources', href: '/', anchor: '#sources' },
]

const EXTERNAL_LINKS = [
  { label: 'Hilma af Klint Foundation', href: 'https://hilmaafklint.se' },
  { label: 'Moderna Museet', href: 'https://www.modernamuseet.se' },
  { label: 'Guggenheim', href: 'https://www.guggenheim.org' },
  { label: 'Wikimedia Commons', href: 'https://commons.wikimedia.org/wiki/Category:Paintings_by_Hilma_af_Klint' },
]

const Footer = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const year = new Date().getFullYear()

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    anchor?: string
  ) => {
    if (!anchor) return

    e.preventDefault()

    if (location.pathname === '/') {
      document.querySelector(anchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }

    navigate(`${href}${anchor}`)
    window.setTimeout(() => {
      document.querySelector(anchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 150)
  }

  return (
    <footer
      className="relative w-full mt-0 overflow-hidden"
      style={{
        backgroundColor: '#403B37',
        color: '#FBEFDF',
        borderTopLeftRadius: '3rem',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 pt-14 md:pt-20 pb-8 md:pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-12 md:mb-16">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link
              to="/"
              className="inline-block no-underline"
              style={{ color: '#FBEFDF' }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <p className="font-bold text-2xl md:text-3xl leading-tight tracking-tight m-0">
                Hilma af Klint
              </p>
            </Link>
            <p
              className="text-sm mt-3 leading-relaxed m-0"
              style={{ opacity: 0.75, maxWidth: '20rem' }}
            >
              A portal dedicated to <em>Paintings for the Temple</em> — abstract works created
              1906–1915, and the life of a pioneer of modern art.
            </p>
            <p
              className="text-xs uppercase tracking-[0.2em] mt-6 m-0"
              style={{ opacity: 0.45 }}
            >
              1862 — 1944
            </p>
            <div className="mt-8">
              <p
                className="text-xs uppercase tracking-[0.25em] mb-3 m-0"
                style={{ opacity: 0.5 }}
              >
                Contact
              </p>
              <ul className="list-none m-0 p-0 space-y-2">
                <li>
                  <a
                    href="https://www.linkedin.com/in/alesya-frolova/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm no-underline transition-opacity hover:opacity-70 inline-flex items-center gap-1"
                    style={{ color: '#FBEFDF' }}
                  >
                    LinkedIn
                    <span style={{ opacity: 0.5 }} aria-hidden>
                      ↗
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:alesya.vashurova@gmail.com"
                    className="text-sm no-underline transition-opacity hover:opacity-70 break-all"
                    style={{ color: '#FBEFDF' }}
                  >
                    alesya.vashurova@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Explore */}
          <div className="lg:col-span-4">
            <p
              className="text-xs uppercase tracking-[0.25em] mb-5 m-0"
              style={{ opacity: 0.5 }}
            >
              Explore
            </p>
            <ul className="list-none m-0 p-0 grid grid-cols-2 gap-x-4 gap-y-3">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.anchor ? `${link.href}${link.anchor}` : link.href}
                    onClick={(e) => handleAnchorClick(e, link.href, link.anchor)}
                    className="text-sm no-underline transition-opacity hover:opacity-70"
                    style={{ color: '#FBEFDF' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* External */}
          <div className="lg:col-span-4">
            <p
              className="text-xs uppercase tracking-[0.25em] mb-5 m-0"
              style={{ opacity: 0.5 }}
            >
              Museums & archives
            </p>
            <ul className="list-none m-0 p-0 space-y-3">
              {EXTERNAL_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm no-underline transition-opacity hover:opacity-70 inline-flex items-center gap-1"
                    style={{ color: '#FBEFDF' }}
                  >
                    {link.label}
                    <span style={{ opacity: 0.5 }} aria-hidden>
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          style={{ borderTop: '1px solid rgba(251, 239, 223, 0.15)' }}
        >
          <p className="text-xs m-0" style={{ opacity: 0.5 }}>
            © {year} Educational portfolio project. Not affiliated with the Hilma af Klint
            Foundation.
          </p>
          <p className="text-xs m-0 md:text-right" style={{ opacity: 0.45, maxWidth: '28rem' }}>
            Images via Wikimedia Commons where noted. Courtesy of The Hilma af Klint Foundation
            / Moderna Museet.
          </p>
        </div>
      </div>

      {/* Accent strip */}
      <div
        className="h-1 w-full"
        style={{
          background: 'linear-gradient(90deg, #829EB1 0%, #F1BC3E 35%, #ED740C 65%, #394A8B 100%)',
        }}
        aria-hidden
      />
    </footer>
  )
}

export default Footer
