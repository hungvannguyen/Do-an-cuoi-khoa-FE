import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function BannerSection() {
  const [imageBanners, setImageBanners] = useState([]);

  useEffect(() => {
    axios
      .get("/setting/all")
      .then((response) => {
        console.log(response.data);
        const imageName = [response.data.intro_banner];

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
            setImageBanners(filteredImageUrls);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <section
      className="banner set-bg"
      style={{ backgroundImage: `url(${imageBanners[0]})` }}
    >
      <div>
        <div className="row">
          <div className="col-xl- col-lg-5 ">
            <div className="banner__slider">
              <div className="banner__item">
                <div className="banner__text">
                  {/* <span>Mở rộng bộ sưu tập</span>
                  <h1>Bằng những mẫu Gundam chất lượng</h1>
                  <Link to="/products">Mua ngay</Link> */}
                </div>
              </div>
              {/* Repeat the banner__item blocks with different content */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BannerSection;
