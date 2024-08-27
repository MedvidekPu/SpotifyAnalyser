export interface Album {
  artistId: string;
  artists: Artist[]
  albumName: string;
  releaseDate: string;
  totalTracks: number;
  uri: string;
  }

export interface Artist {
  externalUrls: {};
  hrefs: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface ArtistAlbumAnalysis {
  artistId: string;
  tracksTotal: number;
  latestAlbumDate: string;
  latestAlbumName: string;
}

export interface Image {
  height: number;
  url: string;
  width: number;
}

export interface AlbumSearchResponse {
  body: {
    items: Album[];
  };
}

export interface Albumv2 {
  album_type: string;
  artists: Artist[];
  available_markets: string[];
  external_urls: { spotify: string };
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  total_tracks: number;
  type: string;
  uri: string;
}

export interface Artistv2 {
  external_urls: { spotify: string };
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}