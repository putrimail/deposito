import React from 'react';

const Slot = ({ symbol }) => {
  return (
    <div
      style={{
        width: '100px',
        height: '100px',
        border: '2px solid #333',
        margin: '0 10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px',
        backgroundColor: '#eee',
      }}
    >
      {symbol}
    </div>
  );
};

export default Slot;
