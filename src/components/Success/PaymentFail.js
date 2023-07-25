import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function PaymentFail() {
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
    <div
      className="animation-ctn-fail mt-4"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div className="icon icon--order-fail svg">
        <svg xmlns="http://www.w3.org/2000/svg" width="154px" height="154px">
          <circle cx="77" cy="77" r="72" fill="#FF0000" />
          <g fill="none" stroke="#FFFFFF" strokeWidth="10">
            <path d="M43.5,43.5L110.5,110.5" />
            <path d="M43.5,110.5L110.5,43.5" />
          </g>
        </svg>
      </div>
      <br />
      <h2>Thanh toán thất bại</h2>
      <Link to="/" className="btn btn-primary btn-lg mt-5">
        Về trang chủ
      </Link>
    </div>
  );
}

export default PaymentFail;
