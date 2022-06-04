import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import "./Login.css";
import Navbar_login from "./Navbar_Login";
import axios from "axios";
import Textfield from "./Textfield";
import env from "./settings";
import Loading_page from "./Loading_page";

function RecruiterForgotpassword() {
  const validate = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
  });
  const[Loading,setLoading]=useState(false);

  return (
    <>
      <Navbar_login />
      {
        Loading ? <Loading_page/> :<>
        <div className="image">
        <div className="L-container-position">
          <Formik
            initialValues={{
              email: "",
            }}
            validationSchema={validate}
            onSubmit={async (values) => {
              setLoading(true)
              try {
                let postData = await axios.post(
                  `${env.api}/recruiterforgetpassword`,{email:values.email}
                );
                console.log(postData);
                setLoading(false)
                window.alert("Check your mail")
              } catch (error) {
                setLoading(false)
                console.log("error");
                if (error.message === "Request failed with status code 401") {
                  window.alert("mail mismatch");
                } else {
                  window.alert("Check your network / mail not found");
                }
              }
            }}
          >
            {(formik) => (
              <div className="L-loginContainer">
                <div className="L-content">
                  <div className="L-login-title">Forgotpassword</div>
                  <Form>
                    <Textfield
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="Enter your mail id"
                    />
                    <button className="L-buttons" type="submit">
                      submit
                    </button>
                    <button className="L-buttons" type="reset">
                      Reset
                    </button>
                  </Form>
                </div>
              </div>
            )}
          </Formik>
        </div>
      </div>
        </>
      }
    </>
  );
}

export default RecruiterForgotpassword;
