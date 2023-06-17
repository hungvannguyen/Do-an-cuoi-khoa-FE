import image from "../../assest/image/image.png";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function TrendSection() {
  const imageUrl = image;
  const [saleProducts, setSaleProducts] = useState([]);
  const [bestSaleProducts, setBestSaleProducts] = useState([]);
  const [pages, setPages] = useState(1);
  useEffect(() => {
    axios
      .get(`/product/sale/?page=${pages}`)
      .then((response) => {
        setSaleProducts(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`/product/best-sale/?page=${pages}`)
      .then((response) => {
        setBestSaleProducts(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const formatNumber = (number) => {
    if (number) {
      return number.toLocaleString("vi-VN");
    }
    return "";
  };
  return (
    <section className="trend spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-4 col-sm-6">
            <div className="trend__content">
              <div className="section-title">
                <h4>Siêu giảm giá</h4>
              </div>
              {saleProducts.slice(0, 3).map((saleProduct) => (
                <div className="trend__item">
                  <div className="trend__item__pic">
                    <img src={imageUrl} alt="" style={{ width: 90 }} />
                  </div>
                  <div className="trend__item__text">
                    <h6>{saleProduct.name}</h6>

                    <div className="product__price">
                      {formatNumber(saleProduct.price)} đ
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-4 col-md-4 col-sm-6">
            <div className="trend__content">
              <div className="section-title">
                <h4>Bán chạy</h4>
              </div>
              {bestSaleProducts.slice(0, 3).map((bestSaleProduct) => (
                <div className="trend__item">
                  <div className="trend__item__pic">
                    <img src={imageUrl} alt="" style={{ width: 90 }} />
                  </div>
                  <div className="trend__item__text">
                    <h6>Chain bucket bag</h6>
                    <div className="rating">
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                    </div>
                    <div className="product__price">$ 59.0</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-6">
            <div className="trend__content">
              <div className="section-title">
                <h4>Hot Trend</h4>
              </div>
              <div className="trend__item">
                <div className="trend__item__pic">
                  <img src={imageUrl} alt="" style={{ width: 90 }} />
                </div>
                <div className="trend__item__text">
                  <h6>Chain bucket bag</h6>
                  <div className="rating">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                  </div>
                  <div className="product__price">$ 59.0</div>
                </div>
              </div>
              {/* Repeat the trend__item blocks with different content */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrendSection;
