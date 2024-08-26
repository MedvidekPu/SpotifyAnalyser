import SpotifyWebApi from 'spotify-web-api-node';
import { NewSong } from '../types/data';
import auth from '../auth'
import axios from 'axios';

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

async function getNewSongsForArtists(artistIds: string[]): Promise<NewSong[]> {
  const newSongs: NewSong[] = [];

  const token = (await auth.fetchSpotifyToken()).access_token;

  console.log(token)
  console.log(artistIds)
  for (const artistId of artistIds) {
    const response = await axios.get(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        include_groups: 'album,single',
        limit: 5
      }
    });
    console.log(response)
    const albums = response.data.items;

    albums.forEach((album: any) => {
      newSongs.push({
        albumName: album.name,
        releaseDate: album.release_date,
        artistId: artistId
      });
    });
  }

  return newSongs;
}

export default {
  getNewSongsForArtists: getNewSongsForArtists
}