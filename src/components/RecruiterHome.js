import React, { useEffect, useState } from "react";
import Loading_page from "./Loading_page";
import RecruiterNavbar from "./RecruiterNavbar";
import "./RecruiterHome.css";
import axios from "axios";
import env from "./settings"
import { Link } from "react-router-dom";

function RecruiterHome() {
  const [Loading, setLoading] = useState(false);
  const [Jobs, setJobs] = useState([]);


  const fetchdata = async (id) => {
    try {
      setLoading(true);
      let getdata = await axios.get(`${env.api}/JobsByrecruiter`,{
        headers: {
          Authorization: window.localStorage.getItem("app_token"),
        },
      });
      setJobs([...getdata.data])
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      window.alert("SOMETHING WENT WRONG")
    }
  };
useEffect(()=>{
    fetchdata()
},[])
  return (
    <>
      <RecruiterNavbar />
      {Loading ? (
        <Loading_page />
      ) : (
        <>
          <div className="RE_overallcontainer">
              <h2 className="RE_page_title">JOBS POSTED BY YOU</h2>
            <div className="RE_totle RE_colore">
              Total jobs posted by You : {Jobs.length}
            </div>

               {
                   Jobs.map((data,index)=>{
                       return(
                        <section className="RE_job" key={index}>
                        <div>
                          <div className="RE_colore">COMPANY NAME</div>
                          <div>{data.Name}</div>
                          <div className="RE_colore">JOB DESCRIPTION</div>
                          <div>
                            {data.Job_description}
                          </div>
                          <div className="RE_colore">SKILLS</div>
                          <div>
                            {data.skills}
                          </div>
                          <div>
                            <Link to={`/privious/${data._id}`} ><button className="RE-buttons">View candidates who have applied to previous jobs</button></Link>
                          
                          </div>
                        </div>
                      </section>
                       )
                   })
               }
          </div>
        </>
      )}
    </>
  );
}

export default RecruiterHome;
