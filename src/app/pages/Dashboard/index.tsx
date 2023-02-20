import React from 'react';
import BG_DASHBOARD from 'asset/backgrounds/bg-dashboard.svg';

export default function Dashboard() {
  return (
    <div className="layoutDashboard">
      <h1 className="text-center text-secondary fs24">Welcome to Demo App</h1>
      <div className="text-center mtImgDashboard">
        <img
          src={BG_DASHBOARD}
          alt="Dashboard background."
          className="imgMain"
        />
      </div>
    </div>
  );
}
