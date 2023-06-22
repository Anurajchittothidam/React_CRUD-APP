import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import Header from '../header/Header';
import { useNavigate } from 'react-router-dom';
import axios from '../../../axios'
import { useSelector } from 'react-redux';

function EditUser() {
  const navigate=useNavigate()
  const [email,setEmail]=useState('')
  const [username,setName]=useState('')
  const [phonenumber,setNumber]=useState()
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const user=useSelector((state)=>state.token.userData)
  console.log('user',user)
  useEffect(()=>{
      setEmail(user.email)
      setNumber(user.phoneNumber)
      setName(user.userName)
},[user])

  const handleSubmit=(e)=>{
    const stringRegex = /^[a-zA-Z0-9_.\s-]{3,}$/
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const phoneRegex=/^[0-9]{10}$/

    e.preventDefault();
    try {
        if (!stringRegex.test(username)) {
            setError("Invalid Fullname");
            setShowError(true);
            return false;
        } else if (!emailRegex.test(email)) {
            setError("Invalid Email Address");
            setShowError(true);
            return false;
        } else if(!phoneRegex.test(phonenumber)){
            setError("Invalid Phone Number")
            setShowError(true)
            return false;
        }
         else {
            setIsLoading(true)
            axios.post(`/admin/editUser/${user._id}`, {
                username,
                email,
                phonenumber,
            }).then(response => {
                navigate(`/admin/editUser/${user._id}`)
                setError("user edited successfully")
                setShowError(true)
            }).catch(error =>{
                setError(error.response.data);
                setShowError(true);
            }).finally(()=>{
                setIsLoading(false);
            })
        }
    } catch (err) {
        console.error(err);
        setShowError(true);
        setError('Something went wrong');
    }
};

useEffect(() => {
  const timer = setTimeout(() => {
      showError && setShowError(false)
  }, 3000)
  return () => clearTimeout(timer)
}, [showError])
  return (
    <>
    <Header/>
      <div className="container mt-5">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-8 col-12">
          
            <form onSubmit={handleSubmit} className='bg-white shadow p-5  d-flex justify-content-center'>
              
              <div className="col-6 fw-normal">
              <h2 className='text-center p-2'>Edit User</h2>
              {showError && (
                 <div
                 className="p-4 my-2 text-sm text-danger rounded-lg"
                 role="alert"
               >
                 <span className="font-medium text-dange">{error}</span>
               </div>
              )}
              <div className="mb-3 ">
                <label for="exampleInputEmail1" className="form-label">
                  User Name
                </label>
                <input
                  type="text"
                  className="form-control border-2"
                  id="exampleInputEmail1"
                  value={username}
                  onChange={((e)=>setName(e.target.value))}
                  placeholder='Enter User name'
                />
              </div>
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control border-2"
                  id="exampleInputEmail1"
                  value={email}
                  onChange={((e)=>setEmail(e.target.value))}
                  placeholder='Enter email'
                />
              </div><div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  Phone Number
                </label>
                <input
                  type="number"
                  className="form-control border-2"
                  id="exampleInputphoneNumber"
                  value={phonenumber}
                  onChange={((e)=>setNumber(e.target.value))}
                  placeholder='Enter phone number'
                />
              </div>
             {isLoading ?(
              <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
             </div>
             </div>
             ):(
               <div className="text-center">
               <button type="submit" className="btn btn-primary">
                 Save
               </button>
               </div>
             )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditUser