import Cart from "../../../components/Cart/Cart";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
function ShoppingCart() {
  return (
    <div>
      <Breadcrumb setBreadcrumb="Giỏ hàng" />
      <Cart />
    </div>
  );
}

export default ShoppingCart;
