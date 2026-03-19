import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Upload, Loader2, Camera, X, ImageIcon } from 'lucide-react';

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
  onPhotoUploaded: () => void;
}

export default function ReportDetail({ reportId, onBack, onPhotoUploaded }: Props) {
  const [data, setData] = useState<{ report: Report; photos: Photo[]; equipment: Equipment } | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchData();
  }, [reportId]);

  async function fetchData() {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/reports/${reportId}`);
      if (res.ok) setData(await res.json());
    } finally {
      setLoading(false);
    }
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files);
    const urls = files.map(f => URL.createObjectURL(f));
    setPreviews(urls);
  }

  function removeSelected(index: number) {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  }

  async function handleUpload() {
    if (selectedFiles.length === 0) return;
    setUploading(true);
    try {
      const formData = new FormData();
      selectedFiles.forEach(f => formData.append('photos', f));
      const res = await fetch(`/api/admin/reports/${reportId}/photos`, {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        setSelectedFiles([]);
        setPreviews([]);
        if (fileInputRef.current) fileInputRef.current.value = '';
        await fetchData();
        onPhotoUploaded();
      }
    } finally {
      setUploading(false);
    }
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
            <span className="font-mono text-primary">{equipment?.economicNumber}</span>
            {equipment?.description && ` — ${equipment.description}`}
            {' · '}
            {new Date(report.createdAt).toLocaleDateString('es-MX', { day: '2-digit', month: 'long', year: 'numeric' })}
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8 flex flex-col gap-8">
        {/* Notes */}
        {report.notes && (
          <div className="bg-[#2E2E2E] rounded-xl p-5 border border-white/5">
            <p className="text-sm text-gray-400 mb-1">Notas</p>
            <p className="text-white text-sm">{report.notes}</p>
          </div>
        )}

        {/* Upload section */}
        <section className="bg-[#2E2E2E] rounded-xl p-6 border border-white/5">
          <h2 className="font-semibold text-white mb-4 flex items-center gap-2" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
            <Upload className="w-5 h-5 text-primary" />
            SUBIR FOTOS
          </h2>

          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-white/10 hover:border-primary/50 rounded-xl p-8 text-center cursor-pointer transition-colors"
          >
            <Camera className="w-10 h-10 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400 text-sm">Haz clic para seleccionar fotos</p>
            <p className="text-gray-600 text-xs mt-1">JPG, PNG, WEBP — máx. 10MB por foto</p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />

          {previews.length > 0 && (
            <div className="mt-4">
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 mb-4">
                {previews.map((url, i) => (
                  <div key={i} className="relative group aspect-square">
                    <img src={url} alt="" className="w-full h-full object-cover rounded-lg" />
                    <button
                      onClick={() => removeSelected(i)}
                      className="absolute top-1 right-1 bg-black/70 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3 text-white" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={handleUpload}
                disabled={uploading}
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {uploading && <Loader2 className="w-4 h-4 animate-spin" />}
                {uploading ? 'Subiendo...' : `Subir ${selectedFiles.length} foto${selectedFiles.length !== 1 ? 's' : ''}`}
              </button>
            </div>
          )}
        </section>

        {/* Photos gallery */}
        <section>
          <h2 className="font-semibold text-white mb-4 flex items-center gap-2" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
            <ImageIcon className="w-5 h-5 text-primary" />
            FOTOS DEL REPORTE ({photos.length})
          </h2>

          {photos.length === 0 ? (
            <div className="bg-[#2E2E2E] rounded-xl p-12 text-center border border-white/5">
              <Camera className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400 text-sm">No hay fotos en este reporte</p>
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
  );
}
