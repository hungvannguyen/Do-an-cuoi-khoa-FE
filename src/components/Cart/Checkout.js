import axios from "axios";
import { useState } from "react";
function Checkout() {
  const [city, setCity] = useState([]);

  const cityList = axios
    .get("http://127.0.0.1:8000/Address/get_all_city_address_city_all_get")
    .then((res) => {
      setCity(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
  console.log(city);
  return (
    <section className="checkout spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <h6 className="coupon__link">
              <span className="icon_tag_alt"></span>{" "}
              <a href="#">Have a coupon?</a> Click here to enter your code.
            </h6>
          </div>
        </div>
        <form action="#" className="checkout__form">
          <div className="row">
            <div className="col-lg-8">
              <h5>Billing detail</h5>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="checkout__form__input">
                    <p>
                      Tên người nhận <span>*</span>
                    </p>
                    <input type="text" />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="checkout__form__input">
                    <p>
                      Số điện thoại <span>*</span>
                    </p>
                    <input type="text" />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="checkout__form__input">
                    <p>
                      Country <span>*</span>
                    </p>
                    <input type="text" />
                  </div>
                  <div className="checkout__form__input">
                    <p>
                      Email <span>*</span>
                    </p>
                    <input type="text" placeholder="Email" />
                  </div>

                  <div className="row ">
                    <div className="checkout__form__input col-lg-6 col-md-6 col-sm-6">
                      <p>
                        Địa chỉ <span>*</span>
                      </p>
                      <input type="text" />
                    </div>
                    <div className="checkout__form__input col-lg-6 col-md-6 col-sm-6">
                      <p>
                        Thành phố <span>*</span>
                      </p>
                      <select>
                        <option value="">-- Chọn thành phố --</option>
                        <option value="city1">Thành phố 1</option>
                        <option value="city2">Thành phố 2</option>
                        <option value="city3">Thành phố 3</option>
                      </select>
                    </div>
                    <div className="checkout__form__input col-lg-6 col-md-6 col-sm-6">
                      <p>
                        Quận/Huyện <span>*</span>
                      </p>
                      <select>
                        <option value="">-- Chọn quận/huyện --</option>
                        <option value="district1">Quận/Huyện 1</option>
                        <option value="district2">Quận/Huyện 2</option>
                        <option value="district3">Quận/Huyện 3</option>
                      </select>
                    </div>
                    <div className="checkout__form__input col-lg-6 col-md-6 col-sm-6">
                      <p>
                        Phường/Xã <span>*</span>
                      </p>
                      <select>
                        <option value="">-- Chọn phường/xã --</option>
                        <option value="ward1">Phường/Xã 1</option>
                        <option value="ward2">Phường/Xã 2</option>
                        <option value="ward3">Phường/Xã 3</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="checkout__form__input">
                    <p>
                      Phone <span>*</span>
                    </p>
                    <input type="text" />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="checkout__form__input">
                    <p>
                      Email <span>*</span>
                    </p>
                    <input type="text" />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="checkout__form__checkbox">
                    <label htmlFor="acc">
                      Create an account?
                      <input type="checkbox" id="acc" />
                      <span className="checkmark"></span>
                    </label>
                    <p>
                      Create an account by entering the information below. If
                      you are a returning customer, login at the top of the
                      page.
                    </p>
                  </div>
                  <div className="checkout__form__input">
                    <p>
                      Account Password <span>*</span>
                    </p>
                    <input type="text" />
                  </div>
                  <div className="checkout__form__checkbox">
                    <label htmlFor="note">
                      Note about your order, e.g, special note for delivery
                      <input type="checkbox" id="note" />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <div className="checkout__form__input">
                    <p>
                      Order notes <span>*</span>
                    </p>
                    <input
                      type="text"
                      placeholder="Note about your order, e.g, special note for delivery"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="checkout__order">
                <h5>Your order</h5>
                <div className="checkout__order__product">
                  <ul>
                    <li>
                      <span className="top__text">Product</span>
                      <span className="top__text__right">Total</span>
                    </li>
                    <li>
                      01. Chain buck bag <span>$ 300.0</span>
                    </li>
                    <li>
                      02. Zip-pockets pebbled tote briefcase{" "}
                      <span>$ 170.0</span>
                    </li>
                    <li>
                      03. Black jean <span>$ 170.0</span>
                    </li>
                    <li>
                      04. Cotton shirt <span>$ 110.0</span>
                    </li>
                  </ul>
                </div>
                <div className="checkout__order__total">
                  <ul>
                    <li>
                      Subtotal <span>$ 750.0</span>
                    </li>
                    <li>
                      Total <span>$ 750.0</span>
                    </li>
                  </ul>
                </div>
                <div className="checkout__order__widget">
                  <label htmlFor="o-acc">
                    Create an account?
                    <input type="checkbox" id="o-acc" />
                    <span className="checkmark"></span>
                  </label>
                  <p>
                    Create an account by entering the information below. If you
                    are a returning customer, login at the top of the page.
                  </p>
                  <label htmlFor="check-payment">
                    Cheque payment
                    <input type="checkbox" id="check-payment" />
                    <span className="checkmark"></span>
                  </label>
                  <label htmlFor="paypal">
                    PayPal
                    <input type="checkbox" id="paypal" />
                    <span className="checkmark"></span>
                  </label>
                </div>
                <button type="submit" className="site-btn">
                  Place order
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Checkout;
