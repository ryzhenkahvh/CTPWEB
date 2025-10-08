import React, { useState } from 'react';

//показ юзеров таблицей
function UserTable({ users, onDelete, onEdit }) {

  //сост для отслеживания какой юз сейчас редактируется
  const [editingUser, setEditingUser] = useState(null);

  //сост для данных редактируемого юза
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  //редактирование юзера
  const startEditing = (user) => {
    setEditingUser(user.id);
    setEditForm({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    });
  };

  //отмена редакта
  const cancelEditing = () => {
    setEditingUser(null);
    setEditForm({ firstName: '', lastName: '', email: '' });
  };

  //сейв редакта
  const saveChanges = () => {
    if (editForm.firstName.trim() && editForm.lastName.trim() && editForm.email.trim()) {
      onEdit(editingUser, editForm);
      setEditingUser(null);
      setEditForm({ firstName: '', lastName: '', email: '' });
    } else {
      alert('Пожалуйста, заполните все поля');
    }
  };

  //изменение полей редакта
  const handleEditChange = (field, value) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  //поясни за /del
  const handleDelete = (userId, userName) => {
    if (window.confirm(`Удалить пользователя ${userName}?`)) {
      onDelete(userId);
    }
  };

  return (
    <div className="user-table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Email</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
              <td>{user.id}</td>

              {/*рил юз редактируется?*/}
              {editingUser === user.id ? (
                <>
                  <td>
                    <input
                      type="text"
                      value={editForm.firstName}
                      onChange={(e) => handleEditChange('firstName', e.target.value)}
                      placeholder="Имя"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editForm.lastName}
                      onChange={(e) => handleEditChange('lastName', e.target.value)}
                      placeholder="Фамилия"
                    />
                  </td>
                  <td>
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => handleEditChange('email', e.target.value)}
                      placeholder="Email"
                    />
                  </td>
                  <td>
                    <button onClick={saveChanges} className="save-btn">Сохранить</button>
                    <button onClick={cancelEditing} className="cancel-btn">Отмена</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>
                    <button onClick={() => startEditing(user)} className="edit-btn">Редактировать</button>
                    <button onClick={() => handleDelete(user.id, user.firstName)} className="delete-btn">Удалить</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;