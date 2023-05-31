import image from "../../assest/image/image.png";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Cart() {
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

  const formatNumber = (number) => {
    return number.toLocaleString("vi-VN");
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
                        <span className="icon_close"></span>
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
            <div className="cart__btn">
              <Link to="#">Continue Shopping</Link>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6">
            <div className="cart__btn update__btn">
              <Link to="#">
                <span className="icon_loading"></span> Update cart
              </Link>
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
  );
}

export default Cart;
