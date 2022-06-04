import React, { useState } from "react";
import axios from "axios";
import Loading_page from "./Loading_page.js";
import Navbar_Login from "./Navbar_Login.js";
import GoogleLogin from "react-google-login";
import Textfield from "./Textfield";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import env from "./settings";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function UserLogin() {
  const validate = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 charaters")
      .required("Password is required"),
  });
  
  const Navigate = useNavigate();
  const [Loading, setLoading] = useState(false);

 
  //to handle login
  const postData = async (values) => {
    setLoading(true);
    try {
      let postData = await axios.post(`${env.api}/userLogin`, values);
      window.localStorage.setItem("app_token", postData.data.token);
      setLoading(false);
      window.alert("Login sucessfull");
      Navigate("/Uhome");
    } catch (error) {
      setLoading(false);
      console.log("error");
      if (error.message === "Request failed with status code 401") {
        window.alert("user name or password miss match");
      } else {
        window.alert("Check your network");
      }
    }
  };

  //to handle google log in
  const handleLogin = async (googleData) => {
    setLoading(true);
    try {
      let postData = await axios.post(`${env.api}/userLoginbygoogle`, {
        token: googleData.tokenId,
      });
      window.localStorage.setItem("app_token", postData.data.token);
      setLoading(false);
      window.alert("Login sucessfull");
      Navigate("/Uhome");
    } catch (error) {
      setLoading(false);
      console.log("error");
      if (error.message === "Request failed with status code 401") {
        window.alert("user name or password miss match");
      } else {
        window.alert("Check your network");
      }
    }
  };

  // To handle google login failure
  const handleFailure = (err) => {
    console.log(err);
  };

  return (
    <>
      <Navbar_Login />
      {Loading ? (
        <Loading_page />
      ) : (
        <div className="image">
          <div className="L-container-position">
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={validate}
              onSubmit={async (values) => {
                setLoading(true);
                postData(values);
              }}
            >
              {(formik) => (
                <div className="L-loginContainer">
                  <div className="L-content">
                    <div className="L-content-position">
                    <div className="L-login-title">USER LOGIN</div>
                      <h5>Login with Google</h5><br/>
                      <div>
                        <GoogleLogin
                          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                          buttonText="Login with Google"
                          onSuccess={handleLogin}
                          onFailure={handleFailure}
                          cookiePolicy={"single_host_origin"}
                        />
                      </div><br/>
                      <h4>OR</h4><br/>
                      <Form>
                        <Textfield
                          label="Email"
                          name="email"
                          type="email"
                          placeholder="Enter your Mail id"
                        />
                        <Textfield
                          label="password"
                          name="password"
                          type="password"
                          placeholder="Enter your password"
                        />
                        <button className="L-buttons" type="submit">
                          Login
                        </button>
                        <button className="L-buttons" type="reset">
                          Reset
                        </button>
                      </Form>
                    </div>
                    <div className="forgetpassword-position">
                      <Link to="/Userforgetpassword">forgetpassword?</Link>
                    </div>
                  </div>
                </div>
              )}
            </Formik>
          </div>
        </div>
      )}
    </>
  );
}

export default UserLogin;
