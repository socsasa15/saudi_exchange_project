const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// إعداد الاتصال بقاعدة البيانات
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'password123',
  database: process.env.DB_NAME || 'saudi_exchange'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
    return;
  }
  console.log('Connected to MySQL database!');
});

// إعداد Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-email-password'
  }
});

// تسجيل مستخدم جديد
app.post('/api/register', (req, res) => {
  const { username, password, email } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const query = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
  db.query(query, [username, hashedPassword, email], (err, result) => {
    if (err) {
      console.error('Registration error:', err);
      return res.status(500).json({ success: false, message: 'Registration failed. Username or email may already exist.' });
    }
    res.json({ success: true, message: 'User registered successfully!' });
  });
});

// تسجيل الدخول
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], (err, results) => {
    if (err) return res.status(500).json({ success: false, message: 'Server error' });
    if (results.length === 0) return res.json({ success: false, message: 'User not found' });
    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (isMatch) {
        res.json({ success: true, message: 'Login successful' });
      } else {
        res.json({ success: false, message: 'Incorrect password' });
      }
    });
  });
});

// طلب إعادة تعيين كلمة المرور
app.post('/api/request-reset', (req, res) => {
  const { email } = req.body;
  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) return res.status(500).json({ success: false, message: 'Server error' });
    if (results.length === 0) return res.json({ success: false, message: 'Email not found' });
    
    const token = jwt.sign({ email }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '1h' });
    const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/confirm-reset/${token}`;
    const mailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: email,
      subject: 'Password Reset Request',
      text: `Click the following link to reset your password: ${resetLink}`
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Email send error:', error);
        return res.status(500).json({ success: false, message: 'Error sending email' });
      }
      res.json({ success: true, message: 'Reset link sent to your email.' });
    });
  });
});

// تأكيد إعادة تعيين كلمة المرور
app.post('/api/confirm-reset', (req, res) => {
  const { token, newPassword } = req.body;
  jwt.verify(token, process.env.JWT_SECRET || 'secretkey', (err, decoded) => {
    if (err) return res.status(400).json({ success: false, message: 'Link expired or invalid.' });
    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    const query = 'UPDATE users SET password = ? WHERE email = ?';
    db.query(query, [hashedPassword, decoded.email], (err, result) => {
      if (err) {
        console.error('Password reset error:', err);
        return res.status(500).json({ success: false, message: 'Error resetting password.' });
      }
      res.json({ success: true, message: 'Password reset successfully!' });
    });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
