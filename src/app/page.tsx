import Image from 'next/image';
import humilhadorlastfm from '../app/logo-guigs.png';
import UserAnalyzer from './components/UserAnalyzer'
import { Github, HeartIcon } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans text-zinc-800">

      <main className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <div>
          <Image 
            src={humilhadorlastfm} 
            alt="Descrição da imagem" 
            width={500} 
            height={500} 
          />       
        </div>

        <h2 className="mt-8 mb-4 text-2xl text-zinc-700"> {/* Frase mais próxima do input */}
          Você nem tem tanta personalidade assim...
        </h2>

        <UserAnalyzer />
        <div className="mt-16">
        </div>
      </main>

      <footer className="flex gap-6 flex-wrap items-center justify-center p-6 text-zinc-500">
        <p className="text-lg text-zinc-500">
          Criado por Sandy Piropo
        </p>

        <a
          className="flex items-center gap-2 text-lg font-bold hover:underline hover:underline-offset-4"
          href="https://vercel.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Apoiar projeto
          <HeartIcon className="size-5" />
        </a>

        <a
          className="flex items-center gap-2 text-lg font-bold hover:underline hover:underline-offset-4"
          href="https://github.com/sandypiropo/humilhador-de-lastfm"
          target="_blank"
          rel="noopener noreferrer"
        >
          Repositório no GitHub
          <Github className="size-5" />
        </a>
      </footer>

    </div>
  );
}
