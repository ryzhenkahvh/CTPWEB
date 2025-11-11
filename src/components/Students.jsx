import React from 'react';
import { Link } from 'react-router-dom';

const Students = () => {
  return (
    <div>
      <nav>
        <Link to="/students">Студенты</Link> | <Link to="/profile">Профиль</Link>
      </nav>
      <h2>Студенты</h2>
      <p>Список.</p>
    </div>
  );
};

export default Students;