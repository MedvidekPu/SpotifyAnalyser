import React from "react";
import Link from "next/link";
import { FaHome, FaDochub, FaSearch } from "react-icons/fa"; // You'll need to install react-icons: npm install react-icons

const Sidebar: React.FC = () => {
  return (
    <aside style={sidebarStyle}>
      <nav>
        <Link href="/">
          <div className="menu-item" style={menuItemStyle}>
            <FaHome className="icon" style={iconStyle} />
            <span style={menuTextStyle}>Home</span>
          </div>
        </Link>
        <Link href="/searchArtist">
          <div className="menu-item" style={menuItemStyle}>
            <FaSearch className="icon" style={iconStyle} />
            <span style={menuTextStyle}>Search Artist</span>
          </div>
        </Link>
        <Link href="/analyzeArtists">
          <div className="menu-item" style={menuItemStyle}>
            <FaDochub className="icon" style={iconStyle} />
            <span style={menuTextStyle}>Analyze Artists</span>
          </div>
        </Link>
      </nav>
    </aside>
  );
};

const sidebarStyle: React.CSSProperties = {
  width: "100px", // Increased width for better visibility of text
  backgroundColor: "#ffdbbb", // Dark background for the sidebar
  color: "#ecf0f1", // Light text color for contrast
  padding: "20px",
  height: "100vh", // Full height
  position: "fixed", // Stay fixed while scrolling
  top: "72px", // Below the header
  left: "0",
  zIndex: "1000",
  boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)", // Shadow for depth
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const menuItemStyle: React.CSSProperties = {
  padding: "15px 20px", // Increased padding inside each menu item
  marginBottom: "10px", // Space between each menu item
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  borderRadius: "8px", // Rounded corners
  transition: "background-color 0.3s, transform 0.3s", // Smooth hover effect
  textDecoration: "none",
};

const iconStyle: React.CSSProperties = {
  marginRight: "10px", // Space between icon and text
  fontSize: "20px", // Size of the icon
};

const menuTextStyle: React.CSSProperties = {
  fontSize: "16px", // Font size for menu text
  fontWeight: "bold", // Bold text for emphasis
};

// Adding hover effect for menu items using CSS-in-JS
const hoverStyle: React.CSSProperties = {
  backgroundColor: "#34495e", // Darker background on hover
  transform: "translateX(5px)", // Slight movement on hover
};

export default Sidebar;
