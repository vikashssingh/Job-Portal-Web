import React, { useEffect, useState } from "react";
import Loading_page from "./Loading_page";
import RecruiterNavbar from "./RecruiterNavbar";
import "./UserHome.css";
import axios from "axios";
import env from "./settings";
import { Link } from "react-router-dom";
import UserNavbar from "./UserNavbar";

function UserHome() {
  const [Loading, setLoading] = useState(false);
  const [Jobs, setJobs] = useState([]);
  const [Applied, setApplied] = useState([]);

  const fetchdata = async () => {
    try {
      setLoading(true);
      let getdata = await axios.get(`${env.api}/Jobsforuser`, {
        headers: {
          Authorization: window.localStorage.getItem("app_token"),
        },
      });
      setJobs([...getdata.data]);
      setLoading(false);
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

  const AppliedJobData = async () => {
    try {
      setLoading(true);
      let getdata = await axios.get(`${env.api}/AppliedJobsforuser`, {
        headers: {
          Authorization: window.localStorage.getItem("app_token"),
        },
      });
      setApplied([...getdata.data]);
      setLoading(false);
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

  useEffect(() => {
    fetchdata();
    AppliedJobData();
  }, []);

  const AlreadyApplyed = () => {
    window.alert("YOU ARE ALREADY APPLIED FOR THIS JOB");
  };
  return (
    <>
      <UserNavbar />
      {Loading ? (
        <Loading_page />
      ) : (
        <>
          <div className="UE_overallcontainer">
            <h2 className="UE_page_title">JOBS</h2>
            <div className="UE_totle RE_colore">
              Total jobs for You : {Jobs.length}
            </div>

            {Jobs.map((data, index) => {
              return (
                <section className="UE_job" key={index}>
                  <div>
                    <div className="UE_colore">COMPANY NAME</div>
                    <div>{data.Name}</div>
                    <div className="UE_colore">JOB DESCRIPTION</div>
                    <div>{data.Job_description}</div>
                    <div className="UE_colore">SKILLS</div>
                    <div>{data.skills}</div>
                    <div className="UE_button_position">
                      {Applied.some((obj) => obj.job_id === data._id) ? (
                        <button onClick={AlreadyApplyed} className="UE-buttons">
                          ALREADY APPLIED
                        </button>
                      ) : (
                        <Link to={`/applyjob/${data._id}/${data.recruiter_id}`}>
                          <button className="UE-buttons">APPLY</button>
                        </Link>
                      )}
                    </div>
                  </div>
                </section>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}

export default UserHome;
