import React, { Fragment, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { removeAdminToken, searchData } from '../../../redux/token';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function Header() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const logOutPage = () => {
    removeAdminToken();
    navigate('/admin/');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(searchData({ users: search }));
  };

  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" onClick={() => navigate('/admin/home')}>
            Home Page
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
            <form className="d-flex" onSubmit={handleSearchSubmit} role="search">
              <input
                className="form-control me-2"
                type="search"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
            <button className='ms-2 btn btn-danger' onClick={logOutPage}>Sign Out</button>
          </div>
        </div>
      </nav>
    </Fragment>
  );
}

export default Header;
