'use client';

import { useState, useEffect } from 'react';
import UserInput from './UserInput';
import { getProfileData, getTopArtists, getTopAlbums, getTopTracks } from '../../services/getLastfmProfile';
  
export default function UserAnalyzer() {
    const [username, setUsername] = useState(''); 
    const [profileData, setProfileData] = useState<any>(null); 
    const [artists, setArtists] = useState<any[]>([]); 
    const [albums, setAlbums] = useState<any[]>([]); 
    const [tracks, setTracks] = useState<any[]>([]); 
    
    useEffect(() => {
      if (username) {
        const fetchData = async () => {
          try {
            const profile = await getProfileData(username);
            const topArtists = await getTopArtists(username);
            const topAlbums = await getTopAlbums(username);
            const topTracks = await getTopTracks(username);
  
            console.log('Profile:', profile);
            console.log('Top Artists:', topArtists);
            console.log('Top Albums:', topAlbums);
            console.log('Top Tracks:', topTracks);
        
            setProfileData(profile);
            setArtists(topArtists);
            setAlbums(topAlbums);
            setTracks(topTracks);
          } catch (error) {
            console.error('Erro ao obter dados:', error);
          }
        };
  
        fetchData();
      }
    }, [username]);
  
    return (
      <div className="mt-10 text-center">
        <UserInput onSearch={setUsername} />
  
        {username && (
          <p className="mt-6 text-zinc-600">Verificando usuário: <strong>{username}</strong></p>
        )}
  
        {profileData && (
          <div className="mt-8">
            <h2>{profileData.name}</h2>
            <p>{profileData.realname}</p>
            <p>Country: {profileData.country}</p>
            <p>Play Count: {profileData.playcount}</p>
          </div>
        )}
  
        {artists.length > 0 && (
          <div className="mt-8">
            <h3>Top Artists</h3>
            <ul>
              {artists.map((artist, index) => (
                <li key={index}>
                  {artist.name} - {artist.playcount} plays
                </li>
              ))}
            </ul>
          </div>
        )}
  
        {albums.length > 0 && (
          <div className="mt-8">
            <h3>Top Albums</h3>
            <ul>
              {albums.map((album, index) => (
                <li key={index}>
                  {album.name} - {album.playcount} plays
                </li>
              ))}
            </ul>
          </div>
        )}
  
        {tracks.length > 0 && (
          <div className="mt-8">
            <h3>Top Tracks</h3>
            <ul>
              {tracks.map((track, index) => (
                <li key={index}>
                  {track.name} - {track.playcount} plays
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
  