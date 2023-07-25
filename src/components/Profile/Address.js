import Navbar from "./Navbar";
import Loading from "../Loading/Loading";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Address() {
  const [loading, setLoading] = useState(true);
  const token = sessionStorage.getItem("token");

  const [name, setName] = useState([]);
  const [phone_number, setPhoneNumber] = useState([]);
  const [address, setAddress] = useState({
    name: "",
    phone_number: "",
    detail: "",
    city_id: "",
    district_id: "",
    ward_id: "",
  });
  const [addressDetail, setAddressDetail] = useState([]);
  let count = 1;

  // Address
  const [detail, setDetail] = useState("");
  const [city, setCity] = useState([]);
  const [district, setDistrict] = useState([]);
  const [ward, setWard] = useState([]);

  // select Address
  // const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedCityId, setSelectedCityId] = useState("");
  const [selectedDistrictId, setSelectedDistrictId] = useState("");
  const [selectedWardId, setSelectedWardId] = useState("");

  // Address error
  const [nameError, setNameError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [cityError, setCityError] = useState("");
  const [districtError, setDistrictError] = useState("");
  const [wardError, setWardError] = useState("");

  useEffect(() => {
    axios
      .get("/address", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAddress(response.data.data);
        setAddressError("");
        setNameError("");
        setPhoneNumberError("");
        setCityError("");
        setDistrictError("");
        setWardError("");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/address/detail", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAddressDetail(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/address/city/all", {
        headers: {
          Authorization: `Bearer ${token}`,
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
      .get(`/address/district/${selectedCityId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
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
          Authorization: `Bearer ${token}`,
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

  const handleCityChange = async (event) => {
    const selectedCityId = event.target.value;
    setSelectedCityId(selectedCityId);
    setSelectedDistrictId("");
    setSelectedWardId("");
    try {
      const response = await axios.get(`/address/district/${selectedCityId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
            Authorization: `Bearer ${token}`,
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

  const handleNameAdd = (name) => {
    setName(name);
  };

  const handlePhoneNumberAdd = (phone_number) => {
    setPhoneNumber(phone_number);
  };

  const handleDetailAdd = (detail) => {
    setDetail(detail);
  };

  const handleNameChange = (value, index) => {
    setAddress((prevAddress) => {
      const updatedAddress = [...prevAddress];
      updatedAddress[index] = { ...updatedAddress[index], name: value };
      setName(value);
      return updatedAddress;
    });
  };

  const handlePhoneNumberChange = (value, index) => {
    setAddress((prevAddress) => {
      const updatedAddress = [...prevAddress];
      updatedAddress[index] = { ...updatedAddress[index], phone_number: value };
      setPhoneNumber(value);
      return updatedAddress;
    });
  };

  const handleDetailChange = (value, index) => {
    setAddress((prevAddress) => {
      const updatedAddress = [...prevAddress];
      updatedAddress[index] = { ...updatedAddress[index], detail: value };
      setDetail(value);
      return updatedAddress;
    });
  };

  const handleAddressOpen = (
    name,
    phone_number,
    detail,
    city_id,
    district_id,
    ward_id,
    index
  ) => {
    setName(name);
    setPhoneNumber(phone_number);
    setDetail(detail);
    setSelectedCityId(city_id);
    setSelectedDistrictId(district_id);
    setSelectedWardId(ward_id);
  };

  // Delete Address
  const handleDeleteAddress = (id) => {
    axios
      .delete(`/address/delete?address_id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success("Đã xóa thành công", {
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
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        toast.error("Xóa không thành công", {
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
  };

  // Add Address
  const handleAddAddress = (id) => {
    let hasError = false;
    if (!name) {
      setNameError("Vui lòng nhập tên người nhận");
      hasError = true;
    } else {
      setNameError("");
    }
    if (!phone_number) {
      setPhoneNumberError("Vui lòng nhập số điện thoại");
      hasError = true;
    } else if (/\s/.test(phone_number)) {
      setPhoneNumberError("Số điện thoại không được chứa khoảng trắng");
      hasError = true;
    } else if (phone_number.length < 10 || phone_number.length > 11) {
      setPhoneNumberError("Số điện thoại không hợp lệ");
      hasError = true;
    } else {
      setPhoneNumberError("");
    }

    if (!detail) {
      setAddressError("Vui lòng nhập địa chỉ");
      hasError = true;
    } else {
      setAddressError("");
    }

    if (!selectedCityId) {
      setCityError("Vui lòng chọn tỉnh/thành phố");
      hasError = true;
    } else {
      setCityError("");
    }

    if (!selectedDistrictId) {
      setDistrictError("Vui lòng chọn quận/huyện");
      hasError = true;
    } else {
      setDistrictError("");
    }

    if (!selectedWardId) {
      setWardError("Vui lòng chọn phường/xã");
      hasError = true;
    } else {
      setWardError("");
    }
    if (hasError === false) {
      axios
        .post(
          "/address/create",
          {
            name: name,
            phone_number: phone_number,
            city_id: selectedCityId,
            district_id: selectedDistrictId,
            ward_id: selectedWardId,
            detail: detail,
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

  // Update Address
  const handleUpdateAddress = (id) => {
    let hasError = false;
    if (!name) {
      setNameError("Vui lòng nhập tên người nhận");
      hasError = true;
    } else {
      setNameError("");
    }
    if (!phone_number) {
      setPhoneNumberError("Vui lòng nhập số điện thoại");
      hasError = true;
    } else {
      setPhoneNumberError("");
    }
    if (phone_number.length < 10 || phone_number.length > 10) {
      setPhoneNumberError("Số điện thoại không hợp lệ");
      hasError = true;
    } else {
      setPhoneNumberError("");
    }

    if (!detail) {
      setAddressError("Vui lòng nhập địa chỉ");
      hasError = true;
    } else {
      setAddressError("");
    }

    if (!selectedCityId) {
      setCityError("Vui lòng chọn tỉnh/thành phố");
      hasError = true;
    } else {
      setCityError("");
    }

    if (!selectedDistrictId) {
      setDistrictError("Vui lòng chọn quận/huyện");
      hasError = true;
    } else {
      setDistrictError("");
    }

    if (!selectedWardId) {
      setWardError("Vui lòng chọn phường/xã");
      hasError = true;
    } else {
      setWardError("");
    }
    if (hasError === false) {
      axios
        .post(
          `/address/update?address_id=${id}`,
          {
            name: name,
            phone_number: phone_number,
            city_id: selectedCityId,
            district_id: selectedDistrictId,
            ward_id: selectedWardId,
            detail: detail,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          toast.success("Đã cập nhật thành công", {
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
            window.location.reload();
          }, 2000);
        })
        .catch((error) => {
          toast.error("Cập nhật không thành công", {
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

  // Set default Address

  const handleSetDefaultAddress = (id) => {
    axios
      .get(`/address/set_default?address_id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success("Đã cập nhật thành công", {
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
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        toast.error("Cập nhật không thành công", {
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
  };

  return (
    <div>
      <Loading isLoading={loading} />
      {!loading && (
        <>
          <section className="user-profile">
            <ToastContainer />
            <div className="container">
              <div className="row">
                <Navbar />

                <div className="col-lg-8" style={{ marginTop: 30 }}>
                  <div className="card mb-4">
                    {count < 5 ? (
                      <button
                        type="button"
                        class="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#Add"
                      >
                        {" "}
                        Thêm địa chỉ
                      </button>
                    ) : (
                      <button type="button" class="btn btn-primary">
                        Địa chỉ giao hàng
                      </button>
                    )}

                    <div
                      class="modal fade"
                      id="Add"
                      tabindex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">
                              Thêm địa chỉ mới
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
                              <div className="col-lg-6">
                                <label
                                  htmlFor="validationServer03"
                                  className="form-label"
                                >
                                  Tên người nhận
                                </label>
                                <input
                                  type="text"
                                  className={`form-control ${
                                    nameError ? "is-invalid" : ""
                                  }`}
                                  id="validationServer03"
                                  aria-describedby="validationServer03Feedback"
                                  onChange={(e) =>
                                    handleNameAdd(e.target.value)
                                  }
                                />

                                {nameError && (
                                  <div
                                    id="validationServer03Feedback"
                                    className="invalid-feedback"
                                  >
                                    {nameError}
                                  </div>
                                )}
                              </div>
                              <div className="col-lg-6">
                                <label
                                  htmlFor="validationServer03"
                                  className="form-label"
                                >
                                  Số điện thoại
                                </label>
                                <input
                                  type="text"
                                  className={`form-control ${
                                    phoneNumberError ? "is-invalid" : ""
                                  }`}
                                  id="validationServer03"
                                  aria-describedby="validationServer03Feedback"
                                  onChange={(e) =>
                                    handlePhoneNumberAdd(e.target.value)
                                  }
                                />

                                {phoneNumberError && (
                                  <div
                                    id="validationServer03Feedback"
                                    className="invalid-feedback"
                                  >
                                    {phoneNumberError}
                                  </div>
                                )}
                              </div>
                            </div>
                            <label
                              htmlFor="validationServer03"
                              className="form-label"
                            >
                              Địa chỉ
                            </label>
                            <input
                              type="text"
                              className={`form-control ${
                                addressError ? "is-invalid" : ""
                              }`}
                              id="validationServer03"
                              aria-describedby="validationServer03Feedback"
                              onChange={(e) => handleDetailAdd(e.target.value)}
                            />

                            {addressError && (
                              <div
                                id="validationServer03Feedback"
                                className="invalid-feedback"
                              >
                                {addressError}
                              </div>
                            )}
                          </div>

                          <div
                            className="col-md-8 col-lg-8  d-flex flex-column justify-content-center align-items-center"
                            style={{
                              margin: "auto",
                              paddingTop: 20,
                            }}
                          >
                            <label
                              htmlFor="validationServer04"
                              className="form-label"
                            >
                              Tỉnh / Thành phố
                            </label>
                            <select
                              className={`form-control ${
                                cityError ? "is-invalid" : ""
                              }`}
                              id="validationServer04"
                              aria-describedby="validationServer04Feedback"
                              onChange={handleCityChange}
                            >
                              <option selected disabled value="">
                                Chọn tỉnh/thành phố
                              </option>
                              {city.map((city) => (
                                <option
                                  value={city.id}
                                  key={city.id}
                                  selected={city.id === selectedCityId}
                                >
                                  {city.name}
                                </option>
                              ))}
                            </select>

                            {cityError && (
                              <div
                                id="validationServer04Feedback"
                                className="invalid-feedback"
                              >
                                {cityError}
                              </div>
                            )}
                          </div>

                          <div
                            className="col-md-8 col-lg-8  d-flex flex-column justify-content-center align-items-center"
                            style={{
                              margin: "auto",
                              paddingTop: 20,
                            }}
                          >
                            <label
                              htmlFor="validationServer04"
                              className="form-label"
                            >
                              Quận / Huyện
                            </label>
                            <select
                              className={`form-control ${
                                districtError ? "is-invalid" : ""
                              }`}
                              id="validationServer04"
                              aria-describedby="validationServer04Feedback"
                              onChange={handleDistrictChange}
                            >
                              <option selected disabled value="">
                                Chọn quận/huyện
                              </option>
                              {district.map((district) => (
                                <option
                                  value={district.id}
                                  key={district.id}
                                  selected={district.id === selectedDistrictId}
                                >
                                  {district.name}
                                </option>
                              ))}
                            </select>

                            {districtError && (
                              <div
                                id="validationServer04Feedback"
                                className="invalid-feedback"
                              >
                                {districtError}
                              </div>
                            )}
                          </div>

                          <div
                            className="col-md-8 col-lg-8 d-flex flex-column justify-content-center align-items-center mb-4"
                            style={{
                              margin: "auto",
                              paddingTop: 20,
                            }}
                          >
                            <label
                              htmlFor="validationServer04"
                              className="form-label"
                            >
                              Phường / Xã
                            </label>
                            <select
                              className={`form-control ${
                                wardError ? "is-invalid" : ""
                              }`}
                              id="validationServer04"
                              aria-describedby="validationServer04Feedback"
                              onChange={handleWardChange}
                            >
                              <option selected disabled value="">
                                Chọn phường/xã
                              </option>
                              {ward.map((ward) => (
                                <option
                                  value={ward.id}
                                  key={ward.id}
                                  selected={ward.id === selectedWardId}
                                >
                                  {ward.name}
                                </option>
                              ))}
                            </select>
                            {wardError && (
                              <div
                                id="validationServer04Feedback"
                                className="invalid-feedback"
                              >
                                {wardError}
                              </div>
                            )}
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
                              onClick={handleAddAddress}
                            >
                              Thêm địa chỉ
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Display infor */}

                    {address.length > 0 ? (
                      address.map((address, index) => (
                        <div
                          key={index}
                          class="row mb-4 ms-5 mt-5 pb-3"
                          style={{
                            borderBottom: "1px solid black",
                            width: 680,
                          }}
                        >
                          <div class="col-lg-6">
                            <label>
                              <strong>Địa chỉ {count++}</strong>
                              {" - "}
                              {address.is_default === 1 ? (
                                <span style={{ color: "red" }}>
                                  Địa chỉ nhận hàng
                                </span>
                              ) : null}
                            </label>
                            {addressDetail.map((addressDetail) => {
                              if (address.id === addressDetail.id) {
                                return (
                                  <div>
                                    <div>
                                      {addressDetail.name} |{" "}
                                      {addressDetail.phone_number}
                                    </div>
                                    {addressDetail.detail} -{" "}
                                    {addressDetail.city_id} -{" "}
                                    {addressDetail.district_id} -{" "}
                                    {addressDetail.ward_id}
                                  </div>
                                );
                              } else {
                                return null;
                              }
                            })}
                            {address.is_default === 99 ? (
                              <span
                                className="btn btn-warning"
                                style={{
                                  color: "red",
                                  cursor: "pointer",
                                  fontSize: "12px",
                                }}
                                onClick={() =>
                                  handleSetDefaultAddress(address.id)
                                }
                              >
                                Đặt làm mặc định
                              </span>
                            ) : null}
                          </div>

                          <div class="col-lg-2 ">
                            <button
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target={`#deleteModal${address.id}`}
                              className="btn btn-danger mb-2"
                            >
                              Xóa
                            </button>

                            <div
                              class="modal fade"
                              id={`deleteModal${address.id}`}
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
                                      Bạn có chắc chắn muốn xóa địa chỉ này
                                      không?
                                    </h5>
                                    <button
                                      type="button"
                                      class="btn-close"
                                      data-bs-dismiss="modal"
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div class="modal-body">
                                    {" "}
                                    {addressDetail.map((addressDetail) => {
                                      if (address.id === addressDetail.id) {
                                        return (
                                          <>
                                            <div>
                                              {addressDetail.detail} -{" "}
                                              {addressDetail.city_id} -{" "}
                                              {addressDetail.district_id} -{" "}
                                              {addressDetail.ward_id}
                                            </div>
                                          </>
                                        );
                                      } else {
                                        return null;
                                      }
                                    })}
                                  </div>
                                  <div class="modal-footer">
                                    <button
                                      type="button"
                                      class="btn btn-secondary"
                                      data-bs-dismiss="modal"
                                    >
                                      Đóng
                                    </button>
                                    <button
                                      type="button"
                                      class="btn btn-primary"
                                      onClick={() =>
                                        handleDeleteAddress(address.id)
                                      }
                                    >
                                      Xóa
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Update */}
                            <button
                              type="button"
                              class="btn btn-primary"
                              data-bs-toggle="modal"
                              data-bs-target={`#Modal${address.id}`}
                              onClick={() =>
                                handleAddressOpen(
                                  address.name,
                                  address.phone_number,
                                  address.detail,
                                  address.city_id,
                                  address.district_id,
                                  address.ward_id,
                                  index
                                )
                              }
                            >
                              {" "}
                              Cập nhật
                            </button>

                            <div
                              class="modal fade"
                              id={`Modal${address.id}`}
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
                                      Cập nhật địa chỉ
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
                                      <div className="col-lg-6">
                                        <label
                                          htmlFor="validationServer03"
                                          className="form-label"
                                        >
                                          Tên người nhận
                                        </label>
                                        <input
                                          type="text"
                                          className={`form-control ${
                                            nameError ? "is-invalid" : ""
                                          }`}
                                          id="validationServer03"
                                          aria-describedby="validationServer03Feedback"
                                          value={address.name}
                                          onChange={(e) =>
                                            handleNameChange(
                                              e.target.value,
                                              index
                                            )
                                          }
                                        />

                                        {nameError && (
                                          <div
                                            id="validationServer03Feedback"
                                            className="invalid-feedback"
                                          >
                                            {nameError}
                                          </div>
                                        )}
                                      </div>
                                      <div className="col-lg-6">
                                        <label
                                          htmlFor="validationServer03"
                                          className="form-label"
                                        >
                                          Số điện thoại
                                        </label>
                                        <input
                                          type="text"
                                          className={`form-control ${
                                            phoneNumberError ? "is-invalid" : ""
                                          }`}
                                          id="validationServer03"
                                          aria-describedby="validationServer03Feedback"
                                          value={address.phone_number}
                                          onChange={(e) =>
                                            handlePhoneNumberChange(
                                              e.target.value,
                                              index
                                            )
                                          }
                                        />

                                        {phoneNumberError && (
                                          <div
                                            id="validationServer03Feedback"
                                            className="invalid-feedback"
                                          >
                                            {phoneNumberError}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                    <label
                                      htmlFor="validationServer03"
                                      className="form-label"
                                    >
                                      Địa chỉ
                                    </label>
                                    <input
                                      type="text"
                                      className={`form-control ${
                                        addressError ? "is-invalid" : ""
                                      }`}
                                      id="validationServer03"
                                      aria-describedby="validationServer03Feedback"
                                      value={address.detail}
                                      onChange={(e) =>
                                        handleDetailChange(
                                          e.target.value,
                                          index
                                        )
                                      }
                                    />

                                    {addressError && (
                                      <div
                                        id="validationServer03Feedback"
                                        className="invalid-feedback"
                                      >
                                        {addressError}
                                      </div>
                                    )}
                                  </div>

                                  <div
                                    className="col-md-8 col-lg-8  d-flex flex-column justify-content-center align-items-center"
                                    style={{
                                      margin: "auto",
                                      paddingTop: 20,
                                    }}
                                  >
                                    <label
                                      htmlFor="validationServer04"
                                      className="form-label"
                                    >
                                      Tỉnh / Thành phố
                                    </label>
                                    <select
                                      className={`form-control ${
                                        cityError ? "is-invalid" : ""
                                      }`}
                                      id="validationServer04"
                                      aria-describedby="validationServer04Feedback"
                                      onChange={handleCityChange}
                                    >
                                      <option selected disabled value="">
                                        Chọn tỉnh/thành phố
                                      </option>
                                      {city.map((city) => (
                                        <option
                                          value={city.id}
                                          key={city.id}
                                          selected={city.id === address.city_id}
                                        >
                                          {city.name}
                                        </option>
                                      ))}
                                    </select>

                                    {cityError && (
                                      <div
                                        id="validationServer04Feedback"
                                        className="invalid-feedback"
                                      >
                                        {cityError}
                                      </div>
                                    )}
                                  </div>

                                  <div
                                    className="col-md-8 col-lg-8  d-flex flex-column justify-content-center align-items-center"
                                    style={{
                                      margin: "auto",
                                      paddingTop: 20,
                                    }}
                                  >
                                    <label
                                      htmlFor="validationServer04"
                                      className="form-label"
                                    >
                                      Quận / Huyện
                                    </label>
                                    <select
                                      className={`form-control ${
                                        districtError ? "is-invalid" : ""
                                      }`}
                                      id="validationServer04"
                                      aria-describedby="validationServer04Feedback"
                                      onChange={handleDistrictChange}
                                    >
                                      <option selected disabled value="">
                                        Chọn quận/huyện
                                      </option>
                                      {district.map((district) => (
                                        <option
                                          value={district.id}
                                          key={district.id}
                                          selected={
                                            district.id === address.district_id
                                          }
                                        >
                                          {district.name}
                                        </option>
                                      ))}
                                    </select>

                                    {districtError && (
                                      <div
                                        id="validationServer04Feedback"
                                        className="invalid-feedback"
                                      >
                                        {districtError}
                                      </div>
                                    )}
                                  </div>

                                  <div
                                    className="col-md-8 col-lg-8 d-flex flex-column justify-content-center align-items-center mb-4"
                                    style={{
                                      margin: "auto",
                                      paddingTop: 20,
                                    }}
                                  >
                                    <label
                                      htmlFor="validationServer04"
                                      className="form-label"
                                    >
                                      Phường / Xã
                                    </label>
                                    <select
                                      className={`form-control ${
                                        wardError ? "is-invalid" : ""
                                      }`}
                                      id="validationServer04"
                                      aria-describedby="validationServer04Feedback"
                                      onChange={handleWardChange}
                                    >
                                      <option selected disabled value="">
                                        Chọn phường/xã
                                      </option>
                                      {ward.map((ward) => (
                                        <option
                                          value={ward.id}
                                          key={ward.id}
                                          selected={ward.id === address.ward_id}
                                        >
                                          {ward.name}
                                        </option>
                                      ))}
                                    </select>
                                    {wardError && (
                                      <div
                                        id="validationServer04Feedback"
                                        className="invalid-feedback"
                                      >
                                        {wardError}
                                      </div>
                                    )}
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
                                      onClick={() =>
                                        handleUpdateAddress(address.id)
                                      }
                                    >
                                      Câp nhật
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="d-flex justify-content-center align-content-center mt-3">
                        Không có địa chỉ nào.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
export default Address;
