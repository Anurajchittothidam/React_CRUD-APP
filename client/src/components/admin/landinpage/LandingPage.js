import React, { useEffect, useState } from 'react'
import Header from '../../admin/header/Header'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from '../../../axios'
import { getUserDetails, getUsers } from '../../../redux/token'


function LandingPage() {
  const [filter, setFilter] = useState([])
  const isAuth = useSelector((state) => state.token.token)
  const [isLoading,setIsLoading]=useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const users = useSelector((state) => state.token.getAllUsers)
  const searchData = useSelector((state) => state.token.searchData)
  console.log('search', searchData)
  console.log('users', users)

  useEffect(() => {
    if (searchData) {
      const filterUsers = async () => {
        const filteredUsers = await users.filter((value) =>
          value.userName.includes(searchData.users)
        )
        console.log('filtered users', filteredUsers)
        setFilter(filteredUsers)
      }

      filterUsers()
    }
  }, [searchData, users])

  useEffect(() => {
    if (isAuth === '') {
      navigate('/admin/')
    } else {
      setIsLoading(true)
      axios.get('/admin/home', {

      }).then((res) => {
        dispatch(getUsers({
          users: res.data.getAllUsers
        }))
      }).finally(()=>{
        setIsLoading(false)
      })
      
    }
  }, [isAuth, users])

  return (
    <>
      <Header />
      <div className="container mt-5">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-8 col-12">
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-primary"
                onClick={() => navigate("/admin/addUser")}
              >
                Add User
              </button>
            </div>

            <table className="table mt-3">
              <thead>
                <tr>
                  <th scope="col" className="bg-dark text-white">
                    No
                  </th>
                  <th scope="col" className="bg-dark text-white">
                    Name
                  </th>
                  <th scope="col" className="text-lg-end bg-dark text-white">
                    Email
                  </th>
                  <th
                    scope="col"
                    className="text-lg-end bg-dark text-white pe-5"
                  >
                    Handle
                  </th>
                </tr>
              </thead>
              {isLoading ? (
  <div className="d-flex justify-content-center align-items-center flex-row">
    <div className="spinner-border" role="status"></div>
  </div>
) : (
  <tbody>
    {filter.length > 0 ? (
      filter.map((obj, index) => (
        <tr key={obj._id}>
          <th scope="row">{index + 1}</th>
          <td className="">{obj.userName}</td>
          <td className="text-lg-end">{obj.email}</td>
          <td className="text-lg-end ">
            <button
              className="btn btn-warning btn-sm m-1"
              onClick={() => {
                axios.get(`/admin/editUser/${obj._id}`, {}).then((res) => {
                  dispatch(getUserDetails({
                    users: res.data.userData
                  }));
                  console.log('res.data', res.data);
                  navigate(`/admin/editUser/${obj._id}`);
                });
              }}
            >
              edit
            </button>
            <button
              className="btn btn-danger btn-sm m-1"
              onClick={() => {
                axios.post(`/admin/deleteUser/${obj._id}`, {}).then((res) => {
                  console.log(res.data);
                  navigate('/admin/home');
                });
              }}
            >
              delete
            </button>
          </td>
        </tr>
      ))
    ) : (
      users.map((obj, index) => (
        <tr key={obj._id}>
          <th scope="row">{index + 1}</th>
          <td className="">{obj.userName}</td>
          <td className="text-lg-end">{obj.email}</td>
          <td className="text-lg-end ">
            <button
              className="btn btn-warning btn-sm m-1"
              onClick={() => {
                axios.get(`/admin/editUser/${obj._id}`, {}).then((res) => {
                  dispatch(getUserDetails({
                    users: res.data.userData
                  }));
                  console.log('res.data', res.data);
                  navigate(`/admin/editUser/${obj._id}`);
                });
              }}
            >
              edit
            </button>
            <button
              className="btn btn-danger btn-sm m-1"
              onClick={() => {
                axios.post(`/admin/deleteUser/${obj._id}`, {}).then((res) => {
                  console.log(res.data);
                  navigate('/admin/home');
                });
              }}
            >
              delete
            </button>
          </td>
        </tr>
      ))
    )}
  </tbody>
)}

              
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
