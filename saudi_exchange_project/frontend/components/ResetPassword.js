import React, { useState } from 'react';
import axios from 'axios';

function ResetPassword({ setNotification }) {
  const [email, setEmail] = useState('');

  const handleResetRequest = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/request-reset', { email });
      setNotification(response.data.message);
    } catch (error) {
      setNotification('فشل في إرسال رابط إعادة التعيين.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">طلب إعادة تعيين كلمة المرور</h2>
        <input
          type="email"
          placeholder="البريد الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <button
          onClick={handleResetRequest}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          إرسال رابط إعادة التعيين
        </button>
      </div>
    </div>
  );
}

export default ResetPassword;
