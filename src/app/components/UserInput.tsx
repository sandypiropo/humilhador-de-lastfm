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
    <form onSubmit={handleSubmit} className="mt-8 flex flex-col items-center gap-4">
         <span className="select-none" aria-hidden>
          @
        </span>
      <input
        type="text"
        placeholder="Digite seu username"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="px-4 py-2 rounded border border-zinc-300 text-zinc-700"
      />
      <button
        type="submit"
        className="bg-zinc-800 text-white px-6 py-2 rounded hover:bg-zinc-700 transition"
      >
        Analisar
      </button>
    </form>
  );
}
