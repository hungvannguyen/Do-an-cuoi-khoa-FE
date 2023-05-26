import ProductCategory from "../../../components/Products/Products";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
function Products() {
  return (
    <div>
      <Breadcrumb setBreadcrumb="Sản phẩm" />
      <ProductCategory />
    </div>
  );
}

export default Products;
