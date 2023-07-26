import Categories from "../../../components/Categories/Categories";
import ProductSection from "../../../components/Products/ProductSection";
import TrendSection from "../../../components/Trend/TrendSection";
import BannerSection from "../../../components/Banner/BannerSection";
import DiscountSection from "../../../components/Discount/DiscountSection";
import ServicesSection from "../../../components/Services/ServicesSection";
import Search from "../../../components/Search/Search";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function HomePage() {
  const location = useLocation();
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");
    const role_id = searchParams.get("role_id");
    if (token != null && role_id != null) {
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("role_id", role_id);
      console.log("token");
      console.log(token);
      console.log("role_id");
      console.log(role_id);
    }
  }, []);

  return (
    <div>
      <ToastContainer />
      <Categories />
      <ProductSection />
      <BannerSection />
      <TrendSection />
      <DiscountSection />
      <ServicesSection />
    </div>
  );
}

export default HomePage;
