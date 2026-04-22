// path: components/Navbar.tsx
"use client"
import Link from 'next/link'

export default function Navbar() {
  return (
    <>
      <style>{`
        .nav-logo { opacity: 1; transition: opacity 0.2s ease; }
        .nav-logo:hover { opacity: 0.65; }
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
        }}>
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
        </div>
      </nav>
    </>
  )
}