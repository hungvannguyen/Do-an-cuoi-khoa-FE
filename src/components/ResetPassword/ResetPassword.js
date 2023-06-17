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
  const [canResendCode, setCanResendCode] = useState(false);
  const [remainingTime, setRemainingTime] = useState(60);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [timer, setTimer] = useState(null);
  const handleEmailSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/mail/send_confirm_code/", {
        account: email,
      })
      .then((response) => {
        console.log(response);
        setSubmittedEmail(true);
        setInputEmail(true);
        setInputCode(true);
        setCanResendCode(true);
        setIsCountingDown(true);
        setCanResendCode(false);
        setSubmitButtonType("code");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.detail, {
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
  };

  useEffect(() => {
    let countdownTimer = null;

    if (isCountingDown && remainingTime > 0) {
      countdownTimer = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    if (remainingTime === 0) {
      setIsCountingDown(false);
      setCanResendCode(true);
      clearInterval(countdownTimer);
    }

    return () => {
      clearInterval(countdownTimer);
    };
  }, [isCountingDown, remainingTime]);

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
      <ToastContainer />
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
                  Nhập Tài khoản
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
                        type="text"
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
              <div className="text-center text-lg-start mt-4 pt-2 d-flex">
                <button
                  type="button"
                  className="btn btn-primary btn-lg me-2"
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
                {canResendCode && (
                  <button
                    type="button"
                    className="btn btn-primary btn-lg me-3"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                    disabled={!canResendCode}
                    onClick={() => {
                      setIsCountingDown(true);
                      setCanResendCode(false);
                    }}
                  >
                    Gửi lại mã
                  </button>
                )}
                {!canResendCode && inputEmail && (
                  <span>Chờ {remainingTime} giây trước khi gửi lại mã</span>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
