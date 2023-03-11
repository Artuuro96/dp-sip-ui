import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import ReportPage from './pages/ReportPage';
import SalePage from './pages/SalePage';

// ----------------------------------------------------------------------

export default function  Router() {
  const routes = useRoutes([
    // {
      // element: <ProtectedRoute children = { <DashboardLayout/> } />,
      // children: [
        {
          element: <DashboardLayout />,
          children: [
            { path: 'panel', element: <DashboardAppPage/>, },
            { path: 'usuarios', element: <UserPage /> },
            { path: 'terrenos', element: <ProductsPage />, },
            { path: 'clientes', element: <BlogPage /> },
            { path: 'ventas', element: <SalePage /> },
            { path: 'reportes', element: <ReportPage />},
          ],
        },
      // ],
    // },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '/',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/login" />, index: true },
        { path: 'not_found', element: <Page404 /> },
        { path: '*', element: <Navigate to="/not_found" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
