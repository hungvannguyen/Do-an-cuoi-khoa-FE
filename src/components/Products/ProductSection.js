import image from "../../assest/image/image.png";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ProductSection() {
  const imageUrl = image;
  const [newProduct, setNewProduct] = useState([]);

  useEffect(() => {
    axios
      .get(`/product/new/`)
      .then((response) => {
        setNewProduct(response.data.data);
    
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const formatNumber = (number) => {
    return number.toLocaleString("vi-VN");
  };

  return (
    <section className="product spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-4">
            <div className="section-title">
              <h4>Sản phẩm mới</h4>
            </div>
          </div>
        </div>
        <div className="row property__gallery">
          {newProduct.slice(0, 4).map((product) => (
            <div className="col-lg-3 col-md-4 col-sm-6 mix ">
              <div className="product__item">
                <div
                  className="product__item__pic set-bg"
                  style={{ backgroundImage: `url(${imageUrl})` }}
                >
                  <div className="label new">Mới</div>
                </div>
                <div className="product__item__text">
                  <h6>
                    <Link to={`/product/detail/${product.id}`}>
                      {product.name}
                    </Link>
                  </h6>
                  <br />
                  <div
                    className={`product__price${
                      product.is_sale ? " sale" : ""
                    }`}
                  >
                    {product.is_sale ? (
                      <>
                        {formatNumber(product.sale_price)}đ
                        <span>{formatNumber(product.price)} đ</span>
                      </>
                    ) : (
                      `${formatNumber(product.price)} đ`
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center" }}>
          <Link
            className="watch_more"
            to="/products?status=new"
            style={{ margin: "0 auto" }}
          >
            Xem thêm
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ProductSection;
