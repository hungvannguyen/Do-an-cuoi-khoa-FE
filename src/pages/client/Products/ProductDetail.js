import Product from "../../../components/Products/ProductDetail";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
function ProductDetail() {
  return (
    <div>
      <Breadcrumb setBreadcrumb="Sản phẩm ABC" />
      <Product />
    </div>
  );
}

export default ProductDetail;
