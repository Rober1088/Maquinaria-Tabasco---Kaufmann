import { lazy, Suspense } from 'react';
import { createBrowserRouter, Outlet, RouterProvider, useLocation } from 'react-router-dom';

import AiroErrorBoundary from '../dev-tools/src/AiroErrorBoundary';
import CookieBannerErrorBoundary from '@/components/CookieBannerErrorBoundary';
import RootLayout from './layouts/RootLayout';
import Spinner from './components/Spinner';
import { routes } from './routes';

const CookieBanner = lazy(() =>
  import('@/components/CookieBanner').catch((error) => {
    console.warn('Failed to load CookieBanner:', error);
    return { default: () => null };
  })
);

const SpinnerFallback = () => (
  <div className="flex justify-center py-8 h-screen items-center">
    <Spinner />
  </div>
);

// Routes that should NOT use RootLayout (no header/footer)
const STANDALONE_ROUTES = ['/login', '/admin', '/portal'];

function LayoutWrapper() {
  const location = useLocation();
  const isStandalone = STANDALONE_ROUTES.some(r => location.pathname.startsWith(r));

  if (isStandalone) {
    return <Outlet />;
  }

  return (
    <RootLayout>
      <Outlet />
    </RootLayout>
  );
}

// Create router with layout wrapper
const router = createBrowserRouter([
  {
    path: '/',
    element: import.meta.env.MODE === 'development' ? (
      <AiroErrorBoundary>
        <Suspense fallback={<SpinnerFallback />}>
          <LayoutWrapper />
        </Suspense>
      </AiroErrorBoundary>
    ) : (
      <Suspense fallback={<SpinnerFallback />}>
        <LayoutWrapper />
      </Suspense>
    ),
    children: routes,
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <CookieBannerErrorBoundary>
        <Suspense fallback={null}>
          <CookieBanner />
        </Suspense>
      </CookieBannerErrorBoundary>
    </>
  );
}
