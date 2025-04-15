'use client';

import { useState } from 'react';

interface Props {
  onSearch: (username: string) => void;
}

export default function UserInput({ onSearch }: Props) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex justify-center w-full">
      <div className="relative flex">
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lg text-zinc-600">@</span>
        <input
          type="text"
          placeholder="Digite seu username"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="px-14 py-3 rounded-l border-t border-b border-l border-zinc-300 text-zinc-700 w-full sm:w-[350px]"
        />
        <button
          type="submit"
          className="text-white px-8 py-3 rounded-r border-t border-b border-r border-zinc-300 bg-black hover:brightness-100 transition"
          style={{ transition: 'background-color 0.3s ease' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F80701')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'black')}
        >
          Analisar
        </button>
      </div>
    </form>

  );
}
