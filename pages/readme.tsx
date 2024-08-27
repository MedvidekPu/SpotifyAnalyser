import React from "react";
import Header from "../src/components/Header";
import Sidebar from "../src/components/Sidebar";

const ReadMe: React.FC = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <div style={contentStyle}>
        <h1>Read Me</h1>
        <p>Welcome to the Read Me page of the application!</p>
        <p>
          Here you can provide documentation, guides, or any relevant
          information for your users.
        </p>
      </div>
    </div>
  );
};

// CSS styles
const contentStyle: React.CSSProperties = {
  flex: 1,
  padding: "20px",
  marginLeft: "200px", // Adjust this value to match the width of the sidebar
};

export default ReadMe;
