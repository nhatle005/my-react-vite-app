import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductList.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faPercent } from '@fortawesome/free-solid-svg-icons';

const ProductList = ({ maSanPham }) => {
  const [sanPhams, setSanPhams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [imageUrls, setImageUrls] = useState({});  

  useEffect(() => {
    const getAllProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `http://localhost:8080/shop?page=${page}&size=${size}`
        );
        setSanPhams(response.data.content || []);
        setLoading(false);
      } catch (e) {
        setError("Có lỗi khi tải dữ liệu: " + e.message);
        setLoading(false);
      }
    };

    getAllProduct();
  }, [page, size]);

  const downloadImage = async (imageName) => {
    try {

      const response = await axios.get(
        `http://localhost:8080/shop/image/download/${imageName}`,
        { responseType: 'blob' }  
      );
      const imageUrl = URL.createObjectURL(response.data);  
      setImageUrls((prev) => ({
        ...prev,
        [imageName]: imageUrl, 
      }));
    } catch (error) {
      console.error("Lỗi khi tải ảnh: ", error);
    }
  };

  useEffect(() => {
 
    sanPhams.forEach((sanPham) => {
      if (sanPham.hinhAnhUrl) {
        downloadImage(sanPham.hinhAnhUrl);  
      }
    });
  }, [sanPhams]); 

  if (loading) {
    return <div>Đang tải...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

    return (
      <>
      <h1 className="h1_banner_main"> Các Sản Phẩm Nổi Bật </h1>
        {sanPhams.length > 0 ? (
          sanPhams.map((sanPham) => (
            <Link key={sanPham.maSanPham} to={`/product-detail/${sanPham.maSanPham}`} className="product-card-link">
              <div className="product-card">  
                {/* Hiển thị ảnh sản phẩm hoặc ảnh tải từ server */}
                <img 
                  src={imageUrls[sanPham.hinhAnhUrl] || '/default-image.jpg'}  // Sử dụng ảnh tải về hoặc ảnh mặc định
                  alt={sanPham.tenSanPham} 
                  className="img-productList" 
                />
                <h1 className="tenSanPham">{sanPham.tenSanPham}</h1>
                <p className="price">Giá: {sanPham.gia.toLocaleString()} VND</p>
                <p className="soLuong">
                  Mua ngay giảm {sanPham.soLuong}  <FontAwesomeIcon icon={faPercent} className="font" />
                </p>
                <div className='flex_doannay'>
                  <p className="thuongHieu">Thương hiệu: {sanPham.thuongHieu}</p>
                  <FontAwesomeIcon icon={faCartShopping} className='font-muasam'/>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>Đã hết sản phẩm.</p>
        )}

        <div className="pagination">
          <button onClick={() => setPage(page - 1)} disabled={page === 0}>
            Previous
          </button>
          <button onClick={() => setPage(page + 1)}>
            Next
          </button>
        </div>
      </>
    );
  };

export default ProductList;
