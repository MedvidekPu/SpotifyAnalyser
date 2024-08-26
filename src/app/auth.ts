import { NextApiRequest, NextApiResponse } from 'next';
import SpotifyWebApi from 'spotify-web-api-node';
import axios from 'axios';

const spotifyApi = new SpotifyWebApi({
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  const authorizeURL = spotifyApi.createAuthorizeURL(['user-read-private', 'user-read-email'], 'state-key');
  res.redirect(authorizeURL);
}

export const stringToBase64 = (str: string): string => {
    const buffer = Buffer.from(str, 'utf-8');
    return buffer.toString('base64');
  }



interface SpotifyAuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

async function fetchSpotifyToken(): Promise<SpotifyAuthResponse> {
const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;
const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET!;
  const fullString = `${clientId}:${clientSecret}`;
  const authCredentials = {
    username: clientId, 
    password: clientSecret, 
    base64String: stringToBase64(fullString)}

console.log(authCredentials)

  const response = await axios.request({
    method: 'post',
    baseURL: 'https://accounts.spotify.com/api/token',
    auth: authCredentials,
    responseType: 'json',
    data: {
        grant_type: 'client_credentials', // This is the body part
      },
    headers: {"Content-Type": 'application/x-www-form-urlencoded'}
  })

  console.log(response)

//   const response = await axios.post<SpotifyAuthResponse>(
//     'https://accounts.spotify.com/api/token',
//     new URLSearchParams({
//       grant_type: 'client_credentials'
//     }).toString(),
//     {
//       headers: {
//         Authorization: `Basic ${authToken}`,
//         'Content-Type': 'application/x-www-form-urlencoded'
//       }
//     }
//  );

  return response.data;
}

// let spotifyToken: string | null = null;
// let tokenExpiry: number | null = null;

// async function getSpotifyToken(): Promise<string> {
//   if (!spotifyToken || !tokenExpiry || Date.now() >= tokenExpiry) {
//     const { access_token, expires_in } = await fetchSpotifyToken();
//     spotifyToken = access_token;
//     tokenExpiry = Date.now() + expires_in * 1000; // expires_in is in seconds
//   }
//   return spotifyToken;
// }

export default { handler: handler, 
                 fetchSpotifyToken: fetchSpotifyToken}