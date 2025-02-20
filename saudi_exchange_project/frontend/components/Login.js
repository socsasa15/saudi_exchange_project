import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', { username, password });
      if (response.data.success) {
        navigate('/home');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">تسجيل الدخول</h2>
        <input
          type="text"
          placeholder="اسم المستخدم"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <button onClick={handleLogin} className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          تسجيل الدخول
        </button>
        <div className="mt-4">
          <Link to="/register" className="text-blue-500">تسجيل مستخدم جديد</Link>
        </div>
        <div className="mt-2">
          <Link to="/reset-password" className="text-blue-500">نسيت كلمة المرور؟</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
