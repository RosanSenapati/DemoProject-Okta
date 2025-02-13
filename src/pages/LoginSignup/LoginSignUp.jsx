import React, { useState } from 'react'
import './LoginSignUp.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {toast,ToastContainer } from 'react-toastify'
export default function LoginSignUp() {
  const navigate = useNavigate();
  const [email,setEmail ] = useState("");
  const [password,setPassword] = useState("");
  const UserLogin = async (event)=>{
    event.preventDefault();
    console.log(email,password);
    try {
     const res = await axios.post("http://localhost:8081/login", {
      email: email,
      password:password,
      },
    {
      withCredentials:false
    });
      console.log(res);
      console.log(res.data);

      // res.data ?toast.success('Logged in successfully') : toast.error('invalid Credentials');
      res.data ?navigate(`/home/${res.data.name}`) : toast.error('invalid Credentials');
      // navigate('/signup');
    } catch (err) {
      alert(err);
    }

  }
  return (
    <div className="wrapper shadow-lg ">
    <div className="title"><span>Login Form</span></div>
    <form onSubmit={UserLogin} >
      <div className="row">
      <i className="bi bi-person-circle"></i>
        <input type="text" placeholder="Enter Email" required onChange={(event)=>{
          setEmail(event.target.value);
        }}/>
      </div>
      <div className="row">
      <i className="bi bi-lock-fill"></i>
        <input type="password" placeholder="Enter Password" required onChange={(event)=>{
          setPassword(event.target.value)
        }} />
      </div>
      <div className="row button">
        <input type="submit" value="Login" />
      </div>
      <div className="signup-link">Not a member? <Link to="/signup">Signup now</Link></div>
    </form>
    <ToastContainer/>
  </div>
  )
}