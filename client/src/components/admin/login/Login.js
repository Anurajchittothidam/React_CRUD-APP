import React,{Fragment, useEffect, useState} from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import './login.css'
import axios from '../../../axios'
import { useDispatch, useSelector } from 'react-redux'
import { storeAdminToken } from '../../../redux/token'
import { useNavigate } from 'react-router-dom'

function Login() {
  const token=useSelector((state)=>state.token)
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const isAuth=useSelector((state)=>state.token.token)

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [error, setError] = useState(null);
    const [showError, setShowError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
   
  
    const handleSubmit=async(e)=>{
        e.preventDefault()
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        try {
          if (!emailRegex.test(email)) {
            setError("Invalid Email Address");
            setShowError(true);
            return false;
        } else if (!password || password === null || password === undefined) {
            setError("Invalid Password!");
            setShowError(true);
            return false;
        } 
           else {
              setIsLoading(true)
              await axios.post('/admin/',{
                  email,password
                }).then((res)=>{
                  const {email,id,token,name}=res.data
                  const userData={email,id,token,name}
                  dispatch(storeAdminToken(userData))
                  navigate('/admin/home')
              }).catch(error => {
                setError(error.response.data);
                setShowError(true);
            }).finally(()=> {
                setIsLoading(false);
            })
          }
      } catch (err) {
          console.error(err);
          setShowError(true);
          setError('Something went wrong');
      }
    }
  
    useEffect(() => {
      const timer = setTimeout(() => {
          showError && setShowError(false)
      }, 3000)
      return () => clearTimeout(timer)
  }, [showError])
  

    
  return (
    <Fragment>
   <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Admin Sign In</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              onChange={((e)=>setEmail(e.target.value))}
              placeholder="Enter email"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              onChange={((e)=>setPassword(e.target.value))}
              placeholder="Enter password"
            />
          </div>
          {showError && (
            <div
              className="p-4 my-2 text-sm text-danger rounded-lg  "
              role="alert"
            >
              <span className="font-medium text-dange">{error}</span>
            </div>
          )}
          {isLoading ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
            </div>
            </div>
          ) : (
            <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          )}
          
        </div>
      </form>
    </div>

  </Fragment>
  )
}

export default Login