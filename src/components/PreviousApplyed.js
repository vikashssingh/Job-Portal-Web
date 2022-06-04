import React, { useEffect, useState } from "react";
import Loading_page from "./Loading_page";
import RecruiterNavbar from "./RecruiterNavbar";
import "./PreviousApplyed.css";
import axios from "axios";
import env from "./settings"
import { useParams } from "react-router-dom";

function PreviousApplyed() {
  const{id}=useParams()

  const [Loading, setLoading] = useState(false);
  const [Jobs, setJobs] = useState([]);


  const fetchdata = async (id) => {
    try {
      setLoading(true);
      let getdata = await axios.get(`${env.api}/appliedPreviousJob`,{
        headers: {
          Authorization: window.localStorage.getItem("app_token"),
          current_id:id
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
    fetchdata(id)
},[])
  return (
    <>
      <RecruiterNavbar />
      {Loading ? (
        <Loading_page />
      ) : (
        <>
          <div className="PA_overallcontainer">
              <h2 className="PA_page_title">candidates who have applied to previous jobs</h2>
            <div className="PA_totle RE_colore">
              Total People : {Jobs.length}
            </div>

               {
                   Jobs.map((data,index)=>{
                       return(
                        <section className="PA_job" key={index}>
                        <div>
                          <div className="PA_colore">NAME</div>
                          <div>{data.Name}</div>
                          <div className="PA_colore">EDUCATION</div>
                          <div>
                            {data.education}
                          </div>
                          <div className="PA_colore">RESUME LINK</div>
                          <div>{data.resume}</div>
                          <div className="PA_colore">RESUME</div>
                          <button  className="PA-buttons"><a href={data.resume} className="PA_link" target="_blank">View resume</a></button>
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


export default PreviousApplyed
