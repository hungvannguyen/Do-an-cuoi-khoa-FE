import Navbar from "../Profile/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Profile() {
  const [userInfo, setUserInfo] = useState([]);

  const token = sessionStorage.getItem("token");
  useEffect(() => {
    axios
      .get("/user/info", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setUserInfo(response.data);
      });
  }, []);

  return (
    <div>
      <ToastContainer />
      <section className="user-profile">
        <div className="container">
          <div className="row">
            <Navbar />
            <div className="col-lg-8" style={{ marginTop: 30 }}>
              <div className="card mb-4">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Họ và tên</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">
                        {userInfo.name || "Chưa có thông tin"}
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Email</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">
                        {userInfo.email || "Chưa có thông tin"}
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Phone</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">
                        {userInfo.phone_number || "Chưa có thông tin"}
                      </p>
                    </div>
                  </div>

                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Profile;
