'use client';

import { useState } from 'react';

type UserInputProps = {
  onSearch: (username: string) => void;
};

export default function UserInput({ onSearch }: UserInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex flex-col items-center gap-4">
      <input
        type="text"
        placeholder="Digite seu username"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="border border-zinc-400 px-4 py-2 rounded w-full max-w-xs"
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
