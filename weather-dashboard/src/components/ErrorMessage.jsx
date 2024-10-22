import React from 'react';

function ErrorMessage({ message }) {
  return (
    <div className="bg-red-500 bg-opacity-70 text-white px-4 py-3 rounded mb-4">
      <p>{message}</p>
    </div>
  );
}

export default ErrorMessage;