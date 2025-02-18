// import { Link } from "react-router-dom";
// import "./css/header.css";
// import "./css/shared.css";
// import React, { useEffect, useState } from "react";

// function Header() {
//   const [darkMode, setDarkMode] = useState(
//     localStorage.getItem("theme") === "dark"
//   );

//   useEffect(() => {
//     if (darkMode) {
//       document.body.classList.add("dark-mode");
//       localStorage.setItem("theme", "dark");
//     } else {
//       document.body.classList.remove("dark-mode");
//       localStorage.setItem("theme", "light");
//     }
//   }, [darkMode]);

//   return (
//     <div className="header-background">
//       <div className="header-div max-space-available">
//         <Link to={"./"}>
//           <img src="/imgs/adopt a friend logo.png" alt="adopt a friend logo" />
//         </Link>
//         <h1>Adopt before you buy!</h1>
//         <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
//           {darkMode ? (
//             <i class="bi bi-brightness-high-fill" />
//           ) : (
//             <i class="bi bi-moon-fill" />
//           )}
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Header;

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
