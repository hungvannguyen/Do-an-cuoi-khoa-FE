import { useState, useEffect } from "react";
import axios from "axios";

function OrderTracking() {
  // token
  const token = sessionStorage.getItem("token");
  // useState
  const [page, setPage] = useState(1);
  const [order_status, setOrderStatus] = useState(0);
  const [product, setProduct] = useState([]);
  const [order, setOrder] = useState([]);

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
        console.log("Order");
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Format number
  const formatNumber = (number) => {
    if (number) {
      return number.toLocaleString("vi-VN");
    }
    return "";
  };

  return (
    <div className="container mt-5">
      <article className="card">
        <header className="card-header"> My Orders / Tracking </header>
        {order.map((item) => (
          <div className="card-body">
            <h6>Mã đơn hàng: {item.id}</h6>
            <article className="card">
              <div className="card-body row">
                <div className="col">
                  <strong>Estimated Delivery time:</strong> <br />
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
              {item.products.map((product) => (
                <li className="col-md-4">
                  <figure className="itemside mb-3 d-flex">
                    <div className="aside">
                      <img
                        src="https://i.imgur.com/iDwDQ4o.png"
                        className="img-sm border"
                        style={{ width: "100px" }}
                      />
                    </div>
                    <figcaption className="info align-self-center ms-2">
                      <p className="title">{product.name}</p>
                      <span className="text-muted">
                        {formatNumber(product.price)} đ{" "}
                      </span>
                      <span className="text-muted">x {product.quantity}</span>
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
      </article>
    </div>
  );
}

export default OrderTracking;
