import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import image from "../../assest/image/image.png";
import axios from "axios";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

function Products() {
  const navigate = useNavigate();
  const imageUrl = image;
  const [CollapseOpen, setCollapseOpen] = useState(true);
  const [products, setProducts] = useState([]);
  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState();
  const [totalPages, setTotalPages] = useState();

  useEffect(() => {
    axios
      .get(`/product/all/active/${pages}`)
      .then((response) => {
        setProducts(response.data.data);
        setCurrentPage(response.data.current_page);
        setTotalPages(response.data.total_page);
        console.log("P" + response.data.current_page);
        console.log(response.data);
        console.log(typeof response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [pages]);

  const handlePageChange = (page) => {
    console.log(page);
    setCurrentPage(page);
    setPages(page);
  };
  const renderPagination = () => {
    const displayedPages = 3;
    const startPage = Math.max(currentPage - 1, 1);
    const endPage = Math.min(startPage + displayedPages - 1, totalPages);

    return Array.from({ length: endPage - startPage + 1 }, (_, index) => {
      const page = startPage + index;

      return (
        <a
          key={page}
          href="#"
          onClick={() => handlePageChange(page)}
          className={currentPage === page ? "active" : ""}
        >
          {page}
        </a>
      );
    });
  };

  // const handlePreviousPage = () => {
  //   if (currentPage > 1) {
  //     setCurrentPage(currentPage - 1);
  //     setPages(currentPage - 1);
  //   }
  // };

  // const handleNextPage = () => {
  //   if (currentPage < totalPages) {
  //     setCurrentPage(currentPage + 1);
  //     setPages(currentPage + 1);
  //   }
  // };

  const handleFirstPage = () => {
    setCurrentPage(1);
    setPages(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
    setPages(totalPages);
  };

  const handleProductClick = (id) => {
    navigate(`/product/detail/${id}`);
  };

  const handleCollapseToggle = () => {
    setCollapseOpen(!CollapseOpen);
  };
  const handlePriceChange = (values) => {
    // Handle the price change here
    // values[0] represents the minimum price
    // values[1] represents the maximum price
    console.log("Selected price range:", values);
  };
  const formatNumber = (number) => {
    return number.toLocaleString("vi-VN");
  };
  return (
    <section className="shop spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-3">
            <div className="shop__sidebar">
              <div className="sidebar__categories">
                <div className="section-title">
                  <h4>Categories</h4>
                </div>
                <div className="categories__accordion">
                  <div className="accordion" id="accordionExample">
                    <div className="card">
                      <div
                        className={`card-heading ${
                          CollapseOpen ? "active" : ""
                        }`}
                      >
                        <a
                          data-toggle="collapse"
                          data-target="#collapseOne "
                          onClick={handleCollapseToggle}
                        >
                          Women
                        </a>
                      </div>
                      <div
                        id="collapseOne"
                        className={`collapse ${CollapseOpen ? "show" : ""}`}
                        data-parent="#accordionExample"
                      >
                        <div className="card-body">
                          <ul>
                            <li>
                              <a href="#">Coats</a>
                            </li>
                            <li>
                              <a href="#">Jackets</a>
                            </li>
                            <li>
                              <a href="#">Dresses</a>
                            </li>
                            <li>
                              <a href="#">Shirts</a>
                            </li>
                            <li>
                              <a href="#">T-shirts</a>
                            </li>
                            <li>
                              <a href="#">Jeans</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="sidebar__filter">
                <div className="section-title">
                  <h4>Shop by price</h4>
                </div>
                <div className="filter-range-wrap">
                  <Slider
                    min={33}
                    max={99}
                    defaultValue={[33, 99]}
                    onChange={handlePriceChange}
                    range
                    style={{ width: "50%" }}
                  />
                  <div className="range-slider">
                    <div className="price-input">
                      <p>Price:</p>
                      <input type="text" id="minamount" />
                      <input type="text" id="maxamount" />
                    </div>
                  </div>
                </div>

                <a href="#">Filter</a>
              </div>

              <div className="sidebar__sizes">
                <div className="section-title">
                  <h4>Shop by size</h4>
                </div>
                <div className="size__list">
                  <label htmlFor="xxs">
                    xxs
                    <input type="checkbox" id="xxs" />
                    <span className="checkmark"></span>
                  </label>
                  <label htmlFor="xs">
                    xs
                    <input type="checkbox" id="xs" />
                    <span className="checkmark"></span>
                  </label>
                  <label htmlFor="xss">
                    xs-s
                    <input type="checkbox" id="xss" />
                    <span className="checkmark"></span>
                  </label>
                  <label htmlFor="s">
                    s
                    <input type="checkbox" id="s" />
                    <span className="checkmark"></span>
                  </label>
                  <label htmlFor="m">
                    m
                    <input type="checkbox" id="m" />
                    <span className="checkmark"></span>
                  </label>
                  <label htmlFor="ml">
                    m-l
                    <input type="checkbox" id="ml" />
                    <span className="checkmark"></span>
                  </label>
                  <label htmlFor="l">
                    l
                    <input type="checkbox" id="l" />
                    <span className="checkmark"></span>
                  </label>
                  <label htmlFor="xl">
                    xl
                    <input type="checkbox" id="xl" />
                    <span className="checkmark"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-9 col-md-9">
            <div className="row">
              {products.map((product) => (
                <div className="col-lg-4 col-md-6" key={product.id}>
                  <div
                    className={`product__item${product.is_sale ? " sale" : ""}`}
                  >
                    <div
                      className="product__item__pic set-bg"
                      style={{ backgroundImage: `url(${imageUrl})` }}
                      onClick={() => handleProductClick(product.id)}
                    >
                      <div className={`label${product.is_sale ? " sale" : ""}`}>
                        {product.is_sale ? " Sale" : ""}
                      </div>

                      <ul className="product__hover">
                        <li>
                          <a href="#">
                            <span className="fa-solid fa-cart-shopping"></span>
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

                      <div className="product__price">
                        {product.is_sale ? (
                          <>
                            {formatNumber(product.sale_price)} đ{" "}
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
            <div className="col-lg-12 text-center">
              <div className="pagination__option">
                <button onClick={handleFirstPage}>
                  <i class="fa-solid fa-angles-left"></i>
                </button>
                {/* <button onClick={handlePreviousPage}>&lt;</button> */}
                {renderPagination()}
                {/* <button onClick={handleNextPage}>&gt;</button> */}
                <button onClick={handleLastPage}>
                  <i class="fa-solid fa-angles-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Products;
