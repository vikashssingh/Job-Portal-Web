import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import "./Postjobform.css";
import axios from "axios";
import Textfield from "./Textfield";
import env from "./settings";
import { useNavigate } from "react-router-dom";
import Loading_page from "./Loading_page";
import RecruiterNavbar from "./RecruiterNavbar";
import Textarea from "./Textarea";

function Postjobform() {
  const validate = Yup.object({
    Name: Yup.string()
      .max(100, "Must be 100 characters or less")
      .required("Required"),
    Job_description: Yup.string()
      .max(3000, "Must be 3000 characters or less")
      .required("Required"),
    skills: Yup.string()
      .max(2000, "Must be 2000 characters or less")
      .required("Required"),
  });

  const Navigate = useNavigate();
  const [Loading, setLoading] = useState(false);

  const postData = async (data) => {
    setLoading(true);
    try {
      let Data =  await axios.post(
        `${env.api}/createjob`,
        { data },
        {
          headers: {
            Authorization: window.localStorage.getItem("app_token"),
          },
        }
      );
      window.alert("JOB CREATED");
      setLoading(false);
      Navigate("/Rhome");
    } catch (error) {
        setLoading(false);
        if (error.message === "Request failed with status code 401") {
            window.alert("Unauthorized");
            console.log(error);
          } else {
            window.alert("some thing went wrong, Try again");
            console.log(error);
          }
    }
  };

  

  return (
    <>
       <RecruiterNavbar />
      {Loading ? (
        <Loading_page />
      ) : (
        <div className="Post_overall_container">
          <section className="P-loginContainer">
            <div>
              <Formik
                initialValues={{
                  Name: "",
                  Job_description: "",
                  skills:"",
                }}
                validationSchema={validate}
                onSubmit={async (values) => {
                    console.log(values);
                  postData(values);
                  setLoading(true);
                }}
              >
                {(formik) => (
                  <div>
                    <div className="P-content">
                      <div className="P-login-title">NEW JOB</div>
                      <Form>
                        <Textfield
                          label="COMPANY NAME"
                          name="Name"
                          type="text"
                          placeholder="Enter First Name"
                        />
                         <Textarea
                          label="JOB DESCRIPTION"
                          name="Job_description"
                          type="text"
                          placeholder="JOB DESCRIPTION..."
                        />
                         <Textarea
                          label="SKILLS"
                          name="skills"
                          type="text"
                          placeholder="eg: React...."
                        />
                        
                        <button className="P-buttons" type="submit">
                          Register
                        </button>
                        <button className="P-buttons" type="reset">
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


export default Postjobform;
