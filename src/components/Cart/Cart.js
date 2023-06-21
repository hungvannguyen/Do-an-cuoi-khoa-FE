import image from "../../assest/image/image.png";
import Loading from "../Loading/Loading";
import React from "react";
import { useState, useEffect, useLayoutEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Cart() {
  const navigate = useNavigate();
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const imageUrl = image;
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      navigate("/cart");
    } else {
      navigate("/login");
    }
  }, []);
  useEffect(() => {
    axios
      .get("/cart/all", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      })
      .then((response) => {
        setCart(response.data.products);
        setTotalPrice(response.data.total_price);
        setLoading(false);
        console.log(response.data);
      })
      .catch((error) => {
        if (error.response.status === 409) {
          setLoading(true);
          window.location.reload();
        }
        setLoading(false);
        console.log(error);
      });
  }, []);

  const handleDecreaseQuantity = (prd_id, prevQuantity) => {
    const quantity = prevQuantity - 1;
    axios
      .put(
        "/cart/update",
        { prd_id: prd_id, quantity: quantity },
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        setLoading(false);
        window.location.reload();
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const handleIncreaseQuantity = (prd_id, prevQuantity) => {
    const quantity = prevQuantity + 1;
    axios
      .put(
        "/cart/update",
        { prd_id: prd_id, quantity: quantity },
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        setLoading(false);
        window.location.reload();
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const handleDeleteCartItem = (prd_id) => {
    axios
      .delete("/cart/delete/" + prd_id, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      })
      .then((response) => {
        setLoading(false);
        window.location.reload();
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const handleDeleteAllCart = () => {
    axios
      .delete("/cart/delete/all", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      })
      .then((response) => {
        setLoading(false);
        window.location.reload();
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const handleCheckout = () => {
    axios
      .get("/checkout/check/cart", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      })
      .then((response) => {
        setLoading(false);
        navigate("/checkout");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const formatNumber = (number) => {
    return number.toLocaleString("vi-VN");
  };

  return (
    <div>
      <Loading isLoading={loading} />
      {!loading && (
        <>
          {cart.length !== 0 ? (
            <section className="shop-cart spad">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="shop__cart__table">
                      <table>
                        <thead>
                          <tr>
                            <th>Sản phẩm</th>
                            <th>Giá</th>
                            <th>Số lượng</th>
                            <th>Tổng tiền</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {cart.map((item) => (
                            <React.Fragment key={item.id}>
                              <tr>
                                <td className="cart__product__item">
                                  <img src={imageUrl} alt="" width="90" />
                                  <div className="cart__product__item__title">
                                    <h6>{item.name}</h6>
                                  </div>
                                </td>
                                <td className="cart__price">
                                  {item.is_sale ? (
                                    <>
                                      {formatNumber(item.sale_price)} đ
                                      <span>{formatNumber(item.price)} đ </span>
                                    </>
                                  ) : (
                                    `${formatNumber(item.price)} đ`
                                  )}
                                </td>
                                <td className="cart__quantity">
                                  <div className="pro-qty">
                                    <span
                                      className="dec qtybtn"
                                      onClick={() =>
                                        handleDecreaseQuantity(
                                          item.prd_id,
                                          item.quantity
                                        )
                                      }
                                    >
                                      -
                                    </span>
                                    <input type="text" value={item.quantity} />

                                    <span
                                      className="inc qtybtn"
                                      onClick={() =>
                                        handleIncreaseQuantity(
                                          item.prd_id,
                                          item.quantity
                                        )
                                      }
                                    >
                                      +
                                    </span>
                                  </div>
                                </td>
                                <td className="cart__total">
                                  {formatNumber(item.total_price)} đ
                                </td>
                                <td className="cart__close">
                                  <span
                                    className="icon_close"
                                    onClick={() =>
                                      handleDeleteCartItem(item.prd_id)
                                    }
                                  ></span>
                                </td>
                              </tr>
                            </React.Fragment>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    {/* <div className="cart__btn">
              <Link to="#">Continue Shopping</Link>
            </div> */}
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="cart__btn update__btn">
                      <span onClick={handleDeleteAllCart}>
                        <i className="fa-regular fa-trash-can"></i> Xoá tất cả
                      </span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    {/* <div className="discount__content">
                      <h6>Discount codes</h6>
                      <form action="#">
                        <input
                          type="text"
                          placeholder="Enter your coupon code"
                        />
                        <button type="submit" className="site-btn">
                          Apply
                        </button>
                      </form>
                    </div> */}
                  </div>
                  <div className="col-lg-4 offset-lg-2">
                    <div className="cart__total__procced">
                      <h6>Tổng giỏ hàng</h6>
                      <ul>
                        {/* <li>
                  Subtotal <span>$ 750.0</span>
                </li> */}
                        <li>
                          Tổng Thanh toán
                          <span>{formatNumber(totalPrice)} đ</span>
                        </li>
                      </ul>
                      <span className="primary-btn" onClick={handleCheckout}>
                        Tiến hành đặt hàng
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ) : (
            <div class="row">
              <div class="col-md-12">
                <div class="card" style={{ border: " none " }}>
                  <div class="card-body cart">
                    <div class="col-sm-12 empty-cart-cls text-center">
                      <img
                        src="https://i.imgur.com/dCdflKN.png"
                        width="130"
                        height="130"
                        class="img-fluid mb-4 mr-3"
                      ></img>
                      <h3>
                        <strong>Giỏ hàng trống</strong>
                      </h3>
                      <h4>
                        Hãy thêm gì đó để khiến Sơn vui chụt chụt{" "}
                        <i class="fa-solid fa-heart"></i>{" "}
                        <i class="fa-solid fa-heart"></i>
                      </h4>
                      <Link
                        to="/products"
                        class="btn btn-danger cart-btn-transform m-3"
                        data-abc="true"
                      >
                        Mua hàng ngay
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Cart;
