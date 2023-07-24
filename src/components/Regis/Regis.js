import Loading from "../Loading/Loading";
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

  const [usernameError, setUsernameError] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

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
        toast.success("Đăng ký thành công", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setLoading(true);
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        axios
          .post("/mail/confirm_email", {
            mail_to: email,
          })
          .then((response) => {
            navigate("/confirm");
            console.log("Gửi mail thành công");
          })
          .catch((error) => {
            setLoading(false);
            toast.error("Gửi mail thất bại", {
              position: "bottom-right",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });

            console.log("Gửi mail thất bại");
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
                      <p className="small fw-bold mt-2 pt-1 mb-0">
                        Đã có tài khoản?{" "}
                        <Link to="/login" className="link-danger">
                          Đăng nhập
                        </Link>
                      </p>
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
export default Regis;
