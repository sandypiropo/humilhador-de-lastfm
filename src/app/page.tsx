import Image from 'next/image';
import humilhadorlastfm from '../app/logo-guigs.png';
import UserAnalyzer from './components/UserAnalyzer'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans text-zinc-800">
      {/* Conteúdo centralizado */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <div>
          <Image 
            src={humilhadorlastfm} 
            alt="Descrição da imagem" 
            width={500} // Defina a largura da imagem
            height={500} // Defina a altura da imagem
          />       
          <h2 className="mt-2 text-2xl text-zinc-700">
          Você nem tem tanta personalidade assim...
          </h2>
        </div>
          <UserAnalyzer/>
        <div className="mt-16">
        </div>
      </main>

      {/* Footer */}
      <footer className="flex gap-6 flex-wrap items-center justify-center p-6 text-sm text-zinc-500">
        <a
          className="hover:underline hover:underline-offset-4"
          target="_blank"
          rel="noopener noreferrer"
        >
          Criado por Sandy Piropo
        </a>
        <a
          className="hover:underline hover:underline-offset-4"
          href="https://vercel.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Apoiar projeto
        </a>
        <a
          className="hover:underline hover:underline-offset-4"
          href="https://github.com/sandypiropo/humilhador-de-lastfm"
          target="_blank"
          rel="noopener noreferrer"
        >
          Repositório no GitHub
        </a>
      </footer>
    </div>
  );
}
