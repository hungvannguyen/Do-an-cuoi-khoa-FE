import Navbar from "./Navbar";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Address() {
  const token = sessionStorage.getItem("token");
  const [address, setAddress] = useState([]);

  // Address

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
        console.log(response.data);
        setAddress(response.data);
        setSelectedCityId(response.data.city_id);
        setSelectedDistrictId(response.data.district_id);
        setSelectedWardId(response.data.ward_id);
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

  const handleUpdateAddress = () => {
    if (!address) {
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
          "/address/create/",
          {
            city_id: selectedCityId,
            district_id: selectedDistrictId,
            ward_id: selectedWardId,
            detail: address,
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
  return (
    <section className="user-profile">
      <ToastContainer />
      <div className="container">
        <div className="row">
          <Navbar />

          <div className="col-lg-8" style={{ marginTop: 30 }}>
            <div className="card mb-4">
              <div className="card-body">
                <div className="row">
                  <div className="row g-3">
                    <div className="col-md-12">
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
                        onChange={(e) => setAddress(e.target.value)}
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
                    <div className="col-md-6">
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
                    <div className="col-md-6">
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
                      className="col-md-6 d-flex flex-column justify-content-center align-items-center"
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
                      <div className="d-flex">
                        <button
                          className="btn btn-primary"
                          style={{ marginLeft: 30, marginTop: 20 }}
                          onClick={handleUpdateAddress}
                        >
                          Cập nhật
                        </button>

                        <button
                          type="button"
                          class="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          style={{ marginLeft: 30, marginTop: 20 }}
                        >
                          {" "}
                          Cập nhật
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
                              <div class="modal-body">...</div>
                              <div class="modal-footer">
                                <button
                                  type="button"
                                  class="btn btn-secondary"
                                  data-bs-dismiss="modal"
                                >
                                  Close
                                </button>
                                <button type="button" class="btn btn-primary">
                                  Save changes
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Address;
