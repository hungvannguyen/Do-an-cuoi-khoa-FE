import Loading from "../Loading/Loading";
import { CLIENT_URL } from "../../url";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
function Regis() {
  // useNavigate
  const navigate = useNavigate();
  // Looading
  const [loading, setLoading] = useState(true);
  // useState for Regis
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [codeVerify, setCodeVerify] = useState("");

  //  Error for Regis
  const [usernameError, setUsernameError] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [codeVerifyError, setCodeVerifyError] = useState("");

  // State for Regis
  const [sendCode, setSendCode] = useState(false);
  const [canResendCode, setCanResendCode] = useState(false);
  const [remainingTime, setRemainingTime] = useState(60);
  const [isResendingCode, setIsResendingCode] = useState(false);
  const [isCountingDown, setIsCountingDown] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, []);
  // Handle Regis
  const handleRegistration = () => {
    // Validate username
    if (username.length < 3 || username.length > 20) {
      setUsernameError(
        "Tên đăng nhập phải có ít nhất 3 kí tự và tối đa 20 kí tự"
      );
      return;
    } else {
      setUsernameError("");
    }

    // Validate name
    if (name.length <= 0) {
      setNameError("Họ và tên không được để trống");
      return;
    } else {
      setNameError("");
    }
    // Validate phone
    if (/\s/.test(phone)) {
      setPhoneError("Số điện thoại không được chứa khoảng trắng");
      return;
    } else {
      setPhoneError("");
    }

    if (phone.length < 10 || phone.length > 11) {
      setPhoneError("Số điện thoại phải có 10 hoặc 11 số");
      return;
    } else {
      setPhoneError("");
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Email không hợp lệ");
      return;
    } else {
      setEmailError("");
    }

    // Validate password
    if (password.length < 6 || password.length > 30) {
      setPasswordError("Mật khẩu phải có ít nhất 6 kí tự và tối đa 30 kí tự");
      return;
    } else {
      setPasswordError("");
    }
    // Validate confirm password
    if (password !== confirmPassword) {
      setPasswordError("Mật khẩu không khớp");
      return;
    } else {
      setPasswordError("");
    }
    // Reset error
    if (usernameError) {
      setUsernameError("");
    }
    if (nameError) {
      setNameError("");
    }
    if (phoneError) {
      setPhoneError("");
    }
    if (emailError) {
      setEmailError("");
    }
    if (passwordError) {
      setPasswordError("");
    }
    if (passwordError) {
      setConfirmPassword("");
    }
    // Call API to get Regis
    const formattedEmail = email.replace(/\s/g, "");
    axios
      .post("/user/regis", {
        account: username,
        email: formattedEmail,
        name: name,
        phone_number: phone,
        password: password,
        confirm_password: confirmPassword,
      })
      .then((response) => {
        setLoading(true);
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
            toast.success("Hãy nhập mã xác thực được gửi tới email của bạn", {
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
      })
      .catch((error) => {
        if (error.response.status === 400) {
          setUsernameError(error.response.data.detail);
        }
        if (error.response.status === 403) {
          setEmailError(error.response.data.detail);
        }
        console.log("Đăng ký thất bại");
        setLoading(false);
      });
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
              setName("");
              setUsername("");
              setPassword("");
              setEmail("");
              setPhone("");
              setConfirmPassword("");
              setLoading(true);
              setInterval(() => {
                window.location.href = CLIENT_URL;
              }, 1000);
            })
            .catch((error) => {
              console.log("Đăng nhập thất bại");
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
        setCodeVerifyError(error.response.data.detail);
      });
  };

  return (
    <div>
      <Loading isLoading={loading} />
      {!loading && (
        <>
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
                    {/* Username input */}
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="usernameInput">
                        Tên đăng nhập
                      </label>
                      <input
                        value={username}
                        type="text"
                        id="usernameInput"
                        className={`form-control form-control-lg ${
                          usernameError ? "is-invalid" : ""
                        }`}
                        placeholder="Nhập tên đăng nhập"
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      {usernameError && (
                        <div className="invalid-feedback">{usernameError}</div>
                      )}
                    </div>

                    {/* Name input */}
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="nameInput">
                        Họ và tên
                      </label>
                      <input
                        value={name}
                        type="text"
                        id="nameInput"
                        className={`form-control form-control-lg ${
                          nameError ? "is-invalid" : ""
                        }`}
                        placeholder="Nhập họ và tên"
                        onChange={(e) => setName(e.target.value)}
                      />
                      {nameError && (
                        <div className="invalid-feedback">{nameError}</div>
                      )}
                    </div>

                    {/* Phone input */}
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="phoneInput">
                        Số điện thoại
                      </label>
                      <input
                        value={phone}
                        type="text"
                        id="phoneInput"
                        className={`form-control form-control-lg ${
                          phoneError ? "is-invalid" : ""
                        }`}
                        placeholder="Nhập số điện thoại"
                        onChange={(e) => setPhone(e.target.value)}
                      />
                      {phoneError && (
                        <div className="invalid-feedback">{phoneError}</div>
                      )}
                    </div>

                    {/* Email input */}
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="emailInput">
                        Email
                      </label>
                      <input
                        value={email}
                        type="email"
                        id="emailInput"
                        className={`form-control form-control-lg ${
                          emailError ? "is-invalid" : ""
                        }`}
                        placeholder="Nhập email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {emailError && (
                        <div className="invalid-feedback">{emailError}</div>
                      )}
                    </div>
                    {/* Password input */}
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="passwordInput">
                        Mật khẩu
                      </label>
                      <input
                        value={password}
                        type="password"
                        id="passwordInput"
                        className={`form-control form-control-lg ${
                          passwordError ? "is-invalid" : ""
                        }`}
                        placeholder="Nhập mật khẩu"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {passwordError && (
                        <div className="invalid-feedback">{passwordError}</div>
                      )}
                    </div>

                    {/* Confirm Password input */}
                    <div className="form-outline mb-4">
                      <label
                        className="form-label"
                        htmlFor="confirmPasswordInput"
                      >
                        Nhập lại mật khẩu
                      </label>
                      <input
                        value={confirmPassword}
                        type="password"
                        id="confirmPasswordInput"
                        className={`form-control form-control-lg ${
                          passwordError ? "is-invalid" : ""
                        }`}
                        placeholder="Nhập lại mật khẩu"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                    {/* Code vef */}
                    {sendCode && (
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="codeVerify">
                          Mã xác nhận
                        </label>
                        <input
                          value={codeVerify}
                          type="text"
                          id="codeVerify"
                          className={`form-control form-control-lg ${
                            codeVerifyError ? "is-invalid" : ""
                          }`}
                          placeholder="Nhập mã xác nhận"
                          onChange={(e) => setCodeVerify(e.target.value)}
                        />
                        {codeVerifyError && (
                          <div className="invalid-feedback">
                            {codeVerifyError}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Submit button */}
                    {!sendCode ? (
                      <div className="text-center text-lg-start mt-4 pt-2">
                        <button
                          type="button"
                          className="btn btn-primary btn-lg"
                          style={{
                            paddingLeft: "2.5rem",
                            paddingRight: "2.5rem",
                          }}
                          onClick={handleRegistration}
                        >
                          Đăng ký
                        </button>
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
                    <p className="small fw-bold mt-2 pt-1 mb-0">
                      Đã có tài khoản?{" "}
                      <Link to="/login" className="link-danger">
                        Đăng nhập
                      </Link>
                    </p>
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
export default Regis;
