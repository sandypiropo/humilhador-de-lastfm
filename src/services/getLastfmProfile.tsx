import axios from 'axios';

require('dotenv').config();  
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = 'https://ws.audioscrobbler.com/2.0/';

const baseParams = (username: string, method: string, extraParams = {}) => ({
  method,
  user: username,
  api_key: API_KEY,
  format: 'json',
  ...extraParams
});

export const getProfileData = async (username: string) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: baseParams(username, 'user.getinfo')
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao carregar perfil:', error);
    return null;
  }
};

export const getTopArtists = async (
  username: string,
  period: string = 'overall',
  limit: number = 10,
  page: number = 1
) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: baseParams(username, 'user.gettopartists', { period, limit, page })
    });
    return response.data.topartists.artist; 
  } catch (error) {
    console.error('Erro ao carregar artistas:', error);
    return [];
  }
};


export const getTopAlbums = async (username: string, period: string = 'overall', limit: number = 10, page: number = 1) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: baseParams(username, 'user.gettopalbums', {period, limit, page})
    });
    return response.data.topalbums.album; 
  } catch (error) {
    console.error('Erro ao carregar álbuns:', error);
    return [];
  }
};

export const getTopTracks = async (username: string, period: string = 'overall', limit: number = 10, page: number = 1) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        method: 'user.gettoptracks',
        user: username,
        api_key: API_KEY,
        format: 'json',
        period: period,
        limit: limit,
        page: page
      }
    });
    return response.data.toptracks.track;
  } catch (error) {
    console.error('Erro ao carregar tracks', error);
    return [];
  }
};
