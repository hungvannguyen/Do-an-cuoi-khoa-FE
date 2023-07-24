import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
function Success() {
  const navigate = useNavigate();
  const [time, setTime] = useState(3);

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
    <section className="mail-seccess section">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 offset-lg-3 col-12">
            <div className="success-inner">
              <h1>
                <i class="fa-solid fa-truck-fast"></i>
                <span>Đặt hàng thành công!</span>
              </h1>
              <p>
                Cảm ơn bạn đã đặt hàng tại <b>DhsGundam</b>. Chúng tôi sẽ giao
                hàng đến cho bạn trong thời gian sớm nhất.
              </p>
              <Link to="/" className="btn btn-primary btn-lg">
                Về trang chủ
              </Link>
              {/* <div className="timer">
                <p>Redirecting in {time} seconds</p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Success;
