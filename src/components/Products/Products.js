import Loading from "../Loading/Loading";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
// import Search from "../../../components/Search/Search";
import axios from "axios";

function Products() {
  //  useNavigate
  const navigate = useNavigate();

  // useLocation
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const param = searchParams.get("status");
  const cat_id = searchParams.get("cat_id");
  const keyword = searchParams.get("keyword");
  // useState
  const [imageProduct, setImageProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [CollapseOpen, setCollapseOpen] = useState(true);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState();
  const [totalPages, setTotalPages] = useState();

  //  Filter

  const [selectedOption, setSelectedOption] = useState(null);
  const [sort, setSort] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  // Sort
  const base = 0;
  const increase = 1;
  const decrease = 2;
  const rangePrice = 3;
  // apiEndpoint
  let apiEndpoint = "";
  if (param === "sale") {
    apiEndpoint = `/product/sale/?page=${pages}`;
  } else if (param === "new") {
    apiEndpoint = `/product/new/?page=${pages}`;
  } else if (param === "catFilter") {
    apiEndpoint = `/product/category/${cat_id}?page=${pages}&sort=${sort}&min_price=${minPrice}&max_price=${maxPrice}`;
  } else if (param === "search") {
    console.log("search");
    apiEndpoint = `/product/search?keyword=${keyword}&page=${pages}&sort=${sort}&min_price=${minPrice}&max_price=${maxPrice}`;
  } else {
    apiEndpoint = `/product/all/active?page=${pages}&sort=${sort}&min_price=${minPrice}&max_price=${maxPrice}`;
  }

  // Api call get products
  useEffect(() => {
    axios
      .get(apiEndpoint)
      .then((response) => {
        setLoading(false);
        setProducts(response.data.data);
        setPages(response.data.current_page);
        setCurrentPage(response.data.current_page);
        setTotalPages(response.data.total_page);

        // console.log(response.data);
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
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        if (error.response.status === 404) {
          setProducts([]);
        }
      });
  }, [apiEndpoint, pages, currentPage, sort]);

  // Api call get categories
  useEffect(() => {
    axios
      .get("/category/all")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handlePageChange = (page) => {
    setLoading(true);
    setPages(page);
    setCurrentPage(page);
  };

  //  Pagination render
  const renderPagination = () => {
    const displayedPages = 3;
    const startPage = Math.max(currentPage - 1, 1);
    const endPage = Math.min(startPage + displayedPages - 1, totalPages);

    return Array.from({ length: endPage - startPage + 1 }, (_, index) => {
      const page = startPage + index;

      if (currentPage === page) {
        return (
          <a key={page} className="active disabled">
            {page}
          </a>
        );
      }

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

  // Pagination handle click first page
  const handleFirstPage = () => {
    if (currentPage === 1) {
      return;
    }
    setLoading(true);
    setCurrentPage(1);
    setPages(1);
  };
  //  Pagination handle click last page
  const handleLastPage = () => {
    if (currentPage === totalPages) {
      return;
    }
    setLoading(true);
    setCurrentPage(totalPages);
    setPages(totalPages);
  };
  //   Handle click product detail
  const handleProductClick = (id) => {
    navigate(`/product/detail/${id}`);
  };
  //  Handle click collapse toggle
  const handleCollapseToggle = () => {
    setCollapseOpen(!CollapseOpen);
  };
  // Handle price range filter
  const handlePriceRange = () => {
    setMinPrice(minPrice);
    setMaxPrice(maxPrice);
    setSort(rangePrice);
  };
  // Handle option change sort
  const handleOptionChange = (option) => {
    if (selectedOption === option) {
      setSelectedOption(null);
      setSort(base);
    } else {
      setSelectedOption(option);

      switch (option) {
        case "increase":
          setSort(increase);
          break;
        case "decrease":
          setSort(decrease);
          break;
        default:
          break;
      }
    }
  };
  // Format number price
  const formatNumber = (number) => {
    if (number) {
      return number.toLocaleString("vi-VN");
    }
    return "";
  };

  return (
    <div>
      <Loading isLoading={loading} />
      {!loading && (
        <>
          <section className="shop spad">
            <div className="container">
              <div className="row">
                <div className="col-lg-3 col-md-3">
                  <div className="shop__sidebar">
                    <div className="sidebar__categories">
                      <div className="section-title">
                        <h4>Danh mục</h4>
                      </div>
                      <div className="categories__accordion">
                        <div className="accordion" id="accordionExample">
                          <div className="card">
                            <div
                              className={`card-heading ${
                                CollapseOpen ? "active" : ""
                              }`}
                            >
                              <Link
                                to="/products"
                                data-toggle="collapse"
                                data-target="#collapseOne "
                                onClick={handleCollapseToggle}
                              >
                                Gundam
                              </Link>
                            </div>
                            <div
                              id="collapseOne"
                              className={`collapse ${
                                CollapseOpen ? "show" : ""
                              }`}
                              data-parent="#accordionExample"
                            >
                              <div className="card-body">
                                <ul>
                                  {categories.map((category) => (
                                    <li>
                                      <Link
                                        to={`/products?status=catFilter&cat_id=${category.id}`}
                                      >
                                        {category.cat_name}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="sidebar__filter">
                      <div className="section-title">
                        <h4>Lọc theo giá</h4>
                      </div>
                      <div className="filter-range-wrap">
                        <div className="range-slider">
                          <div className="price-input">
                            <label htmlFor="minamount">Giá:</label>
                            <div className="price-input">
                              <input
                                type="text"
                                id="minamount"
                                value={minPrice}
                                className="price-input-field"
                                onChange={(e) => setMinPrice(e.target.value)}
                              />
                              <input
                                type="text"
                                id="maxamount"
                                value={maxPrice}
                                className="price-input-field"
                                onChange={(e) => setMaxPrice(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <span onClick={handlePriceRange}>Lọc</span>
                    </div>

                    <div className="sidebar__sizes">
                      <div className="size__list">
                        <label htmlFor="xxs">
                          Giá tăng dần
                          <input
                            type="checkbox"
                            id="xxs"
                            checked={selectedOption === "increase"}
                            onChange={() => handleOptionChange("increase")}
                          />
                          <span className="checkmark"></span>
                        </label>
                        <label htmlFor="xs">
                          Giá giảm dần
                          <input
                            type="checkbox"
                            id="xs"
                            checked={selectedOption === "decrease"}
                            onChange={() => handleOptionChange("decrease")}
                          />
                          <span className="checkmark"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                {products.length > 0 ? (
                  <div className="col-lg-9 col-md-9">
                    <div className="row">
                      {products.map((product, index) => (
                        <div className="col-lg-4 col-md-6" key={product.id}>
                          <div
                            className={`product__item${
                              product.is_sale === 1 ? " sale" : ""
                            }`}
                          >
                            {index < imageProduct.length && (
                              <div
                                className="product__item__pic set-bg"
                                style={{
                                  backgroundImage: `url(${imageProduct[index]})`,
                                }}
                                onClick={() => handleProductClick(product.id)}
                              >
                                <div
                                  className={`label${
                                    product.is_sale === 1 ? " sale" : ""
                                  }`}
                                >
                                  {product.is_sale === 1 ? "Giảm giá" : ""}
                                </div>
                              </div>
                            )}
                          </div>
                          <div
                            className="product__item__text"
                            style={{ marginTop: -28 }}
                          >
                            <h6>
                              <Link to={`/product/detail/${product.id}`}>
                                {product.name}
                              </Link>
                            </h6>
                            <div className="product__price mb-4">
                              {product.is_sale === 1 ? (
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
                      ))}
                    </div>
                    <div className="col-lg-12 text-center">
                      <div className="pagination__option">
                        <button onClick={handleFirstPage}>
                          <i class="fa-solid fa-angles-left"></i>
                        </button>
                        {renderPagination()}
                        <button onClick={handleLastPage}>
                          <i class="fa-solid fa-angles-right"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="col-lg-9 col-md-9 text-center">
                    <p>Không có sản phẩm</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default Products;
