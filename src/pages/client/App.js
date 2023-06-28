import HomePage from "./HomePage/HomePage";
import Products from "./Products/Products";
import ProductDetail from "./Products/ProductDetail";
import Cart from "./ShoppingCart/ShoppingCart";
import Checkout from "./ShoppingCart/Checkout";
import Profile from "./Profile/Profile";
import Address from "./Profile/Address";
import Login from "../login_resgis/Login";
import Regis from "../login_resgis/Regis";
import ResetPassword from "../login_resgis/ResetPassword";
import Success from "./Success/Success";
import PaymentSuccessPage from "./PaymentSuccess/PaymentSuccess";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Load from "../../components/Loading/Loading";
import NotFound from "../../components/404 page/404Page";
import Confirm from "../../components/EmailConfirmation/Confirm";
import Verified from "../../components/EmailConfirmation/Verified";
import PaymentReturn from "../../components/PaymentReturn/PaymentReturn";
import OrderTracking from "./Order/OrderTracking";
import { useState, useEffect } from "react";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = sessionStorage.getItem("token");
  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
      console.log("IsLoggedIn");
      console.log(token);
    } else {
      setIsLoggedIn(false);
      console.log("IsNotLoggedIn");
      console.log(token);
    }
  }, [token]);

  return (
    <div>
      <Header />
      <Load />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/detail/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/order/tracking" element={<OrderTracking />} />
        <Route path="/login" element={isLoggedIn ? <HomePage /> : <Login />} />
        <Route path="/address" element={<Address />} />
        <Route path="/regis" element={<Regis />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/confirm" element={<Confirm />} />
        <Route path="/email/confirm" element={<Verified />} />
        <Route path="/success" element={<Success />} />
        <Route path="/payment_success" element={<PaymentSuccessPage />} />
        <Route path="/payment_return" element={<PaymentReturn />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}
export default App;
