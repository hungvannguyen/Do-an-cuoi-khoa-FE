import Navbar from "./Navbar";
import Loading from "../Loading/Loading";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Address() {
  const [loading, setLoading] = useState(true);
  const token = sessionStorage.getItem("token");
  const [address, setAddress] = useState([]);
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
        setLoading(false);
      })
      .catch((error) => {
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
      })
      .catch((error) => {
        console.log(error);
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

  const handleDetailChange = (detail) => {
    setDetail(detail);
  };

  const handleCityChange = async (event) => {
    const selectedCityId = event.target.value;
    setSelectedCityId(selectedCityId);
    try {
      const response = await axios.get(`/address/district/${selectedCityId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
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
    if (!detail) {
      setAddressError("Vui lòng nhập địa chỉ");
    }

    if (!selectedCityId) {
      setCityError("Vui lòng chọn tỉnh/thành phố");
    }

    if (!selectedDistrictId) {
      setDistrictError("Vui lòng chọn quận/huyện");
    }

    if (!selectedWardId) {
      setWardError("Vui lòng chọn phường/xã");
    }
    if (
      !addressError &&
      !cityError &&
      !districtError &&
      !wardError &&
      address &&
      selectedCityId &&
      selectedDistrictId &&
      selectedWardId
    ) {
      axios
        .post(
          "/address/create",
          {
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
    if (!detail) {
      setAddressError("Vui lòng nhập địa chỉ");
    }

    if (!selectedCityId) {
      setCityError("Vui lòng chọn tỉnh/thành phố");
    }

    if (!selectedDistrictId) {
      setDistrictError("Vui lòng chọn quận/huyện");
    }

    if (!selectedWardId) {
      setWardError("Vui lòng chọn phường/xã");
    }
    if (
      !addressError &&
      !cityError &&
      !districtError &&
      !wardError &&
      address &&
      selectedCityId &&
      selectedDistrictId &&
      selectedWardId
    ) {
      axios
        .post(
          `/address/update?address_id=${id}`,
          {
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
                    <button
                      type="button"
                      class="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#Add"
                    >
                      {" "}
                      Thêm địa chỉ
                    </button>
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
                              Modal title
                            </h5>
                            <button
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div class="modal-body">
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
                              onChange={(e) =>
                                handleDetailChange(e.target.value)
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

                    {address.map((address) => (
                      <div class="row mb-4 ms-5 mt-5">
                        <div class="col-lg-6">
                          <label>
                            <strong>Địa chỉ {count++}</strong>{" "}
                          </label>
                          {addressDetail.map((addressDetail) => {
                            if (address.id === addressDetail.id) {
                              return (
                                <div>
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
                                    Bạn có chắc chắn muốn xóa địa chỉ này không?
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
                                        <div>
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
                                    Modal title
                                  </h5>
                                  <button
                                    type="button"
                                    class="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  ></button>
                                </div>
                                <div class="modal-body">
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
                                    onChange={(e) =>
                                      handleDetailChange(e.target.value)
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
                                        selected={
                                          district.id === selectedDistrictId
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
                    ))}
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
