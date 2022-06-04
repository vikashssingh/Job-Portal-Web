import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import "./Applyform.css";
import axios from "axios";
import Textfield from "./Textfield";
import env from "./settings";
import { useNavigate, useParams } from "react-router-dom";
import Loading_page from "./Loading_page";
import RecruiterNavbar from "./RecruiterNavbar";
import Textarea from "./Textarea";
import UserNavbar from "./UserNavbar";

function Applyform() {
  const { Jid, Rid } = useParams();
  console.log(Jid + " " + Rid);
  const validate = Yup.object({
    Name: Yup.string()
      .max(100, "Must be 100 characters or less")
      .required("Required"),
    education: Yup.string()
      .max(3000, "Must be 3000 characters or less")
      .required("Required"),
    resume: Yup.string().required("Required"),
  });

  const Navigate = useNavigate();
  const [Loading, setLoading] = useState(false);

  const postData = async (data) => {
    setLoading(true);
    try {
      let Data = await axios.post(
        `${env.api}/applyjob`,
        { data },
        {
          headers: {
            Authorization: window.localStorage.getItem("app_token"),
          },
        }
      );
      window.alert("JOB APPLYED");
      setLoading(false);
      Navigate("/Uhome");
    } catch (error) {
      setLoading(false);
      if (error.message === "Request failed with status code 401") {
        window.alert("Unauthorized");
        console.log(error);
      }else if(error.message === "Request failed with status code 409"){
        window.alert("Already job applyed");
        console.log(error);
        Navigate("/Uhome");
      } else {
        window.alert("some thing went wrong, Try again");
        console.log(error);
      }
    }
  };

  return (
    <>
      <UserNavbar />
      {Loading ? (
        <Loading_page />
      ) : (
        <div className="AP_Post_overall_container">
          <section className="AP-loginContainer">
            <div>
              <Formik
                initialValues={{
                  Name: "",
                  education: "",
                  resume: "",
                }}
                validationSchema={validate}
                onSubmit={async (values) => { 
                  values.recruiter_id = Rid;
                  values.job_id = Jid;
                  console.log(values);
                  postData(values);
                  setLoading(true);
                }}
              >
                {(formik) => (
                  <div>
                    <div className="AP-content">
                      <div className="AP-login-title">APPLY JOB</div>
                      <Form>
                        <Textfield
                          label="NAME"
                          name="Name"
                          type="text"
                          placeholder="Name"
                        />
                        <Textarea
                          label="EDUCATION"
                          name="education"
                          type="text"
                          placeholder="EG: BE-CSE,ME-CSE"
                        />
                        <Textfield
                          label="RESUME LINK"
                          name="resume"
                          type="url"
                          placeholder="https://drive.google.com/"
                        />

                        <button className="AP-buttons" type="submit">
                          APPLY
                        </button>
                        <button className="AP-buttons" type="reset">
                          RESET
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

export default Applyform;
