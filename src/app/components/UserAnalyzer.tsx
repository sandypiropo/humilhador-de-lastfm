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
  const [period, setPeriod] = useState('overall'); 
  const [limit, setLimit] = useState(10);         

  useEffect(() => {
    if (username) {
      const fetchData = async () => {
        try {
          const profile = await getProfileData(username);
          const topArtists = await getTopArtists(username, period, limit);
          const topAlbums = await getTopAlbums(username, period, limit); // Passando período e limite
          const topTracks = await getTopTracks(username, period, limit);

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
  }, [username, period, limit]); // Dependências para re-fetch de dados

  return (
    <div className="mt-10 text-center">
      <UserInput onSearch={setUsername} />

      {username && (
        <p className="mt-6 text-zinc-600">Verificando usuário: <strong>{username}</strong></p>
      )}

      {profileData && (
        <div className="mt-8">
          <h2>Username: {profileData.user.name}</h2>
          <p>Nome: {profileData.user.realname}</p>
          <p>Play Count: {profileData.user.playcount}</p>
          <p>Albums: {profileData.user.album_count}</p>
          <p>Artistas: {profileData.user.artist_count}</p>
        </div>
      )}

      {artists && artists.length > 0 && (
        <div className="mt-8">
          <h3>Top Artists</h3>
          <ul>
            {artists.slice(0, limit).map((artist, index) => (
              <li key={index}>
                {index + 1}. {artist.name} - {artist.playcount} plays
              </li>
            ))}
          </ul>
        </div>
      )}

      {albums && albums.length > 0 && (
        <div className="mt-8">
          <h3>Top Albums</h3>
          <ul>
            {albums.slice(0, limit).map((album, index) => (
              <li key={index}>
                {index + 1}. Artista: {album.artist.name} - Nome do album: {album.name} - {album.playcount} plays
              </li>
            ))}
          </ul>
        </div>
      )}
      {tracks && tracks.length > 0 && (
        <div className="mt-8">
          <h3>Top Músicas</h3>
          {tracks.slice(0, limit).map((track, index) => (
            <p key={index}>
              {index + 1}. {track.artist.name} — {track.name} — {track.playcount} plays
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
