import style from "./Footer.module.css";
import ChatBot from "../../../components/ChatBot/ChatBot";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Footer() {
  const [intro, setIntro] = useState([]);
  const [logo, setLogo] = useState([]);
  // call API get logo
  useEffect(() => {
    axios
      .get("/file/img/DHS_Logo_main_1.png", { responseType: "blob" })
      .then((response) => {
        setLogo((logo) => [...logo, URL.createObjectURL(response.data)]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // call API get intro
  useEffect(() => {
    axios
      .get("/setting/all")
      .then((response) => {
        setIntro(response.data.intro_text_footer);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <ChatBot />
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-7">
              <div className="footer__about">
                <div className="footer__logo">
                  <Link to="/">
                    <img src={logo} alt="" style={{ width: 120, height: 31 }} />
                  </Link>
                </div>
                <p>{intro}</p>
                {/* <div className="footer__payment">
                  <a href="#">
                    <img src="img/payment/payment-1.png" alt="" />
                  </a>
                  <a href="#">
                    <img src="img/payment/payment-2.png" alt="" />
                  </a>
                  <a href="#">
                    <img src="img/payment/payment-3.png" alt="" />
                  </a>
                  <a href="#">
                    <img src="img/payment/payment-4.png" alt="" />
                  </a>
                  <a href="#">
                    <img src="img/payment/payment-5.png" alt="" />
                  </a>
                </div> */}
              </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-5">
              {/* <div className="footer__widget">
                <h6>Quick links</h6>
                <ul>
                  <li>
                    <a href="#">About</a>
                  </li>
                  <li>
                    <a href="#">Blogs</a>
                  </li>
                  <li>
                    <a href="#">Contact</a>
                  </li>
                  <li>
                    <a href="#">FAQ</a>
                  </li>
                </ul>
              </div> */}
            </div>
            <div className="col-lg-2 col-md-3 col-sm-4">
              <div className="footer__widget">
                <h6>Tài khoản</h6>
                <ul>
                  <li>
                    <a href="/profile">Hồ sơ</a>
                  </li>
                  <li>
                    <a href="/order/tracking">Đơn mua</a>
                  </li>
                  <li>
                    <a href="/cart">Giỏ hàng</a>
                  </li>
                  {/* <li>
                    <a href="#">Wishlist</a>
                  </li> */}
                </ul>
              </div>
            </div>
            {/* <div className="col-lg-4 col-md-8 col-sm-8">
              <div className="footer__newslatter">
                <h6>NEWSLETTER</h6>
                <form action="#">
                  <input type="text" placeholder="Email" />
                  <button type="submit" className="site-btn">
                    Subscribe
                  </button>
                </form>
                <div className="footer__social">
                  <a href="#">
                    <i className="fa fa-facebook"></i>
                  </a>
                  <a href="#">
                    <i className="fa fa-twitter"></i>
                  </a>
                  <a href="#">
                    <i className="fa fa-youtube-play"></i>
                  </a>
                  <a href="#">
                    <i className="fa fa-instagram"></i>
                  </a>
                  <a href="#">
                    <i className="fa fa-pinterest"></i>
                  </a>
                </div>
              </div>
            </div> */}
          </div>
          {/* <div className="row">
            <div className="col-lg-12">
         
              <div className="footer__copyright__text">
                <p>
                  Copyright &copy;{" "}
                  <script>document.write(new Date().getFullYear());</script> All
                  rights reserved | This template is made with{" "}
                  <i className="fa fa-heart" aria-hidden="true"></i> by{" "}
                  <a
                    href="https://colorlib.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Colorlib
                  </a>
                </p>
              </div>
     
            </div>
          </div> */}
        </div>
      </footer>
    </>
  );
}
export default Footer;
