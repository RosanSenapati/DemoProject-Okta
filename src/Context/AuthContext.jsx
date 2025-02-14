import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [isLogin, setIsLogin] = useState(() => {
    // Check if the login state exists in localStorage
    const storedLoginState = localStorage.getItem('isLogin');
    return storedLoginState === 'true'; // Return true or false based on localStorage value
  });

  useEffect(() => {
    // Store the login state in localStorage whenever it changes
    localStorage.setItem('isLogin', isLogin);
  }, [isLogin]);

  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextProvider };
