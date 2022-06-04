import React from 'react'
import Navbar_Login from './Navbar_Login'
import './Register.css'
import { AiOutlineUser } from "react-icons/ai";
import { Link } from 'react-router-dom';

function Register() {
    return (
        <>
        <Navbar_Login/>
        <div className='Register_overall_container'>
        <section className='Re-container'>
            <div className='Re-content-gird'>
            <Link to="/userRegister" ><button className='Re-content'><span><AiOutlineUser/> USER REGISTER </span></button></Link> 
                
                
          
                <Link to="/recruiterRegister" ><button className='Re-content'><span><AiOutlineUser/> RECRUITER REGISTER </span></button></Link> 
            </div>
        </section>
        </div>
        </>
    )
}

export default Register
