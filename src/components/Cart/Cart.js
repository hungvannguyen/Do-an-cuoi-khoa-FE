import image from "../../assest/image/image.png";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Cart() {
  const navigate = useNavigate();
  const imageUrl = image;
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

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
        console.log(response.data);
        console.log(response.data.total_price);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(cart.length);
  const formatNumber = (number) => {
    return number.toLocaleString("vi-VN");
  };

  const handleDeleteCartItem = (prd_id) => {
    axios
      .delete("/cart/delete/" + prd_id, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response.data);
        window.location.reload();
      })
      .catch((error) => {
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
        console.log(response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const formatPrice = (price, salePrice, isSale) => {
    if (
      Array.isArray(price) &&
      Array.isArray(salePrice) &&
      Array.isArray(isSale) &&
      price.length === salePrice.length &&
      price.length === isSale.length
    ) {
      const formattedPrices = [];

      for (let i = 0; i < price.length; i++) {
        const currentPrice = price[i];
        const currentSalePrice = salePrice[i];
        const currentIsSale = isSale[i];

        if (
          typeof currentPrice !== "undefined" &&
          currentPrice !== null &&
          typeof currentPrice.toLocaleString === "function"
        ) {
          const formattedPrice = currentPrice.toLocaleString("vi-VN");

          if (currentIsSale === 1) {
            const formattedSalePrice = currentSalePrice.toLocaleString("vi-VN");
            const originalPrice = `<span>${formattedPrice} đ</span>`;
            formattedPrices.push(` ${formattedSalePrice} đ ${originalPrice} `);
          } else {
            formattedPrices.push(`${formattedPrice} đ`);
          }
        } else {
          formattedPrices.push("");
        }
      }

      return formattedPrices;
    } else {
      return [];
    }
  };

  const isSale = cart.map((product) => product.is_sale);
  const price = cart.map((product) => product.price);
  const salePrice = cart.map((product) =>
    product.is_sale === 1 ? product.sale_price : null
  );

  const formattedPrices = formatPrice(price, salePrice, isSale);

  const priceContainers = document.querySelectorAll(".cart__price");
  priceContainers.forEach((container, index) => {
    if (formattedPrices[index]) {
      if (isSale[index] === 1) {
        container.innerHTML = formattedPrices[index];
      } else {
        container.textContent = formattedPrices[index];
      }
    }
  });

  return (
    <div>
      {cart.length != 0 ? (
        <section className="shop-cart spad">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="shop__cart__table">
                  <table>
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item) => (
                        <tr>
                          <td className="cart__product__item">
                            <img src={imageUrl} alt="" width="90" />
                            <div className="cart__product__item__title">
                              <h6>{item.name}</h6>
                            </div>
                          </td>
                          <td className="cart__price"></td>
                          <td className="cart__quantity">
                            <div className="pro-qty">
                              <input type="text" value={item.quantity} />
                            </div>
                          </td>
                          <td className="cart__total">$ 300.0</td>
                          <td className="cart__close">
                            <span
                              className="icon_close"
                              onClick={() => handleDeleteCartItem(item.prd_id)}
                            ></span>
                          </td>
                        </tr>
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
                <div className="discount__content">
                  <h6>Discount codes</h6>
                  <form action="#">
                    <input type="text" placeholder="Enter your coupon code" />
                    <button type="submit" className="site-btn">
                      Apply
                    </button>
                  </form>
                </div>
              </div>
              <div className="col-lg-4 offset-lg-2">
                <div className="cart__total__procced">
                  <h6>Cart total</h6>
                  <ul>
                    {/* <li>
                  Subtotal <span>$ 750.0</span>
                </li> */}
                    <li>
                      Total <span>{formatNumber(totalPrice)} đ</span>
                    </li>
                  </ul>
                  <Link to="/checkout" className="primary-btn">
                    Proceed to checkout
                  </Link>
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
    </div>
  );
}

export default Cart;
