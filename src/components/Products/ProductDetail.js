import image from "../../assest/image/image.png";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
function ProductDetail() {
  const navigate = useNavigate();
  const imageUrl = image;
  const { id } = useParams();

  const [ProductDetail, setProductDetail] = useState({});
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios
      .get(`/product/${id}`)
      .then((response) => {
        setProductDetail(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(ProductDetail.price);

  const formatPrice = (price, salePrice, isSale) => {
    if (
      typeof price !== "undefined" &&
      price !== null &&
      typeof price.toLocaleString === "function"
    ) {
      const formattedPrice = price.toLocaleString("vi-VN");

      if (isSale === 1) {
        const formattedSalePrice = salePrice.toLocaleString("vi-VN");
        const originalPrice = `<span>${formattedPrice} đ</span>`;
        return ` ${formattedSalePrice} đ ${originalPrice}`;
      } else {
        return `${formattedPrice} đ`;
      }
    } else {
      return "";
    }
  };
  const isSale = ProductDetail.is_sale; // Extract the value of 'is_sale' from the API response
  const price = ProductDetail.price; // Extract the value of 'price' from the API response
  const salePrice =
    ProductDetail.is_sale === 1 ? ProductDetail.sale_price : null;

  const productPrice = formatPrice(price, salePrice, isSale);

  const priceContainer = document.querySelector(".product__details__price");
  if (priceContainer) {
    if (isSale === 1) {
      priceContainer.innerHTML = productPrice;
    } else {
      priceContainer.textContent = productPrice;
    }
  }

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = (id) => {

    axios
      .post(
        `/cart/add`,
        { prd_id: id, quantity: quantity },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        navigate("/cart");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Breadcrumb setBreadcrumb={ProductDetail.name} />
      <section className="product-details spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="product__details__pic">
                <div className="product__details__slider__content">
                  <div className="product__details__pic__slider owl-carousel">
                    <img
                      data-hash="product-1"
                      className="product__big__img"
                      src={imageUrl}
                      alt=""
                    />
                    <img
                      data-hash="product-2"
                      className="product__big__img"
                      src="img/product/details/product-3.jpg"
                      alt=""
                    />
                    <img
                      data-hash="product-3"
                      className="product__big__img"
                      src="img/product/details/product-2.jpg"
                      alt=""
                    />
                    <img
                      data-hash="product-4"
                      className="product__big__img"
                      src="img/product/details/product-4.jpg"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="product__details__text">
                <h3>
                  {ProductDetail.name}
                  <span>Brand: SKMEIMore Men Watches from SKMEI</span>
                </h3>
                <div className="rating">
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <span>( 138 reviews )</span>
                </div>
                <div className="product__details__price"></div>
                <p>
                  Nemo enim ipsam voluptatem quia aspernatur aut odit aut loret
                  fugit, sed quia consequuntur magni lores eos qui ratione
                  voluptatem sequi nesciunt.
                </p>
                <div className="product__details__button">
                  <div className="quantity">
                    <span>Quantity:</span>
                    <div className="pro-qty">
                      <span
                        className="dec qtybtn"
                        onClick={handleDecreaseQuantity}
                      >
                        -
                      </span>
                      <input type="text" value={quantity} />
                      <span
                        className="inc qtybtn"
                        onClick={handleIncreaseQuantity}
                      >
                        +
                      </span>
                    </div>
                  </div>
                  <div
                    className="cart-btn"
                    onClick={() => handleAddToCart(ProductDetail.id)}
                  >
                    <span className="icon_bag_alt"></span> Add to cart
                  </div>
                </div>
                <div className="product__details__widget">
                  <ul>
                    <li>
                      <span>Availability:</span>
                      <div className="stock__checkbox">
                        <label htmlFor="stockin">
                          In Stock
                          <input type="checkbox" id="stockin" />
                          <span className="checkmark"></span>
                        </label>
                      </div>
                    </li>
                    <li>
                      <span>Promotions:</span>
                      <p>Free shipping</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="product__details__tab">
                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      data-toggle="tab"
                      href="#tabs-1"
                      role="tab"
                    >
                      Description
                    </a>
                  </li>
                </ul>
                <div className="tab-content">
                  <div className="tab-pane active" id="tabs-1" role="tabpanel">
                    <h6>Description</h6>
                    <p>{ProductDetail.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductDetail;
