import HomePage from "./HomePage/HomePage";
import Products from "./Products/Products";
import ProductDetail from "./Products/ProductDetail";
import Cart from "./ShoppingCart/ShoppingCart";
import Checkout from "./ShoppingCart/Checkout";
import Profile from "../../components/Profile/Profile";
import Login from "../login_resgis/Login";
import Regis from "../login_resgis/Regis";
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
        <Route path="/product/detail/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/regis" element={<Regis />} />
      </Routes>
      <Footer />
    </div>
  );
}
export default App;
