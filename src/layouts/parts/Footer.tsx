import { Facebook, Phone, Mail, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#111111' }}>
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Column 1 — Brand */}
          <div>
            <img
              src="/images/d783dae4c77a36e42498d6e585a76e15.png"
              alt="Kaufmann Maquinaria Tabasco"
              className="h-12 w-auto mb-4"
            />
            <p
              className="text-sm text-gray-400 mb-6 leading-relaxed"
              style={{ fontFamily: "'Barlow', sans-serif" }}
            >
              Venta, Renta y Mantenimiento para Maquinaria Industrial en todo México.
            </p>
            <a
              href="https://www.facebook.com/DYSKAUFMANN"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <Facebook size={20} />
              <span className="text-sm" style={{ fontFamily: "'Barlow', sans-serif" }}>
                DYSKAUFMANN
              </span>
            </a>
          </div>

          {/* Column 2 — Navigation */}
          <div>
            <h3
              className="text-sm font-bold tracking-widest text-gray-500 mb-6 uppercase"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Navegación
            </h3>
            <nav className="flex flex-col gap-2">
              {[
                { href: '/#inicio', label: 'INICIO' },
                { href: '/#servicios', label: 'SERVICIOS' },
                { href: '/#mantenimiento', label: 'MANTENIMIENTO' },
                { href: '/#reparacion', label: 'REPARACION' },
                { href: '/#refacciones', label: 'REFACCIONES' },
                { href: '/#renta', label: 'RENTA DE MAQUINARIA' },
                { href: '/#venta', label: 'VENTA DE MAQUINARIA' },
                { href: '/#contacto', label: 'CONTACTO' },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Column 3 — Contact */}
          <div>
            <h3
              className="text-sm font-bold tracking-widest text-gray-500 mb-6 uppercase"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Contacto
            </h3>
            <div className="flex flex-col gap-4">
              <a
                href="tel:9933570560"
                className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
              >
                <Phone size={16} className="flex-shrink-0" style={{ color: '#D4A520' }} />
                <span style={{ fontFamily: "'Barlow', sans-serif" }}>993 3570560</span>
              </a>
              <a
                href="tel:9931187676"
                className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
              >
                <Phone size={16} className="flex-shrink-0" style={{ color: '#D4A520' }} />
                <span style={{ fontFamily: "'Barlow', sans-serif" }}>993 1187676</span>
              </a>
              <a
                href="mailto:administracion@kaufmann.mx"
                className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
              >
                <Mail size={16} className="flex-shrink-0" style={{ color: '#D4A520' }} />
                <span style={{ fontFamily: "'Barlow', sans-serif" }}>administracion@kaufmann.mx</span>
              </a>
              <a
                href="https://wa.me/9933570560"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
              >
                <MessageCircle size={16} className="text-green-500 flex-shrink-0" />
                <span style={{ fontFamily: "'Barlow', sans-serif" }}>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="border-t border-gray-800 py-4"
        style={{ backgroundColor: '#0A0A0A' }}
      >
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-2">
          <p
            className="text-xs text-gray-600"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            © 2026 All Rights Reserved. Maquinaria Tabasco - Kaufmann
          </p>
          <a
            href="#"
            className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            Avisos
          </a>
        </div>
      </div>
    </footer>
  );
}
