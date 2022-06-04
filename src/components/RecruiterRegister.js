import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import "./Register.css";
import axios from "axios";
import Textfield from "./Textfield";
import env from "./settings";
import Navbar_Login from "./Navbar_Login";
import { useNavigate } from "react-router-dom";
import Loading_page from "./Loading_page";
import GoogleLogin from "react-google-login";

function RecruiterRegister() {
  const validate = Yup.object({
    firstName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    lastName: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 charaters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match")
      .required("Confirm password is required"),
  });

  const Navigate = useNavigate();

  const [Loading, setLoading] = useState(false);

  const postData = async (data) => {
    setLoading(true);
    try {
      let Data = await axios.post(`${env.api}/recruiterRegister`, data);
      window.alert("Recruiter registered");
      setLoading(false);
      Navigate("/recruiterLogin");
    } catch (error) {
      setLoading(false);
      if (error.message === "Request failed with status code 409") {
        window.alert("Mailid is already registered");
        console.log(error);
      } else {
        window.alert("check your network");
        console.log(error);
      }
    }
  };

  const handleregister = async (googleData) => {
    setLoading(true);
    try {
      let Data = await axios.post(`${env.api}/recruiterRegisterbygoogle`, {
        token: googleData.tokenId,
      });
      window.alert("Recruiter registered");
      setLoading(false);
      Navigate("/recruiterLogin");
    } catch (error) {
      setLoading(false);
      if (error.message === "Request failed with status code 409") {
        window.alert("Mailid is already registered");
        console.log(error);
      } else {
        window.alert("check your network");
        console.log(error);
      }
    }
  };

  const handleFailure = (err) => {
    console.log(err);
  };

  return (
    <>
      <Navbar_Login />
      {Loading ? (
        <Loading_page />
      ) : (
        <div className="Register-image">
          <section className="R-loginContainer">
            <div>
              <Formik
                initialValues={{
                  firstName: "",
                  lastName: "",
                  email: "",
                  address: "",
                  password: "",
                  confirmPassword: "",
                }}
                validationSchema={validate}
                onSubmit={async (values) => {
                  let data = {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    password: values.password,
                    email: values.email,
                  };
                  postData(data);
                  setLoading(true);
                }}
              >
                {(formik) => (
                  <div>
                    <div className="R-content">
                    <div className="R-login-title">RECRUITER REGISTER</div>
                      <h5>Sign-Up with Google</h5><br/>
                      <div>
                        <GoogleLogin
                          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                          buttonText="Sign-Up with Google"
                          onSuccess={handleregister}
                          onFailure={handleFailure}
                          cookiePolicy={"single_host_origin"}
                        />
                      </div>
                      <h4>OR</h4>
                      <Form>
                        <Textfield
                          label="First Name"
                          name="firstName"
                          type="text"
                          placeholder="Enter your first Name"
                        />
                        <Textfield
                          label="last Name"
                          name="lastName"
                          type="text"
                          placeholder="Enter Last  Name"
                        />
                        <Textfield
                          label="Email"
                          name="email"
                          type="email"
                          placeholder="Enter email"
                        />
                        <Textfield
                          label="password"
                          name="password"
                          type="password"
                          placeholder="Enter password"
                        />
                        <Textfield
                          label="Confirm Password"
                          name="confirmPassword"
                          type="password"
                          placeholder="Confirm Password"
                        />
                        <button className="R-buttons" type="submit">
                          Register
                        </button>
                        <button className="R-buttons" type="reset">
                          Reset
                        </button>
                      </Form>
                    </div>
                  </div>
                )}
              </Formik>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default RecruiterRegister;



