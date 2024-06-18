// Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand">Task Manager</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to='/add' className='nav-link btn btn-primary mr-2'>Add Task</Link>
            </li>
            <li className="nav-item">
              <Link to='/' className='nav-link btn btn-primary'>Tasks List</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
