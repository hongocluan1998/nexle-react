import React, { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <Fragment>
      <h2>404 Not Found</h2>
      <button onClick={goBack} className="btn btn-warning">
        404
      </button>
    </Fragment>
  );
}
