import React, { useState } from "react";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo">
          <a href="/">🍔 FastFood</a>
        </div>

        {/* Navigation */}
        <nav className="nav">
          <ul className="nav-links">
            <li className="nav-item">
              <a href="/" className="nav-link">Trang chủ</a>
            </li>

            {/* Menu with Dropdown */}
            <li className="nav-item menu-dropdown">
              <a href="/menu" className="nav-link">Menu</a>
              <ul className="dropdown-content">
                <li><a href="/menu/nuoc-ngot">Trung Nguyên</a></li>
                <li><a href="/menu/hamburger">Burger King</a></li>
                <li><a href="/menu/do-an-kem">Mochi</a></li>
                <li><a href="/menu/salad">Kem</a></li>
                <li><a href="/menu/kem">Phúc Long</a></li>
              </ul>
            </li>

            <li className="nav-item">
              <a href="/about" className="nav-link">Giới thiệu</a>
            </li>
            <li className="nav-item">
              <a href="/contact" className="nav-link">Liên hệ</a>
            </li>
          </ul>
        </nav>

        {/* Search Box */}
        <form className="search-form">
          <input
            type="text"
            className="search-input"
            placeholder="Search product..."
          />
          <button type="submit" className="search-button">Tìm đồ ăn</button>
        </form>
      </div>
    </header>
  );
}

export default Header;
