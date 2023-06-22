import React from 'react'
import {Routes,Route} from 'react-router-dom'

import Home from '../user/home/Home'
import SignUp from '../user/signup/SignUp'
import Login from '../user/login/Login'
import Profile from '../user/Profile/Profile'


function userComponents() {
  return (
    <Routes>
        <Route exact path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signUp' element={<SignUp/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
    </Routes>
  )
}

export default userComponents