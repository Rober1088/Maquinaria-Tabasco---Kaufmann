import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';
import HomePage from './pages/index';

// Lazy load components for code splitting (except HomePage for instant loading)
const isDevelopment = import.meta.env.MODE === 'development';
const NotFoundPage = isDevelopment ? lazy(() => import('../dev-tools/src/PageNotFound')) : lazy(() => import('./pages/_404'));
const MaquinariaPage = lazy(() => import('./pages/maquinaria'));
const LoginPage = lazy(() => import('./pages/login'));
const AdminDashboard = lazy(() => import('./pages/admin/index'));
const ClientPortal = lazy(() => import('./pages/portal/index'));

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/maquinaria',
    element: <MaquinariaPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/admin',
    element: <AdminDashboard />,
  },
  {
    path: '/portal',
    element: <ClientPortal />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

// Types for type-safe navigation
export type Path = '/' | '/maquinaria' | '/login' | '/admin' | '/portal';

export type Params = Record<string, string | undefined>;
