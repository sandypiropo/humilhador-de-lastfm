'use client';

import { useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { LoaderCircle } from "lucide-react";
import UserInput from './UserInput';
import { formatUserData } from '@/utils/formatUserData';
import { getProfileData, getTopArtists, getTopAlbums, getTopTracks } from '../../services/getLastfmProfile';

export default function UserAnalyzer() {
  const [username, setUsername] = useState('');
  const [realName, setRealName] = useState('');
  const [userDataForAI, setUserDataForAI] = useState(''); 
  const [isLoading, setIsLoading] = useState(false); 
  const [aiResponse, setAiResponse] = useState('');  
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);


  const period = 'overall'; 
  const limit = 10;         

  const getAIResponse = async (prompt: string) => {
    try {
      const response = await fetch('/api/gptChatApi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error('Falha na resposta da API');
      }

      const data = await response.json();
      return data.choices?.[0]?.message?.content ?? 'Sem resposta.';
    } catch (error) {
      console.error('Erro ao chamar a IA:', error);
      return 'Erro ao se comunicar com a IA.';
    }
  };

  useEffect(() => {
    if (username) {
      const fetchData = async () => {
        setIsLoading(true); 

        try {
          const profile = await getProfileData(username);
          const topArtists = await getTopArtists(username, period, limit);
          const topAlbums = await getTopAlbums(username, period, limit);
          const topTracks = await getTopTracks(username, period, limit);

          const nomeReal = profile.user.realname || profile.user.name; 
          setRealName(nomeReal);

          const {imageUrl, summary} = formatUserData(profile, topArtists, topAlbums, topTracks);
          setImageUrl(imageUrl)
          setUserDataForAI(summary); 

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

      {username && isLoading && (
        <p className="mt-6 text-zinc-600 flex items-center justify-center">
          Verificando usuário: <strong>{username}</strong>
          <LoaderCircle className="size-5 animate-spin" />
        </p>
      )}

{/*&& airesponse*/} 

      {!isLoading &&  (
        <div className="flex justify-center mt-8">
          <div className="w-full max-w-2xl bg-gray-100 p-6 rounded shadow-md">
          <img 
            src={imageUrl} 
            alt="Avatar do usuário" 
            className="mb-4 mx-auto w-32 h-32 rounded-full object-cover"
          />
          <h2 className="text-lg font-bold">{realName}</h2>
          <div className="p-4 bg-white rounded text-black">
            <TypeAnimation
            sequence={["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor  consectetur adipiscing elit. Sed do eiusmod tempor  consectetur adipiscing elit. Sed do eiusmod tempor incididunssssst ut aaaaaaaaaaaaaaaaaaaaaaaaaaaaassssssssssssslabore et dolore magna aliqua."]}
            speed={50}
            wrapper="p"
            repeat={0}
            cursor={true}
            className="text-base font-mono leading-relaxed"
          />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
