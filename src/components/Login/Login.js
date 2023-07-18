import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
function Login() {
  // useNavigate
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useState for Login
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
    setUsername(username);
    setPassword(password);

    axios
      .post("/user/login", {
        account: username,
        password: password,
      })
      .then((response) => {
        sessionStorage.setItem("token", response.data.token);
        if (response.data.role_id === 1 || response.data.role_id === 10) {
          const token = sessionStorage.getItem("token");
          const url = `http://localhost:5000/login?token=${token}&role_id=${response.data.role_id}`;
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
        console.log(error);
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

              <div className="d-flex justify-content-between align-items-center">
                {/* Checkbox */}
                <div className="form-check mb-0"></div>
                <Link to="/reset" className="text-body">
                  Quên mật khẩu?
                </Link>
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
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
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
