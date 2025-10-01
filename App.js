import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import UserForm from './UserForm';
import UserCard from './UserCard';

// Главный компонент приложения
function App() {
  // Текущий пользователь
  const [currentUser, setCurrentUser] = useState(null);

  // Список пользователей приложения
  const [users, setUsers] = useState([]);

  // Загружаем пользователей из localStorage при старте
  useEffect(() => {
    const savedUsers = localStorage.getItem('app_users');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
  }, []);

  // Сохраняем пользователей в localStorage
  useEffect(() => {
    localStorage.setItem('app_users', JSON.stringify(users));
  }, [users]);

  // Вход пользователя
  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  // Выход
  const handleLogout = () => {
    setCurrentUser(null);
  };

  // Добавление пользователя
  const addUser = (newUser) => {
    setUsers(prev => [...prev, { ...newUser, id: prev.length + 1 }]);
  };

  // Удаление пользователя с перерасчетом ID
  const deleteUser = (id) => {
    setUsers(prev => {
      // Убираем пользователя
      const filtered = prev.filter(u => u.id !== id);
      // Перестраиваем ID по порядку
      return filtered.map((u, i) => ({ ...u, id: i + 1 }));
    });
  };

  // Назначение/снятие админа
  const toggleAdmin = (id) => {
    setUsers(prev => prev.map(user =>
      user.id === id
        ? { ...user, role: user.role === 'admin' ? 'user' : 'admin' }
        : user
    ));
  };

  // Если пользователь не авторизован, показываем вход
  if (!currentUser) {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    );
  }

  // Если авторизован, показываем приложение
  return (
    <div className="App">
      <header>
        <h1>Управление пользователями</h1>
        <div className="user-info">
          <span>Привет, {currentUser.firstName || currentUser.username}!</span>
          <button onClick={handleLogout} className="logout-btn">Выйти</button>
        </div>
      </header>

      <main>
        {/* Форма добавления только для админов */}
        {(currentUser.role === 'admin' || currentUser.role === 'master_admin') && (
          <UserForm onAdd={addUser} users={users} />
        )}

        <section>
          <h2>Пользователи ({users.length})</h2>
          {!users.length ? (
            <p>Нет пользователей</p>
          ) : (
            <div className="user-list">
              {users.map(user => (
                <UserCard
                  key={user.id}
                  user={user}
                  onDelete={deleteUser}
                  onToggleAdmin={toggleAdmin}
                  currentUser={currentUser}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
