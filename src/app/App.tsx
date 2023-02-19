import React from 'react';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';

export default function App() {
  return (
    <BrowserRouter>
      <Helmet titleTemplate="Nexle Project" defaultTitle="Nexle Project">
        <meta name="description" content="Application" />
      </Helmet>
      <Routes />
    </BrowserRouter>
  );
}
