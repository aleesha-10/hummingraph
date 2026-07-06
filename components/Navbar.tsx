// path: components/Navbar.tsx
"use client"
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import SearchBar from './SearchBar'

const NAV_TEXT = '#333333'

type SearchableConcept = { id: string; title: string; section: string; tagline: string }

export default function Navbar({ concepts = [] }: { concepts?: SearchableConcept[] }) {
  const [papersOpen, setPapersOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setPapersOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close the mobile menu automatically if the viewport is resized back to desktop
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 768) setMobileOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const linkStyle = {
    textDecoration: 'none',
    fontFamily: 'var(--font-mulish), sans-serif',
    fontSize: '0.9rem',
    fontWeight: 600,
    color: NAV_TEXT,
  }

  return (
    <>
      <style>{`
        .nav-logo { opacity: 1; transition: opacity 0.2s ease; }
        .nav-logo:hover { opacity: 0.65; }
        .nav-link { transition: opacity 0.2s ease; }
        .nav-link:hover { opacity: 0.65; }

        .papers-dropdown {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          background: #FDFBF7;
          border: 1px solid rgba(0,0,0,0.08);
          border-radius: 10px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
          overflow: hidden;
        }

        .desktop-only { display: flex; }
        .mobile-toggle { display: none; }
        .mobile-panel { display: none; }

        @media (max-width: 768px) {
          .desktop-only { display: none !important; }
          .mobile-toggle { display: flex !important; }
          .mobile-panel.open { display: flex !important; }
        }
      `}</style>
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'rgba(253, 251, 247, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
      }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 24px',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
            <Link href="/" style={{ textDecoration: 'none' }} className="nav-logo">
              <span style={{
                fontFamily: 'var(--font-nunito), sans-serif',
                fontWeight: 800,
                fontSize: '1.4rem',
                color: NAV_TEXT,
                letterSpacing: '-0.01em',
              }}>
                Hummingraph
              </span>
            </Link>
            <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', marginLeft: '10px' }} className="nav-logo">
              <Image
                src="/logo2.svg"
                alt="Hummingraph logo"
                width={48}
                height={48}
              />
            </Link>
          </div>

          {/* Desktop: search bar + links, all inline. Hidden entirely on mobile. */}
          <div className="desktop-only" style={{ flex: 1, justifyContent: 'center', padding: '0 16px' }}>
            <div style={{ width: '100%', maxWidth: '260px' }}>
              <SearchBar concepts={concepts} />
            </div>
          </div>

          <div className="desktop-only" style={{ alignItems: 'center', gap: '20px' }}>
            <Link href="/concept-map" className="nav-link" style={linkStyle}>Concept Map</Link>
            <Link href="/compare" className="nav-link" style={linkStyle}>Compare</Link>

            <div ref={dropdownRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setPapersOpen((v) => !v)}
                className="nav-link"
                style={{ ...linkStyle, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                Past Papers {papersOpen ? '▲' : '▼'}
              </button>

              {papersOpen && (
                <div className="papers-dropdown" style={{ minWidth: '170px' }}>
                  <a
                    href="https://github.com/saleha-muzammil/Academic-Time-Machine/tree/main"
                    target="_blank" rel="noopener noreferrer"
                    style={{ display: 'block', padding: '10px 16px', textDecoration: 'none', fontFamily: 'var(--font-mulish), sans-serif', fontSize: '0.88rem', fontWeight: 600, color: NAV_TEXT, borderBottom: '1px solid rgba(0,0,0,0.06)' }}
                  >
                    FAST ↗
                  </a>
                  <a
                    href="https://github.com/aleesha-10/hummingraph"
                    target="_blank" rel="noopener noreferrer"
                    style={{ display: 'block', padding: '10px 16px', textDecoration: 'none', fontFamily: 'var(--font-mulish), sans-serif', fontSize: '0.88rem', fontWeight: 600, color: NAV_TEXT }}
                  >
                    Other Universities ↗
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Mobile: hamburger button only, hidden entirely on desktop */}
          <button
            className="mobile-toggle"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              flexDirection: 'column',
              gap: '5px',
              padding: '8px',
            }}
          >
            <span style={{ width: '22px', height: '2px', background: NAV_TEXT, borderRadius: '2px', transition: 'transform 0.2s', transform: mobileOpen ? 'translateY(7px) rotate(45deg)' : 'none' }} />
            <span style={{ width: '22px', height: '2px', background: NAV_TEXT, borderRadius: '2px', opacity: mobileOpen ? 0 : 1, transition: 'opacity 0.2s' }} />
            <span style={{ width: '22px', height: '2px', background: NAV_TEXT, borderRadius: '2px', transition: 'transform 0.2s', transform: mobileOpen ? 'translateY(-7px) rotate(-45deg)' : 'none' }} />
          </button>
        </div>

        {/* Mobile dropdown panel — search + all links stacked vertically */}
        <div
          className={`mobile-panel${mobileOpen ? ' open' : ''}`}
          style={{
            flexDirection: 'column',
            gap: '14px',
            padding: '16px 24px 20px',
            borderTop: '1px solid rgba(0,0,0,0.06)',
            backgroundColor: '#FDFBF7',
          }}
        >
          <SearchBar concepts={concepts} />
          <Link href="/concept-map" className="nav-link" style={linkStyle} onClick={() => setMobileOpen(false)}>
            Concept Map
          </Link>
          <Link href="/compare" className="nav-link" style={linkStyle} onClick={() => setMobileOpen(false)}>
            Compare
          </Link>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <span style={{ ...linkStyle, color: '#8a8a8a', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.02em' }}>
              Past Papers
            </span>
            <a
              href="https://github.com/saleha-muzammil/Academic-Time-Machine/tree/main"
              target="_blank" rel="noopener noreferrer"
              className="nav-link" style={linkStyle}
            >
              FAST ↗
            </a>
            <a
              href="https://github.com/aleesha-10/hummingraph"
              target="_blank" rel="noopener noreferrer"
              className="nav-link" style={linkStyle}
            >
              Other Universities ↗
            </a>
          </div>
        </div>
      </nav>
    </>
  )
}
