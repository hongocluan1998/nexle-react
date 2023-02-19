import React from 'react';
import BG_DASHBOARD from 'asset/backgrounds/bg-dashboard.svg';

export default function Dashboard() {
  return (
    <div style={{ padding: '17.77vh 0px 11.66vh' }}>
      <h1 className="text-center text-secondary" style={{ fontSize: '24px' }}>
        Welcome to Demo App
      </h1>
      <div className="text-center" style={{ marginTop: '17.685vh' }}>
        <img
          style={{ width: '41.319vw', height: '45.92vh' }}
          src={BG_DASHBOARD}
          alt="Dashboard background."
        />
      </div>
    </div>
  );
}
