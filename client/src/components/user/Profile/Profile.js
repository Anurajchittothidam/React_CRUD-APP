import React, { useEffect, useState } from 'react'
import Header from '../header'
import axios from '../../../axios'
import { useSelector } from 'react-redux'

function Profile() {
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [phone,setPhone]=useState('')
  const [image,setImage]=useState('')
   const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const id=useSelector((state)=>state.token.id)
  useEffect(() => {
    axios
      .post('/profile', {
        id
      })
      .then((res) => {
        const { userName, email, phoneNumber } = res.data;
        setName(userName);
        setEmail(email);
        setPhone(phoneNumber);
      })
      .catch((err) => {
        console.log(err.message);
      });
  },[id]);

  const uploadImage=(e)=>{
    e.preventDefault()
    const formData = new FormData()
    formData.append('image',image)
    axios.post('/uploadImage',{
      id,formData
    }).then((res)=>{
      const imageSrc=res.data
    }).catch((err)=>{
      console.log(err.message)
    })
  }

  const editProfile=(e)=>{
    const stringRegex = /^[a-zA-Z0-9_.\s-]{3,}$/
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const phoneRegex=/^[0-9]{10}$/

    e.preventDefault();
    try {
        if (!stringRegex.test(name)) {
            setError("Invalid Fullname");
            setShowError(true);
            return false;
        } else if (!emailRegex.test(email)) {
            setError("Invalid Email Address");
            setShowError(true);
            return false;
        }else if(!phoneRegex.test(phone)){
            setError("Invalid Phone Number")
            setShowError(true)
            return false;
        }
        else {
            setIsLoading(true)
            axios.post('/editProfile',{
              email,phonenumber:phone,username:name,id
            }).then((res)=>{
              const {email,phoneNumber,userName,id}=res.data
              console.log(res.data)
            })
            .catch(error => {
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

 
  return (
    <>
      <Header />
      <div class="container-xl px-4 mt-4">
        <hr class="mt-0 mb-4" />
        <div class="row">
          <div class="col-xl-4">
            <div class="card mb-4 mb-xl-0">
              <div class="card-header">Profile Picture</div>
              <div class="card-body text-center">
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <img
                  class="img-account-profile rounded-circle mb-2"
                  style={{ objectFit: "contain", width: "300px" }}
                  src={
                    image
                      ? URL.createObjectURL(image)
                      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                  }
                  alt=""
                />
                <div class="small font-italic text-muted mb-4">
                  JPG or PNG no larger than 5 MB
                </div>
                <button
                  class="btn btn-primary"
                  onClick={uploadImage}
                  type="button"
                >
                  Upload new image
                </button>
              </div>
            </div>
          </div>
          <div class="col-xl-8">
            <div class="card mb-4">
              <div class="card-header">Edit Profile</div>
              <div class="card-body">
                <form>
                  <div class="row gx-3 mb-3">
                    <div class="col-md-6">
                      <label class="small mb-1" for="inputFirstName">
                        User name
                      </label>
                      <input
                        class="form-control"
                        id="inputFirstName"
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                      />
                    </div>
                  </div>
                  <div class="row gx-3 mb-3"></div>

                  <div class="mb-3">
                    <label class="small mb-1" for="inputEmailAddress">
                      Email address
                    </label>
                    <input
                      class="form-control"
                      id="inputEmailAddress"
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                  </div>

                  <div class="row gx-3 mb-3 ">
                    <div class="col-md-6">
                      <label class="small mb-1" for="inputPhone">
                        Phone number
                      </label>
                      <input
                        class="form-control"
                        id="inputPhone"
                        type="tel"
                        onChange={(e) => setPhone(e.target.value)}
                        value={phone}
                      />
                    </div>
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
                      <div className="spinner-border" role="status"></div>
                    </div>
                  ) : (
                    <div className="d-grid gap-2 mt-3">
                      <button
                        class="btn btn-primary"
                        onClick={editProfile}
                        type="button"
                      >
                        Save changes
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile