import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ProductSection() {
  // useState for ProductSection
  const [newProduct, setNewProduct] = useState([]);
  const [imageProduct, setImageProduct] = useState([]);

  // Call API to get ProductSection
  useEffect(() => {
    axios
      .get(`/product/new/`)
      .then((response) => {
        setNewProduct(response.data.data);
        const imageName = response.data.data.map((product) => {
          return product.img_url;
        });
        Promise.all(
          imageName.map((imageName) => {
            return axios
              .get(`/file/img/${imageName}`, { responseType: "blob" })
              .then((response) => URL.createObjectURL(response.data))
              .catch((error) => {
                console.log(error);
                return null;
              });
          })
        )
          .then((imageUrls) => {
            const filteredImageUrls = imageUrls.filter((url) => url !== null);
            setImageProduct(filteredImageUrls);
            console.log(filteredImageUrls);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Format number
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
          {newProduct.slice(0, 4).map((product, index) => (
            <div className="col-lg-3 col-md-4 col-sm-6 mix ">
              <div className="product__item">
                {index < imageProduct.length && (
                  <div
                    className="product__item__pic set-bg"
                    style={{ backgroundImage: `url(${imageProduct[index]})` }}
                  >
                    <div className="label new">Mới</div>
                  </div>
                )}
                <div className="product__item__text">
                  <h6>
                    <Link to={`/product/detail/${product.id}`}>
                      {product.name}
                    </Link>
                  </h6>
                  <br />
                  <div
                    className={`product__price${
                      product.is_sale === 1 ? " sale" : ""
                    }`}
                  >
                    {product.is_sale === 1 ? (
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
