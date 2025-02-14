import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { AuthContext } from '../../Context/AuthContext';
import './LoginSignUp.css';

export default function LoginSignUp() {
  const { setIsLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const UserLogin = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("http://localhost:8081/login", {
        email,
        password,
      }, { withCredentials: false });

      if (res) {
        setIsLogin(true); // Update context
        localStorage.setItem('isLogin', 'true'); // Persist login state
        navigate(`/home/${res.data.name}`);
      } else {
        toast.error('Invalid Credentials');
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="wrapper shadow-lg">
      <div className="title"><span>Login Form</span></div>
      <form onSubmit={UserLogin}>
        <div className="row">
          <i className="bi bi-person-circle"></i>
          <input type="text" placeholder="Enter Email" required onChange={(event) => setEmail(event.target.value)} />
        </div>
        <div className="row">
          <i className="bi bi-lock-fill"></i>
          <input type="password" placeholder="Enter Password" required onChange={(event) => setPassword(event.target.value)} />
        </div>
        <div className="row button">
          <input type="submit" value="Login" />
        </div>
        <div className="signup-link">Not a member? <Link to="/signup">Signup now</Link></div>
        <div className="signup-link">
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}
