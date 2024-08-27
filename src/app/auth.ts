import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

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
    console.log('Fetching a new Token...')
    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;
    const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET!;
    const fullString = `${clientId}:${clientSecret}`;
    const authCredentials = {
        username: clientId, 
        password: clientSecret, 
        base64String: stringToBase64(fullString)}

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
  return response.data;
}

export default {fetchSpotifyToken: fetchSpotifyToken}