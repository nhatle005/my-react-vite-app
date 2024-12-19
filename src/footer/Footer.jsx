import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo */}
        <div className="footer-logo">
          <h2>Foodie</h2>
          <p>Hương vị yêu thích của bạn!</p>
        </div>

        {/* Navigation Links */}
        <div className="footer-links">
          <h3>Dịch Vụ</h3>
          <ul>
            <li><a href="/menu">Menu</a></li>
            <li><a href="/delivery">Giao Hàng</a></li>
            <li><a href="/about">Về Chúng Tôi</a></li>
            <li><a href="/contact">Liên Hệ</a></li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="footer-contact">
          <h3>Liên Hệ</h3>
          <p>Email: duongNhatLe@foodie.com</p>
          <p>Hotline: 0123-456-789</p>
          <p>Địa Chỉ: 18 Phố Viên, Bắc Từ Liêm </p>
        </div>

        {/* Social Media Links */}
        <div className="footer-social">
          <h3>Theo Dõi Chúng Tôi</h3>
          <div className="social-icons">
            <a href="https://facebook.com" className="facebook">Facebook</a>
            <a href="https://instagram.com" className="instagram">Instagram</a>
            <a href="https://twitter.com" className="twitter">Twitter</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Foodie. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
