import React, { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import './Home.css';
import { AuthContext } from '../../Context/AuthContext';

export default function Home() {
  const { isLogin, setIsLogin } = useContext(AuthContext); // Destructure setIsLogin from AuthContext
  const { name } = useParams();
  const navigate = useNavigate();
  const userName = name || "Guest"; // Fallback to "Guest" if name is undefined

  useEffect(() => {
    // Ensure user is logged in, otherwise redirect to login page
    // if (!isLogin) {
    //   navigate('/');
    // } else if (!toast.isActive("loginToast")) {
    //   toast.success('Logged in Successfully', { toastId: "loginToast" });
    // }
  }, [isLogin, navigate]);

  // Logout handler
  const handleLogout = () => {
    setIsLogin(false);  // Set isLogin to false to log the user out
    navigate('/');      // Redirect to the login page
  };

  return (
    <>
      <div className="wrapper shadow-lg">
        <div className="title">
          <span>Message</span>
        </div>
        <div className="fs-3 p-4">
          <p className="text-center">
            Welcome <span className="text-primary">{userName}</span>
          </p>
        </div>

        {/* Logout Button */}
        {isLogin && (
          <div className="logout-container text-center mt-4">
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}

        <ToastContainer />
      </div>
    </>
  );
}
