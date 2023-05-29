import axios from "axios";
import { useState, useEffect } from "react";

function Checkout() {
  const [city, setCity] = useState([]);
  const [district, setDistrict] = useState([]);
  const [ward, setWard] = useState([]);
  const [selectedCityId, setSelectedCityId] = useState("");
  const [selectedDistrictId, setSelectedDistrictId] = useState("");
  useEffect(() => {
    const cityList = axios
      .get("/address/city/all", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      })
      .then((res) => {
        setCity(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleCityChange = async (event) => {
    const selectedCityId = event.target.value;
    try {
      const response = await axios.get(`/address/district/${selectedCityId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      console.log(response.data);
      setDistrict(response.data);
      setSelectedCityId(selectedCityId);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(selectedCityId);

  const handleDistrictChange = async (event) => {
    const selectedDistrictId = event.target.value;
    setSelectedCityId(selectedCityId);

    try {
      const response = await axios.get(
        `/address/ward/${selectedCityId}/${selectedDistrictId}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      setWard(response.data);
    } catch (error) {
      console.log(error);
    }
  };

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
                      <select onChange={handleCityChange}>
                        <option value="">-- Chọn thành phố --</option>
                        {city.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="checkout__form__input col-lg-6 col-md-6 col-sm-6">
                      <p>
                        Quận/Huyện <span>*</span>
                      </p>
                      <select onChange={handleDistrictChange}>
                        <option value="">-- Chọn quận/huyện --</option>
                        {district.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                        ...
                      </select>
                    </div>
                    <div className="checkout__form__input col-lg-6 col-md-6 col-sm-6">
                      <p>
                        Phường/Xã <span>*</span>
                      </p>
                      <select>
                        <option value="">-- Chọn phường/xã --</option>
                        {ward.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
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
