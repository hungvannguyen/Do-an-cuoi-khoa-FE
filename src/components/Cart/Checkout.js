import Loading from "../Loading/Loading";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Checkout() {
  //  Token
  const token = sessionStorage.getItem("token");
  // Loading
  const [loading, setLoading] = useState(true);
  // useNavigate
  const navigate = useNavigate();
  //  selectedOption
  const [selectedOption, setSelectedOption] = useState("");
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
  const [addressQuantity, setAddressQuantity] = useState(0);
  const [addressId, setAddressId] = useState("");
  const [addressDetail, setAddressDetail] = useState([]);
  const [addressName, setAddressName] = useState("");
  // Set error
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [addressDetailError, setAddressDetailError] = useState("");
  const [selectedCityIdError, setSelectedCityIdError] = useState("");
  const [selectedDistrictIdError, setSelectedDistrictIdError] = useState("");
  const [selectedWardIdError, setSelectedWardIdError] = useState("");
  const [selectedPaymentIdError, setSelectedPaymentIdError] = useState("");
  //  useStates for (city, district, ward)
  const [detail, setDetail] = useState("");
  const [cityName, setCityName] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [wardName, setWardName] = useState("");

  // Display address if user has address
  const [displayName, setDisplayName] = useState("");
  const [displayPhone, setDisplayPhone] = useState("");
  const [displayDetail, setDisplayDetail] = useState("");

  // Temp address
  const [tempName, setTempName] = useState("");
  const [tempPhone, setTempPhone] = useState("");
  const [tempDetail, setTempDetail] = useState("");
  const [tempCityName, setTempCityName] = useState("");
  const [tempDistrictName, setTempDistrictName] = useState("");
  const [tempWardName, setTempWardName] = useState("");
  const [tempAddressId, setTempAddressId] = useState("");

  // Shipping fee
  const [shippingFee, setShippingFee] = useState(30000);
  const selectedProductId = JSON.parse(
    sessionStorage.getItem("selectedProductId")
  );
  const trimmedProduct = selectedProductId.toString().replace(/\s+/g, "");

  // Call API get user info
  useEffect(() => {
    console.log("selectedProductId");
    console.log(typeof selectedProductId);
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get("/checkout/user_info", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setUserInfo(response.data);
        setSelectedCityId(response.data.address.city_id);
        setSelectedDistrictId(response.data.address.district_id);
        setSelectedWardId(response.data.address.ward_id);
        setAddressQuantity(response.data.address.quantity);
        setAddressDetail(response.data.address.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  //  Address default
  useEffect(() => {
    addressDetail.map((item) => {
      if (item.is_default === 1) {
        setSelectedOption(item.id);
        setName(item.name);
        setPhone(item.phone_number);
        setAddressName(item.detail);
        setDisplayName(item.name);
        setDisplayPhone(item.phone_number);
        setDisplayDetail(item.detail);
        setCityName(item.city);
        setDistrictName(item.district);
        setWardName(item.ward);
        setAddressId(item.id);
      }
      if (item.city_id === 1) {
        setShippingFee("");
      }
    });
  }, [addressDetail]);

  // Call API get city
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

  // Call API get district
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

  // Call API get ward

  useEffect(() => {
    axios
      .get(`/address/ward/${selectedCityId}/${selectedDistrictId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setWard(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selectedDistrictId]);

  // Call API get checkout product
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
    let all = 0;
    checkoutProduct.map(
      (item) =>
        selectedProductId.includes(item.prd_id) &&
        (all += item.price * item.quantity)
    );
    setTotal(all);
  }, [selectedProductId]);
  // Call API get payment
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

  // Payment change handle
  const handlePaymentChange = (paymentId) => {
    setSelectedPaymentId(paymentId);
  };
  //  Format number
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
    setAddressName(event.target.value);
  };

  // Address change
  const handleOptionChange = (option) => {
    if (selectedOption === option) {
      setSelectedOption(null);
    } else {
      setSelectedOption(option);
      const selectedAddress = addressDetail.find((item) => item.id === option);

      if (selectedAddress) {
        setTempName(selectedAddress.name);
        setTempPhone(selectedAddress.phone_number);
        setTempDetail(selectedAddress.detail);
        setTempCityName(selectedAddress.city);
        setTempDistrictName(selectedAddress.district);
        setTempWardName(selectedAddress.ward);
        setTempAddressId(selectedAddress.id);
      }
      if (selectedAddress.city_id === 1) {
        setShippingFee("");
      } else {
        setShippingFee(30000);
      }
    }
  };

  // Place order validate

  useEffect(() => {
    const selectedCity = city.find((item) => item.id === selectedCityId);
    if (selectedCity) {
      setCityName(selectedCity.name);
    }
  }, [selectedCityId, city]);

  // Place order validate
  useEffect(() => {
    const selectedDistrict = district.find(
      (item) => item.id === selectedDistrictId
    );
    if (selectedDistrict) {
      setDistrictName(selectedDistrict.name);
    }
  }, [selectedDistrictId, district]);
  // Place order validate
  useEffect(() => {
    const selectedWard = ward.find((item) => item.id === selectedWardId);
    if (selectedWard) {
      setWardName(selectedWard.name);
    }
  }, [selectedWardId, ward]);

  //  Handle default address
  const handleDefaultAddress = () => {
    setSelectedOption(selectedOption);
    setDisplayName(tempName);
    setDisplayPhone(tempPhone);
    setDisplayDetail(tempDetail);
    setName(tempName);
    setPhone(tempPhone);
    setDetail(tempDetail);
    setCityName(tempCityName);
    setDistrictName(tempDistrictName);
    setWardName(tempWardName);
    setAddressId(tempAddressId);
  };

  // Add Address
  const handleAddAddress = (id) => {
    // Validate form before submit
    let hasError = false;

    // Validate name
    if (!name) {
      setNameError("Vui lòng nhập tên người nhận");
      hasError = true;
    } else {
      setNameError("");
    }

    // Validate phone
    if (!phone) {
      setPhoneError("Vui lòng nhập số điện thoại");
      hasError = true;
    } else if (phone.length !== 10) {
      setPhoneError("Số điện thoại phải có 10 kí tự");
      hasError = true;
    } else if (!/^\d+$/.test(phone)) {
      setPhoneError("Số điện thoại không hợp lệ");
      hasError = true;
    } else {
      setPhoneError("");
    }

    // Validate address detail
    if (!addressDetail) {
      setAddressDetailError("Vui lòng nhập địa chỉ");
      hasError = true;
    } else {
      setAddressDetailError("");
    }

    // Validate slelected city
    if (!selectedCityId) {
      setSelectedCityIdError("Vui lòng chọn thành phố");
      hasError = true;
    } else {
      setSelectedCityIdError("");
    }

    // Validate slelected district
    if (!selectedDistrictId) {
      setSelectedDistrictIdError("Vui lòng chọn quận/huyện");
      hasError = true;
    } else {
      setSelectedDistrictIdError("");
    }

    // Validate slelected ward
    if (!selectedWardId) {
      setSelectedWardIdError("Vui lòng chọn phường/xã");
      hasError = true;
    } else {
      setSelectedWardIdError("");
    }
    if (hasError === false) {
      axios
        .post(
          "/address/create",
          {
            name: name,
            phone_number: phone,
            city_id: selectedCityId,
            district_id: selectedDistrictId,
            ward_id: selectedWardId,
            detail: addressName,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          toast.success("Đã thêm mới thành công", {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });

          setTimeout(() => {
            setLoading(true);
            window.location.reload();
          }, 2000);
        })
        .catch((error) => {
          toast.error("Thêm không thành công", {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        });
    }
  };

  //  Place order
  const handlePlaceOrder = (e) => {
    e.preventDefault();

    // Validate form before submit
    let hasError = false;

    // Validate slelected payment
    if (!selectedPaymentId) {
      setSelectedPaymentIdError("Vui lòng chọn phương thức thanh toán");
      hasError = true;
    } else {
      setSelectedPaymentIdError("");
    }

    if (hasError === false) {
      axios
        .post(
          "/order/add",
          {
            payment_type_id: selectedPaymentId,
            email: email,
            note: note,
            address_id: selectedOption,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((response) => {
          if (selectedPaymentId === 2) {
            setLoading(true);
            navigate("/success");
          } else {
            console.log(response.data);
            toast.success(response.data.detail, {
              position: "bottom-right",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            setInterval(() => {
              window.location.href = response.data.vnpay_url;
            }, 2000);
          }
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    }
  };

  return (
    <div>
      <Loading isLoading={loading} />
      {!loading && (
        <>
          <ToastContainer />
          <section className="checkout spad">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <h6 className="coupon__link"></h6>
                </div>
              </div>
              <form action="#" className="checkout__form">
                <div className="row">
                  <div className="col-lg-8">
                    <h5>Thông tin đơn hàng</h5>

                    {addressQuantity > 0 ? (
                      // Display address if user has address
                      <>
                        <h6>
                          <strong className="mb-2">Thông tin giao hàng:</strong>{" "}
                        </h6>
                        <br></br>

                        <div className="d-flex mb-4">
                          <div className="me-5">
                            {displayName} | {displayPhone}
                          </div>
                          {displayDetail} - {cityName} - {districtName} -{" "}
                          {wardName}
                        </div>

                        <div className="mb-4 d-flex ">
                          <button
                            type="button"
                            class="btn btn-primary me-4"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            Thay đổi địa chỉ
                          </button>
                          <div
                            class="modal fade"
                            id="exampleModal"
                            tabindex="-1"
                            aria-labelledby="exampleModalLabel"
                            aria-hidden="true"
                          >
                            <div class="modal-dialog">
                              <div class="modal-content">
                                <div class="modal-header">
                                  <h5
                                    class="modal-title"
                                    id="exampleModalLabel"
                                  >
                                    Danh sách địa chỉ
                                  </h5>
                                  <button
                                    type="button"
                                    class="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  ></button>
                                </div>
                                <div class="modal-body">
                                  {addressDetail.map((addressDetail) => (
                                    <div
                                      className="row mb-4 pb-4"
                                      style={{
                                        borderBottom: "1px solid gray",
                                      }}
                                    >
                                      <div className="col-lg-2">
                                        <input
                                          type="checkbox"
                                          checked={
                                            selectedOption === addressDetail.id
                                          }
                                          onChange={() =>
                                            handleOptionChange(addressDetail.id)
                                          }
                                          id={addressDetail.id}
                                        />
                                      </div>
                                      <div className=" col-lg-6">
                                        <div>
                                          <strong>{addressDetail.name}</strong>{" "}
                                          | {addressDetail.phone_number}
                                        </div>
                                        {addressDetail.detail},{" "}
                                        {addressDetail.city},{" "}
                                        {addressDetail.district},{" "}
                                        {addressDetail.ward}
                                        <br></br>
                                        <br></br>
                                        {addressDetail.is_default === 1 ? (
                                          <span
                                            className=" p-1"
                                            style={{
                                              color: "red",
                                              border: "1px solid red",
                                            }}
                                          >
                                            Địa chỉ mặc định
                                          </span>
                                        ) : null}
                                      </div>
                                      <div className="col-lg-4"></div>
                                    </div>
                                  ))}
                                </div>

                                <div class="modal-footer">
                                  <button
                                    type="button"
                                    class="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                  >
                                    Close
                                  </button>
                                  <button
                                    type="button"
                                    class="btn btn-primary"
                                    onClick={handleDefaultAddress}
                                  >
                                    Thay đổi
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>

                          {addressQuantity < 5 && (
                            <button
                              type="button"
                              className="btn btn-primary d-flex align-items-center justify-content-center"
                              data-bs-toggle="modal"
                              data-bs-target="#AddNewAddress"
                            >
                              Thêm mới địa chỉ
                            </button>
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Button add new Address */}
                        <button
                          type="button"
                          class="btn btn-primary d-flex align-items-center justify-content-center"
                          data-bs-toggle="modal"
                          data-bs-target="#AddNewAddress"
                        >
                          Thêm mới địa chỉ
                        </button>
                      </>
                    )}
                  </div>

                  <div className="col-lg-4">
                    <div className="checkout__order">
                      <h5>Đơn hàng của bạn</h5>
                      <div className="checkout__order__product">
                        <ul>
                          <li>
                            <span className="top__text">Sản phẩm</span>
                            <span className="top__text__right">Số lượng</span>
                          </li>
                          {checkoutProduct.map(
                            (item) =>
                              selectedProductId.includes(item.prd_id) && (
                                <li key={item.prd_id}>
                                  {item.name}
                                  <span>x{item.quantity}</span>
                                </li>
                              )
                          )}
                        </ul>
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
                          <div className=" d-flex">
                            <input
                              className="me-2"
                              type="checkbox"
                              id={item.id}
                              checked={selectedPaymentId === item.id}
                              onChange={() => handlePaymentChange(item.id)}
                            />
                            <label htmlFor={item.id}>{item.name}</label>
                          </div>
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

      {/* Modal add new Address*/}
      <div
        class="modal fade"
        id="AddNewAddress"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Thêm mới địa chỉ
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
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
                    <input type="text" onChange={handleNameChange} />
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
                    <input type="text" onChange={handlePhoneChange} />
                    {phoneError && (
                      <div className="alert alert-danger" role="alert">
                        {phoneError}
                      </div>
                    )}
                  </div>
                </div>

                {/* <div
                                    className={`col-lg-12 ${
                                      emailError ? "is-invalid" : ""
                                    }`}
                                  >
                                    <div className="checkout__form__input">
                                      <p>
                                        Email <span>*</span>
                                      </p>
                                      <input type="text" readOnly />
                                    </div> */}

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
                      style={{ width: "100%" }}
                      type="text"
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
                      onChange={(e) => setSelectedDistrictId(e.target.value)}
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
                    <select onChange={(e) => setSelectedWardId(e.target.value)}>
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
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Đóng
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={handleAddAddress}
              >
                Thêm mới
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}

export default Checkout;
