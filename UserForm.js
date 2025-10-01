import React, { useState } from 'react';

// Это форма для добавления пользователя
function UserForm({ onAdd, users }) {
  // Данные формы
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  // Ошибки
  const [errors, setErrors] = useState({});

  // Проверка данных
  const validate = () => {
    const errs = {};
    if (!formData.firstName.trim()) errs.firstName = 'Имя нужно';
    if (!formData.lastName.trim()) errs.lastName = 'Фамилия нужна';
    if (!formData.email.trim()) errs.email = 'Email нужен';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Email кривой';
    else {
      // Проверяем дубликат email
      const emailExists = users.some(user => user.email.toLowerCase() === formData.email.toLowerCase().trim());
      if (emailExists) errs.email = 'Такой email уже есть';
    }
    setErrors(errs);
    return !Object.keys(errs).length;
  };

  // Изменение полей
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  // Отправка формы
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onAdd({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim()
      });
      setFormData({ firstName: '', lastName: '', email: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <h2>Добавить пользователя</h2>
      <input name="firstName" placeholder="Имя" value={formData.firstName} onChange={handleChange} className={errors.firstName ? 'error' : ''} />
      {errors.firstName && <span className="error-message">{errors.firstName}</span>}
      <input name="lastName" placeholder="Фамилия" value={formData.lastName} onChange={handleChange} className={errors.lastName ? 'error' : ''} />
      {errors.lastName && <span className="error-message">{errors.lastName}</span>}
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className={errors.email ? 'error' : ''} />
      {errors.email && <span className="error-message">{errors.email}</span>}
      <button type="submit" disabled={!!Object.keys(errors).length}>Добавить</button>
    </form>
  );
}

export default UserForm;