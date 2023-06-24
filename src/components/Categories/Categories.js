import { useState, useEffect } from "react";
import axios from "axios";
import image from "../../assest/image/image.png";

function Categories() {
  const [imageProduct, setImageProduct] = useState([]);

  axios
    .get(`/file/img/${"Gundam_banner_3.png"}`, { responseType: "blob" })
    .then((response) => {
      setImageProduct((imageProduct) => [
        ...imageProduct,
        URL.createObjectURL(response.data),
      ]);
    })
    .catch((error) => {
      console.log(error);
    });

  const imageUrl = image;
  return (
    <section className="categories">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6 p-0">
            <div
              className="categories__item categories__large__item set-bg"
              style={{ backgroundImage: `url(${imageUrl})` }}
            >
              <div className="categories__text">
                <h1>Women’s fashion</h1>
                <p>
                  Sitamet, consectetur adipiscing elit, sed do eiusmod tempor
                  incidid-unt labore edolore magna aliquapendisse ultrices
                  gravida.
                </p>
                <a href="#">Shop now</a>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 p-0">
                <div
                  className="categories__item set-bg"
                  style={{ backgroundImage: `url(${imageUrl})` }}
                >
                  <div className="categories__text">
                    <h4>Men’s fashion</h4>
                    <p>358 items</p>
                    <a href="#">Shop now</a>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 p-0">
                <div
                  className="categories__item set-bg"
                  style={{ backgroundImage: `url(${imageUrl})` }}
                >
                  <div className="categories__text">
                    <h4>Kid’s fashion</h4>
                    <p>273 items</p>
                    <a href="#">Shop now</a>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 p-0">
                <div
                  className="categories__item set-bg"
                  style={{ backgroundImage: `url(${imageUrl})` }}
                >
                  <div className="categories__text">
                    <h4>Cosmetics</h4>
                    <p>159 items</p>
                    <a href="#">Shop now</a>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 p-0">
                <div
                  className="categories__item set-bg"
                  style={{ backgroundImage: `url(${imageUrl})` }}
                >
                  <div className="categories__text">
                    <h4>Accessories</h4>
                    <p>792 items</p>
                    <a href="#">Shop now</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Categories;
