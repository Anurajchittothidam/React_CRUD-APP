import React, { Fragment } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import { removetoken } from '../../redux/token'
import { useNavigate } from 'react-router-dom'

function Header() {
  const navigate=useNavigate()
  const logOutHandler=()=>{
    removetoken()
    navigate('/login')
  }
  return (
    <Fragment>
    <nav className="navbar navbar-expand-lg bg-light shadow">
  <div className="container-fluid">
  <a className="navbar-brand" href="#">Home Page</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
       
      </ul>
      <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
     <button className='ms-2 btn btn-danger' onClick={logOutHandler} >Sign Out</button>
    </div>
  </div>
  </nav>
  </Fragment>
  )
}

export default Header