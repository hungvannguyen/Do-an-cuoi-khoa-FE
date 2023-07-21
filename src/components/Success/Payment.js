import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function PaymentSuccess() {
  useEffect(() => {
    window.history.pushState(null, document.title, window.location.href);

    const handlePopState = (event) => {
      window.history.pushState(null, document.title, window.location.href);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);
  return (
    <div className="animation-ctn">
      <div className="icon icon--order-success svg">
        <svg xmlns="http://www.w3.org/2000/svg" width="154px" height="154px">
          <g fill="none" stroke="#22AE73" strokeWidth="2">
            <circle
              cx="77"
              cy="77"
              r="72"
              style={{
                strokeDasharray: "480px, 480px",
                strokeDashoffset: "960px",
              }}
            ></circle>
            <circle
              id="colored"
              fill="#22AE73"
              cx="77"
              cy="77"
              r="72"
              style={{
                strokeDasharray: "480px, 480px",
                strokeDashoffset: "960px",
              }}
            ></circle>
            <polyline
              className="st0"
              stroke="#fff"
              strokeWidth="10"
              points="43.5,77.8 63.7,97.9 112.2,49.4"
              style={{
                strokeDasharray: "100px, 100px",
                strokeDashoffset: "200px",
              }}
            />
          </g>
        </svg>
      </div>
      <br />
      <h2>Thanh toán thành công</h2>
      <Link to="/" className="btn btn-primary btn-lg mt-5">
        Về trang chủ
      </Link>
    </div>
  );
}

export default PaymentSuccess;
