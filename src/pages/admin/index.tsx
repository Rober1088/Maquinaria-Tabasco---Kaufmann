import { useState, useEffect } from 'react';
import { useSession } from '@/lib/auth/auth-client';
import { Navigate } from 'react-router-dom';
import { Loader2, Users, Plus, ChevronRight, Building2, LogOut } from 'lucide-react';
import { signOut } from '@/lib/auth/auth-client';
import CreateClientModal from '@/components/admin/CreateClientModal';
import ClientDetail from '@/components/admin/ClientDetail';

interface Client {
  id: number;
  companyName: string;
  email: string;
  userId: string | null;
  createdAt: string;
}

export default function AdminDashboard() {
  const { data: session, isPending } = useSession();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateClient, setShowCreateClient] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);

  useEffect(() => {
    if (session) fetchClients();
  }, [session]);

  async function fetchClients() {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/clients');
      if (res.ok) {
        const data = await res.json();
        setClients(data);
      }
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
  if (role !== 'admin') return <Navigate to="/portal" replace />;

  if (selectedClientId !== null) {
    return (
      <ClientDetail
        clientId={selectedClientId}
        onBack={() => setSelectedClientId(null)}
        onReportCreated={fetchClients}
      />
    );
  }

  return (
    <>
      <title>Admin — Kaufmann</title>
      <div className="min-h-screen bg-[#1A1A1A] text-white">
        {/* Header */}
        <header className="bg-[#2E2E2E] border-b border-white/5 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">K</span>
            </div>
            <div>
              <h1 className="font-bold text-white" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
                KAUFMANN — Panel Admin
              </h1>
              <p className="text-xs text-gray-400">{session.user.email}</p>
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

        <main className="max-w-4xl mx-auto px-6 py-8">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-[#2E2E2E] rounded-xl p-5 border border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{clients.length}</p>
                  <p className="text-xs text-gray-400">Clientes registrados</p>
                </div>
              </div>
            </div>
            <div className="bg-[#2E2E2E] rounded-xl p-5 border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-green-400" />
                </div>
                <p className="text-sm text-gray-300">Gestiona clientes y reportes</p>
              </div>
            </div>
          </div>

          {/* Clients list */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
              CLIENTES
            </h2>
            <button
              onClick={() => setShowCreateClient(true)}
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              Nuevo Cliente
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="animate-spin text-primary w-6 h-6" />
            </div>
          ) : clients.length === 0 ? (
            <div className="bg-[#2E2E2E] rounded-xl p-12 text-center border border-white/5">
              <Users className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400">No hay clientes registrados</p>
              <button
                onClick={() => setShowCreateClient(true)}
                className="mt-4 text-primary hover:underline text-sm"
              >
                Crear el primer cliente
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {clients.map(client => (
                <button
                  key={client.id}
                  onClick={() => setSelectedClientId(client.id)}
                  className="bg-[#2E2E2E] hover:bg-[#383838] border border-white/5 rounded-xl px-5 py-4 flex items-center justify-between transition-colors text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-bold text-sm">
                        {client.companyName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-white">{client.companyName}</p>
                      <p className="text-xs text-gray-400">{client.email}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-500" />
                </button>
              ))}
            </div>
          )}
        </main>

        {showCreateClient && (
          <CreateClientModal
            onClose={() => setShowCreateClient(false)}
            onCreated={() => { setShowCreateClient(false); fetchClients(); }}
          />
        )}
      </div>
    </>
  );
}
