import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, ChevronRight, Filter, X } from 'lucide-react';

const WHATSAPP_URL =
  'https://api.whatsapp.com/send/?phone=5219931187676&text&type=phone_number&app_absent=0';

type Producto = {
  id: string;
  nombre: string;
  categoria: string;
  subcategoria?: string;
  imagenSlot: string;
  descripcion: string;
  tonelaje?: string;
};

const productos: Producto[] = [
  // Montacargas - Combustión
  {
    id: 'mc-combustion-1',
    nombre: 'Montacargas Combustión 1–2 Ton',
    categoria: 'Montacargas',
    subcategoria: 'Combustión',
    imagenSlot: 'products/montacargas-combustion',
    descripcion: 'Motor a gas LP o gasolina. Ideal para uso en exteriores e interiores.',
    tonelaje: '1 a 2 Ton',
  },
  {
    id: 'mc-combustion-2',
    nombre: 'Montacargas Combustión 2–4 Ton',
    categoria: 'Montacargas',
    subcategoria: 'Combustión',
    imagenSlot: 'products/montacargas-combustion',
    descripcion: 'Alta capacidad de carga para operaciones industriales exigentes.',
    tonelaje: '2 a 4 Ton',
  },
  {
    id: 'mc-combustion-3',
    nombre: 'Montacargas Combustión 4–5 Ton',
    categoria: 'Montacargas',
    subcategoria: 'Combustión',
    imagenSlot: 'products/montacargas-combustion',
    descripcion: 'Potencia y durabilidad para cargas pesadas en almacenes y patios.',
    tonelaje: '4 a 5 Ton',
  },
  {
    id: 'mc-combustion-4',
    nombre: 'Montacargas Combustión 5–10 Ton',
    categoria: 'Montacargas',
    subcategoria: 'Combustión',
    imagenSlot: 'products/montacargas-combustion',
    descripcion: 'Diseñado para operaciones de gran escala con máxima eficiencia.',
    tonelaje: '5 a 10 Ton',
  },
  {
    id: 'mc-combustion-5',
    nombre: 'Montacargas Combustión 12–18 Ton',
    categoria: 'Montacargas',
    subcategoria: 'Combustión',
    imagenSlot: 'products/montacargas-combustion',
    descripcion: 'Equipo pesado para industria portuaria, siderúrgica y construcción.',
    tonelaje: '12 a 18 Ton',
  },
  // Montacargas - Eléctrico
  {
    id: 'mc-electrico-1',
    nombre: 'Montacargas Eléctrico 0.8–3.8 Ton',
    categoria: 'Montacargas',
    subcategoria: 'Eléctrico',
    imagenSlot: 'products/montacargas-electrico',
    descripcion: 'Cero emisiones, silencioso. Perfecto para interiores y zonas de alimentos.',
    tonelaje: '0.8 a 3.8 Ton',
  },
  {
    id: 'mc-electrico-2',
    nombre: 'Montacargas Eléctrico 4–5 Ton',
    categoria: 'Montacargas',
    subcategoria: 'Eléctrico',
    imagenSlot: 'products/montacargas-electrico',
    descripcion: 'Alta capacidad eléctrica con batería de larga duración.',
    tonelaje: '4 a 5 Ton',
  },
  {
    id: 'mc-electrico-3',
    nombre: 'Montacargas Eléctrico 6–10 Ton',
    categoria: 'Montacargas',
    subcategoria: 'Eléctrico',
    imagenSlot: 'products/montacargas-electrico',
    descripcion: 'Potencia eléctrica para cargas pesadas sin emisiones contaminantes.',
    tonelaje: '6 a 10 Ton',
  },
  // Apiladores
  {
    id: 'api-1',
    nombre: 'Apilador Eléctrico Litio 0.6 Ton',
    categoria: 'Apiladores',
    subcategoria: 'Eléctrico',
    imagenSlot: 'products/apilador-electrico',
    descripcion: 'Compacto y ágil. Batería de litio de carga rápida para almacenes pequeños.',
    tonelaje: '0.6 Ton',
  },
  {
    id: 'api-2',
    nombre: 'Apilador Eléctrico Litio 1 Ton',
    categoria: 'Apiladores',
    subcategoria: 'Eléctrico',
    imagenSlot: 'products/apilador-electrico',
    descripcion: 'Operador a pie. Ideal para pasillos estrechos y almacenes medianos.',
    tonelaje: '1 Ton',
  },
  {
    id: 'api-3',
    nombre: 'Apilador Eléctrico Litio 1.4 Ton',
    categoria: 'Apiladores',
    subcategoria: 'Eléctrico',
    imagenSlot: 'products/apilador-electrico',
    descripcion: 'Reach sencillo para mayor alcance en racks de almacenamiento.',
    tonelaje: '1.4 Ton',
  },
  {
    id: 'api-4',
    nombre: 'Apilador Operador a Bordo 1.6 Ton',
    categoria: 'Apiladores',
    subcategoria: 'Operador a Bordo',
    imagenSlot: 'products/apilador-electrico',
    descripcion: 'Mayor productividad con operador a bordo. Batería de litio incluida.',
    tonelaje: '1.6 Ton',
  },
  {
    id: 'api-5',
    nombre: 'Apilador Contrabalanceado 2 Ton',
    categoria: 'Apiladores',
    subcategoria: 'Operador a Bordo',
    imagenSlot: 'products/apilador-electrico',
    descripcion: 'Diseño contrabalanceado para mayor estabilidad en cargas pesadas.',
    tonelaje: '2 Ton',
  },
  // Mini Excavadora
  {
    id: 'exc-1',
    nombre: 'Mini Excavadora VTW-12S',
    categoria: 'Mini Excavadora',
    imagenSlot: 'products/mini-excavadora',
    descripcion: 'Motor Kubota. Compacta y potente para trabajos en espacios reducidos.',
    tonelaje: '1.2 Ton',
  },
  {
    id: 'exc-2',
    nombre: 'Mini Excavadora VTW-20S',
    categoria: 'Mini Excavadora',
    imagenSlot: 'products/mini-excavadora',
    descripcion: 'Ideal para excavaciones, demoliciones y trabajos de construcción ligera.',
    tonelaje: '2 Ton',
  },
  {
    id: 'exc-3',
    nombre: 'Mini Excavadora VTW-30S',
    categoria: 'Mini Excavadora',
    imagenSlot: 'products/mini-excavadora',
    descripcion: 'Mayor potencia de excavación con cabina ergonómica y bajo consumo.',
    tonelaje: '3 Ton',
  },
  // Plataforma Elevadora
  {
    id: 'plat-1',
    nombre: 'Plataforma Elevadora Eléctrica',
    categoria: 'Plataforma Elevadora',
    imagenSlot: 'products/plataforma-elevadora',
    descripcion: 'Elevación segura de personas y materiales. Operación silenciosa y limpia.',
  },
  {
    id: 'plat-2',
    nombre: 'Plataforma Elevadora Tijera',
    categoria: 'Plataforma Elevadora',
    imagenSlot: 'products/plataforma-elevadora',
    descripcion: 'Plataforma tipo tijera para trabajos en altura con gran superficie de trabajo.',
  },
  // Patín Eléctrico
  {
    id: 'pe-1',
    nombre: 'Patín Eléctrico 1.5 Ton',
    categoria: 'Patín Eléctrico',
    imagenSlot: 'products/patin-electrico',
    descripcion: 'Transporte motorizado de pallets. Reduce el esfuerzo físico del operador.',
  },
  {
    id: 'pe-2',
    nombre: 'Patín Eléctrico 2 Ton',
    categoria: 'Patín Eléctrico',
    imagenSlot: 'products/patin-electrico',
    descripcion: 'Mayor capacidad para almacenes de alto volumen. Batería de larga duración.',
  },
  // Patín Hidráulico
  {
    id: 'ph-1',
    nombre: 'Patín Hidráulico 2.5 Ton',
    categoria: 'Patín Hidráulico',
    imagenSlot: 'products/patin-hidraulico',
    descripcion: 'Resistente y confiable. El clásico para mover pallets en cualquier almacén.',
  },
  {
    id: 'ph-2',
    nombre: 'Patín Hidráulico 3 Ton',
    categoria: 'Patín Hidráulico',
    imagenSlot: 'products/patin-hidraulico',
    descripcion: 'Alta capacidad de carga con mecanismo hidráulico de fácil operación.',
  },
];

