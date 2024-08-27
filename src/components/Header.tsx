// src/components/Header.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header style={headerStyle}>
      <Link href="/">
        <Image
          src="/images/sofar_ankara.png" // Path to your logo in the public folder
          alt="Logo"
          width={60} // Adjust width as needed
          height={60} // Adjust height as needed
          style={logoStyle}
        />
      </Link>
      <span style={spanStyle}>App Version: V0.0.1</span>
    </header>
  );
};

const headerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "10px 20px",
  backgroundColor: "#0000",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  height: "5vh",
  width: "100%",
  position: "sticky",
  top: 0,
  zIndex: 1000,
};

const logoStyle: React.CSSProperties = {
  cursor: "pointer",
};

const spanStyle: React.CSSProperties = {
  position: "absolute",
  top: "10px", // Adjust as needed
  right: "40px", // Adjust as needed
  color: "#000000", // Adjust text color to contrast with the header
  fontSize: "14px", // Adjust font size as needed
};

export default Header;
