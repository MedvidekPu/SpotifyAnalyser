// src/components/Sidebar.tsx
import React from "react";
import Link from "next/link";
import { FaHome, FaDochub } from "react-icons/fa"; // You'll need to install react-icons: npm install react-icons

const Sidebar: React.FC = () => {
  return (
    <aside style={sidebarStyle}>
      <nav>
        <Link href="/">
          <div className="menu-item" style={menuItemStyle}>
            <FaHome className="icon" />
            <span>Home</span>
          </div>
        </Link>
        <Link href="/readme">
          <div className="menu-item" style={menuItemStyle}>
            <FaDochub className="icon" />
            <span>Read Me</span>
          </div>
        </Link>
      </nav>
    </aside>
  );
};

const sidebarStyle: React.CSSProperties = {
  width: "100px",
  backgroundColor: "#0001",
  color: "#fff",
  padding: "20px",
  height: "100vh" /* Full height */,
  position: "fixed" /* Stay fixed while scrolling */,
  top: "72px" /* Below the header */,
  left: "0",
  zIndex: "1000",
};

const menuItemStyle: React.CSSProperties = {
  padding: "15px 10px", // Increased padding inside each menu item
  marginBottom: "10px", // Space between each menu item
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  borderRadius: "4px", // Optional: rounded corners
};

export default Sidebar;
