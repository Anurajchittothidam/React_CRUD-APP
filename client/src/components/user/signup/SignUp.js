import React, { Fragment, useEffect, useState } from 'react'
import { unstable_renderSubtreeIntoContainer } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import axios from '../../../axios'

function SignUp() {
  const navigate=useNavigate()
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [username,setName]=useState('')
  const [phonenumber,setNumber]=useState()
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit=(e)=>{
    const stringRegex = /^[a-zA-Z0-9_.\s-]{3,}$/
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const passwordRegex = /^[^\s]{6,}$/
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
        } else if (!passwordRegex.test(password)) {
            setError("Invalid Password! Make a strong password");
            setShowError(true);
            return false;
        }else if(!phoneRegex.test(phonenumber)){
            setError("Invalid Phone Number")
            setShowError(true)
            return false;
        }
         else if (password !== confirmPassword) {
            setError("Confirm your password");
            setShowError(true);
            return false;
        } else {
            setIsLoading(true)
            axios.post('/signup', {
                username,
                email,
                phonenumber,
                password,
            }).then(response => {
                navigate('/login')
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
};

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
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="form-group mt-3">
            <label>User name</label>
            <input
              type="text"
              className="form-control mt-1"
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
          </div>
          <div className="form-group mt-3">
            <label>Phone number</label>
            <input
              type="number"
              className="form-control mt-1"
              onChange={(e) => setNumber(e.target.value)}
              placeholder="Enter phone number"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
            />
          </div>
          {showError && (
            <div
              className="p-4 my-2 text-sm text-danger rounded-lg"
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
          
          <p className="forgot-password text-right mt-2">
            Alredy have an account{" "}
            <a href="#" onClick={() => navigate("/login")}>
              Login
            </a>
          </p>
        </div>
      </form>
    </div>
  </Fragment>
);
}

export default SignUp