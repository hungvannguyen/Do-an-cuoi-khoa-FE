function ServicesSection() {
  return (
    <section className="services spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-4 col-sm-6">
            <div className="services__item">
              <i className="fa fa-car"></i>
              <h6>Miễn phí vận chuyển</h6>
              <p>Đơn hàng trong khu vực Hà Nội</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6">
            <div className="services__item">
              <i className="fa fa-money"></i>
              <h6>Hoàn hàng</h6>
              <p>Nếu sản phẩm có lỗi</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6">
            <div className="services__item">
              <i className="fa fa-support"></i>
              <h6>Hỗ trợ trực tuyến 24/7</h6>
              <p>Hỗ trợ tận tình</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6">
            <div className="services__item">
              <i className="fa fa-headphones"></i>
              <h6>Thanh toán an toàn</h6>
              <p>Thanh toán an toàn 100%</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
