import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<any>({});
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const errs: any = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      errs.email = 'Invalid email format.';
    }

    if (!formData.password || formData.password.length < 6) {
      errs.password = 'Password must be at least 6 characters.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await axios.post('http://127.0.0.1:8000/auth/login/', {
        email: formData.email,
        password: formData.password,
      });

      console.log("RESPONSE LOGIN:", response.data); // <== DEBUG

      if (response.data.access) {
        localStorage.setItem('access', response.data.access);
        login(response.data.access); // actualizează contextul
        setMessage('Login successful!');
        navigate('/home');
      } else {
        console.log("Access token missing in response.");
        setMessage("Login failed: no access token received.");
      }
    } catch (error: any) {
      console.log("LOGIN ERROR:", error.response?.data || error.message); // <== DEBUG
      setMessage('Invalid credentials or server error.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <label>Email:</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      {errors.email && <p>{errors.email}</p>}

      <label>Password:</label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      {errors.password && <p>{errors.password}</p>}

      <button type="submit">Login</button>

      {message && <p>{message}</p>}
    </form>
  );
};

export default LoginPage;