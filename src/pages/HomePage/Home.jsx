import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import {toast,ToastContainer } from 'react-toastify'
import './Home.css';
export default function Home() {
  const {name} = useParams();
  console.log(name);
const flag = true;
  useEffect(()=>{
    toast.success('Logged in Successfully')
  },[])

  return (
  
    // <div className="container title bg-white d-flex justify-content-center flex-column  ">
    //   <div><div><p className='fs-1 text-center'>Message</p></div><p className='fs-5 text-dark'>Welcome Page <span className='text-primary'>{name}</span></p></div>
    //   </div>
    <div className="wrapper shadow-lg ">
    <div className="title"><span>Message</span></div>
    <div className='fs-3 p-4'><p className='text-center '>Welcome <span className='text-primary'>{name}</span> </p></div>
    <ToastContainer/>
  </div>
    
  )
}