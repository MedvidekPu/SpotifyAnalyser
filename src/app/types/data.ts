export interface Album {
  artistId: string;
  artists: Artist[]
  albumName: string;
  releaseDate: string;
  totalTracks: number;
  uri: string;
  }

  export interface Artist {
    externalUrls: { spotify: string }; // URL to the artist's Spotify page
    id: string;
    name: string;
    type: string;
    uri: string;
    genres: string[];
    images: { url: string; height: number; width: number }[]; // Array of image objects,
    followers: number
  }

  export interface ArtistAlbumAnalysis {
    artistId: string;
    tracksTotal: number;
    latestAlbumDate: string;
    latestAlbumName: string;
    artistNames: string; // New property to store concatenated artist names
  }

export interface Image {
  height: number;
  url: string;
  width: number;
}