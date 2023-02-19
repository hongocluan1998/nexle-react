import Footer from 'app/components/Footer';
import Header from 'app/components/Header';
import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';

export default function ProtectedLayout() {
  return (
    <Fragment>
      <Header />
      <div className="bg-warning">
        <Outlet />
      </div>
      <Footer />
    </Fragment>
  );
}
