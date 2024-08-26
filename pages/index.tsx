import { useState } from "react";
import spotify from "../src/app/lib/spotify";
import auth from "../src/app/auth";

const artistIds = [
  "2CIMQHirSU0MQqyYHq0eOx",
  "57dN52uHvrHOxijzpIgu3E",
  "1vCWHaC5f2uS3yhpwWbIA6",
]; // Replace with actual artist IDs

const Home = () => {
  const [songs, setSongs] = useState<any[]>([]);

  const fetchSongs = async () => {
    const newSongs = await spotify.getNewSongsForArtists(artistIds);
    setSongs(newSongs);
  };

  return (
    <div>
      <h1>New Songs</h1>
      <button onClick={fetchSongs}>Fetch New Songs</button>
      <ul>
        {songs.map((song, index) => (
          <li key={index}>
            {song.album} - {song.release_date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
