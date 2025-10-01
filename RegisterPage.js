import React, { useState } from 'react';

// Страница регистрации
function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Изменение полей
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  // Регистрация
  const handleSubmit = (e) => {
    e.preventDefault();

    // Проверяем все поля
    if (!formData.username || !formData.password || !formData.firstName || !formData.lastName || !formData.email) {
      setError('Заполни все поля');
      return;
    }

    // Проверяем email
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Email кривой');
      return;
    }

    // Сохраняем в localStorage
    const users = JSON.parse(localStorage.getItem('registered_users') || '[]');
    const userExists = users.find(u => u.username === formData.username || u.email === formData.email);

    if (userExists) {
      setError('Такой пользователь уже есть');
      return;
    }

    // Добавляем пользователя
    const newUser = {
      id: Date.now(),
      username: formData.username,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      role: 'user'
    };

    users.push(newUser);
    localStorage.setItem('registered_users', JSON.stringify(users));

    setSuccess('Регистрация успешна! Теперь войди');
    setFormData({
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      email: ''
    });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Регистрация</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Логин:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Придумай логин"
            />
          </div>

          <div className="form-group">
            <label>Пароль:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Придумай пароль"
            />
          </div>

          <div className="form-group">
            <label>Имя:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Твоё имя"
            />
          </div>

          <div className="form-group">
            <label>Фамилия:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Твоя фамилия"
            />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Твой email"
            />
          </div>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <button type="submit" className="login-btn">
            Зарегистрироваться
          </button>
        </form>

        <div className="register-links">
          <a href="/login">Уже есть аккаунт? Войти</a>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;