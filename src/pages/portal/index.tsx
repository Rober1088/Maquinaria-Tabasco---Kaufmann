import { useState, useEffect } from 'react';
import { useSession, signOut } from '@/lib/auth/auth-client';
import { Navigate } from 'react-router-dom';
import { Loader2, FileText, Camera, ChevronRight, LogOut, Download } from 'lucide-react';
import ClientReportDetail from '@/components/client/ClientReportDetail';

interface Report {
  id: number;
  title: string;
  notes: string | null;
  createdAt: string;
  equipmentId: number;
  economicNumber: string | null;
  description: string | null;
}

interface Client {
  id: number;
  companyName: string;
  email: string;
}

export default function ClientPortal() {
  const { data: session, isPending } = useSession();
  const [data, setData] = useState<{ client: Client; reports: Report[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedReportId, setSelectedReportId] = useState<number | null>(null);

  useEffect(() => {
    if (session) fetchReports();
  }, [session]);

  async function fetchReports() {
    setLoading(true);
    try {
      const res = await fetch('/api/client/reports');
      if (res.ok) setData(await res.json());
    } finally {
      setLoading(false);
    }
  }

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1A1A1A]">
        <Loader2 className="animate-spin text-primary w-8 h-8" />
      </div>
    );
  }

  if (!session) return <Navigate to="/login" replace />;
  const role = (session.user as { role?: string }).role;
  if (role === 'admin') return <Navigate to="/admin" replace />;

  if (selectedReportId !== null) {
    return (
      <ClientReportDetail
        reportId={selectedReportId}
        onBack={() => setSelectedReportId(null)}
      />
    );
  }

  return (
    <>
      <title>Portal de Reportes — Kaufmann</title>
      <div className="min-h-screen bg-[#1A1A1A] text-white">
        {/* Header */}
        <header className="bg-[#2E2E2E] border-b border-white/5 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">K</span>
            </div>
            <div>
              <h1 className="font-bold text-white" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
                {data?.client.companyName.toUpperCase() || 'KAUFMANN'}
              </h1>
              <p className="text-xs text-gray-400">Portal de Reportes Fotográficos</p>
            </div>
          </div>
          <button
            onClick={() => { signOut(); window.location.href = '/login'; }}
            className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Salir
          </button>
        </header>

        <main className="max-w-3xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold flex items-center gap-2" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
              <FileText className="w-5 h-5 text-primary" />
              MIS REPORTES FOTOGRÁFICOS
            </h2>
            {data && (
              <span className="text-xs text-gray-500 bg-white/5 px-3 py-1 rounded-full">
                {data.reports.length} reporte{data.reports.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="animate-spin text-primary w-6 h-6" />
            </div>
          ) : !data || data.reports.length === 0 ? (
            <div className="bg-[#2E2E2E] rounded-xl p-12 text-center border border-white/5">
              <Camera className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400">No tienes reportes disponibles aún</p>
              <p className="text-gray-600 text-sm mt-1">Tu asesor de Kaufmann los publicará aquí</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {data.reports.map(report => (
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
                        {report.economicNumber && (
                          <span className="font-mono text-primary">{report.economicNumber}</span>
                        )}
                        {report.economicNumber && ' · '}
                        {new Date(report.createdAt).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <Download className="w-4 h-4" />
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
}
