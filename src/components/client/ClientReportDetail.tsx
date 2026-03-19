import { useState, useEffect } from 'react';
import { ArrowLeft, Loader2, Camera, Download, ImageIcon } from 'lucide-react';

interface Photo {
  id: number;
  filename: string;
  originalName: string;
  caption: string | null;
  createdAt: string;
}

interface Report {
  id: number;
  title: string;
  notes: string | null;
  createdAt: string;
}

interface Equipment {
  id: number;
  economicNumber: string;
  description: string | null;
}

interface Props {
  reportId: number;
  onBack: () => void;
}

export default function ClientReportDetail({ reportId, onBack }: Props) {
  const [data, setData] = useState<{ report: Report; photos: Photo[]; equipment: Equipment } | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [reportId]);

  async function fetchData() {
    setLoading(true);
    try {
      const res = await fetch(`/api/client/reports/${reportId}`);
      if (res.ok) setData(await res.json());
    } finally {
      setLoading(false);
    }
  }

  async function downloadAll() {
    if (!data || data.photos.length === 0) return;
    setDownloading(true);
    try {
      for (const photo of data.photos) {
        const res = await fetch(`/assets/reports/${photo.filename}`);
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = photo.originalName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        await new Promise(r => setTimeout(r, 300));
      }
    } finally {
      setDownloading(false);
    }
  }

  async function downloadSingle(photo: Photo) {
    const res = await fetch(`/assets/reports/${photo.filename}`);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = photo.originalName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center">
        <Loader2 className="animate-spin text-primary w-8 h-8" />
      </div>
    );
  }

  if (!data) return null;
  const { report, photos, equipment } = data;

  return (
    <>
      <title>{report.title} — Kaufmann</title>
      <div className="min-h-screen bg-[#1A1A1A] text-white">
        {/* Header */}
        <header className="bg-[#2E2E2E] border-b border-white/5 px-6 py-4 flex items-center gap-4">
          <button onClick={onBack} className="text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="font-bold text-white" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
              {report.title.toUpperCase()}
            </h1>
            <p className="text-xs text-gray-400">
              {equipment && <span className="font-mono text-primary">{equipment.economicNumber}</span>}
              {equipment?.description && ` — ${equipment.description}`}
              {' · '}
              {new Date(report.createdAt).toLocaleDateString('es-MX', { day: '2-digit', month: 'long', year: 'numeric' })}
            </p>
          </div>
          {photos.length > 0 && (
            <button
              onClick={downloadAll}
              disabled={downloading}
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors disabled:opacity-60"
            >
              {downloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              {downloading ? 'Descargando...' : 'Descargar Todo'}
            </button>
          )}
        </header>

        <main className="max-w-5xl mx-auto px-6 py-8 flex flex-col gap-6">
          {/* Notes */}
          {report.notes && (
            <div className="bg-[#2E2E2E] rounded-xl p-5 border border-white/5">
              <p className="text-sm text-gray-400 mb-1">Notas del reporte</p>
              <p className="text-white text-sm">{report.notes}</p>
            </div>
          )}

          {/* Photos */}
          <section>
            <h2 className="font-semibold text-white mb-4 flex items-center gap-2" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
              <ImageIcon className="w-5 h-5 text-primary" />
              FOTOS ({photos.length})
            </h2>

            {photos.length === 0 ? (
              <div className="bg-[#2E2E2E] rounded-xl p-12 text-center border border-white/5">
                <Camera className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400 text-sm">Las fotos de este reporte aún no están disponibles</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {photos.map(photo => (
                  <div key={photo.id} className="group relative aspect-square bg-[#2E2E2E] rounded-xl overflow-hidden border border-white/5">
                    <img
                      src={`/assets/reports/${photo.filename}`}
                      alt={photo.caption || photo.originalName}
                      className="w-full h-full object-cover"
                    />
                    {/* Download overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        onClick={() => downloadSingle(photo)}
                        className="bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors"
                      >
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
                    {photo.caption && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-2 py-1">
                        <p className="text-white text-xs truncate">{photo.caption}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </>
  );
}
