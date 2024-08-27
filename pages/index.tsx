import { useState } from "react";
import spotify from "../src/app/lib/spotify";
import { getCurrentArtistAlbumAnalysis } from "../src/app/state/albumsState";
import { Album, ArtistAlbumAnalysis } from "../src/app/types/data"; // Adjust the path according to your project structure
import Header from "../src/components/Header";
import Sidebar from "../src/components/Sidebar";

const artistIds = [
  "2CIMQHirSU0MQqyYHq0eOx",
  "57dN52uHvrHOxijzpIgu3E",
  "1vCWHaC5f2uS3yhpwWbIA6",
]; // Replace with actual artist IDs

const Home = () => {
  const [albumAnalysis, setAlbumAnalysis] = useState<ArtistAlbumAnalysis[]>([]);
  const fetchAlbums = async () => {
    const albums = await spotify.getAlubmsForArtists(artistIds);
  };

  const analyzeAlbums = () => {
    spotify.analyzeArtistAlbums();
    const analysis = getCurrentArtistAlbumAnalysis(); // Perform analysis
    setAlbumAnalysis(analysis); // Update state with analysis result
  };

  return (
    <div>
      <Header />
      <Sidebar />
      <div style={contentStyle}>
        <h1>New Songs</h1>
        <button onClick={fetchAlbums}>Fetch Albums for Selected Artists</button>
        <button onClick={analyzeAlbums}>Analyze Artist Albums</button>
        {albumAnalysis.length > 0 && (
          <>
            <table>
              <thead>
                <tr>
                  <th>Artist ID</th>
                  <th>Tracks Total</th>
                  <th>Latest Album Date</th>
                  <th>Latest Album Name</th>
                </tr>
              </thead>
              <tbody>
                {albumAnalysis.map((analysis) => (
                  <tr key={analysis.artistId}>
                    <td>{analysis.artistId}</td>
                    <td>{analysis.tracksTotal}</td>
                    <td>{analysis.latestAlbumDate}</td>
                    <td>{analysis.latestAlbumName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button>Download as CSV</button>
          </>
        )}
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

export default Home;
