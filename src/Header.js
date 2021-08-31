import React from 'react';
import './Header.css';

function Header({ img , handleLogout}) {
  const logoURL =
    "https://image.flaticon.com/icons/png/512/2965/2965327.png";
  return (
    <div className="header">
    <img src={logoURL} alt="" />
    <h3 style={{ color: "#0F9D58" }}>Google Sheets - Work Together App</h3>
    <nav>
                <button className="buton" onClick={handleLogout}>LogOut</button>
            </nav>
  </div>
  );
}

export default Header;
