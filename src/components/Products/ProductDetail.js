import image from "../../assest/image/image.png";
import { useState } from "react";
function ProductDetail() {
  const imageUrl = image;
  const [quantity, setQuantity] = useState(1);
  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  return (
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
                Essential structured blazer{" "}
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
              <div className="product__details__price">
                $ 75.0 <span>$ 83.0</span>
              </div>
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
                <a href="#" className="cart-btn">
                  <span className="icon_bag_alt"></span> Add to cart
                </a>
             
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
                  <p>
                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
                    odit aut loret fugit, sed quia consequuntur magni dolores
                    eos qui ratione voluptatem sequi nesciunt loret. Neque porro
                    lorem quisquam est, qui dolorem ipsum quia dolor si. Nemo
                    enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                    aut loret fugit, sed quia ipsu consequuntur magni dolores
                    eos qui ratione voluptatem sequi nesciunt. Nulla consequat
                    massa quis enim.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                    Aenean commodo ligula eget dolor. Aenean massa. Cum sociis
                    natoque penatibus et magnis dis parturient montes, nascetur
                    ridiculus mus. Donec quam felis, ultricies nec, pellentesque
                    eu, pretium quis, sem.
                  </p>
                </div>
                <div className="tab-pane" id="tabs-2" role="tabpanel">
                  <h6>Specification</h6>
                  <p>
                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
                    odit aut loret fugit, sed quia consequuntur magni dolores
                    eos qui ratione voluptatem sequi nesciunt loret. Neque porro
                    lorem quisquam est, qui dolorem ipsum quia dolor si. Nemo
                    enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                    aut loret fugit, sed quia ipsu consequuntur magni dolores
                    eos qui ratione voluptatem sequi nesciunt. Nulla consequat
                    massa quis enim.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                    Aenean commodo ligula eget dolor. Aenean massa. Cum sociis
                    natoque penatibus et magnis dis parturient montes, nascetur
                    ridiculus mus. Donec quam felis, ultricies nec, pellentesque
                    eu, pretium quis, sem.
                  </p>
                </div>
                <div className="tab-pane" id="tabs-3" role="tabpanel">
                  <h6>Reviews ( 2 )</h6>
                  <p>
                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
                    odit aut loret fugit, sed quia consequuntur magni dolores
                    eos qui ratione voluptatem sequi nesciunt loret. Neque porro
                    lorem quisquam est, qui dolorem ipsum quia dolor si. Nemo
                    enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                    aut loret fugit, sed quia ipsu consequuntur magni dolores
                    eos qui ratione voluptatem sequi nesciunt. Nulla consequat
                    massa quis enim.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                    Aenean commodo ligula eget dolor. Aenean massa. Cum sociis
                    natoque penatibus et magnis dis parturient montes, nascetur
                    ridiculus mus. Donec quam felis, ultricies nec, pellentesque
                    eu, pretium quis, sem.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;
