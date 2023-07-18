import Loading from "../Loading/Loading";
import { useState, useEffect } from "react";
import { useNavigate, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [inputEmail, setInputEmail] = useState(false);
  const [inputCode, setInputCode] = useState(false);
  const [inputPassword, setInputPassword] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState(false);
  const [submitButtonType, setSubmitButtonType] = useState("email");
  const [canResendCode, setCanResendCode] = useState(false);
  const [remainingTime, setRemainingTime] = useState(60);
  const [isResendingCode, setIsResendingCode] = useState(false);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [timer, setTimer] = useState(null);

  const handleSubmit = () => {
    if (inputEmail) {
      handleCodeSubmit();
    } else if (inputPassword) {
      handlePasswordSubmit();
    } else {
      handleEmailSubmit();
    }
  };

  const handleEmailSubmit = () => {
    setLoading(true);
    axios
      .post("/mail/send_confirm_code/", {
        account: email,
      })
      .then((response) => {
        setSubmittedEmail(true);
        setInputEmail(true);
        setInputCode(true);
        setCanResendCode(true);
        setIsCountingDown(true);
        setCanResendCode(false);
        setSubmitButtonType("code");
        setLoading(false);
      })
      .catch((error) => {
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
        setLoading(false);
      });
  };

  const handleResendCode = () => {
    setIsCountingDown(true);
    setCanResendCode(false);
    setIsResendingCode(false);
    setRemainingTime(60);
    handleEmailSubmit();
    console.log("Resend code");
  };

  let countdownTimer = null;
  useEffect(() => {
    if (isCountingDown && remainingTime > 0) {
      countdownTimer = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
        console.log("Remaining time:", remainingTime);
      }, 1000);
    }

    if (remainingTime === 0) {
      setIsCountingDown(false);
      setCanResendCode(true);
      setIsResendingCode(false);
      console.log("Countdown finished");
      clearInterval(countdownTimer);
    }

    return () => {
      clearInterval(countdownTimer);
    };
  }, [isCountingDown, remainingTime]);

  const handleCodeSubmit = () => {
    axios
      .post("/user/confirm_code", {
        account: email,
        code: resetCode,
      })
      .then((response) => {
        setInputEmail(false);
        clearInterval(countdownTimer);
        setInputEmail(false);
        setInputCode(false);
        setInputPassword(true);
        setSubmitButtonType("password");
        toast.success("Xác nhận mã thành công", {
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

  const handlePasswordSubmit = () => {
    axios
      .put(`/user/password/reset/${email}`, {
        password: password,
        password_repeat: passwordRepeat,
      })
      .then((response) => {
        console.log(response);
        toast.success("Đổi mật khẩu thành công", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setTimeout(() => {
          navigate("/login");
        }, 2000);
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

  return (
    <div>
      <Loading isLoading={loading} />
      {!loading && (
        <>
          <ToastContainer />
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
                        Nhập Tài khoản
                      </label>
                      <input
                        value={email}
                        type="email"
                        id="form3Example3"
                        className="form-control form-control-lg"
                        placeholder="Nhập tài khoản"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    {inputEmail && (
                      <>
                        {inputCode && (
                          <div className="form-outline mb-3">
                            <label
                              className="form-label"
                              htmlFor="form3Example4"
                            >
                              Nhập mã
                            </label>
                            <input
                              type="text"
                              id="form3Example4"
                              className="form-control form-control-lg"
                              placeholder="Nhập mã"
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
                            placeholder="Nhập mật khẩu"
                            onChange={(e) => setPassword(e.target.value)}
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
                            placeholder="Nhập mật khẩu"
                            onChange={(e) => setPasswordRepeat(e.target.value)}
                          />
                        </div>
                      </>
                    )}
                    <div className="text-center text-lg-start mt-4 pt-2 d-flex">
                      <button
                        type="button"
                        className="btn btn-primary btn-lg"
                        style={{
                          paddingLeft: "2.5rem",
                          paddingRight: "2.5rem",
                        }}
                        onClick={handleSubmit}
                      >
                        {inputEmail ? "Xác nhận mã" : "Gửi"}
                      </button>
                      {canResendCode && (
                        <button
                          type="button"
                          className="btn btn-primary btn-lg ms-3"
                          style={{
                            paddingLeft: "2.5rem",
                            paddingRight: "2.5rem",
                          }}
                          disabled={!canResendCode}
                          onClick={handleResendCode}
                        >
                          Gửi lại mã
                        </button>
                      )}
                      {!canResendCode && !isResendingCode && inputEmail && (
                        <span
                          style={{
                            paddingLeft: "2.5rem",
                            paddingRight: "2.5rem",
                            paddingTop: "0.7rem",
                          }}
                        >
                          Chờ {remainingTime} giây trước khi gửi lại mã
                        </span>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default Login;
