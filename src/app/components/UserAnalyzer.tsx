'use client';

import { useState, useEffect, useRef } from 'react';
import domtoimage from 'dom-to-image';
import { TypeAnimation } from 'react-type-animation';
import { LoaderCircle, Download } from "lucide-react";
import UserInput from './UserInput';
import Toast from './Toast';
import { formatUserData } from '@/utils/formatUserData';
import { getProfileData, getTopArtists, getTopAlbums, getTopTracks } from '../../services/getLastfmProfile';

export default function UserAnalyzer() {
  const [username, setUsername] = useState('');
  const [realName, setRealName] = useState('');
  const [userDataForAI, setUserDataForAI] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isDownloadReady, setIsDownloadReady] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [aiResponse, setAiResponse] = useState('');

  const cardRef = useRef<HTMLDivElement>(null); 
  const downloadRef = useRef<HTMLButtonElement>(null); 

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

          const nomeReal = profile.user.realname || profile.user.name;
          setRealName(nomeReal);

          const { imageUrl, summary } = formatUserData(profile, topArtists, topAlbums, topTracks);
          setImageUrl(imageUrl);
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDownloadReady(true);
    }, 20000);

    return () => clearTimeout(timer);
  }, []);

  const handleDownload = async () => {
    if (cardRef.current && downloadRef.current) {
      try {
        downloadRef.current.style.display = "none"; 

        const dataUrl = await domtoimage.toPng(cardRef.current);

        const link = document.createElement('a');
        link.download = `${username || 'analise'}-humilhadorlastfm.png`;
        link.href = dataUrl;
        link.click(); 

        downloadRef.current.style.display = "block"; 
      } catch (error) {
        console.error('Erro ao gerar imagem:', error);
        alert('Erro ao tentar gerar o download da imagem.');
      }
    }
  };

  useEffect(() => {
    if (!isLoading && userDataForAI) {
      const showToastTimer = setTimeout(() => 
        setShowToast(true), 20000); 
      const hideToastTimer = setTimeout(() => 
        setShowToast(false), 70000); 
  
      return () => {
        clearTimeout(showToastTimer);
        clearTimeout(hideToastTimer);
      };
    }
  }, [isLoading, userDataForAI]);
  

  return (
<div className="mt-10 text-center">
  <UserInput onSearch={setUsername} />

  {username && isLoading && (
    <p className="mt-6 text-zinc-600 flex items-center justify-center gap-2">
      <LoaderCircle className="size-5 animate-spin" />
      Verificando usuário: <strong>{username}</strong>
    </p>
  )}

  {!isLoading && username && (
    <div className="flex justify-center mt-8 px-4 max-w-full overflow-visible">
      {/* Card que será capturado */}
      <div ref={cardRef} className="w-full max-w-2xl bg-gray-100 p-4 sm:p-6 rounded shadow-md relative">
      <img
        crossOrigin="anonymous"
        src={imageUrl}
        alt="Avatar do usuário"
        className="mb-4 mx-auto w-32 h-32 rounded-full object-cover"
      />
      <h2 className="text-lg font-bold text-center">{realName}</h2>

      <div className="p-4 bg-white rounded text-black mt-4">
        <TypeAnimation
          key={username}
          sequence={[
            "Texto gerado aqui... Lorem ipsum dolor orem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, orem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua orem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua orem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
          ]}
          speed={80}
          wrapper="p"
          repeat={0}
          cursor={true}
          className="text-base sm:text-lg leading-relaxed text-justify font-sans"
        />
      </div>

      <div className="flex justify-center mt-6">
        <p className="text-sm" style={{ fontSize: '12px' }}>humilhadorlastfm.vercel.app</p>
      </div>

      <div className="flex justify-center mt-6 min-h-[40px]">
  {isDownloadReady ? (
    <button
      ref={downloadRef}
      onClick={(e) => {
        e.preventDefault(); 
        handleDownload();
      }}
      className="text-gray-600 hover:text-black flex items-center gap-2"
      title="Baixar imagem"
    >
      <Download />
    </button>
  ) : (
    <span className="text-zinc-400 flex items-center gap-2">
      <LoaderCircle className="size-4 animate-spin" /> Analisando essa tragédia..
    </span>
  )}
</div>

      </div>
    </div>
  )}
      <Toast 
        message="Gostou do projeto? O uso da IA não é gratuito... Apoie o projeto a continuar! Clique em 'Apoiar o Projeto' no rodapé!" 
        show={showToast} 
        onClose={() => setShowToast(false)} 
      />
    </div>
  );
}
