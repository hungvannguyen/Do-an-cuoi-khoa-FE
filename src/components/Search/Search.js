import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Search({ onClose }) {
  const navigate = useNavigate();
  //  useState
  const [searchKey, setSearchKey] = useState("");

  const handleSearch = (value) => {
    setSearchKey(value);
  };

  return (
    <div className="search-model">
      <div className="h-100 d-flex align-items-center justify-content-center">
        <div className="search-close-switch" onClick={onClose}>
          +
        </div>
        <form className="search-model-form">
          <input
            value={searchKey}
            type="text"
            id="search-input"
            placeholder="Tìm kiếm sản phẩm....."
            onChange={(e) => handleSearch(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                navigate(`/products?status=search&keyword=${searchKey}`);
                onClose();
              }
            }}
          />
        </form>
      </div>
    </div>
  );
}
export default Search;
