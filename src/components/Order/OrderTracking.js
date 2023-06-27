import Loading from "../Loading/Loading";
import { useState, useEffect } from "react";
import axios from "axios";

function OrderTracking() {
  // token
  const token = sessionStorage.getItem("token");
  // useState
  const [loading, setLoading] = useState(true);
  const [order_status, setOrderStatus] = useState(0);
  const [product, setProduct] = useState([]);
  const [order, setOrder] = useState([]);
  const [imageProduct, setImageProduct] = useState([]);
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  let counter = 0;

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
        setProduct(response.data.data);
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
        console.log(error);
      });

    console.log("Order length");
    console.log(order.length);
  }, [page, currentPage, order_status]);

  // Handle Order Status
  const handleOrderStatusChange = (status) => {
    setOrderStatus(status);
    setLoading(true);
  };

  // Render the dropdown menu items
  const renderDropdownItems = () => {
    const statuses = [
      { value: 0, label: "Tất cả" },
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
          <div className="container mt-5">
            <article className="card">
              <div>
                <header className="card-header"> My Orders / Tracking </header>
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
                    >
                      {renderDropdownItems()}
                    </ul>
                  </div>
                </div>
              </div>
              {order.length > 0 ? (
                <>
                  {order.map((item, index) => (
                    <div className="card-body" key={index}>
                      <h6 className="mb-3">
                        <strong>Mã đơn hàng: {item.id}</strong>{" "}
                      </h6>
                      <article className="card">
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
                            {item.status === 0 && <span>Chờ xác nhận</span>}
                            {item.status === 1 && <span>Đã xác nhận</span>}
                            {item.status === 2 && <span>Đang vận chuyển</span>}
                            {item.status === 10 && <span>Đã giao hàng</span>}
                            {item.status === 99 && <span>Đã hủy</span>}
                            {item.status === 100 && <span>Hoàn thành</span>}
                          </div>
                        </div>
                      </article>

                      <hr />
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
                                  x {product.quantity}
                                </span>
                              </figcaption>
                            </figure>
                          </li>
                        ))}
                      </ul>
                      <hr />
                      <a href="#" className="btn btn-warning" data-abc="true">
                        {" "}
                        <i className="fa fa-chevron-left"></i> Back to orders
                      </a>
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
                  <p>Không có sản phẩm</p>
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
