import image from "../../assest/image/image.png";

function TrendSection() {
  const imageUrl = image;
  return (
    <section className="trend spad">
      <div className="container">
        <div className="row">
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
