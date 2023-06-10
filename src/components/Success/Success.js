import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Success() {
  const navigate = useNavigate();
  const [time, setTime] = useState(3);

  useEffect(() => {
    let secondsToGo = 3;
    const timer = setInterval(() => {
      secondsToGo -= 1;
      setTime(secondsToGo);
      if (secondsToGo === 0) {
        clearInterval(timer);
        navigate("/");
      }
    }, 3000);
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
                Cảm ơn bạn đã đặt hàng tại <b>Shop</b>. Chúng tôi sẽ giao hàng
                đến cho bạn trong thời gian sớm nhất.
              </p>
              <a href="#" className="btn btn-primary btn-lg">
                Về trang chủ
              </a>
              <div className="timer">
                <p>Redirecting in {time} seconds</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Success;
