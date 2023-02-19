import React from 'react';

function Footer() {
  return (
    <div
      className="text-dark bg-warning position-absolute bottom-0 start-0 end-0"
      style={{ padding: '16px 28px', fontSize: '14px' }}
    >
      COPYRIGHT © 2020
    </div>
  );
}

export default React.memo(Footer);
