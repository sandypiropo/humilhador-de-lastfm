'use client';

import { useState, useEffect } from 'react';
import { LoaderCircle } from "lucide-react";
import UserInput from './UserInput';
import { formatUserData } from '@/utils/formatUserData';
import { getProfileData, getTopArtists, getTopAlbums, getTopTracks } from '../../services/getLastfmProfile';

export default function UserAnalyzer() {
  const [username, setUsername] = useState('');
  const [userDataForAI, setUserDataForAI] = useState(''); 
  const [isLoading, setIsLoading] = useState(false); 

  const period = 'overall'; 
  const limit = 10;         

  useEffect(() => {
    if (username) {
      const fetchData = async () => {
        setIsLoading(true); 

        try {
          const profile = await getProfileData(username);
          const topArtists = await getTopArtists(username, period, limit);
          const topAlbums = await getTopAlbums(username, period, limit);
          const topTracks = await getTopTracks(username, period, limit);

          const formattedData = formatUserData(profile, topArtists, topAlbums, topTracks);
          setUserDataForAI(formattedData); 
          
        } catch (error) {
          console.error('Erro ao obter dados:', error);
        } finally {
          setIsLoading(false); 
        }
      };

      fetchData();
    }
  }, [username]);

  return (
    <div className="mt-10 text-center">
      <UserInput onSearch={setUsername} />

      {username && !isLoading && (
        <p className="mt-6 text-zinc-600">
          Verificando usuário: <strong>{username}</strong>
        </p>
      )}

      {isLoading && (
        <p className="mt-6 text-zinc-600">
          Carregando dados... <LoaderCircle className="size-4 animate-spin" />
        </p>
      )}

      {userDataForAI && !isLoading && (
        <div className="mt-8">
          <h3>Dados para IA:</h3>
          <pre>{userDataForAI}</pre> 
        </div>
      )}
    </div>
  );
}
