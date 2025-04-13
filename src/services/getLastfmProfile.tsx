require('dotenv').config();  
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = 'https://ws.audioscrobbler.com/2.0/';

export const getProfileData = async (username: string) => {
  const response = await fetch(
    `${BASE_URL}?method=user.getinfo&user=${username}&api_key=${API_KEY}&format=json`
  );
  const data = await response.json();
  return data;
};

export const getTopArtists = async (username: string) => {
  const response = await fetch(
    `${BASE_URL}?method=user.gettopartists&user=${username}&api_key=${API_KEY}&format=json`
  );
  const data = await response.json();
  return data;
};

export const getTopAlbums = async (username: string) => {
  const response = await fetch(
    `${BASE_URL}?method=user.gettopalbums&user=${username}&api_key=${API_KEY}&format=json`
  );
  const data = await response.json();
  return data;
};

export const getTopTracks = async (username: string) => {
  const response = await fetch(
    `${BASE_URL}?method=user.gettoptracks&user=${username}&api_key=${API_KEY}&format=json`
  );
  const data = await response.json();
  return data;
};
