import { ADMIN_URL, CLIENT_URL } from "../../url";
import Loading from "../Loading/Loading";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
function Login() {
  // useNavigate
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  // useState for Login
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [codeVerify, setCodeVerify] = useState("");

  // useState for Login Error
  const [codeVerifyError, setCodeVerifyError] = useState("");

  // State for Regis
  const [sendCode, setSendCode] = useState(false);
  const [canResendCode, setCanResendCode] = useState(false);
  const [remainingTime, setRemainingTime] = useState(60);
  const [isResendingCode, setIsResendingCode] = useState(false);
  const [isCountingDown, setIsCountingDown] = useState(false);
  // Call API to get Login
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      console.log(token);
      navigate("/");
    }
  }, [navigate]);

  // Handle Login
  const handleLogin = () => {
    if (username.trim().length <= 0) {
      toast.error("Tên đăng nhập không được để trống", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    } else if (password.trim().length <= 0) {
      toast.error("Mật khẩu không được để trống", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    } else {
      axios
        .post("/user/login", {
          account: username,
          password: password,
        })
        .then((response) => {
          sessionStorage.setItem("token", response.data.token);
          if (response.data.role_id === 1 || response.data.role_id === 10) {
            const token = sessionStorage.getItem("token");
            const url = `${ADMIN_URL}/login?token=${token}&role_id=${response.data.role_id}`;
            sessionStorage.removeItem("token");
            window.location.href = url;
          } else {
            toast.success("Đăng nhập thành công", {
              position: "bottom-right",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            const redirectInterval = setInterval(() => {
              clearInterval(redirectInterval);
              navigate("/");
            }, 2000);
          }
        })
        .catch((error) => {
          toast.error(error.response.data.detail, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          if (error.response.status === 406) {
            axios
              .post("/mail/send_confirm_code", {
                account: username,
              })
              .then((response) => {
                setLoading(false);
                setSendCode(true);
                setCanResendCode(true);
                setIsCountingDown(true);
                setCanResendCode(false);
                toast.success(
                  "Hãy nhập mã xác thực được gửi tới email của bạn",
                  {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                  }
                );
              })
              .catch((error) => {
                setLoading(false);
                toast.error(error.response.detail, {
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
        });
    }
  };
  const handleResendCode = () => {
    setIsCountingDown(true);
    setCanResendCode(false);
    setIsResendingCode(false);
    setRemainingTime(60);
    axios
      .post("/mail/send_confirm_code", {
        account: username,
      })
      .then((response) => {
        setLoading(false);
        setSendCode(true);
        setCanResendCode(true);
        setIsCountingDown(true);
        setCanResendCode(false);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.response.detail, {
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
        account: username,
        code: codeVerify,
      })
      .then((response) => {
        setSendCode(false);
        clearInterval(countdownTimer);
        toast.success("Xác nhận mã thành công", {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setInterval(() => {
          axios
            .post("/user/login", {
              account: username,
              password: password,
            })
            .then((response) => {
              sessionStorage.setItem("token", response.data.token);
              setLoading(true);
              setInterval(() => {
                window.location.href = CLIENT_URL;
              }, 1000);
            })
            .catch((error) => {
              toast.error(error.response.data.detail, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
            });
        }, 1000);
      })
      .catch((error) => {
        toast.error(error.response.data.detail, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };

  return (
    <>
      <Loading isLoading={loading} />
      {!loading && (
        <>
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
                        Tên đăng nhập
                      </label>
                      <input
                        value={username}
                        type="email"
                        id="form3Example3"
                        className="form-control form-control-lg"
                        placeholder="Nhập tên đăng nhập"
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>

                    {/* Password input */}
                    <div className="form-outline mb-3">
                      <label className="form-label" htmlFor="form3Example4">
                        Mật khẩu
                      </label>
                      <input
                        value={password}
                        type="password"
                        id="form3Example4"
                        className="form-control form-control-lg"
                        placeholder="Nhập mật khẩu"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

                    {/* Code vef */}
                    {sendCode && (
                      <div className="form-outline mb-3">
                        <label className="form-label" htmlFor="form3Example4">
                          Mã xác nhận
                        </label>
                        <input
                          type="text"
                          id="form3Example4"
                          className="form-control form-control-lg"
                          placeholder="Nhập mã xác nhận"
                          onChange={(e) => setCodeVerify(e.target.value)}
                        />
                      </div>
                    )}

                    <div className="d-flex justify-content-between align-items-center">
                      {/* Checkbox */}
                      <div className="form-check mb-0"></div>
                      <Link to="/reset" className="text-body">
                        Quên mật khẩu?
                      </Link>
                    </div>
                    {!sendCode ? (
                      <div className="text-center text-lg-start mt-4 pt-2">
                        <button
                          type="button"
                          className="btn btn-primary btn-lg"
                          style={{
                            paddingLeft: "2.5rem",
                            paddingRight: "2.5rem",
                          }}
                          onClick={handleLogin}
                        >
                          Đăng nhập
                        </button>
                        <p className="small fw-bold mt-2 pt-1 mb-0">
                          Không có tài khoản?{" "}
                          <Link to="/regis" className="link-danger">
                            Đăng ký
                          </Link>
                        </p>
                      </div>
                    ) : (
                      <div className="d-flex">
                        <div className="text-center text-lg-start mt-4 pt-2">
                          <button
                            type="button"
                            className="btn btn-primary btn-lg"
                            style={{
                              paddingLeft: "2.5rem",
                              paddingRight: "2.5rem",
                            }}
                            onClick={handleCodeSubmit}
                          >
                            Xác nhận
                          </button>
                        </div>

                        {canResendCode && (
                          <div className="text-center text-lg-start mt-4 pt-2">
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
                          </div>
                        )}
                        {!canResendCode && !isResendingCode && sendCode && (
                          <div className="text-center text-lg-start  mt-4 pt-3">
                            <span
                              style={{
                                paddingLeft: "2.5rem",
                                paddingTop: "9rem",
                              }}
                            >
                              Chờ {remainingTime} giây trước khi gửi lại mã
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default Login;
