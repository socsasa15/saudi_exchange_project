import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ConfirmReset({ setNotification }) {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');

  const handleConfirmReset = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/confirm-reset', { token, newPassword });
      setNotification(response.data.message);
    } catch (error) {
      setNotification('فشل في إعادة تعيين كلمة المرور.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">تأكيد إعادة تعيين كلمة المرور</h2>
        <input
          type="password"
          placeholder="كلمة المرور الجديدة"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <button
          onClick={handleConfirmReset}
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          إعادة تعيين
        </button>
      </div>
    </div>
  );
}

export default ConfirmReset;
