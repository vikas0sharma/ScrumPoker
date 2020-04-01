import React, { useState } from 'react';

export const King = () => {
  return (
    <div className="col-md-4">
      <img
        src={`${process.env.PUBLIC_URL}/images/k.png`}
        className="card-img img-king"
      />
    </div>
  );
};
