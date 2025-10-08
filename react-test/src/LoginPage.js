// НЕ ВОРК!
import React, { useState } from 'react';

//вход
function LoginPage({ onLogin }) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [error, setError] = useState('');

  //редакт полей
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  //логин
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      setError('Заполни все поля');
      return;
    }

    //смотрим юз в localStorage
    const users = JSON.parse(localStorage.getItem('registered_users') || '[]');
    const user = users.find(u => u.username === formData.username && u.password === formData.password);

    if (user) {
      onLogin(user);
    } else {
      setError('Неверный логин или пароль');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Вход</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Логин:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Введи логин"
            />
          </div>

          <div className="form-group">
            <label>Пароль:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Введи пароль"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-btn">
            Войти
          </button>
        </form>

        <div className="login-links">
          <a href="/register">Регистрация</a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;