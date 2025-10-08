import React, { useState, useEffect } from 'react';
import UserForm from './UserForm';
import UserCard from './UserCard';
import UserTable from './UserTable';
import databaseService from './database';

//страница юзеров
function UsersPage({ currentUser, onLogout }) {
  //список юзеров
  const [users, setUsers] = useState([]);

  //таблицей/карточками
  const [viewMode, setViewMode] = useState('cards'); // 'cards' или 'table'

  //подгружаем юза из бд при подгрузке компонента
  useEffect(() => {
    loadUsers();
  }, []);

  //лоад юза из бд
  const loadUsers = () => {
    try {
      const appUsers = databaseService.getAllAppUsers();
      setUsers(appUsers);
    } catch (error) {
      console.error('Ошибка загрузки пользователей:', error);
    }
  };

  //новый юз (адд)
  const addUser = (newUserData) => {
    try {
      const newUserId = databaseService.addAppUser(newUserData);
      if (newUserId) {
        //релоад списка
        loadUsers();
      }
    } catch (error) {
      console.error('Ошибка добавления пользователя:', error);
      alert('Ошибка при добавлении пользователя');
    }
  };

  //дел юз
  const deleteUser = (userId) => {
    try {
      const success = databaseService.deleteAppUser(userId);
      if (success) {
        loadUsers();
      }
    } catch (error) {
      console.error('Ошибка удаления пользователя:', error);
      alert('Ошибка при удалении пользователя');
    }
  };

  //редактор юза
  const editUser = (userId, updatedData) => {
    try {
      const success = databaseService.updateAppUser(userId, updatedData);
      if (success) {
        loadUsers();
      }
    } catch (error) {
      console.error('Ошибка редактирования пользователя:', error);
      alert('Ошибка при редактировании пользователя');
    }
  };

  //свич режима отображения
  const toggleViewMode = () => {
    setViewMode(currentMode => currentMode === 'cards' ? 'table' : 'cards');
  };

  return (
    <div className="users-page">
      {/*шапка с информацией о юзере*/}
      <header className="page-header">
        <div className="user-info">
          <span>Привет, {currentUser.name}!</span>
          <span className="user-role">({currentUser.role})</span>
        </div>
        <button onClick={onLogout} className="logout-btn">
          Выйти
        </button>
      </header>

      {/*типа нейм*/}
      <h1>Управление пользователями</h1>

      {/*сама кнопка свитча*/}
      <div className="view-toggle">
        <button onClick={toggleViewMode} className="toggle-btn">
          {viewMode === 'cards' ? 'Показать таблицу' : 'Показать карточки'}
        </button>
      </div>

      {/*адд нью юз*/}
      <UserForm onAdd={addUser} />

      {/*нейм для списка юзеров с кол-вом*/}
      <h2>Пользователи ({users.length})</h2>

      {/*проверка наличия юзеров*/}
      {users.length === 0 ? (
        <p>Пользователей пока нет. Добавьте первого пользователя выше!</p>
      ) : (
        viewMode === 'cards' ? (
          //карточки
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
          //таблицей
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