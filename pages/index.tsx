import React from "react";
import Header from "../src/components/Header";
import Sidebar from "../src/components/Sidebar";

const Home: React.FC = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <div style={contentStyle}>
        <h1 style={headingStyle}>Read Me</h1>
        <p style={paragraphStyle}>
          Welcome to the Spotify Artist Analyzer application. This application
          utilizes the Spotify's web API:{" "}
          <a
            href="https://developer.spotify.com/documentation/web-api"
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
          >
            https://developer.spotify.com/documentation/web-api
          </a>{" "}
          to automate the analysis of the latest albums for defined users. The
          main purpose of this application is to streamline the authentication
          flow, as well as run a quick analysis of the fetched albums for
          defined artists.
        </p>
        <p style={paragraphStyle}>
          <strong>Manual</strong>: To use the analysis, the user must provide a
          CSV file with one column named "artist_id" (without quotation marks),
          where for each row, an artist ID is provided. To simplify the search
          of an artist's ID, a search function is provided to search an artist
          by name. Due to duplicated names of artists, some artists must be
          searched directly in the Spotify web app - the artist ID is provided
          in the last part of the URI.
        </p>
        <p style={paragraphStyle}>
          The project is open source and is available here:{" "}
          <a
            href="https://github.com/MedvidekPu/SpotifyAnalyser"
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
          >
            https://github.com/MedvidekPu/SpotifyAnalyser
          </a>
        </p>
      </div>
    </div>
  );
};

// CSS styles
const contentStyle: React.CSSProperties = {
  flex: 1,
  padding: "20px",
  marginLeft: "130px", // Adjust this value to match the width of the sidebar
  borderRadius: "8px", // Rounded corners for the content area
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
  fontFamily: "Arial, sans-serif", // Consistent font for the content
};

const linkStyle: React.CSSProperties = {
  color: "#007bff", // Blue color for links
  textDecoration: "none",
  fontWeight: "bold",
  cursor: "pointer",
};
const headingStyle: React.CSSProperties = {
  fontSize: "36px",
  fontWeight: "bold",
  color: "#333", // Darker text color for the heading
  marginBottom: "20px",
  borderBottom: "2px solid #ccc", // Underline effect using border
  paddingBottom: "10px", // Space between text and underline
};

const paragraphStyle: React.CSSProperties = {
  fontSize: "18px",
  lineHeight: "1.6",
  color: "#555", // Softer text color for paragraphs
  marginBottom: "15px",
};

export default Home;
