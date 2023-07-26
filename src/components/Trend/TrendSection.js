import image from "../../assest/image/image.png";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function TrendSection() {
  const imageUrl = image;
  const navigate = useNavigate();
  // useState for TrendSection
  const [imageProductSale, setImageProductSale] = useState([]);
  const [imageProductBestSale, setImageProductBestSale] = useState([]);
  const [saleProducts, setSaleProducts] = useState([]);
  const [bestSaleProducts, setBestSaleProducts] = useState([]);
  const [pages, setPages] = useState(1);

  // Call API to get TrendSection
  useEffect(() => {
    axios
      .get(`/product/sale/?page=${pages}`)
      .then((response) => {
        setSaleProducts(response.data.data);
        console.log("Product sale");
        console.log(response.data.data);
        const imageSaleName = response.data.data.map((product) => {
          return product.img_url;
        });
        Promise.all(
          imageSaleName.map((imageName) => {
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
            setImageProductSale(filteredImageUrls);
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

  useEffect(() => {
    axios
      .get("/product/best-seller")
      .then((response) => {
        setBestSaleProducts(response.data.data);
        console.log("Product");
        console.log(response.data.data);
        const imageSaleName = response.data.data.map((product) => {
          return product.img_url;
        });
        Promise.all(
          imageSaleName.map((imageName) => {
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
            setImageProductBestSale(filteredImageUrls);
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
  // Call API to get TrendSection
  useEffect(() => {
    axios
      .get(`/product/best-sale/?page=${pages}`)
      .then((response) => {
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
            setImageProductBestSale(filteredImageUrls);
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

  const handleOnClick = (id) => {
    navigate(`/product/detail/${id}`);
  };

  // Format number
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
          <div className="col-lg-4 col-md-4 col-sm-4">
            <div className="trend__content ms-5">
              <div className="section-title">
                <h4>Siêu giảm giá</h4>
              </div>
              {saleProducts.slice(0, 3).map((saleProduct, index) => (
                <div
                  className="trend__item"
                  onClick={() => handleOnClick(saleProduct.id)}
                  style={{ cursor: "pointer" }}
                >
                  {index < imageProductSale.length && (
                    <div className="trend__item__pic">
                      <img
                        src={imageProductSale[index]}
                        alt=""
                        style={{ width: 90 }}
                      />
                    </div>
                  )}
                  <div className="trend__item__text">
                    <h6>{saleProduct.name}</h6>

                    <div className="product__price">
                      {saleProduct.is_sale === 1 ? (
                        <>
                          {formatNumber(saleProduct.sale_price)} đ{" "}
                          <span>{formatNumber(saleProduct.price)} đ</span>
                        </>
                      ) : (
                        `${formatNumber(saleProduct.price)} đ`
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-4"></div>
          <div className="col-lg-4 col-md-4 col-sm-4">
            <div className="trend__content ms-5">
              <div className="section-title">
                <h4>Bán chạy</h4>
              </div>
              {bestSaleProducts.slice(0, 3).map((bestSaleProduct, index) => (
                <div
                  className="trend__item"
                  onClick={() => handleOnClick(bestSaleProduct.id)}
                  style={{ cursor: "pointer" }}
                >
                  {index < imageProductBestSale.length && (
                    <div className="trend__item__pic">
                      <img
                        src={imageProductBestSale[index]}
                        alt=""
                        style={{ width: 90 }}
                      />
                    </div>
                  )}
                  <div className="trend__item__text">
                    <h6>{bestSaleProduct.name}</h6>

                    <div className="product__price">
                      {bestSaleProduct.is_sale === 1 ? (
                        <>
                          {formatNumber(bestSaleProduct.sale_price)} đ{" "}
                          <span>{formatNumber(bestSaleProduct.price)} đ</span>
                        </>
                      ) : (
                        `${formatNumber(bestSaleProduct.price)} đ`
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* <div className="col-lg-4 col-md-4 col-sm-6">
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
           
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}

export default TrendSection;
