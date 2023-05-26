import HomePage from "./HomePage/HomePage";
import Products from "./Products/Products";
import ProductDetail from "./Products/ProductDetail";
import Cart from "./ShoppingCart/ShoppingCart";
import Checkout from "./ShoppingCart/Checkout";
import Profile from "../../components/Profile/Profile";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/detail" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </div>
  );
}
export default App;
