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
                <i className="fa fa-envelope"></i>
                <span>Your Mail Sent Successfully!</span>
              </h1>
              <p>
                Aenean eget sollicitudin lorem, et pretium felis. Nullam euismod
                diam libero, sed dapibus leo laoreet ut. Suspendisse potenti.
                Phasellus urna lacus
              </p>
              <a href="#" className="btn btn-primary btn-lg">
                Go Home
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
