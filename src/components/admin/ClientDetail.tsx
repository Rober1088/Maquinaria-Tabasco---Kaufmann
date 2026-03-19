import { useState, useEffect } from 'react';
import { ArrowLeft, Plus, FileText, Wrench, Loader2, ChevronRight, Camera } from 'lucide-react';
import CreateEquipmentModal from './CreateEquipmentModal';
import CreateReportModal from './CreateReportModal';
import ReportDetail from './ReportDetail';

interface Client {
  id: number;
  companyName: string;
  email: string;
}

interface Equipment {
  id: number;
  economicNumber: string;
  description: string | null;
  clientId: number;
}

interface Report {
  id: number;
  title: string;
  notes: string | null;
  equipmentId: number;
  clientId: number;
  createdAt: string;
}

interface Props {
  clientId: number;
  onBack: () => void;
  onReportCreated: () => void;
}

export default function ClientDetail({ clientId, onBack, onReportCreated }: Props) {
  const [data, setData] = useState<{ client: Client; equipment: Equipment[]; reports: Report[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCreateEquipment, setShowCreateEquipment] = useState(false);
  const [showCreateReport, setShowCreateReport] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState<number | null>(null);

  useEffect(() => {
    fetchData();
  }, [clientId]);

  async function fetchData() {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/clients/${clientId}`);
      if (res.ok) setData(await res.json());
    } finally {
      setLoading(false);
    }
  }

  if (selectedReportId !== null) {
    return (
      <ReportDetail
        reportId={selectedReportId}
        onBack={() => setSelectedReportId(null)}
        onPhotoUploaded={fetchData}
      />
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center">
        <Loader2 className="animate-spin text-primary w-8 h-8" />
      </div>
    );
  }

  if (!data) return null;

  const { client, equipment, reports } = data;

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white">
      {/* Header */}
      <header className="bg-[#2E2E2E] border-b border-white/5 px-6 py-4 flex items-center gap-4">
        <button onClick={onBack} className="text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="font-bold text-white" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
            {client.companyName.toUpperCase()}
          </h1>
          <p className="text-xs text-gray-400">{client.email}</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8 flex flex-col gap-8">
        {/* Equipment section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
              <Wrench className="w-5 h-5 text-primary" />
              EQUIPOS
            </h2>
            <button
              onClick={() => setShowCreateEquipment(true)}
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white text-sm px-3 py-1.5 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              Agregar Equipo
            </button>
          </div>

          {equipment.length === 0 ? (
            <div className="bg-[#2E2E2E] rounded-xl p-6 text-center border border-white/5">
              <p className="text-gray-400 text-sm">No hay equipos registrados para este cliente</p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {equipment.map(eq => (
                <div key={eq.id} className="bg-[#2E2E2E] border border-white/5 rounded-lg px-4 py-2.5 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="font-mono font-semibold text-white text-sm">{eq.economicNumber}</span>
                  {eq.description && <span className="text-gray-400 text-xs">— {eq.description}</span>}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Reports section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
              <FileText className="w-5 h-5 text-primary" />
              REPORTES FOTOGRÁFICOS
            </h2>
            <button
              onClick={() => setShowCreateReport(true)}
              disabled={equipment.length === 0}
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              Nuevo Reporte
            </button>
          </div>

          {reports.length === 0 ? (
            <div className="bg-[#2E2E2E] rounded-xl p-12 text-center border border-white/5">
              <Camera className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400">No hay reportes para este cliente</p>
              {equipment.length > 0 && (
                <button
                  onClick={() => setShowCreateReport(true)}
                  className="mt-4 text-primary hover:underline text-sm"
                >
                  Crear el primer reporte
                </button>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {reports.map(report => {
                const eq = equipment.find(e => e.id === report.equipmentId);
                return (
                  <button
                    key={report.id}
                    onClick={() => setSelectedReportId(report.id)}
                    className="bg-[#2E2E2E] hover:bg-[#383838] border border-white/5 rounded-xl px-5 py-4 flex items-center justify-between transition-colors text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Camera className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">{report.title}</p>
                        <p className="text-xs text-gray-400">
                          {eq ? <span className="font-mono text-primary">{eq.economicNumber}</span> : ''} · {new Date(report.createdAt).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-500" />
                  </button>
                );
              })}
            </div>
          )}
        </section>
      </main>

      {showCreateEquipment && (
        <CreateEquipmentModal
          clientId={clientId}
          onClose={() => setShowCreateEquipment(false)}
          onCreated={() => { setShowCreateEquipment(false); fetchData(); }}
        />
      )}

      {showCreateReport && (
        <CreateReportModal
          clientId={clientId}
          equipment={equipment}
          onClose={() => setShowCreateReport(false)}
          onCreated={() => { setShowCreateReport(false); fetchData(); onReportCreated(); }}
        />
      )}
    </div>
  );
}
