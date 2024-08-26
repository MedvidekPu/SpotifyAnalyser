declare module 'spotify-web-api-node' {
    import { IncomingMessage, ServerResponse } from 'http';
  
    export interface Credentials {
      clientId?: string;
      clientSecret?: string;
      redirectUri?: string;
      accessToken?: string;
      refreshToken?: string;
    }
  
    export interface Album {
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
  
    export interface Artist {
      external_urls: { spotify: string };
      href: string;
      id: string;
      name: string;
      type: string;
      uri: string;
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
  
    export class SpotifyWebApi {
      constructor(credentials?: Credentials);
      setAccessToken(accessToken: string): void;
      setRefreshToken(refreshToken: string): void;
      getArtistAlbums(artistId: string, options?: any): Promise<AlbumSearchResponse>;
      createAuthorizeURL(scopes: string[], state: string): string;
      authorizationCodeGrant(code: string): Promise<any>;
    }
  
    export default SpotifyWebApi;
  }