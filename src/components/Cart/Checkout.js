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

  // console.log(userInfo);
  // console.log(name);
  // console.log(phone);
  // console.log(email);
  // console.log(addressDetail);
  // console.log(selectedCityId);
  // console.log(selectedDistrictId);
  // console.log(selectedWardId);

  useEffect(() => {
    axios
      .get("/checkout/user_info", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setUserInfo(res.data);
        if (res.data.city_id) {
          setSelectedCityId(res.data.city_id);
          setSelectedDistrictId(res.data.district_id);
          setSelectedWardId(res.data.ward_id);
          setName(res.data.name);
          setPhone(res.data.phone_number);
          setEmail(res.data.email);
          setAddressDetail(res.data.detail);
          setLoading(false);
        }
        setLoading(false);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
      .then((res) => {
        setCheckoutProduct(res.data.products);
        setTotal(res.data.total);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const cityList = axios
      .get("/address/city/all", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setCity(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/payment/type/all")
      .then((res) => {
        setPayment(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleCityChange = async (event) => {
    const selectedCityId = event.target.value;
    setSelectedCityId(selectedCityId);
    try {
      const response = await axios.get(`/address/district/${selectedCityId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      console.log(response.data);
      setDistrict(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDistrictChange = async (event) => {
    const selectedDistrictId = event.target.value;
    setSelectedDistrictId(selectedDistrictId);

    try {
      const response = await axios.get(
        `/address/ward/${selectedCityId}/${selectedDistrictId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(response.data);
      setWard(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleWardChange = (event) => {
    const selectedWardId = event.target.value;
    setSelectedWardId(selectedWardId);
  };

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

  const address =
    addressDetail +
    ", " +
    selectedWardId +
    ", " +
    selectedDistrictId +
    ", " +
    selectedCityId;
  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!name) {
      setNameError("Vui lòng nhập tên người nhận");
    }

    if (!phone) {
      setPhoneError("Vui lòng nhập số điện thoại");
    } else if (phone.length !== 10) {
      setPhoneError("Số điện thoại phải có 10 kí tự");
    } else if (!/^\d+$/.test(phone)) {
      setPhoneError("Số điện thoại không hợp lệ");
    }

    if (!email) {
      setEmailError("Vui lòng nhập email");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Email không hợp lệ");
    }

    if (!addressDetail) {
      setAddressDetailError("Vui lòng nhập địa chỉ");
    }

    if (!selectedCityId) {
      setSelectedCityIdError("Vui lòng chọn thành phố");
    }

    if (!selectedDistrictId) {
      setSelectedDistrictIdError("Vui lòng chọn quận/huyện");
    }

    if (!selectedWardId) {
      setSelectedWardIdError("Vui lòng chọn phường/xã");
    }

    if (!selectedPaymentId) {
      setSelectedPaymentIdError("Vui lòng chọn phương thức thanh toán");
    }

    axios
      .post(
        "/order/add",
        {
          payment_type_id: selectedPaymentId,
          name: name,
          phone_number: phone,
          email: email,
          address: address,
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
                          <input
                            type="text"
                            value={email}
                            onChange={handleEmailChange}
                          />

                          {emailError && (
                            <div className="alert alert-danger" role="alert">
                              {emailError}
                            </div>
                          )}
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
                            <select onChange={handleCityChange}>
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
                            <select onChange={handleDistrictChange}>
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
                            <select onChange={handleWardChange}>
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
                            Subtotal <span>$ 750.0</span>
                          </li>
                          <li>
                            Total <span>{formatNumber(total)} đ </span>
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
                        Place order
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
