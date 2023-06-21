import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

function Verified() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email");
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(`/user/confirm/${email}`)
      .then((response) => {
        console.log("Email confirmed");
      })
      .catch((error) => {
        console.log("Email not confirmed");
        setError(true);
      });
  }, []);

  return (
    <div
      className="container"
      id="web"
      style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}
    >
      <div className="text-container" style={{ textAlign: "center" }}>
        <h1>
          {error ? (
            <i
              className="fa-solid fa-circle-xmark"
              style={{ color: "#ca1515", paddingRight: 15 }}
            ></i>
          ) : (
            <i
              className="fa fa-check-circle"
              aria-hidden="true"
              style={{ color: "#E6A1C3", paddingRight: 15 }}
            ></i>
          )}

          {error ? "Lỗi xác thực Email" : "Đã xác thực Email"}
        </h1>
        {error ? (
          <p>Có lỗi xảy ra trong quá trình xác thực Email.</p>
        ) : (
          <>
            <p>Chúng tôi đã xác thực Email của bạn.</p>
            <p>Hãy đăng nhập để sử dụng dịch vụ.</p>
            <Link to="/login" className="btn btn-primary">
              Đăng nhập
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
export default Verified;
