import { Phone, Mail, MessageCircle, Facebook } from 'lucide-react';

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden"
      style={{ backgroundColor: '#1A1A1A', minHeight: '90vh' }}
    >
      {/* Background noise/texture overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)',
          backgroundSize: '8px 8px',
        }}
      />

      {/* Oversized background text */}
      <div
        className="absolute inset-0 flex items-center overflow-hidden pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          className="font-black text-white opacity-[0.03] leading-none whitespace-nowrap"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 'clamp(120px, 20vw, 280px)',
            letterSpacing: '-0.02em',
          }}
        >
          MAQUINARIA
        </span>
      </div>

      <div className="relative container mx-auto px-6 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Left — Text (60%) */}
          <div className="lg:col-span-3">
            <p
              className="text-xs font-bold tracking-widest mb-4 uppercase"
              style={{ color: '#D4A520', fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              ▪ DISTRIBUIDOR OFICIAL
            </p>
            <h1
              className="font-black leading-none mb-4"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 'clamp(56px, 8vw, 96px)',
                color: '#FFFFFF',
                letterSpacing: '-0.01em',
              }}
            >
              MAQUINARIA
              <br />
              <span style={{ color: '#D4A520' }}>TABASCO</span>
            </h1>
            <h2
              className="font-bold mb-6"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 'clamp(22px, 3vw, 36px)',
                color: '#F0F0F0',
              }}
            >
              VENTA, RENTA Y REPARACIÓN
            </h2>
            <p
              className="text-lg mb-10 max-w-lg"
              style={{ color: '#AAAAAA', fontFamily: "'Barlow', sans-serif", lineHeight: 1.6 }}
            >
              Servicios en todo México — Venta, Renta y Mantenimiento para Maquinaria Industrial
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="/#contacto"
                className="inline-block px-8 py-4 text-base font-bold tracking-wider text-white transition-colors"
                style={{
                  backgroundColor: '#D4A520',
                  fontFamily: "'Barlow Condensed', sans-serif",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#C49518')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#D4A520')}
              >
                CONTÁCTANOS
              </a>
              <a
                href="/#servicios"
                className="text-base font-semibold text-white underline underline-offset-4 hover:text-gray-300 transition-colors"
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                Ver Servicios
              </a>
            </div>
          </div>

          {/* Right — Image (40%) */}
          <div className="lg:col-span-2 relative">
            <div className="relative overflow-hidden" style={{ borderRadius: 0 }}>
              <img
                src="/airo-assets/images/pages/home/hero-forklift"
                alt="Montacargas industrial en almacén"
                className="w-full object-cover"
                style={{ height: 'clamp(300px, 50vh, 560px)' }}
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent" />
              {/* HELI badge */}
              <div className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-sm p-3">
                <img
                  src="/images/753d097a0bbd7649303d3e1b93aaefe1.png"
                  alt="HELI Montacargas"
                  className="h-8 w-auto"
                />
              </div>
            </div>
            {/* Yellow accent bar */}
            <div className="h-1 w-full" style={{ backgroundColor: '#D4A520' }} />
          </div>
        </div>
      </div>

      {/* Social Proof Strip */}
      <div
        className="relative border-t border-gray-700"
        style={{ backgroundColor: '#2E2E2E' }}
      >
        <div className="container mx-auto px-6 py-5">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-center">
            {[
              'DISTRIBUIDOR OFICIAL · CONTINENTAL & HELI',
              'SERVICIO EN TODO MÉXICO',
              'VENTA · RENTA · MANTENIMIENTO · REPARACIÓN · REFACCIONES',
            ].map((text, i) => (
              <span
                key={i}
                className="text-xs font-bold tracking-widest text-gray-300"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Services Section ─────────────────────────────────────────────────────────
const services = [
  {
    id: 'venta',
    title: 'VENTA DE MAQUINARIA',
    desc: 'Amplio catálogo de montacargas, excavadoras y más equipos industriales nuevos y usados.',
    image: '/airo-assets/images/services/venta-maquinaria',
    large: true,
    bg: '#FFFFFF',
  },
  {
    id: 'renta',
    title: 'RENTA DE MAQUINARIA',
    desc: 'Renta flexible por día, semana o mes. Equipos listos para operar.',
    image: '/airo-assets/images/services/renta-maquinaria',
    large: false,
    bg: '#F5F5F5',
  },
  {
    id: 'mantenimiento',
    title: 'MANTENIMIENTO',
    desc: 'Programas preventivos y correctivos para maximizar la vida útil de tu equipo.',
    image: '/airo-assets/images/services/mantenimiento',
    large: false,
    bg: '#EEEEEE',
  },
  {
    id: 'reparacion',
    title: 'REPARACIÓN',
    desc: 'Diagnóstico y reparación especializada con técnicos certificados.',
    large: false,
    bg: '#D4A520',
    accent: true,
  },
  {
    id: 'refacciones',
    title: 'REFACCIONES',
    desc: 'Piezas originales y compatibles para todas las marcas de maquinaria.',
    large: false,
    bg: '#F5F5F5',
  },
  {
    id: 'llantas',
    title: 'LLANTAS SÓLIDAS',
    desc: 'Distribuidor oficial Continental. Llantas de alta resistencia para montacargas.',
    large: false,
    bg: '#1A1A1A',
    dark: true,
    brandLogo: '/images/b6926639df7484260968f3d73b544969.png',
  },
];

function ServicesSection() {
  return (
    <section id="servicios" className="py-20" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="container mx-auto px-6">
        <p
          className="text-xs font-bold tracking-widest mb-2"
          style={{ color: '#D4A520', fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          ▪ LO QUE HACEMOS
        </p>
        <h2
          className="font-bold mb-12"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 'clamp(36px, 5vw, 56px)',
            color: '#1A1A1A',
          }}
        >
          NUESTROS SERVICIOS
        </h2>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Large card — Venta */}
          <div
            className="lg:col-span-2 lg:row-span-2 relative overflow-hidden group cursor-pointer rounded-lg"
            style={{ minHeight: '360px' }}
          >
            <img
              src={services[0].image}
              alt={services[0].title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div
              className="absolute left-0 top-0 bottom-0 w-1 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ backgroundColor: '#D4A520' }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3
                className="font-bold text-white mb-2"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: '28px',
                }}
              >
                {services[0].title}
              </h3>
              <p className="text-sm text-gray-300" style={{ fontFamily: "'Barlow', sans-serif" }}>
                {services[0].desc}
              </p>
            </div>
          </div>

          {/* Medium cards */}
          {services.slice(1).map((service) => {
            const isDark = service.accent || service.dark;
            return (
              <div
                key={service.id}
                className="relative overflow-hidden group cursor-pointer rounded-lg"
                style={{ backgroundColor: service.bg, minHeight: '170px' }}
              >
                {service.image && (
                  <>
                    <img
                      src={service.image}
                      alt={service.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-30 transition-opacity duration-300 group-hover:opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  </>
                )}
                {/* Yellow left border on hover */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: service.accent ? '#FFFFFF' : '#D4A520' }}
                />
                <div className="relative p-5 h-full flex flex-col justify-between">
                  <div>
                    <h3
                      className="font-bold mb-2"
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontSize: '20px',
                        color: isDark ? '#FFFFFF' : '#1A1A1A',
                      }}
                    >
                      {service.title}
                    </h3>
                    <p
                      className="text-xs leading-relaxed"
                      style={{
                        color: isDark ? 'rgba(255,255,255,0.85)' : '#666666',
                        fontFamily: "'Barlow', sans-serif",
                      }}
                    >
                      {service.desc}
                    </p>
                  </div>
                  {service.brandLogo && (
                    <div className="mt-3">
                      <img
                        src={service.brandLogo}
                        alt="Continental"
                        className="w-28 h-auto"
                        style={{ filter: 'brightness(0) invert(1)', opacity: 0.9, imageRendering: 'auto' }}
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Equipment Catalog ────────────────────────────────────────────────────────
const equipment = [
  { id: 'montacargas', label: 'MONTACARGAS', slot: '/airo-assets/images/equipment/montacargas' },
  { id: 'mini-excavadora', label: 'MINI EXCAVADORA', slot: '/airo-assets/images/equipment/mini-excavadora' },
  { id: 'apiladores', label: 'APILADORES', slot: '/airo-assets/images/equipment/apiladores' },
  { id: 'plataforma-elevadora', label: 'PLATAFORMA ELEVADORA', slot: '/airo-assets/images/equipment/plataforma-elevadora' },
  { id: 'patin-electrico', label: 'PATÍN ELÉCTRICO', slot: '/airo-assets/images/equipment/patin-electrico' },
  { id: 'patin-hidraulico', label: 'PATÍN HIDRÁULICO', slot: '/airo-assets/images/equipment/patin-hidraulico' },
];

function EquipmentSection() {
  return (
    <section id="maquinaria" className="py-20" style={{ backgroundColor: '#F5F5F5' }}>
      <div className="container mx-auto px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p
              className="text-xs font-bold tracking-widest mb-2"
              style={{ color: '#D4A520', fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              ▪ CATÁLOGO
            </p>
            <h2
              className="font-black leading-none"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 'clamp(48px, 7vw, 80px)',
                color: '#1A1A1A',
              }}
            >
              MAQUINARIA
            </h2>
          </div>
        </div>

        {/* Horizontal scrollable row */}
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide" style={{ scrollSnapType: 'x mandatory' }}>
          {equipment.map((item) => (
            <div
              key={item.id}
              id={item.id}
              className="relative flex-shrink-0 overflow-hidden group cursor-pointer rounded-lg shadow-md"
              style={{
                width: '220px',
                height: '300px',
                scrollSnapAlign: 'start',
              }}
            >
              <img
                src={item.slot}
                alt={item.label}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              {/* Yellow bottom border on hover */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ backgroundColor: '#D4A520' }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3
                  className="font-bold text-white text-sm"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '0.05em' }}
                >
                  {item.label}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Distributor Section ──────────────────────────────────────────────────────
function DistributorSection() {
  return (
    <section className="py-20" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="container mx-auto px-6">
        <p
          className="text-center text-xs font-bold tracking-widest mb-12 uppercase"
          style={{ color: '#999999', fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          DISTRIBUIDOR OFICIAL
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-0">
          {/* HELI */}
          <div className="flex-1 flex items-center justify-center py-10 px-12">
            <img
              src="/images/fe26653e2193b6950127ca6daf3b85b7.png"
              alt="HELI Montacargas"
              className="h-16 w-auto object-contain"
            />
          </div>
          {/* Divider */}
          <div className="w-px h-20 bg-gray-200 hidden md:block" />
          <div className="h-px w-20 bg-gray-200 md:hidden" />
          {/* Continental */}
          <div className="flex-1 flex items-center justify-center py-10 px-12">
            <img
              src="/images/b6926639df7484260968f3d73b544969.png"
              alt="Continental"
              className="h-16 w-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CTA Section ──────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section id="contacto" className="flex flex-col md:flex-row">
      {/* Left — Yellow */}
      <div
        className="flex-1 px-10 py-16 flex flex-col justify-center"
        style={{ backgroundColor: '#D4A520' }}
      >
        <h2
          className="font-black text-white mb-4 leading-none"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 'clamp(36px, 5vw, 56px)',
          }}
        >
          ¿NECESITAS
          <br />
          MAQUINARIA?
        </h2>
        <p
          className="text-white/90 mb-8 text-base"
          style={{ fontFamily: "'Barlow', sans-serif" }}
        >
          Contáctanos para cotización, renta o mantenimiento
        </p>
        <a
          href="mailto:administracion@kaufmann.mx"
          className="inline-block px-8 py-4 text-base font-bold tracking-wider transition-colors self-start"
          style={{
            backgroundColor: '#1A1A1A',
            color: '#FFFFFF',
            fontFamily: "'Barlow Condensed', sans-serif",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#333333';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#1A1A1A';
          }}
        >
          CONTÁCTANOS
        </a>
      </div>

      {/* Right — Dark */}
      <div
        className="flex-1 px-10 py-16 flex flex-col justify-center gap-6"
        style={{ backgroundColor: '#1A1A1A' }}
      >
        <a
          href="tel:9933570560"
          className="flex items-center gap-4 text-white hover:text-white/80 transition-colors"
        >
          <Phone size={20} className="flex-shrink-0" style={{ color: '#D4A520' }} />
          <span
            className="text-xl font-bold"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            993 3570560
          </span>
        </a>
        <a
          href="tel:9931187676"
          className="flex items-center gap-4 text-white hover:text-white/80 transition-colors"
        >
          <Phone size={20} className="flex-shrink-0" style={{ color: '#D4A520' }} />
          <span
            className="text-xl font-bold"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            993 1187676
          </span>
        </a>
        <a
          href="mailto:administracion@kaufmann.mx"
          className="flex items-center gap-4 text-white hover:text-white/80 transition-colors"
        >
          <Mail size={20} className="flex-shrink-0" style={{ color: '#D4A520' }} />
          <span
            className="text-base"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            administracion@kaufmann.mx
          </span>
        </a>
        <a
          href="https://wa.me/9933570560"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 text-white hover:text-white/80 transition-colors"
        >
          <MessageCircle size={20} className="flex-shrink-0 text-green-500" />
          <span
            className="text-base font-semibold"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            WhatsApp: wa.me/9933570560
          </span>
        </a>
        <a
          href="https://www.facebook.com/DYSKAUFMANN"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 text-white hover:text-white/80 transition-colors"
        >
          <Facebook size={20} className="flex-shrink-0" style={{ color: '#D4A520' }} />
          <span
            className="text-base font-semibold"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            DYSKAUFMANN
          </span>
        </a>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <title>Maquinaria Tabasco - Kaufmann | Venta, Renta y Mantenimiento de Maquinaria</title>
      <meta
        name="description"
        content="Distribuidor oficial HELI y Continental en México. Venta, renta, mantenimiento y reparación de montacargas, mini excavadoras, apiladores y más. Villahermosa, Tabasco."
      />
      <HeroSection />
      <ServicesSection />
      <EquipmentSection />
      <DistributorSection />
      <CTASection />
    </>
  );
}
