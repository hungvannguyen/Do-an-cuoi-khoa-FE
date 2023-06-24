import Loading from "../Loading/Loading";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const token = sessionStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // user info
  const [userInfo, setUserInfo] = useState([]);

  const [total, setTotal] = useState(0);

  // Address
  const [city, setCity] = useState([]);
  const [district, setDistrict] = useState([]);
  const [ward, setWard] = useState([]);

  // Address ID
  const [selectedCityId, setSelectedCityId] = useState("");
  const [selectedDistrictId, setSelectedDistrictId] = useState("");
  const [selectedWardId, setSelectedWardId] = useState("");
  const [checkoutProduct, setCheckoutProduct] = useState([]);

  // Payment
  const [payment, setPayment] = useState([]);
  const [selectedPaymentId, setSelectedPaymentId] = useState("");

  // Note
  const [note, setNote] = useState("");

  // Use info Validate

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [addressDetail, setAddressDetail] = useState("");

  // Set error
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [addressDetailError, setAddressDetailError] = useState("");
  const [selectedCityIdError, setSelectedCityIdError] = useState("");
  const [selectedDistrictIdError, setSelectedDistrictIdError] = useState("");
  const [selectedWardIdError, setSelectedWardIdError] = useState("");
  const [selectedPaymentIdError, setSelectedPaymentIdError] = useState("");

  const [cityName, setCityName] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [wardName, setWardName] = useState("");

  const [shippingFee, setShippingFee] = useState(30000);

  useEffect(() => {
    axios
      .get("/checkout/user_info", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setUserInfo(response.data);
        setSelectedCityId(response.data.city_id);
        setSelectedDistrictId(response.data.district_id);
        setSelectedWardId(response.data.ward_id);
        setName(response.data.name);
        setPhone(response.data.phone_number);
        setEmail(response.data.email);
        setAddressDetail(response.data.detail);
        if (response.data.city_id === 1) {
          console.log("ok");
          setShippingFee("");
        }
        setLoading(false);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/address/city/all", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setCity(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (selectedCityId === 1 || selectedCityId === "1") {
      setShippingFee("");
    } else {
      setShippingFee(30000);
    }
  }, [selectedCityId]);

  useEffect(() => {
    axios
      .get(`/address/district/${selectedCityId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setDistrict(res.data);

        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selectedCityId]);

  useEffect(() => {
    console.log(selectedDistrictId);

    axios
      .get(`/address/ward/${selectedCityId}/${selectedDistrictId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setWard(res.data);

        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selectedDistrictId]);

  useEffect(() => {
    axios
      .get("/checkout/products", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setCheckoutProduct(response.data.products);
        setTotal(response.data.total);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/payment/type/all")
      .then((response) => {
        setPayment(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handlePaymentChange = (id) => {
    setSelectedPaymentId(id);
  };

  const formatNumber = (number) => {
    return number.toLocaleString("vi-VN");
  };

  // Info change

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleAddressDetailChange = (event) => {
    setAddressDetail(event.target.value);
  };

  // Place order validate
  useEffect(() => {
    const selectedCity = city.find((item) => item.id === selectedCityId);
    if (selectedCity) {
      setCityName(selectedCity.name);
    }
  }, [selectedCityId, city]);

  useEffect(() => {
    const selectedDistrict = district.find(
      (item) => item.id === selectedDistrictId
    );
    if (selectedDistrict) {
      setDistrictName(selectedDistrict.name);
    }
  }, [selectedDistrictId, district]);

  useEffect(() => {
    const selectedWard = ward.find((item) => item.id === selectedWardId);
    if (selectedWard) {
      setWardName(selectedWard.name);
    }
  }, [selectedWardId, ward]);

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    console.log("Address");
    console.log(cityName);
    console.log(districtName);
    console.log(wardName);

    const address =
      addressDetail + ", " + cityName + ", " + districtName + ", " + wardName;
    console.log(address);
    console.log(selectedPaymentId);
    if (!name) {
      setNameError("Vui lòng nhập tên người nhận");
    } else {
      setNameError("");
    }

    if (!phone) {
      setPhoneError("Vui lòng nhập số điện thoại");
    } else if (phone.length !== 10) {
      setPhoneError("Số điện thoại phải có 10 kí tự");
    } else if (!/^\d+$/.test(phone)) {
      setPhoneError("Số điện thoại không hợp lệ");
    } else {
      setPhoneError("");
    }

    if (!addressDetail) {
      setAddressDetailError("Vui lòng nhập địa chỉ");
    } else {
      setAddressDetailError("");
    }

    if (!selectedCityId) {
      setSelectedCityIdError("Vui lòng chọn thành phố");
    } else {
      setSelectedCityIdError("");
    }

    if (!selectedDistrictId) {
      setSelectedDistrictIdError("Vui lòng chọn quận/huyện");
    } else {
      setSelectedDistrictIdError("");
    }

    if (!selectedWardId) {
      setSelectedWardIdError("Vui lòng chọn phường/xã");
    } else {
      setSelectedWardIdError("");
    }

    if (!selectedPaymentId) {
      setSelectedPaymentIdError("Vui lòng chọn phương thức thanh toán");
    } else {
      setSelectedPaymentIdError("");
    }
    setLoading(true);
    axios
      .post(
        "/order/add",
        {
          payment_type_id: selectedPaymentId,
          name: name,
          email: email,
          phone_number: phone,
          note: note,
          city_id: selectedCityId,
          district_id: selectedDistrictId,
          ward_id: selectedWardId,
          detail: addressDetail,
          status: 0,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        navigate("/success");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <div>
      <Loading isLoading={loading} />
      {!loading && (
        <>
          <section className="checkout spad">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <h6 className="coupon__link">
                    <span className="icon_tag_alt"></span>{" "}
                    <a href="#">Have a coupon?</a> Click here to enter your
                    code.
                  </h6>
                </div>
              </div>
              <form action="#" className="checkout__form">
                <div className="row">
                  <div className="col-lg-8">
                    <h5>Billing detail</h5>
                    <div className="row">
                      <div
                        className={`col-lg-6 col-md-6 col-sm-6 ${
                          nameError ? "is-invalid" : ""
                        }`}
                      >
                        <div className="checkout__form__input">
                          <p>
                            Tên người nhận <span>*</span>
                          </p>
                          <input
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                          />
                        </div>
                        {nameError && (
                          <div className="alert alert-danger" role="alert">
                            {nameError}
                          </div>
                        )}
                      </div>
                      <div
                        className={`col-lg-6 col-md-6 col-sm-6 ${
                          phoneError ? "is-invalid" : ""
                        }`}
                      >
                        <div className="checkout__form__input">
                          <p>
                            Số điện thoại <span>*</span>
                          </p>
                          <input
                            type="text"
                            value={phone}
                            onChange={handlePhoneChange}
                          />
                          {phoneError && (
                            <div className="alert alert-danger" role="alert">
                              {phoneError}
                            </div>
                          )}
                        </div>
                      </div>

                      <div
                        className={`col-lg-12 ${
                          emailError ? "is-invalid" : ""
                        }`}
                      >
                        <div className="checkout__form__input">
                          <p>
                            Email <span>*</span>
                          </p>
                          <input type="text" value={email} readOnly />
                        </div>

                        <div className="row">
                          <div
                            className={`checkout__form__input col-lg-6 col-md-6 col-sm-6 ${
                              addressDetailError ? "is-invalid" : ""
                            }`}
                          >
                            <p>
                              Địa chỉ <span>*</span>
                            </p>
                            <input
                              type="text"
                              value={addressDetail}
                              onChange={handleAddressDetailChange}
                            />
                            {addressDetailError && (
                              <div className="alert alert-danger" role="alert">
                                {addressDetailError}
                              </div>
                            )}
                          </div>
                          <div
                            className={`checkout__form__input col-lg-6 col-md-6 col-sm-6${
                              selectedCityIdError ? "is-invalid" : ""
                            }`}
                          >
                            <p>
                              Thành phố <span>*</span>
                            </p>
                            <select
                              onChange={(e) => {
                                setSelectedCityId(e.target.value);
                              }}
                            >
                              <option value="">-- Chọn thành phố --</option>
                              {city.map((item) => (
                                <option
                                  key={item.id}
                                  value={item.id}
                                  selected={item.id === selectedCityId}
                                >
                                  {item.name}
                                </option>
                              ))}
                            </select>
                            {selectedCityIdError && (
                              <div className="alert alert-danger" role="alert">
                                {selectedCityIdError}
                              </div>
                            )}
                          </div>
                          <div
                            className={`checkout__form__input col-lg-6 col-md-6 col-sm-6${
                              selectedDistrictIdError ? "is-invalid" : ""
                            }`}
                          >
                            <p>
                              Quận/Huyện <span>*</span>
                            </p>
                            <select
                              onChange={(e) =>
                                setSelectedDistrictId(e.target.value)
                              }
                            >
                              <option value="">-- Chọn quận/huyện --</option>
                              {district.map((item) => (
                                <option
                                  key={item.id}
                                  value={item.id}
                                  selected={item.id === selectedDistrictId}
                                >
                                  {item.name}
                                </option>
                              ))}
                              ...
                            </select>
                            {selectedDistrictIdError && (
                              <div className="alert alert-danger" role="alert">
                                {selectedDistrictIdError}
                              </div>
                            )}
                          </div>
                          <div
                            className={`checkout__form__input col-lg-6 col-md-6 col-sm-6${
                              selectedWardIdError ? "is-invalid" : ""
                            }`}
                          >
                            <p>
                              Phường/Xã <span>*</span>
                            </p>
                            <select
                              onChange={(e) =>
                                setSelectedWardId(e.target.value)
                              }
                            >
                              <option value="">-- Chọn phường/xã --</option>
                              {ward.map((item) => (
                                <option
                                  key={item.id}
                                  value={item.id}
                                  selected={item.id === selectedWardId}
                                >
                                  {item.name}
                                </option>
                              ))}
                            </select>
                            {selectedWardIdError && (
                              <div className="alert alert-danger" role="alert">
                                {selectedWardIdError}
                              </div>
                            )}
                          </div>
                          <div className="checkout__form__input col-lg-12 col-md-12 col-sm-12">
                            <p>
                              Ghi chú <span></span>
                            </p>
                            <textarea
                              placeholder="Ghi chú"
                              value={note}
                              cols="91"
                              onChange={(e) => setNote(e.target.value)}
                            ></textarea>
                          </div>
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
                          {checkoutProduct.map((item) => (
                            <li>
                              01. {item.name} <span>$ 300.0</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="checkout__order__total">
                        <ul>
                          <li>
                            Phí vận chuyển:
                            {shippingFee !== "" ? (
                              <span>{formatNumber(shippingFee)} đ</span>
                            ) : (
                              <span>Miễn phí</span>
                            )}
                          </li>
                          <li>
                            Total{" "}
                            {shippingFee !== "" ? (
                              <span>{formatNumber(shippingFee + total)}đ</span>
                            ) : (
                              <span> {formatNumber(total)} đ</span>
                            )}
                          </li>
                        </ul>
                      </div>
                      <div className="checkout__order__widget">
                        {payment.map((item) => (
                          <label htmlFor={item.id}>
                            {item.name}
                            <input
                              type="checkbox"
                              id={item.id}
                              checked={selectedPaymentId === item.id}
                              onChange={() => handlePaymentChange(item.id)}
                            />
                            <span className="checkmark"></span>
                          </label>
                        ))}
                      </div>
                      {selectedPaymentIdError && (
                        <div className="alert alert-danger" role="alert">
                          {selectedPaymentIdError}
                        </div>
                      )}
                      <button className="site-btn" onClick={handlePlaceOrder}>
                        Đặt hàng
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default Checkout;
