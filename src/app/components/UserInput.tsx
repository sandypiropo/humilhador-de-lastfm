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
          className="px-12 py-2 rounded-l border-t border-b border-l border-zinc-300 text-zinc-700 w-full sm:w-[300px]"
        />
        <button
          type="submit"
          className="bg-zinc-800 text-white px-6 py-2 rounded-r border-t border-b border-r border-zinc-300 hover:bg-zinc-700 transition"
        >
          Analisar
        </button>
      </div>
    </form>
  );
}
