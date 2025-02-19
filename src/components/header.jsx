import { Link } from "react-router-dom";
import "./css/header.css";
import "./css/shared.css";
import React from "react";

function Header({ darkMode, toggleDarkMode }) {
  return (
    <div className="header-background">
      <div className="header-div max-space-available">
        <Link to={"/"}>
          <img src="/imgs/adopt a friend logo.png" alt="adopt a friend logo" />
        </Link>
        <h1>Adopt before you buy!</h1>
        <button className="theme-btn" onClick={toggleDarkMode}>
          {darkMode ? (
            <i className="bi bi-brightness-high-fill" />
          ) : (
            <i className="bi bi-moon-fill" />
          )}
        </button>
      </div>
    </div>
  );
}

export default Header;
