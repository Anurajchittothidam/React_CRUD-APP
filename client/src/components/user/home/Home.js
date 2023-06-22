import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../header'
import {useSelector} from 'react-redux'
import { removetoken } from '../../../redux/token'
import axios from '../../../axios'


function Home() {
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [phone,setPhone]=useState('')
  const isAuth=useSelector((state)=>state.token.token)
  const navigate=useNavigate()
const id=useSelector((state)=>state.token.id)
  // const logOutHandler=()=>{
  //   removetoken()
  //   navigate('/login')
  // }
   useEffect(()=>{
    if(isAuth===''){
      navigate('/login')
    }else{
     axios.post('/',{
        id:id
      }).then((res)=>{
        const {email,phoneNumber,userName,id}=res.data
        console.log('userdata',userName)
        setName(userName)
        setEmail(email)
        setPhone(phoneNumber)
      }).catch((err)=>{
        console.log(err.message)
      })
    }
  },[])
  return (
    <>
    <Header />
    <section className="vh-100" style={{backgroundColor:"#9de2ff"}}>
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col col-md-9 col-lg-7 col-xl-5">
        <div className="card" style={{borderRadius:"15px"}}>
          <div className="card-body p-4">
            <div className="d-flex text-black">
              <div className="flex-shrink-0">
                <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'
                  alt="Generic placeholder image" className="img-fluid"
                  style={{width:"180px",borderRadius:"10px"}}/>
              </div>
              <div className="flex-grow-1 ms-3">
                <h5 className="mb-1">{name}</h5>
                <p className="mb-2 pb-1" style={{color:"#2b2a2a"}}>{email}</p>
                <div className="d-flex justify-content-start rounded-3 p-2 mb-2"
                  style={{backgroundColor:"#efefef"}}>
                  <div>
                    <p className="small text-muted mb-1">Phone Number</p>
                    <p className="mb-0">{phone}</p>
                  </div>
                </div>
                <div className="d-flex pt-1 justify-content-center">
                  <button type="button" className="btn btn-outline-primary me-1 flex-grow-1" onClick={(()=>navigate(`/profile/`))}>Edit Profile</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </>
  )
}

export default Home