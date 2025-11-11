import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    //любые символы кроме пробела и @ + @ + любые символы кроме пробела и @ + . + любые символы кроме пробела и @
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = (e) => {
    //запрет перезагрузки страницы при отправке формы
    e.preventDefault();
    //объект для сбора ошибок
    const newErrors = {};

    if (!validateEmail(email)) {
      newErrors.email = 'Введите корректный email';
    }
    if (!password.trim()) {
      newErrors.password = 'Введите пароль';
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      //смотрим в локалстор наличие строки и преобразуем в массив, если не null
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      //проверяем введённые данные
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        login(user);
        navigate('/profile');
      } else {
        setErrors({ general: 'Не верный логин или пароль' });
      }
    }
  };

  return (
    <div>
      <h2>Вход</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
        </div>
        <div>
          <label>Пароль:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
        </div>
        {errors.general && <p style={{ color: 'red' }}>{errors.general}</p>}
        <button type="submit">Войти</button>
      </form>
      <p>Нет аккаунта? <a href="/register">Регистрация</a></p>
    </div>
  );
};

export default Login;