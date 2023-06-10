import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [active, setActive] = useState(0);
  const handleItemClick = (index) => {
    setActive(index);
  };
  return (
    <div className="col-lg-2" style={{ marginTop: 30 }}>
      <div className="list-group">
        <Link
          to="/profile"
          type="button"
          className={`list-group-item list-group-item-action ${
            active === 0 ? "active" : ""
          }`}
          onClick={() => handleItemClick(0)}
        >
          Hồ sơ
        </Link>

        <Link
          to="/address"
          type="button"
          className={`list-group-item list-group-item-action ${
            active === 1 ? "active" : ""
          }`}
          onClick={() => handleItemClick(1)}
        >
          Địa chỉ
        </Link>
      </div>
    </div>
  );
}
export default Navbar;
