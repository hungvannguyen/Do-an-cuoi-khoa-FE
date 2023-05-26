import Categories from "../../../components/Categories/Categories";
import ProductSection from "../../../components/Products/ProductSection";
import TrendSection from "../../../components/Trend/TrendSection";
import BannerSection from "../../../components/Banner/BannerSection";
import DiscountSection from "../../../components/Discount/DiscountSection";
import ServicesSection from "../../../components/Services/ServicesSection";
import Search from "../../../components/Search/Search";
function HomePage() {
  return (
    <div>
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
