import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Narbar.css";

const Narbar = () => {
  const [brands, setBrands] = useState([
    "Trung Nguyên",
    "Burger King",
    "Phúc Long",
    "Mochi",
    "Kem",
  ]); // Danh sách thương hiệu
  const [selectedBrand, setSelectedBrand] = useState(""); // Thương hiệu được chọn
  const [products, setProducts] = useState([]); // Danh sách sản phẩm
  const [imageUrls, setImageUrls] = useState({}); // URLs ảnh đã tải

  // Hàm fetch sản phẩm theo thương hiệu
  const fetchProductsByBrand = async (brand) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/shop/thuongHieu/${brand}`
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]); // Xóa danh sách sản phẩm nếu có lỗi
    }
  };

  const downloadImage = async (imageName) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/shop/image/download/${imageName}`,
        { responseType: "blob" } // Lấy ảnh dưới dạng blob
      );
      const imageUrl = URL.createObjectURL(response.data); // Tạo URL từ blob
      setImageUrls((prev) => ({
        ...prev,
        [imageName]: imageUrl, // Lưu URL ảnh vào state
      }));
    } catch (error) {
      console.error("Lỗi khi tải ảnh: ", error);
    }
  };

  // Tải ảnh khi danh sách sản phẩm thay đổi
  useEffect(() => {
    products.forEach((product) => {
      if (product.hinhAnhUrl && !imageUrls[product.hinhAnhUrl]) {
        downloadImage(product.hinhAnhUrl); // Tải ảnh cho mỗi sản phẩm
      }
    });
  }, [products, imageUrls]);

  // Khi chọn thương hiệu
  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand);
    fetchProductsByBrand(brand);
  };

  useEffect(() => {
    if (selectedBrand) {
      fetchProductsByBrand(selectedBrand);
    }
  }, [selectedBrand]);

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        {brands.map((brand, index) => (
          <button
            key={index}
            className="navbar-button"
            onClick={() => handleBrandSelect(brand)}
          >
            {brand}
          </button>
        ))}
      </nav>

      {/* Danh sách sản phẩm */}
      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.maSanPham} className="product-item">
              <h3>{product.tenSanPham}</h3>
              <p>{product.moTa}</p>
              <p>Giá: {product.gia.toLocaleString()} VND</p>
              <img
                src={imageUrls[product.hinhAnhUrl] || "/default-image.jpg"} // Ảnh tải về hoặc mặc định
                alt={product.tenSanPham}
                className="img-productList"
              />
            </div>
          ))
        ) : (
          <p>Không có sản phẩm nào cho thương hiệu này.</p>
        )}
      </div>
    </div>
  );
};

export default Narbar;
