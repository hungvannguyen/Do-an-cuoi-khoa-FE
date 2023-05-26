import image from "../../assest/image/image.png";
import { Link } from "react-router-dom";

function Cart() {
  const imageUrl = image;
  return (
    <section className="shop-cart spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="shop__cart__table">
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="cart__product__item">
                      <img src={imageUrl} alt="" width="90" />
                      <div className="cart__product__item__title">
                        <h6>Chain bucket bag</h6>
                        <div className="rating">
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                        </div>
                      </div>
                    </td>
                    <td className="cart__price">$ 150.0</td>
                    <td className="cart__quantity">
                      <div className="pro-qty">
                        <input type="text" value="1" />
                      </div>
                    </td>
                    <td className="cart__total">$ 300.0</td>
                    <td className="cart__close">
                      <span className="icon_close"></span>
                    </td>
                  </tr>
                  <tr>
                    <td className="cart__product__item">
                      <img src={imageUrl} alt="" width="90" />
                      <div className="cart__product__item__title">
                        <h6>Chain bucket bag</h6>
                        <div className="rating">
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                        </div>
                      </div>
                    </td>
                    <td className="cart__price">$ 150.0</td>
                    <td className="cart__quantity">
                      <div className="pro-qty">
                        <input type="text" value="1" />
                      </div>
                    </td>
                    <td className="cart__total">$ 300.0</td>
                    <td className="cart__close">
                      <span className="icon_close"></span>
                    </td>
                  </tr>
                  <tr>
                    <td className="cart__product__item">
                      <img src={imageUrl} alt="" width="90" />
                      <div className="cart__product__item__title">
                        <h6>Chain bucket bag</h6>
                        <div className="rating">
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                        </div>
                      </div>
                    </td>
                    <td className="cart__price">$ 150.0</td>
                    <td className="cart__quantity">
                      <div className="pro-qty">
                        <input type="text" value="1" />
                      </div>
                    </td>
                    <td className="cart__total">$ 300.0</td>
                    <td className="cart__close">
                      <span className="icon_close"></span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-6">
            <div className="cart__btn">
              <Link to="#">Continue Shopping</Link>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6">
            <div className="cart__btn update__btn">
              <Link to="#">
                <span className="icon_loading"></span> Update cart
              </Link>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div className="discount__content">
              <h6>Discount codes</h6>
              <form action="#">
                <input type="text" placeholder="Enter your coupon code" />
                <button type="submit" className="site-btn">
                  Apply
                </button>
              </form>
            </div>
          </div>
          <div className="col-lg-4 offset-lg-2">
            <div className="cart__total__procced">
              <h6>Cart total</h6>
              <ul>
                <li>
                  Subtotal <span>$ 750.0</span>
                </li>
                <li>
                  Total <span>$ 750.0</span>
                </li>
              </ul>
              <Link to="#" className="primary-btn">
                Proceed to checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;
