import React from "react";
import { useState } from "react";
import spotify from "../src/app/lib/spotify";
import { getCurrentArtistAlbumAnalysis } from "../src/app/state/albumsState";
import { Album, ArtistAlbumAnalysis, Artist } from "../src/app/types/data";
import Header from "../src/components/Header";
import Sidebar from "../src/components/Sidebar";

const SearchArtist: React.FC = () => {
  const [artistName, setArtistName] = useState<string>("");
  const [artistInfo, setArtistInfo] = useState<Artist | null>(null);

  const handleSearchArtist = async () => {
    if (artistName) {
      const info = await spotify.searchArtistByName(artistName);
      setArtistInfo(info);
    }
  };

  return (
    <div>
      <Header />
      <Sidebar />
      <div style={contentStyle}>
        <h1 style={headingStyle}>Search Artist</h1>
        <div style={inputContainerStyle}>
          <input
            type="text"
            value={artistName}
            onChange={(e) => setArtistName(e.target.value)}
            placeholder="Enter artist name"
            style={inputStyle} // Apply input styles
          />
          <button
            onClick={handleSearchArtist}
            style={{ ...buttonStyle, ...buttonHoverStyle }}
          >
            Search
          </button>
        </div>
        {artistInfo && (
          <div style={resultContainerStyle}>
            {artistInfo.images?.[0]?.url && (
              <img
                src={artistInfo.images?.[0]?.url}
                alt={`${artistInfo.name} artist`}
                style={imageStyle}
              />
            )}
            <div style={infoStyle}>
              <p style={infoTextStyle}>
                <strong>Artist Name:</strong> {artistInfo.name}
              </p>
              <p style={infoTextStyle}>
                <strong>Artist ID:</strong> {artistInfo.id}
              </p>
              <p style={infoTextStyle}>
                <strong>Total Followers:</strong> {artistInfo.followers}
              </p>
              <p style={infoTextStyle}>
                <strong>Genres:</strong> {artistInfo.genres.join(", ")}
              </p>
              <p>
                <a
                  href={artistInfo.externalUrls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={linkStyle}
                >
                  View on Spotify
                </a>
              </p>
            </div>
          </div>
        )}
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

const headingStyle: React.CSSProperties = {
  fontSize: "36px",
  fontWeight: "bold",
  color: "#333", // Darker text color for the heading
  marginBottom: "20px",
  borderBottom: "2px solid #ccc", // Underline effect using border
  paddingBottom: "10px", // Space between text and underline
};

const inputContainerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  marginBottom: "20px",
};

const inputStyle: React.CSSProperties = {
  padding: "10px",
  width: "250px",
  borderRadius: "4px",
  border: "1px solid #ddd",
  marginRight: "10px",
  fontSize: "16px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
};

const resultContainerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  marginTop: "20px",
  padding: "20px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#f9f9f9",
};

const imageStyle: React.CSSProperties = {
  width: "200px",
  height: "200px",
  borderRadius: "4px",
  marginRight: "20px",
};

const infoStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
};

const infoTextStyle: React.CSSProperties = {
  marginBottom: "10px",
  fontSize: "16px",
};

const linkStyle: React.CSSProperties = {
  color: "#007bff",
  textDecoration: "none",
  fontSize: "16px",
  fontWeight: "bold",
};

const buttonStyle: React.CSSProperties = {
  padding: "10px 20px",
  backgroundColor: "#ffdbbb", // Blue color
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  marginRight: "10px",
  transition: "background-color 0.3s, transform 0.3s", // Transition for smooth hover effect
  boxShadow: "0 4px 8px rgba(0, 123, 255, 0.2)", // Add shadow for depth
  marginTop: "10px",
};

const buttonHoverStyle: React.CSSProperties = {
  backgroundColor: "#ffa500", // Darker blue on hover
  transform: "translateY(-2px)", // Slightly lift the button on hover
};

export default SearchArtist;
