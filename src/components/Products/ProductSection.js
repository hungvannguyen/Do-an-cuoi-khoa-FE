import image from "../../assest/image/image.png";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
function ProductSection() {
  const imageUrl = image;
  const [newProduct, setNewProduct] = useState([]);

  useEffect(() => {
    axios
      .get("/product/new")
      .then((response) => {
        setNewProduct(response.data);
        console.log(response.data);
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
              <h4>New product</h4>
            </div>
          </div>
        </div>
        <div className="row property__gallery">
          {newProduct.map((product) => (
            <div className="col-lg-3 col-md-4 col-sm-6 mix ">
              <div className="product__item">
                <div
                  className="product__item__pic set-bg"
                  style={{ backgroundImage: `url(${imageUrl})` }}
                >
                  <div className="label new">New</div>
                  <ul className="product__hover">
                    <li>
                      <a
                        href="img/product/product-1.jpg"
                        className="image-popup"
                      >
                        <span className="arrow_expand"></span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="icon_heart_alt"></span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="icon_bag_alt"></span>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="product__item__text">
                  <h6>
                    <Link to={`/product/detail/${product.id}`}>
                      {product.name}
                    </Link>
                  </h6>
                  <br />
                  <div className="product__price">
                    {product.is_sale ? (
                      <>
                        {formatNumber(
                          product.price * (1 - product.sale_percent / 100)
                        )}
                        đ<span>{formatNumber(product.price)} đ</span>
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
      </div>
    </section>
  );
}

export default ProductSection;
