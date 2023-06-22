import React from 'react'
import {Routes,Route} from 'react-router-dom'

import Login from '../admin/login/Login'
import LandingPage from '../admin/landinpage/LandingPage'
import EditUser from '../admin/edituser/EditUser'
import AddUser from '../admin/adduser/AddUser'

function adminComponents() {
  return (
    <Routes>
    <Route exact path='/admin' element={<Login/>}></Route>
    <Route path='/admin/home' element={<LandingPage/>}></Route>
    <Route path='/admin/editUser/:id' element={<EditUser/>}></Route>
    <Route path='/admin/addUser' element={<AddUser/>}></Route>
    </Routes>
  )
}

export default adminComponents