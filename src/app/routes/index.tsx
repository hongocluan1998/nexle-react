import NotFound from 'app/pages/404';
import Auth from 'app/pages/Auth';
import Dashboard from 'app/pages/Dashboard';
import DefaultLayout from 'app/pages/Layouts/DefaultLayout';
import ProtectedLayout from 'app/pages/Layouts/ProtectedLayout';
import React from 'react';
import { useLocation, Navigate, useRoutes } from 'react-router';
import { isAuthenticated } from 'utils/auth';

import path from './path';

export default function Router() {
  const location = useLocation();
  return useRoutes([
    {
      path: path.root,
      element: isAuthenticated() ? (
        <ProtectedLayout />
      ) : (
        <Navigate to={path.signUp} state={{ from: location }} />
      ),
      children: [
        { element: <Navigate to={path.root} replace /> },
        {
          element: <Navigate to={path.dashboard} replace />,
          path: path.root,
        },
        {
          element: <Dashboard />,
          path: path.dashboard,
        },
      ],
    },
    {
      path: path.root,
      element: <DefaultLayout />,
      children: [
        {
          path: path.signIn,
          element: isAuthenticated() ? (
            <Navigate to={path.root} />
          ) : (
            <Auth isSignIn />
          ),
        },
        {
          path: path.signUp,
          element: isAuthenticated() ? <Navigate to={path.root} /> : <Auth />,
        },
        { path: path.notFound, element: <NotFound /> },
      ],
    },
    { path: path.all, element: <Navigate to={path.notFound} replace /> },
  ]);
}
