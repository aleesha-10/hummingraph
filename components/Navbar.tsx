// path: components/Navbar.tsx
"use client"
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  return (
    <>
      <style>{`
        .nav-logo { opacity: 1; transition: opacity 0.2s ease; }
        .nav-logo:hover { opacity: 0.65; }
        .nav-link { transition: opacity 0.2s ease; }
        .nav-link:hover { opacity: 0.65; }
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
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link href="/" style={{ textDecoration: 'none' }} className="nav-logo">
              <span style={{
                fontFamily: 'var(--font-nunito), sans-serif',
                fontWeight: 800,
                fontSize: '1.25rem',
                color: '#5D5C61',
                letterSpacing: '-0.01em',
              }}>
                Hummingraph
              </span>
            </Link>
            <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', marginLeft: '8px' }} className="nav-logo">
              <Image
                src="/logo2.svg"
                alt="Hummingraph logo"
                width={32}
                height={32}
              />
            </Link>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <Link
              href="/concept-map"
              className="nav-link"
              style={{
                textDecoration: 'none',
                fontFamily: 'var(--font-mulish), sans-serif',
                fontSize: '0.9rem',
                fontWeight: 600,
                color: '#5D5C61',
              }}
            >
              Concept Map
            </Link>
            <Link
              href="/compare"
              className="nav-link"
              style={{
                textDecoration: 'none',
                fontFamily: 'var(--font-mulish), sans-serif',
                fontSize: '0.9rem',
                fontWeight: 600,
                color: '#5D5C61',
              }}
            >
              Compare
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}
