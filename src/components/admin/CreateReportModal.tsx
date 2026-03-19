import { useState } from 'react';
import { X, Loader2, FileText } from 'lucide-react';

interface Equipment {
  id: number;
  economicNumber: string;
  description: string | null;
}

interface Props {
  clientId: number;
  equipment: Equipment[];
  onClose: () => void;
  onCreated: () => void;
}

export default function CreateReportModal({ clientId, equipment, onClose, onCreated }: Props) {
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [equipmentId, setEquipmentId] = useState(equipment[0]?.id?.toString() || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/admin/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, notes, equipmentId, clientId }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error || 'Error al crear reporte');
      else onCreated();
    } catch {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
      <div className="bg-[#2E2E2E] rounded-xl w-full max-w-md border border-white/10 shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            <h2 className="font-semibold text-white">Nuevo Reporte Fotográfico</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          {error && (
            <div className="bg-red-900/40 border border-red-500/50 text-red-300 text-sm rounded-lg px-4 py-3">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Equipo</label>
            <select
              value={equipmentId}
              onChange={e => setEquipmentId(e.target.value)}
              required
              className="w-full bg-[#1A1A1A] border border-white/10 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors"
            >
              {equipment.map(eq => (
                <option key={eq.id} value={eq.id}>
                  {eq.economicNumber}{eq.description ? ` — ${eq.description}` : ''}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Título del reporte</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              placeholder="Revisión mensual — Marzo 2026"
              className="w-full bg-[#1A1A1A] border border-white/10 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Notas (opcional)</label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              rows={3}
              placeholder="Observaciones del reporte..."
              className="w-full bg-[#1A1A1A] border border-white/10 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors resize-none"
            />
          </div>

          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-white/5 hover:bg-white/10 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-primary hover:bg-primary/90 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? 'Creando...' : 'Crear Reporte'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
