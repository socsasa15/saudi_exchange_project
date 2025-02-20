import React from 'react';

function Notification({ message, onClose }) {
  return (
    <div className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded shadow-lg z-50">
      {message}
      <button className="ml-4" onClick={onClose}>&times;</button>
    </div>
  );
}

export default Notification;