const categorias = [
  'Todos',
  'Montacargas',
  'Apiladores',
  'Mini Excavadora',
  'Plataforma Elevadora',
  'Patín Eléctrico',
  'Patín Hidráulico',
];

const subcategoriasPorCategoria: Record<string, string[]> = {
  Montacargas: ['Combustión', 'Eléctrico'],
  Apiladores: ['Eléctrico', 'Operador a Bordo'],
};

export default function MaquinariaPage() {
  const [categoriaActiva, setCategoriaActiva] = useState('Todos');
  const [subcategoriaActiva, setSubcategoriaActiva] = useState('');
  const [filtroMovilAbierto, setFiltroMovilAbierto] = useState(false);

  const subcategorias = subcategoriasPorCategoria[categoriaActiva] || [];

  const productosFiltrados = productos.filter((p) => {
    if (categoriaActiva !== 'Todos' && p.categoria !== categoriaActiva) return false;
    if (subcategoriaActiva && p.subcategoria !== subcategoriaActiva) return false;
    return true;
  });

  const handleCategoria = (cat: string) => {
    setCategoriaActiva(cat);
    setSubcategoriaActiva('');
    setFiltroMovilAbierto(false);
  };

  return (
    <>
      <title>Maquinaria Industrial - Kaufmann Tabasco</title>
      <meta
        name="description"
        content="Catálogo de maquinaria industrial: montacargas, apiladores, mini excavadoras, plataformas elevadoras y más. Venta y renta en Tabasco."
      />

      {/* Hero */}
      <section
        className="relative py-16 md:py-24 overflow-hidden"
        style={{ backgroundColor: '#111111' }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 40px, #CC0000 40px, #CC0000 41px)',
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Link
              to="/"
              className="text-sm text-gray-400 hover:text-white transition-colors"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              INICIO
            </Link>
            <ChevronRight size={14} className="text-gray-600" />
            <span
              className="text-sm font-bold"
              style={{ color: '#CC0000', fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              MAQUINARIA
            </span>
          </div>
          <h1
            className="text-5xl md:text-7xl font-black uppercase text-white leading-none"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            CATÁLOGO DE
            <br />
            <span style={{ color: '#CC0000' }}>MAQUINARIA</span>
          </h1>
          <p
            className="mt-4 text-lg text-gray-400 max-w-xl"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            Equipos industriales de las mejores marcas. Venta y renta con soporte técnico
            especializado en Tabasco.
          </p>
        </div>
      </section>

      {/* Contenido principal */}
      <section className="py-10" style={{ backgroundColor: '#1A1A1A' }}>
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            {/* Sidebar filtros — desktop */}
            <aside className="hidden lg:block w-56 flex-shrink-0">
              <div
                className="sticky top-24 rounded-sm overflow-hidden"
                style={{ backgroundColor: '#111111' }}
              >
                <div
                  className="px-4 py-3 flex items-center gap-2"
                  style={{ backgroundColor: '#CC0000' }}
                >
                  <Filter size={14} className="text-white" />
                  <span
                    className="text-sm font-bold text-white tracking-widest"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    FILTRAR
                  </span>
                </div>
                <nav className="py-2">
                  {categorias.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCategoria(cat)}
                      className="w-full text-left px-4 py-2.5 text-sm font-semibold transition-colors"
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        color: categoriaActiva === cat ? '#ffffff' : '#9ca3af',
                        backgroundColor:
                          categoriaActiva === cat ? '#CC0000' : 'transparent',
                      }}
                    >
                      {cat.toUpperCase()}
                    </button>
                  ))}
                </nav>

                {/* Subcategorías */}
                {subcategorias.length > 0 && (
                  <div className="border-t border-gray-800 py-2">
                    <div className="px-4 py-2">
                      <span
                        className="text-xs font-bold text-gray-500 tracking-widest"
                        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                      >
                        TIPO
                      </span>
                    </div>
                    {subcategorias.map((sub) => (
                      <button
                        key={sub}
                        onClick={() =>
                          setSubcategoriaActiva(subcategoriaActiva === sub ? '' : sub)
                        }
                        className="w-full text-left px-4 py-2 text-sm font-semibold transition-colors flex items-center gap-2"
                        style={{
                          fontFamily: "'Barlow Condensed', sans-serif",
                          color: subcategoriaActiva === sub ? '#CC0000' : '#9ca3af',
                        }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{
                            backgroundColor:
                              subcategoriaActiva === sub ? '#CC0000' : '#4b5563',
                          }}
                        />
                        {sub.toUpperCase()}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </aside>

            {/* Área de productos */}
            <div className="flex-1 min-w-0">
              {/* Filtro móvil */}
              <div className="lg:hidden mb-4">
                <button
                  onClick={() => setFiltroMovilAbierto(!filtroMovilAbierto)}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-white"
                  style={{
                    backgroundColor: '#CC0000',
                    fontFamily: "'Barlow Condensed', sans-serif",
                  }}
                >
                  <Filter size={14} />
                  FILTRAR: {categoriaActiva.toUpperCase()}
                  {filtroMovilAbierto ? <X size={14} /> : null}
                </button>
                {filtroMovilAbierto && (
                  <div
                    className="mt-1 rounded-sm overflow-hidden"
                    style={{ backgroundColor: '#111111' }}
                  >
                    {categorias.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => handleCategoria(cat)}
                        className="w-full text-left px-4 py-3 text-sm font-semibold border-b border-gray-800 transition-colors"
                        style={{
                          fontFamily: "'Barlow Condensed', sans-serif",
                          color: categoriaActiva === cat ? '#CC0000' : '#9ca3af',
                        }}
                      >
                        {cat.toUpperCase()}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Contador */}
              <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <div className="flex items-center gap-3 flex-wrap">
                  <span
                    className="text-sm text-gray-400"
                    style={{ fontFamily: "'Barlow', sans-serif" }}
                  >
                    {productosFiltrados.length} equipos encontrados
                  </span>
                  {subcategorias.length > 0 && (
                    <div className="hidden lg:flex gap-2">
                      {subcategorias.map((sub) => (
                        <button
                          key={sub}
                          onClick={() =>
                            setSubcategoriaActiva(subcategoriaActiva === sub ? '' : sub)
                          }
                          className="px-3 py-1 text-xs font-bold border transition-colors"
                          style={{
                            fontFamily: "'Barlow Condensed', sans-serif",
                            borderColor:
                              subcategoriaActiva === sub ? '#CC0000' : '#374151',
                            color: subcategoriaActiva === sub ? '#CC0000' : '#9ca3af',
                            backgroundColor:
                              subcategoriaActiva === sub
                                ? 'rgba(204,0,0,0.1)'
                                : 'transparent',
                          }}
                        >
                          {sub.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white transition-colors"
                  style={{
                    backgroundColor: '#25D366',
                    fontFamily: "'Barlow Condensed', sans-serif",
                  }}
                >
                  <MessageCircle size={14} />
                  COTIZAR POR WHATSAPP
                </a>
              </div>

              {/* Grid de productos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {productosFiltrados.map((producto) => (
                  <ProductoCard key={producto.id} producto={producto} />
                ))}
              </div>

              {productosFiltrados.length === 0 && (
                <div className="text-center py-20">
                  <p
                    className="text-gray-500 text-lg"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    No se encontraron equipos en esta categoría.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA inferior */}
      <section className="py-16" style={{ backgroundColor: '#CC0000' }}>
        <div className="container mx-auto px-4 text-center">
          <h2
            className="text-4xl md:text-5xl font-black text-white uppercase mb-4"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            ¿NO ENCUENTRAS LO QUE BUSCAS?
          </h2>
          <p
            className="text-white/80 text-lg mb-8"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            Contáctanos directamente. Tenemos acceso a todo el catálogo HELI y más marcas.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 text-base font-bold text-white transition-colors"
            style={{
              backgroundColor: '#111111',
              fontFamily: "'Barlow Condensed', sans-serif",
            }}
          >
            <MessageCircle size={20} />
            CONTACTAR POR WHATSAPP
          </a>
        </div>
      </section>
    </>
  );
}

function ProductoCard({ producto }: { producto: Producto }) {
  return (
    <div
      className="group flex flex-col overflow-hidden transition-transform hover:-translate-y-1"
      style={{ backgroundColor: '#111111' }}
    >
      {/* Imagen — cada producto usa su propio slot */}
      <div className="relative overflow-hidden aspect-[4/3] bg-gray-900">
        <img
          src={`/airo-assets/images/${producto.imagenSlot}`}
          alt={producto.nombre}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {producto.subcategoria && (
          <span
            className="absolute top-3 left-3 px-2 py-1 text-xs font-bold text-white"
            style={{
              backgroundColor: '#CC0000',
              fontFamily: "'Barlow Condensed', sans-serif",
            }}
          >
            {producto.subcategoria.toUpperCase()}
          </span>
        )}
        {producto.tonelaje && (
          <span
            className="absolute top-3 right-3 px-2 py-1 text-xs font-bold text-white"
            style={{
              backgroundColor: 'rgba(0,0,0,0.7)',
              fontFamily: "'Barlow Condensed', sans-serif",
            }}
          >
            {producto.tonelaje}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-4">
        <span
          className="text-xs font-bold mb-1"
          style={{ color: '#CC0000', fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          {producto.categoria.toUpperCase()}
        </span>
        <h3
          className="text-base font-bold text-white mb-2 leading-tight"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          {producto.nombre}
        </h3>
        <p
          className="text-sm text-gray-400 flex-1 mb-4"
          style={{ fontFamily: "'Barlow', sans-serif" }}
        >
          {producto.descripcion}
        </p>
        <a
          href={`https://api.whatsapp.com/send/?phone=5219931187676&text=Hola, me interesa el ${encodeURIComponent(producto.nombre)}&type=phone_number&app_absent=0`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-2.5 text-sm font-bold text-white transition-colors"
          style={{
            backgroundColor: '#CC0000',
            fontFamily: "'Barlow Condensed', sans-serif",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#E60000')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#CC0000')}
        >
          <MessageCircle size={14} />
          SOLICITAR INFORMACIÓN
        </a>
      </div>
    </div>
  );
}
