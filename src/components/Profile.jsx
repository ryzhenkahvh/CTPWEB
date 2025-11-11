import React from "react";
import { useAuth } from '../AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div>
      <nav>
        <Link to="/students">Студенты</Link> | <Link to="/profile">Профиль</Link>
      </nav>
      <h2>Профиль</h2>
      <p>Имя: {user.name}</p>
      <p>Email: {user.email}</p>
      <button onClick={handleLogout}>Выйти</button>
    </div>
  );
};

export default Profile;