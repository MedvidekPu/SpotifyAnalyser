import { Album, ArtistAlbumAnalysis, Artist } from '../types/data';
import auth from '../auth'
import { setAlbums, setArtistAlbumAnalysis } from '../state/albumsState'; // Import the state management functions
import { getCurrentAlbums } from '../state/albumsState';
import axios from 'axios';

async function getAlubmsForArtists(artistIds: string[]): Promise<Album[]> {
  const albums: Album[] = [];
  const token = (await auth.fetchSpotifyToken()).access_token;
  console.log('Getting Albums for Artists...')
  for (const artistId of artistIds) {
    const response = await axios.get(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        include_groups: 'album,single',
        limit: 50
      }
    });

    const albumsList = response.data.items;

    albumsList.forEach((album: any) => {
      albums.push({
        artistId: artistId,
        artists: album.artists,
        albumName: album.name,
        releaseDate: album.release_date,
        totalTracks: album.total_tracks,
        uri: album.uri,
      });
    });
  }

  // Store the albums data in the state
  setAlbums(albums);
  console.log(albums)
  return albums;
}

function analyzeArtistAlbums(): ArtistAlbumAnalysis[] {
  const albums = getCurrentAlbums(); // Fetch the current albums data from the state
  console.log('Running Albums analysis...')
  const analysisMap: { [artistId: string]: ArtistAlbumAnalysis } = {};

  albums.forEach(album => {
    const artistId = album.artistId;

    if (!analysisMap[artistId]) {
      // Initialize the artist data if not already present
      analysisMap[artistId] = {
        artistId: artistId,
        tracksTotal: 0,
        latestAlbumDate: album.releaseDate,
        latestAlbumName: album.albumName,
        artistNames: album.artists.map(artist => artist.name).join(", "),
      };
    }

    // Accumulate total tracks for each artist
    analysisMap[artistId].tracksTotal += album.totalTracks;

    // Check if this album is more recent than the currently stored latest album
    if (new Date(album.releaseDate) > new Date(analysisMap[artistId].latestAlbumDate)) {
      analysisMap[artistId].latestAlbumDate = album.releaseDate;
      analysisMap[artistId].latestAlbumName = album.albumName;
    }
  });

  setArtistAlbumAnalysis(Object.values(analysisMap))
  // Convert the analysis map to an array to return as JSON
  return Object.values(analysisMap);
}

async function searchArtistByName(artistName: string): Promise<Artist | null> {
  const token = (await auth.fetchSpotifyToken()).access_token;

  const response = await axios.get(`https://api.spotify.com/v1/search`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: {
      q: artistName,
      type: 'artist',
      limit: 1
    }
  });

  const artists = response.data.artists.items;

  if (artists.length > 0) {
    const artist = artists[0];
    return {
      id: artist.id,
      name: artist.name,
      genres: artist.genres,
      externalUrls: artist.external_urls,
      images: artist.images.length > 0 ? artist.images : '', // Use first image if available,
      type: artist.type,
      uri: artist.uri,
      followers: artist.followers.total
    };
  } else {
    return null; // No artist found
  }
}


export default {
  getAlubmsForArtists: getAlubmsForArtists,
  analyzeArtistAlbums: analyzeArtistAlbums,
  searchArtistByName: searchArtistByName
}