import Countdown from "../CountDown/CountDown";
import { Link } from "react-router-dom";

function DiscountSection() {
  const targetDate = new Date("2023-08-07T00:00:00");
  return (
    <section className="discount">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 p-0">
            <div className="discount__pic">
              <img src="img/discount.jpg" alt="" />
            </div>
          </div>
          <div className="col-lg-6 p-0">
            <div className="discount__text">
              <div className="discount__text__title">
                <span>Discount</span>
                <h2>Summer 2019</h2>
                <h5>
                  <span>Sale</span> 50%
                </h5>
              </div>
              <div className="discount__countdown" id="countdown-time">
                <Countdown targetDate={targetDate} />
                {/* <div className="countdown__item">
                  <span>22</span>
                  <p>Days</p> 
                </div>
                <div className="countdown__item">
                  <span>18</span>
                  <p>Hour</p>
                </div>
                <div className="countdown__item">
                  <span>46</span>
                  <p>Min</p>
                </div>
                <div className="countdown__item">
                  <span>05</span>
                  <p>Sec</p>
                </div> */}
              </div>
              <Link to="/products?status=sale">Shop now</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DiscountSection;
