import React from 'react';

//показ одного юза
function UserCard({ user, onDelete, onToggleAdmin, currentUser }) {
  //удалить
  const handleDelete = () => {
    if (user.role === 'master_admin') {
      alert('Главного админа нельзя удалить!');
      return;
    }

    if (window.confirm(`Удалить ${user.firstName}?`)) {
      onDelete(user.id);
    }
  };

  //назначение/снятие адм
  const handleToggleAdmin = () => {
    if (user.role === 'master_admin') {
      alert('Нельзя изменить роль главного админа!');
      return;
    }

    const action = user.role === 'admin' ? 'снять' : 'назначить';
    if (window.confirm(`${action} ${user.firstName} ${user.lastName} администратором?`)) {
      onToggleAdmin(user.id);
    }
  };

  //отображение кнопок только у адм
  const isAdmin = currentUser && (currentUser.role === 'admin' || currentUser.role === 'master_admin');
  const isMasterAdmin = currentUser && currentUser.role === 'master_admin';

  return (
    <div className="user-card">
      <h3>#{user.id} {user.role === 'master_admin' && '👑'}</h3>
      <p><strong>Имя:</strong> {user.firstName}</p>
      <p><strong>Фамилия:</strong> {user.lastName}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Роль:</strong> {
        user.role === 'master_admin' ? 'Главный админ' :
        user.role === 'admin' ? 'Админ' : 'Пользователь'
      }</p>

      {isAdmin && (
        <div className="card-buttons">
          {isMasterAdmin && user.role !== 'master_admin' && (
            <button onClick={handleToggleAdmin} className="admin-btn">
              {user.role === 'admin' ? 'Снять админа' : 'Назначить админом'}
            </button>
          )}
          <button onClick={handleDelete} className="delete-btn">
            Удалить
          </button>
        </div>
      )}
    </div>
  );
}

export default UserCard;