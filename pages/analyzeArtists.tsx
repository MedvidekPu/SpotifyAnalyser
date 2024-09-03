import React, { useState } from "react";
import DragAndDrop from "@/components/DragAndDrop";
import spotify from "../src/app/lib/spotify";
import { getCurrentArtistAlbumAnalysis } from "../src/app/state/albumsState";
import { Album, ArtistAlbumAnalysis } from "../src/app/types/data";
import Header from "../src/components/Header";
import Sidebar from "../src/components/Sidebar";

const AnalyzeArtists = () => {
  const [albumAnalysis, setAlbumAnalysis] = useState<ArtistAlbumAnalysis[]>([]);
  const [message, setMessage] = useState<string>("");
  const [albums, setAlbums] = useState<Album[]>([]); // State to store the fetched albums
  const [artistIds, setArtistIds] = useState<string[]>([]); // State to store artist IDs from CSV

  const handleFileLoad = (ids: string[]) => {
    setArtistIds(ids);
    setMessage(`Loaded ${ids.length} artist IDs from CSV.`);
  };

  const fetchAlbums = async () => {
    if (artistIds.length === 0) {
      setMessage(
        "No artist IDs found. Please upload a CSV file with artist IDs."
      );
      return;
    }

    const fetchedAlbums = await spotify.getAlubmsForArtists(artistIds);
    setAlbums(fetchedAlbums); // Store the fetched albums in state
    setMessage("Artists fetched and saved!");
  };

  const analyzeAlbums = () => {
    if (albums.length === 0) {
      setMessage(
        "No Albums have been fetched, upload CSV file and fetch albums first!"
      );
      return;
    }

    spotify.analyzeArtistAlbums();
    const analysis = getCurrentArtistAlbumAnalysis();
    setAlbumAnalysis(analysis);
    setMessage(""); // Clear any previous message
  };

  const exportAlbumsToCSV = () => {
    const csvRows = [
      [
        "Artist ID",
        "Artists",
        "Album Name",
        "Release Date",
        "Total Tracks",
        "URI",
      ], // CSV header
      ...albums.map((album) => [
        album.artistId,
        album.artists.map((artist) => artist.name).join("; "), // Joining artist names with a semicolon
        album.albumName,
        album.releaseDate,
        album.totalTracks,
        album.uri,
      ]),
    ];

    const csvContent = csvRows.map((e) => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "albums.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportAnalysisToCSV = () => {
    const csvRows = [
      [
        "Artist ID",
        "Artists",
        "Tracks Total",
        "Latest Album Date",
        "Latest Album Name",
      ], // CSV header
      ...albumAnalysis.map((analysis) => [
        analysis.artistId,
        analysis.artistNames, // Include artist names in CSV
        analysis.tracksTotal,
        analysis.latestAlbumDate,
        analysis.latestAlbumName,
      ]),
    ];

    const csvContent = csvRows.map((e) => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "album_analysis.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Inline styles for the table
  const tableStyle: React.CSSProperties = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
    fontFamily: "Arial, sans-serif",
  };

  const thTdStyle: React.CSSProperties = {
    border: "1px solid #ddd", // Light gray border for table cells
    padding: "12px 15px",
    textAlign: "left",
  };

  const thStyle: React.CSSProperties = {
    ...thTdStyle,
    backgroundColor: "#f4f4f4", // Light gray background for headers
    color: "#333",
    fontWeight: "bold",
  };

  const trHoverStyle: React.CSSProperties = {
    backgroundColor: "#f9f9f9",
  };

  const trStyle: React.CSSProperties = {
    ...thTdStyle,
    backgroundColor: "#f1f1f1",
  };

  return (
    <div>
      <Header />
      <Sidebar />
      <div className="analyze-container" style={contentStyle}>
        <h1 className="text-3xl font-bold mb-6" style={headingStyle}>
          Analyze Artist Albums
        </h1>
        <DragAndDrop onFileLoad={handleFileLoad} />{" "}
        {/* Use the DragAndDrop component */}
        <button
          onClick={fetchAlbums}
          className="button"
          style={{ ...buttonStyle, ...buttonHoverStyle }}
        >
          Fetch Albums for Selected Artists
        </button>
        {message && <p className="message">{message}</p>}
        {albums.length > 0 && (
          <button
            onClick={exportAlbumsToCSV}
            className="button button-secondary"
            style={{ ...buttonStyle, ...buttonHoverStyle }}
          >
            Download Albums as CSV
          </button>
        )}
        <br />
        <button
          onClick={analyzeAlbums}
          className="button button-secondary"
          style={{ ...buttonStyle, ...buttonHoverStyle }}
        >
          Analyze Artist Albums
        </button>
        {albumAnalysis.length > 0 && (
          <>
            <table style={tableStyle}>
              <thead>
                <tr style={thStyle}>
                  <th style={thStyle}>Artist ID</th>
                  <th style={thStyle}>Artists</th>{" "}
                  {/* New column for artist names */}
                  <th style={thStyle}>Tracks Total</th>
                  <th style={thStyle}>Latest Album Date</th>
                  <th style={thStyle}>Latest Album Name</th>
                </tr>
              </thead>
              <tbody>
                {albumAnalysis.map((analysis, index) => (
                  <tr
                    key={analysis.artistId}
                    style={index % 2 === 0 ? trHoverStyle : trStyle} // Alternating row colors
                  >
                    <td style={thTdStyle}>{analysis.artistId}</td>
                    <td style={thTdStyle}>{analysis.artistNames}</td>{" "}
                    {/* Display artist names */}
                    <td style={thTdStyle}>{analysis.tracksTotal}</td>
                    <td style={thTdStyle}>{analysis.latestAlbumDate}</td>
                    <td style={thTdStyle}>{analysis.latestAlbumName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={exportAnalysisToCSV}
              className="button button-secondary"
              style={{ ...buttonStyle, ...buttonHoverStyle }}
            >
              Download Analysis as CSV
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const headingStyle: React.CSSProperties = {
  fontSize: "36px",
  fontWeight: "bold",
  color: "#333", // Darker text color for the heading
  marginBottom: "20px",
  borderBottom: "2px solid #ccc", // Underline effect using border
  paddingBottom: "10px", // Space between text and underline
};

const contentStyle: React.CSSProperties = {
  flex: 1,
  padding: "20px",
  marginLeft: "130px", // Adjust this value to match the width of the sidebar
  borderRadius: "8px", // Rounded corners for the content area
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
  fontFamily: "Arial, sans-serif", // Consistent font for the content
};

// Inline styles for buttons
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

export default AnalyzeArtists;
