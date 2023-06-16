import { useState, useEffect } from "react";
import { useNavigate, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
function Login() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [inputEmail, setInputEmail] = useState(false);
  const [inputCode, setInputCode] = useState(false);
  const [inputPassword, setInputPassword] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState(false);
  const [submitButtonType, setSubmitButtonType] = useState("email");

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setSubmittedEmail(true);
    setInputEmail(true);
    setInputCode(true);
    setSubmitButtonType("code");
  };

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    setInputCode(false);
    setInputPassword(true);
    setSubmitButtonType("password");
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // Submit password to server
    console.log("Submitted password:", resetCode);
  };
  return (
    <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="Sample image"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form>
              {/* Email input */}
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example3">
                  Nhập email
                </label>
                <input
                  value={email}
                  type="email"
                  id="form3Example3"
                  className="form-control form-control-lg"
                  placeholder="Enter a valid email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {inputEmail && (
                <>
                  {inputCode && (
                    <div className="form-outline mb-3">
                      <label className="form-label" htmlFor="form3Example4">
                        Nhập mã
                      </label>
                      <input
                        type="password"
                        id="form3Example4"
                        className="form-control form-control-lg"
                        placeholder="Enter password"
                        onChange={(e) => setResetCode(e.target.value)}
                      />
                    </div>
                  )}
                </>
              )}
              {inputPassword && (
                <>
                  <div className="form-outline mb-3">
                    <label className="form-label" htmlFor="form3Example4">
                      Mật khẩu mới
                    </label>
                    <input
                      type="password"
                      id="form3Example4"
                      className="form-control form-control-lg"
                      placeholder="Enter password"
                    />
                  </div>
                  <div className="form-outline mb-3">
                    <label className="form-label" htmlFor="form3Example4">
                      Nhâp lại mật khẩu mới
                    </label>
                    <input
                      type="password"
                      id="form3Example4"
                      className="form-control form-control-lg"
                      placeholder="Enter password"
                    />
                  </div>
                </>
              )}
              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                  onClick={
                    submitButtonType === "email"
                      ? handleEmailSubmit
                      : submitButtonType === "code"
                      ? handleCodeSubmit
                      : handlePasswordSubmit
                  }
                >
                  Xác nhận
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
