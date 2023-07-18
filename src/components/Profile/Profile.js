import Navbar from "../Profile/Navbar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Profile() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState([]);
  const token = sessionStorage.getItem("token");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  useEffect(() => {
    if (token) {
      navigate("/profile");
    } else {
      window.location.href = "/login";
      navigate("/login");
    }
  }, []);

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
        setName(response.data.name);
        setPhone(response.data.phone_number);
      });
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleUpdate = () => {
    let isValid = true;
    if (!name) {
      setNameError("Vui lòng nhập tên người nhận");
      isValid = false;
    }
    if (!phone) {
      setPhoneError("Vui lòng nhập số điện thoại");
      isValid = false;
    } else if (phone.length !== 10) {
      setPhoneError("Số điện thoại phải có 10 kí tự");
      isValid = false;
    } else if (!/^\d+$/.test(phone)) {
      setPhoneError("Số điện thoại không hợp lệ");
      isValid = false;
    }

    if (isValid) {
      axios
        .post(
          "/user/update",
          {
            name: name,
            phone_number: phone,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          toast.success("Cập nhật thành công", {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        })
        .catch((error) => {
          console.log(error);
          toast.error("Cập nhật thất bại", {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        });
    }
  };

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
                      <label htmlFor="fullName">Họ và tên</label>
                    </div>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        id="fullName"
                        className={`form-control ${
                          nameError ? "is-invalid" : ""
                        }`}
                        value={name}
                        onChange={handleNameChange}
                      />
                      {nameError && (
                        <div
                          id="validationServer03Feedback"
                          className="invalid-feedback"
                        >
                          {nameError}
                        </div>
                      )}
                    </div>
                  </div>
                  <br></br>
                  <div className="row">
                    <div className="col-sm-3">
                      <label htmlFor="email">Email</label>
                    </div>
                    <div className="col-sm-9">
                      <input
                        type="email"
                        id="email"
                        className="form-control"
                        value={userInfo.email || "Chưa có thông tin"}
                      />
                    </div>
                  </div>
                  <br></br>
                  <div className="row">
                    <div className="col-sm-3">
                      <label htmlFor="phone">Phone</label>
                    </div>
                    <div className="col-sm-9">
                      <input
                        type="tel"
                        id="phone"
                        className={`form-control ${
                          phoneError ? "is-invalid" : ""
                        }`}
                        value={phone}
                        onChange={handlePhoneChange}
                      />
                      {phoneError && (
                        <div
                          id="validationServer03Feedback"
                          className="invalid-feedback"
                        >
                          {phoneError}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <button className="btn btn-primary" onClick={handleUpdate}>
                  Cập nhật
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Profile;
