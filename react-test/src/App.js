import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import UserForm from './UserForm';
import UserCard from './UserCard';

function App() {
  //текуший юзер
  const [currentUser, setCurrentUser] = useState(null);

  //все юзы (эррей)
  const [users, setUsers] = useState([]);

  //подгружаем юзов из бд
  useEffect(() => {
    const savedUsers = localStorage.getItem('app_users');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
  }, []);

  //сейв юзеров в localStorage (бд)
  useEffect(() => {
    localStorage.setItem('app_users', JSON.stringify(users));
  }, [users]);

  //логин/логаут
  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  //адд юз
  const addUser = (newUser) => {
    setUsers(prev => [...prev, { ...newUser, id: prev.length + 1 }]);
  };

  //дел юз и ид +1
  const deleteUser = (id) => {
    setUsers(prev => {
      const filtered = prev.filter(u => u.id !== id);
      //ид +1 (по порядку), ну так типа красивее
      return filtered.map((u, i) => ({ ...u, id: i + 1 }));
    });
  };

  //адд/разжалование адм
  const toggleAdmin = (id) => {
    setUsers(prev => prev.map(user =>
      user.id === id
        ? { ...user, role: user.role === 'admin' ? 'user' : 'admin' }
        : user
    ));
  };

  //не логин? Значит тебя на логин или рег
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

  //логин? Ну хелло
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
        {/*адм функционал (форма адд)*/}
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
