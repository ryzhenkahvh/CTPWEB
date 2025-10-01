import React, { useState, useEffect } from 'react';
import UserForm from './UserForm';
import UserCard from './UserCard';
import UserTable from './UserTable';
import databaseService from './database';

// Компонент страницы пользователей
function UsersPage({ currentUser, onLogout }) {
  // Состояние для списка пользователей
  const [users, setUsers] = useState([]);

  // Состояние для выбора типа отображения (таблица или карточки)
  const [viewMode, setViewMode] = useState('cards'); // 'cards' или 'table'

  // Загружаем пользователей из базы данных при монтировании компонента
  useEffect(() => {
    loadUsers();
  }, []);

  // Функция для загрузки пользователей из базы данных
  const loadUsers = () => {
    try {
      const appUsers = databaseService.getAllAppUsers();
      setUsers(appUsers);
    } catch (error) {
      console.error('Ошибка загрузки пользователей:', error);
    }
  };

  // Функция для добавления нового пользователя
  const addUser = (newUserData) => {
    try {
      const newUserId = databaseService.addAppUser(newUserData);
      if (newUserId) {
        // Перезагружаем список пользователей
        loadUsers();
      }
    } catch (error) {
      console.error('Ошибка добавления пользователя:', error);
      alert('Ошибка при добавлении пользователя');
    }
  };

  // Функция для удаления пользователя
  const deleteUser = (userId) => {
    try {
      const success = databaseService.deleteAppUser(userId);
      if (success) {
        // Перезагружаем список пользователей
        loadUsers();
      }
    } catch (error) {
      console.error('Ошибка удаления пользователя:', error);
      alert('Ошибка при удалении пользователя');
    }
  };

  // Функция для редактирования пользователя
  const editUser = (userId, updatedData) => {
    try {
      const success = databaseService.updateAppUser(userId, updatedData);
      if (success) {
        // Перезагружаем список пользователей
        loadUsers();
      }
    } catch (error) {
      console.error('Ошибка редактирования пользователя:', error);
      alert('Ошибка при редактировании пользователя');
    }
  };

  // Функция для переключения режима отображения
  const toggleViewMode = () => {
    setViewMode(currentMode => currentMode === 'cards' ? 'table' : 'cards');
  };

  return (
    <div className="users-page">
      {/* Шапка с информацией о пользователе */}
      <header className="page-header">
        <div className="user-info">
          <span>Привет, {currentUser.name}!</span>
          <span className="user-role">({currentUser.role})</span>
        </div>
        <button onClick={onLogout} className="logout-btn">
          Выйти
        </button>
      </header>

      {/* Заголовок страницы */}
      <h1>Управление пользователями</h1>

      {/* Кнопка для переключения режима отображения */}
      <div className="view-toggle">
        <button onClick={toggleViewMode} className="toggle-btn">
          {viewMode === 'cards' ? 'Показать таблицу' : 'Показать карточки'}
        </button>
      </div>

      {/* Форма для добавления нового пользователя */}
      <UserForm onAdd={addUser} />

      {/* Заголовок списка пользователей с количеством */}
      <h2>Пользователи ({users.length})</h2>

      {/* Проверяем есть ли пользователи */}
      {users.length === 0 ? (
        <p>Пользователей пока нет. Добавьте первого пользователя выше!</p>
      ) : (
        viewMode === 'cards' ? (
          // Режим карточек
          <div className="user-list">
            {users.map(user => (
              <UserCard
                key={user.id}
                user={user}
                onDelete={deleteUser}
                onEdit={editUser}
              />
            ))}
          </div>
        ) : (
          // Режим таблицы
          <UserTable
            users={users}
            onDelete={deleteUser}
            onEdit={editUser}
          />
        )
      )}
    </div>
  );
}

export default UsersPage;