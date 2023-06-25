import "../Styles/css/font-awesome.min.css";
import "../Styles/css/elegant-icons.css";
import "../Styles/css/magnific-popup.css";
import "../Styles/css/slicknav.min.css";
import "../Styles/css/style.css";
import Search from "../../../components/Search/Search";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const message = searchParams.get("message");
  const [categories, setCategories] = useState([]);
  const [countCart, setCountCart] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [active, setActive] = useState(0);
  let hasSessionData = sessionStorage.getItem("token") !== null;

  useEffect(() => {
    axios
      .get("/category/all")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      axios
        .get("/cart/count", {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setCountCart(response.data);
          console.log("Cart" + response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [navigate]);

  console.log(hasSessionData);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setCountCart(0);
    hasSessionData = false;
    navigate("/");
  };

  useEffect(() => {}, [hasSessionData]);

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
      <div className="offcanvas-menu-overlay "></div>
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

                  <li className={active === 4 ? "active" : ""}>
                    <Link to="/products" onClick={() => handleMenuClick(4)}>
                      Gundam
                    </Link>
                    <ul className="dropdown">
                      {categories.map((category) => (
                        <li>
                          <Link
                            to={`/products?status=catFilter&cat_id=${category.id}`}
                          >
                            {category.cat_name}
                          </Link>
                        </li>
                      ))}
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
                {hasSessionData ? (
                  // <ul className="header__right__widget">
                  //   <li>
                  //     <span
                  //       className="fa fa-power-off"
                  //       onClick={handleLogout}
                  //     ></span>
                  //   </li>
                  //   <li>
                  //     <Link to="#">
                  //       <span className="fa fa-truck"></span>
                  //     </Link>
                  //   </li>
                  //   <li>
                  //     <Link to="#">
                  //       <span className="fa-solid fa-user"></span>
                  //     </Link>
                  //   </li>
                  // </ul>
                  <div
                    class="dropdown header__right__widget"
                    style={{ marginRight: 10 }}
                  >
                    <a
                      className="dropdown-toggle fa-solid fa-user"
                      href="#"
                      role="button"
                      id="dropdownMenuLink"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={{ color: "black" }}
                    ></a>

                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuLink"
                    >
                      <li>
                        <Link className="dropdown-item" to="/profile">
                          Hồ sơ
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/order/tracking">
                          Đơn mua
                        </Link>
                      </li>
                      <li className="d-flex justify-co">
                        <span className="dropdown-item" onClick={handleLogout}>
                          Đăng xuất <i className="fa fa-power-off"> </i>
                        </span>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <div className="header__right__auth">
                    <Link to="/login">Đăng nhập</Link>
                    <Link to="/regis">Đăng ký</Link>
                  </div>
                )}
                <ul
                  className="header__right__widget"
                  style={{ marginLeft: 10 }}
                >
                  <li>
                    <span
                      className="fa-solid fa-magnifying-glass"
                      onClick={handleSearchToggle}
                    ></span>
                  </li>

                  <li>
                    <Link to="/cart">
                      <span className="fa-solid fa-cart-shopping"></span>
                      <div className="tip">{countCart}</div>
                    </Link>
                  </li>
                  <li></li>
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
