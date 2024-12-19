import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ProductDetail.css';
import { library } from '@fortawesome/fontawesome-svg-core';  
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'; 
import { Link } from 'react-router-dom';

library.add(faArrowLeft);
const ProductDetail = () => {
    const { id } = useParams(); 
    const [product, setProduct] = useState(null); 
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState(null); 
    const navigate = useNavigate(); 

    // Effect to handle restoring scroll position
    useEffect(() => {
        // Check if there's a saved scroll position in sessionStorage
        const savedScrollPosition = sessionStorage.getItem('scrollPosition');
        if (savedScrollPosition) {
            window.scrollTo(0, savedScrollPosition); // Restore scroll position
            sessionStorage.removeItem('scrollPosition'); // Clear saved scroll position
        }

        // Fetch product details
        const fetchProductDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/shop/${id}`);
                setProduct(response.data); // Set product data

                // Download image if URL is present
                if (response.data.hinhAnhUrl) {
                    downloadImage(response.data.hinhAnhUrl);
                }
            } catch (error) {
                setError("Error fetching product details. Please try again later.");
                console.error("Error fetching product detail", error);
            }
        };

        const downloadImage = async (imageName) => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/shop/image/download/${imageName}`,
                    { responseType: 'blob' }  // Set response type to blob to handle image
                );
                const imageUrl = URL.createObjectURL(response.data);
                setImageUrl(imageUrl);
            } catch (error) {
                setError("Error downloading image. Please try again later.");
                console.error("Error downloading image: ", error);
            }
        };

        fetchProductDetail();
    }, [id]);

  
    if (error) return <div className="error-message">{error}</div>;


    if (!product) return <div>Loading...</div>;

    const formatDescription = (description) => {
        return description.split('\n').map((item, index) => {
            return <span key={index}>{item}<br /></span>;
        });
    };

 
    const handleBack = () => {
        
        sessionStorage.setItem('scrollPosition', window.scrollY);

        navigate(-1); 
    };


  
    const addToCart = (product) => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingProductIndex = cart.findIndex(item => item.id === product.id);
    
        if (existingProductIndex >= 0) {
          cart[existingProductIndex].quantity += 1;
        } else {
          cart.push({ ...product, quantity: 1 });
        }
    
        localStorage.setItem("cart", JSON.stringify(cart));
      };





    return (
        <div className="product-detail">
            {/* Back Button */}
            <div className="back-button" onClick={handleBack}>
                <FontAwesomeIcon icon="fa-solid fa-arrow-left" className="back_icon" />
                <span>Back</span>
            </div>

            {/* Product Detail Section */}
            <div className="product-image"
                style={{ 
                    backgroundImage: `url(${imageUrl || product.hinhAnhUrl || 'default-image.jpg'})`, 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center', 
                    height: '400px', 
                }} 
            ></div>
            <div className="product-info">
                <div className="product_hang1">
                    <h2>{product.tenSanPham}</h2>
                    <div className="price">₫ {product.gia.toLocaleString()}</div>
                </div>
                <div className="brand">Thương hiệu: {product.thuongHieu}</div>
                <p>{formatDescription(product.moTa)}</p>
                <div className="stock">Giảm giá: {product.soLuong}</div>
                <div className='soLuongThat'>Số lượng còn lại: {product.soLuongThat}</div>
                <div className='hinhanhurl'>Link review: <a href={product.linkYoutube}> Youtube</a></div>


                {/* <div className="Mua_ngay">
                    Mua Ngay
                    <FontAwesomeIcon icon={faCartShopping} />
                </div> */}

<div className="Mua_ngay">
        <Link to="/giohang" onClick={() => addToCart(product)}>
          Mua Ngay
          <FontAwesomeIcon icon={faCartShopping} />
        </Link>
      </div>
           
            </div>
        </div>
    );
};
export default ProductDetail;
