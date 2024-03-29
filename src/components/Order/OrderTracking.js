import Loading from "../Loading/Loading";
import { useState, useEffect } from "react";
import { Collapse } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
function OrderTracking() {
  const navigate = useNavigate();
  // token
  const token = sessionStorage.getItem("token");
  // useState
  const [loading, setLoading] = useState(true);
  const [order_status, setOrderStatus] = useState(-1);
  const [orderCancelReason, setOrderCancelReason] = useState("");
  const [orderRefundReason, setOrderRefundReason] = useState("");
  // const [product, setProduct] = useState([]);
  const [order, setOrder] = useState([]);
  const [imageProduct, setImageProduct] = useState([]);
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [isOpen, setIsOpen] = useState(Array(order.length).fill(false));

  let counter = 0;
  // Check token
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      navigate("/order/tracking");
    } else {
      navigate("/login");
    }
  }, []);

  // Call API to get Order
  useEffect(() => {
    axios
      .get(`/order/all?page=${page}&order_status=${order_status}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setOrder(response.data.data);
        setPage(response.data.current_page);
        setCurrentPage(response.data.current_page);
        setTotalPage(response.data.total_page);
        console.log("Order");
        console.log(response.data);
        // Call API to get Image Product
        const imageName = response.data.data.map((item) => {
          return item.products.map((product) => {
            return product.img_url;
          });
        });
        console.log("Image Name");
        console.log(imageName);
        Promise.all(
          imageName.flatMap((imageNames) => {
            return imageNames.map((imageName) => {
              return axios
                .get(`/file/img/${imageName}`, { responseType: "blob" })
                .then((response) => URL.createObjectURL(response.data))
                .catch((error) => {
                  console.log(error);
                  return null;
                });
            });
          })
        )
          .then((imageUrls) => {
            const filteredImageUrls = imageUrls.filter((url) => url !== null);
            setImageProduct(filteredImageUrls);
          })
          .catch((error) => {
            console.log(error);
          });
        setLoading(false);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setOrder([]);
          setLoading(false);
        }
      });
  }, [page, currentPage, order_status]);

  // Handle Order Status
  const handleOrderStatusChange = (status) => {
    setOrderStatus(status);
    setLoading(true);
  };
  // Handle Collapse
  const handleCollapse = (index) => {
    setIsOpen((prevIsOpen) => {
      const updatedIsOpen = [...prevIsOpen];
      updatedIsOpen[index] = !updatedIsOpen[index];
      return updatedIsOpen;
    });
  };

  // Render the dropdown menu items
  const renderDropdownItems = () => {
    const statuses = [
      { value: -1, label: "Tất cả" },
      { value: 0, label: "Đơn chưa duyệt" },
      { value: 1, label: "Đã xác nhận" },
      { value: 2, label: "Đang vận chuyển" },
      { value: 10, label: "Đã giao hàng" },
      { value: 100, label: "Đã hoàn thành" },
      { value: 99, label: "Đã hủy" },
    ];

    return statuses.map((status) => (
      <li key={status.value}>
        <a
          className={
            order_status === status.value
              ? "dropdown-item active"
              : "dropdown-item"
          }
          onClick={() => handleOrderStatusChange(status.value)}
        >
          {status.label}
        </a>
      </li>
    ));
  };

  // Handle Pagination
  const handlePageChange = (page) => {
    setLoading(true);
    setPage(page);
    setCurrentPage(page);
  };

  // Render Pagination
  const renderPagination = () => {
    const displayedPages = 3;
    const startPage = Math.max(currentPage - 1, 1);
    const endPage = Math.min(startPage + displayedPages - 1, totalPage);

    return Array.from({ length: endPage - startPage + 1 }, (_, index) => {
      const page = startPage + index;

      if (currentPage === page) {
        return (
          <a key={page} className="active disabled">
            {page}
          </a>
        );
      }

      return (
        <a
          key={page}
          href="#"
          onClick={() => handlePageChange(page)}
          className={currentPage === page ? "active" : ""}
        >
          {page}
        </a>
      );
    });
  };

  // Pagination handle click first page
  const handleFirstPage = () => {
    if (currentPage === 1) {
      return;
    }

    setCurrentPage(1);
    setPage(1);
    setLoading(true);
  };
  //  Pagination handle click last page
  const handleLastPage = () => {
    if (currentPage === totalPage) {
      return;
    }

    setCurrentPage(totalPage);
    setPage(totalPage);
    setLoading(true);
  };

  // Handle payment again
  const handlePaymentAgain = (order_id, payment_id, amount) => {
    axios
      .post(
        "/vnpay/create",

        {
          order_id: order_id,
          payment_id: payment_id,
          amount: amount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        window.location.href = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Handle order cancel
  const handleOrderCancel = (id) => {
    axios
      .delete(
        `/order/cancel?order_id=${id}&cancel_reason=${orderCancelReason}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        toast.success("Đã hủy đơn hàng thành công", {
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
        toast.error(error.response.data.detail, {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setInterval(() => {
          window.location.reload();
        }, 2000);
      });
  };

  // Handle order refund
  const handleOrderRefund = (id) => {
    if (!orderRefundReason) {
      toast.error("Vui lòng nhập lý do trả hàng", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
    axios
      .get(
        `/order/update?order_status=49&order_id=${id}&cancel_reason=${orderRefundReason}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        toast.success("Đã yêu cầu trả hàng thành công", {
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
      .catch(() => {
        toast.error("Yêu cầu trả đơn hàng không thành công", {
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

  // Handle order refund cancel
  const handleOrderRefundCancel = (id) => {
    axios
      .get(`/order/update?order_status=100&order_id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        toast.success("Đã xác nhận nhận hàng thành công", {
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
        console.log(error);
      });
  };

  // Handle order complete
  const handleOrderComplete = (id) => {
    axios
      .get(`/order/update?order_status=100&order_id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        toast.success("Đã xác nhận nhận hàng thành công", {
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
        console.log(error);
      });
  };

  // Format number
  const formatNumber = (number) => {
    if (number) {
      return number.toLocaleString("vi-VN");
    }
    return "";
  };

  return (
    <div>
      <Loading isLoading={loading} />
      {!loading && (
        <>
          <ToastContainer />
          <div className="container mt-5">
            <article className="card">
              <div>
                <header className="card-header"> Đơn hàng của bạn </header>
              </div>
              <div className="row me-2">
                <div className="col-md-12  d-flex justify-content-end mt-3">
                  <div class="dropdown">
                    <button
                      class="btn btn-secondary dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Trạng thái đơn hàng
                    </button>
                    <ul
                      class="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                      style={{ cursor: "pointer" }}
                    >
                      {renderDropdownItems()}
                    </ul>
                  </div>
                </div>
              </div>
              {order.length > 0 ? (
                <>
                  {order.map((item, index) => (
                    <div
                      className="card-body"
                      key={index}
                      style={{
                        cursor: "pointer",
                        borderBottom: "12px solid #e0e0e0",
                      }}
                    >
                      <h6 className="mb-3" style={{ color: "blue" }}>
                        <strong>Mã đơn hàng: {item.id}</strong>{" "}
                      </h6>
                      <article
                        className="card"
                        onClick={() => handleCollapse(index)}
                      >
                        <div className="card-body row">
                          <div className="col">
                            <strong>Ngày tạo:</strong> <br />
                            {item.insert_at}
                          </div>
                          <div className="col">
                            <strong>Tên người nhận:</strong> <br />
                            {item.name}
                          </div>
                          <div className="col">
                            <strong>Địa chỉ giao hàng:</strong> <br />
                            {item.address}
                          </div>
                          <div className="col">
                            <strong>Số điện thoại:</strong> <br />
                            <i className="fa fa-phone"></i> {item.phone_number}
                          </div>
                          <div className="col">
                            <strong>Trạng thái:</strong> <br />
                            {item.status === 0 &&
                            item.payment_status !== 0 &&
                            item.payment_type_id !== 2 ? (
                              <span style={{ color: "blue" }}>
                                Chờ thanh toán
                              </span>
                            ) : (
                              // Display "Chờ xác nhận" in blue color when item.status is 0
                              item.status === 0 && (
                                <span style={{ color: "blue" }}>
                                  Chờ xác nhận
                                </span>
                              )
                            )}
                            {item.status === 1 && (
                              <span style={{ color: "blue" }}>Đã xác nhận</span>
                            )}
                            {item.status === 2 && (
                              <span style={{ color: "blue" }}>
                                {" "}
                                Đang vận chuyển
                              </span>
                            )}
                            {item.status === 10 && (
                              <span style={{ color: "blue" }}>
                                Đã giao hàng
                              </span>
                            )}
                            {item.status === 49 && (
                              <span style={{ color: "red" }}>
                                Yêu cầu trả hàng
                              </span>
                            )}
                            {item.status === 50 && (
                              <span style={{ color: "red" }}>
                                Đã xác nhận trả hàng
                              </span>
                            )}
                            {item.status === 99 && (
                              <span style={{ color: "red" }}>Đã hủy</span>
                            )}
                            {item.status === 100 && (
                              <span style={{ color: "green" }}>Hoàn thành</span>
                            )}
                          </div>
                        </div>
                      </article>

                      <hr />
                      <Collapse in={isOpen[index]}>
                        <ul className="row" style={{ listStyle: "none" }}>
                          {item.products.map((product, innerIndex) => (
                            <li className="col-md-4">
                              <figure className="itemside mb-3 d-flex">
                                <div className="aside">
                                  {index < imageProduct.length && (
                                    <img
                                      key={innerIndex}
                                      src={imageProduct[counter++]}
                                      className="img-sm border"
                                      style={{ width: "100px" }}
                                      alt={`Product Image ${innerIndex + 1}`}
                                    />
                                  )}
                                </div>
                                <figcaption className="info align-self-center ms-2">
                                  <p className="title">{product.name}</p>
                                  <span className="text-muted">
                                    {formatNumber(product.price)} đ
                                  </span>
                                  <span className="text-muted">
                                    {" "}
                                    x {product.quantity}
                                  </span>
                                </figcaption>
                              </figure>
                            </li>
                          ))}
                        </ul>
                      </Collapse>
                      <hr />
                      <div className="row">
                        <div className="col-md-6 col-lg-6">
                          <strong>Phương thức thanh toán:</strong>{" "}
                          {item.payment_type}
                          <br />
                          <strong>Tình trạng:</strong>{" "}
                          {item.payment_status === 0
                            ? "Đã thanh toán"
                            : "Chưa thanh toán"}
                          <br />
                          <strong>Tổng tiền:</strong>{" "}
                          {formatNumber(item.total_price)} đ
                          <br />
                          {item.status === 0 &&
                          item.payment_status !== 0 &&
                          item.payment_type_id !== 2 ? (
                            <span style={{ color: "red" }}>
                              Đơn hàng sẽ bị hủy sau 30 phút nếu không thanh
                              toán
                            </span>
                          ) : null}
                          {item.status === 10 && (
                            <span style={{ color: "green" }}>
                              Đơn hàng sẽ tự động hoàn thành sau 5 ngày
                            </span>
                          )}
                          {item.status === 99 ? (
                            <>
                              <strong>Lý do hủy đơn:</strong>{" "}
                              {item.cancel_reason
                                ? item.cancel_reason
                                : "Không có lý do"}
                            </>
                          ) : (
                            ""
                          )}
                          {item.status === 49 ? (
                            <>
                              <strong>Lý do trả hàng:</strong>{" "}
                              {item.cancel_reason
                                ? item.cancel_reason
                                : "Không có lý do"}
                            </>
                          ) : (
                            ""
                          )}
                          {item.status === 50 ? (
                            <>
                              <strong>Lý do trả hàng:</strong>{" "}
                              {item.cancel_reason
                                ? item.cancel_reason
                                : "Không có lý do"}
                            </>
                          ) : (
                            ""
                          )}
                        </div>
                        {item.status === 10 && (
                          <div className="col-md-12 col-lg-12 d-flex justify-content-end ">
                            {/* Order refund */}
                            <button
                              type="button"
                              class="btn btn-warning"
                              data-bs-toggle="modal"
                              data-bs-target={`#orderRefund${item.id}`}
                            >
                              Trả hàng
                            </button>
                            <div
                              class="modal fade "
                              id={`orderRefund${item.id}`}
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
                                      Yêu cầu trả lại hàng đơn hàng {item.id}
                                    </h5>
                                    <button
                                      type="button"
                                      class="btn-close"
                                      data-bs-dismiss="modal"
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div class="modal-body">
                                    <div className="form-group">
                                      <label htmlFor="orderRefundReason">
                                        Lý do trả hàng
                                      </label>
                                      <textarea
                                        className="form-control"
                                        id="orderRefundReason"
                                        rows="3"
                                        value={orderRefundReason}
                                        onChange={(e) =>
                                          setOrderRefundReason(e.target.value)
                                        }
                                      ></textarea>
                                    </div>
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
                                      onClick={() => handleOrderRefund(item.id)}
                                    >
                                      Xác nhận
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Confirm order */}
                            <button
                              type="button"
                              class="btn btn-success ms-2"
                              data-bs-toggle="modal"
                              data-bs-target={`#orderSuccess${item.id}`}
                            >
                              Đã nhận hàng
                            </button>
                            <div
                              class="modal fade"
                              id={`orderSuccess${item.id}`}
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
                                      Xác nhận đã nhận được đơn hàng {item.id}
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
                                      Đóng
                                    </button>
                                    <button
                                      type="button"
                                      class="btn btn-primary"
                                      onClick={() =>
                                        handleOrderComplete(item.id)
                                      }
                                    >
                                      Xác nhận
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {item.status === 49 && (
                          <div className="col-md-12 col-lg-12 d-flex justify-content-end ">
                            <button
                              type="button"
                              class="btn btn-primary"
                              data-bs-toggle="modal"
                              data-bs-target={`#orderRefundCancel${item.id}`}
                            >
                              Huỷ yêu cầu trả hàng
                            </button>
                            <div
                              class="modal fade "
                              id={`orderRefundCancel${item.id}`}
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
                                      Hủy yêu cầu trả lại hàng đơn hàng{" "}
                                      {item.id}
                                    </h5>
                                    <button
                                      type="button"
                                      class="btn-close"
                                      data-bs-dismiss="modal"
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div class="modal-body">
                                    <div className="form-group">
                                      Xác nhận rằng bạn đã nhận được hàng số{" "}
                                      {item.id}
                                    </div>
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
                                        handleOrderRefundCancel(item.id)
                                      }
                                    >
                                      Xác nhận
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {item.status === 0 && (
                          <div className="col-md-12 col-lg-12 d-flex justify-content-end ">
                            {item.bankCode !== "COD" &&
                              item.payment_status !== 0 && (
                                <div className="col-md-2">
                                  <a
                                    className="btn btn-danger ms-5"
                                    data-abc="true"
                                    onClick={() =>
                                      handlePaymentAgain(
                                        item.id,
                                        item.payment_id,
                                        item.total_price
                                      )
                                    }
                                  >
                                    Thanh toán
                                  </a>
                                </div>
                              )}
                            <button
                              type="button"
                              class="btn btn-danger"
                              data-bs-toggle="modal"
                              data-bs-target={`#orderCancel${item.id}`}
                            >
                              Hủy đơn
                            </button>
                            <div
                              class="modal fade"
                              id={`orderCancel${item.id}`}
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
                                      Huỷ đơn hàng {item.id}
                                    </h5>
                                    <button
                                      type="button"
                                      class="btn-close"
                                      data-bs-dismiss="modal"
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div class="modal-body">
                                    <div className="form-group">
                                      <label htmlFor="orderCancelReason">
                                        Lý do huỷ đơn hàng
                                      </label>
                                      <textarea
                                        className="form-control"
                                        id="orderCancelReason"
                                        rows="3"
                                        value={orderCancelReason}
                                        onChange={(e) =>
                                          setOrderCancelReason(e.target.value)
                                        }
                                      ></textarea>
                                    </div>
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
                                      onClick={() => handleOrderCancel(item.id)}
                                    >
                                      Huỷ đơn
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  <div className="col-lg-12 text-center mt-4 mb-4">
                    <div className="pagination__option">
                      <button onClick={handleFirstPage}>
                        <i class="fa-solid fa-angles-left"></i>
                      </button>
                      {renderPagination()}
                      <button onClick={handleLastPage}>
                        <i class="fa-solid fa-angles-right"></i>
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="col-lg-9 col-md-9 text-center">
                  <p>Không có đơn hàng</p>
                </div>
              )}
            </article>
          </div>
        </>
      )}
    </div>
  );
}

export default OrderTracking;
