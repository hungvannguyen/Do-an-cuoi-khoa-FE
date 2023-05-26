import CartCheckout from "../../../components/Cart/Checkout";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
function Checkout() {
  return (
    <div>
      <Breadcrumb setBreadcrumb="Thanh toán" />
      <CartCheckout />
    </div>
  );
}
export default Checkout;
