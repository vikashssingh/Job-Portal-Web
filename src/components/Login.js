import React from "react";
import Navbar_Login from "./Navbar_Login";
import "./Login.css";
import { AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";

function Login() {
  return (
    <>
      <Navbar_Login />
      <div className="Login_overall_container">
        <section className="Lo-container">
          <div className="Lo-content-gird">
            <Link to="/userLogin">
              <button className="Lo-content">
                <span>
                  <AiOutlineUser /> USER LOGIN{" "}
                </span>
              </button>
            </Link>

            <Link to="/recruiterLogin">
              <button className="Lo-content">
                <span>
                  <AiOutlineUser /> RECRUITER LOGIN{" "}
                </span>
              </button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

export default Login;
