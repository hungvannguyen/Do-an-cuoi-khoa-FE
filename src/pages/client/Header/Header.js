import "../Styles/css/font-awesome.min.css";
import "../Styles/css/elegant-icons.css";
import "../Styles/css/magnific-popup.css";
import "../Styles/css/slicknav.min.css";
import "../Styles/css/style.css";
import Search from "../../../components/Search/Search";
import { Link } from "react-router-dom";
import { useState } from "react";

function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [active, setActive] = useState(0);
  const handleMenuClick = (index) => {
    setActive(index);
  };
  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
  };
  return (
    <div>
      <div className="offcanvas-menu-overlay"></div>
      <div className="offcanvas-menu-wrapper">
        <div className="offcanvas__close">+</div>
        <ul className="offcanvas__widget">
          <li>
            <span className="icon_search search-switch"></span>
          </li>
          <li>
            <Link to="#">
              <span className="icon_heart_alt"></span>
              <div className="tip">2</div>
            </Link>
          </li>
          <li>
            <Link to="#">
              <span className="icon_bag_alt"></span>
              <div className="tip">2</div>
            </Link>
          </li>
        </ul>
        <div className="offcanvas__logo">
          <Link to="./index.html">
            <img src="img/logo.png" alt="" />
          </Link>
        </div>
        <div id="mobile-menu-wrap"></div>
        <div className="offcanvas__auth">
          <Link to="#">Đăng nhập</Link>
          <Link to="#">Đăng ký</Link>
        </div>
      </div>

      <header className="header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-3 col-lg-3">
              <div className="header__logo">
                <Link to="./index.html">
                  <img src="img/logo.png" alt="" />
                </Link>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 d-flex justify-content-center">
              <nav className="header__menu">
                <ul>
                  <li className={active === 0 ? "active" : ""}>
                    <Link to="/" onClick={() => handleMenuClick(0)}>
                      Trang chủ
                    </Link>
                  </li>
                  <li className={active === 1 ? "active" : ""}>
                    <Link to="#" onClick={() => handleMenuClick(1)}>
                      Women
                    </Link>
                  </li>
                  <li className={active === 2 ? "active" : ""}>
                    <Link to="#" onClick={() => handleMenuClick(2)}>
                      Men’s
                    </Link>
                  </li>
                  <li className={active === 3 ? "active" : ""}>
                    <Link to="./shop.html" onClick={() => handleMenuClick(3)}>
                      Shop
                    </Link>
                  </li>
                  <li className={active === 4 ? "active" : ""}>
                    <Link to="/products" onClick={() => handleMenuClick(4)}>
                      Gundam
                    </Link>
                    <ul className="dropdown">
                      <li>
                        <Link to="./product-details.html">HG</Link>
                      </li>
                      <li>
                        <Link to="./shop-cart.html">Shop Cart</Link>
                      </li>
                      <li>
                        <Link to="./checkout.html">Checkout</Link>
                      </li>
                      <li>
                        <Link to="./blog-details.html">Blog Details</Link>
                      </li>
                    </ul>
                  </li>
                  <li className={active === 5 ? "active" : ""}>
                    <Link to="./blog.html" onClick={() => handleMenuClick(5)}>
                      Blog
                    </Link>
                  </li>
                  <li className={active === 6 ? "active" : ""}>
                    <Link
                      to="./contact.html"
                      onClick={() => handleMenuClick(6)}
                    >
                      Liên hệ
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="col-lg-3">
              <div className="header__right">
                <div className="header__right__auth">
                  <Link to="#">Đăng nhập</Link>
                  <Link to="#">Đăng ký</Link>
                </div>
                <ul className="header__right__widget">
                  <li>
                    <span
                      className="icon_search search-switch"
                      onClick={handleSearchToggle}
                    ></span>
                  </li>
                  <li>
                    <Link to="#">
                      <span className="icon_heart_alt"></span>
                      <div className="tip">2</div>
                    </Link>
                  </li>
                  <li>
                    <Link to="/cart">
                      <span className="icon_bag_alt"></span>
                      <div className="tip">2</div>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="canvas__open">
            <i className="fa fa-bars"></i>
          </div>
        </div>
      </header>
      {isSearchOpen && <Search onClose={handleSearchClose} />}
    </div>
  );
}

export default Header;
