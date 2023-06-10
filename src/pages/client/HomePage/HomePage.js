import Categories from "../../../components/Categories/Categories";
import ProductSection from "../../../components/Products/ProductSection";
import TrendSection from "../../../components/Trend/TrendSection";
import BannerSection from "../../../components/Banner/BannerSection";
import DiscountSection from "../../../components/Discount/DiscountSection";
import ServicesSection from "../../../components/Services/ServicesSection";
import Search from "../../../components/Search/Search";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function HomePage() {
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
