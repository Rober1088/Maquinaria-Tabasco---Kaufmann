import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { href: '/#inicio', label: 'INICIO' },
  { href: '/#servicios', label: 'SERVICIOS' },
  { href: '/#mantenimiento', label: 'MANTENIMIENTO' },
  { href: '/#reparacion', label: 'REPARACION' },
  { href: '/#refacciones', label: 'REFACCIONES' },
  { href: '/#renta', label: 'RENTA DE MAQUINARIA' },
  { href: '/#venta', label: 'VENTA DE MAQUINARIA' },
];

const maquinariaItems = [
  { label: 'TODOS LOS EQUIPOS', href: '/maquinaria' },
  { label: 'MONTACARGAS', href: '/maquinaria' },
  { label: 'MINI EXCAVADORA', href: '/maquinaria' },
  { label: 'APILADORES', href: '/maquinaria' },
  { label: 'PLATAFORMA ELEVADORA', href: '/maquinaria' },
  { label: 'PATÍN ELÉCTRICO', href: '/maquinaria' },
  { label: 'PATÍN HIDRÁULICO', href: '/maquinaria' },
  { label: 'LLANTAS SÓLIDAS', href: '/maquinaria' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMaquinariaOpen, setIsMaquinariaOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50" style={{ backgroundColor: '#1A1A1A' }}>
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src="/images/d783dae4c77a36e42498d6e585a76e15.png"
              alt="Kaufmann Maquinaria Tabasco"
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-1 flex-1 justify-center">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-xs font-semibold tracking-wide text-gray-300 hover:text-white px-2 py-2 transition-colors whitespace-nowrap"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                {item.label}
              </a>
            ))}

            {/* Maquinaria Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setIsMaquinariaOpen(true)}
                onMouseLeave={() => setIsMaquinariaOpen(false)}
                className="flex items-center gap-1 text-xs font-semibold tracking-wide text-gray-300 hover:text-white px-2 py-2 transition-colors"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                MAQUINARIA <ChevronDown size={14} />
              </button>
              {isMaquinariaOpen && (
                <div
                  className="absolute top-full left-0 w-56 py-2 z-50"
                  style={{ backgroundColor: '#111111' }}
                  onMouseEnter={() => setIsMaquinariaOpen(true)}
                  onMouseLeave={() => setIsMaquinariaOpen(false)}
                >
                  {maquinariaItems.map((item) => (
                    <Link
                      key={item.label}
                      to={item.href}
                      className="block px-4 py-2 text-xs font-semibold text-gray-300 hover:text-white hover:bg-red-700 transition-colors"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                      onClick={() => setIsMaquinariaOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* CTA Button */}
          <a
            href="/#contacto"
            className="hidden xl:block flex-shrink-0 px-4 py-2 text-xs font-bold tracking-widest text-white transition-colors"
            style={{ backgroundColor: '#CC0000', fontFamily: "'Barlow Condensed', sans-serif" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#E60000')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#CC0000')}
          >
            CONTACTO
          </a>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden p-2 text-white"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="xl:hidden fixed inset-0 top-16 z-40 overflow-y-auto"
          style={{ backgroundColor: '#111111' }}
        >
          <nav className="flex flex-col px-6 py-8 gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-lg font-bold text-gray-200 hover:text-white py-3 border-b border-gray-800 transition-colors"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <button
              className="text-lg font-bold text-gray-200 py-3 border-b border-gray-800 text-left flex items-center justify-between"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              onClick={() => setIsMaquinariaOpen(!isMaquinariaOpen)}
            >
              MAQUINARIA <ChevronDown size={18} className={isMaquinariaOpen ? 'rotate-180' : ''} />
            </button>
            {isMaquinariaOpen && (
              <div className="pl-4">
                {maquinariaItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="block text-base font-semibold text-gray-400 hover:text-white py-2 border-b border-gray-800 transition-colors"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
            <a
              href="/#contacto"
              className="mt-6 text-center py-4 text-lg font-bold tracking-widest text-white"
              style={{ backgroundColor: '#CC0000', fontFamily: "'Barlow Condensed', sans-serif" }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              CONTACTO
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
