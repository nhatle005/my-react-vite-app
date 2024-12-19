import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import "./Slider.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile, faHome, faUtensils, faThumbsUp } from '@fortawesome/free-solid-svg-icons';


const Slider = () => {
  const images = [
    "banner1_sua.jpg",
    "banner2_sua.jpg",
    "banner3_sua.jpg",
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slider-container">
    <div className="slider">
 
      {images.map((image, index) => (
        <div
          key={index}
          className={`slide ${index === currentSlide ? "active" : ""}`}
          style={{ backgroundImage: `url(${image})` }}
        ></div>
      ))}
    
      <button className="prev" onClick={prevSlide}>
        &#10094;
      </button>
      <button className="next" onClick={nextSlide}>
        &#10095;
      </button>
    
      <div className="indicators">
        {images.map((_, index) => (
          <span
            key={index}
            className={`indicator ${index === currentSlide ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
    <div className="slider_gioiThieu">
    <h1>Giá luôn tốt nhất hiện tại!!! Hãy mua ngay nào</h1>
    <ul>
    
        <li><FontAwesomeIcon icon={faSmile} /> Nhân viên thân thiện</li>
        <li><FontAwesomeIcon icon={faHome} /> Quán sạch sẽ, view "sống ảo"</li>
        <li><FontAwesomeIcon icon={faUtensils} /> Đồ ăn ngon miệng, giá phải chăng</li>
        <li><FontAwesomeIcon icon={faThumbsUp} /> Chiều lòng khách đến, vừa lòng khách đi</li>
      
    </ul>
  </div>
  </div>
  
  );
};

export default Slider;
