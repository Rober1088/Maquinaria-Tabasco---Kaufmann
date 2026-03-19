import { useState } from 'react';
import { signIn, useSession } from '@/lib/auth/auth-client';
import { Navigate } from 'react-router-dom';
import { Loader2, Lock, Mail } from 'lucide-react';

export default function LoginPage() {
  const { data: session, isPending } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1A1A1A]">
        <Loader2 className="animate-spin text-primary w-8 h-8" />
      </div>
    );
  }

  if (session) {
    const role = (session.user as { role?: string }).role;
    return <Navigate to={role === 'admin' ? '/admin' : '/portal'} replace />;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const result = await signIn.email({ email, password });
      if (result?.error) {
        setError('Correo o contraseña incorrectos');
      }
    } catch {
      setError('Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <title>Acceso - Kaufmann</title>
      <div className="min-h-screen flex items-center justify-center bg-[#1A1A1A] px-4">
        <div className="w-full max-w-md">
          {/* Logo / Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-wide" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
              KAUFMANN
            </h1>
            <p className="text-gray-400 mt-1 text-sm">Portal de Reportes Fotográficos</p>
          </div>

          {/* Card */}
          <div className="bg-[#2E2E2E] rounded-xl p-8 shadow-2xl border border-white/5">
            <h2 className="text-xl font-semibold text-white mb-6">Iniciar Sesión</h2>

            {error && (
              <div className="bg-red-900/40 border border-red-500/50 text-red-300 text-sm rounded-lg px-4 py-3 mb-5">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Correo electrónico</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    placeholder="correo@empresa.com"
                    className="w-full bg-[#1A1A1A] border border-white/10 text-white rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Contraseña</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full bg-[#1A1A1A] border border-white/10 text-white rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 mt-2 disabled:opacity-60"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {loading ? 'Ingresando...' : 'Ingresar'}
              </button>
            </form>
          </div>

          <p className="text-center text-gray-600 text-xs mt-6">
            © {new Date().getFullYear()} Kaufmann — Maquinaria Tabasco
          </p>
        </div>
      </div>
    </>
  );
}
