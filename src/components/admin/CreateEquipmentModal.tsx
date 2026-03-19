import { useState } from 'react';
import { X, Loader2, Wrench } from 'lucide-react';

interface Props {
  clientId: number;
  onClose: () => void;
  onCreated: () => void;
}

export default function CreateEquipmentModal({ clientId, onClose, onCreated }: Props) {
  const [economicNumber, setEconomicNumber] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/admin/equipment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ economicNumber, description, clientId }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error || 'Error al crear equipo');
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
            <Wrench className="w-5 h-5 text-primary" />
            <h2 className="font-semibold text-white">Agregar Equipo</h2>
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
            <label className="block text-sm text-gray-400 mb-1.5">Número Económico</label>
            <input
              type="text"
              value={economicNumber}
              onChange={e => setEconomicNumber(e.target.value)}
              required
              placeholder="Mont-10"
              className="w-full bg-[#1A1A1A] border border-white/10 text-white rounded-lg px-4 py-2.5 text-sm font-mono focus:outline-none focus:border-primary transition-colors"
            />
            <p className="text-xs text-gray-500 mt-1">Ej: Mont-10, Mini-05, Apil-03</p>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Descripción (opcional)</label>
            <input
              type="text"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Montacargas HELI 3 ton"
              className="w-full bg-[#1A1A1A] border border-white/10 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors"
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
              {loading ? 'Guardando...' : 'Agregar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
