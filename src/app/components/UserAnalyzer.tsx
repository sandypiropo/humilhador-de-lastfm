'use client';

import { useState } from 'react';
import UserInput from './UserInput';

export default function UserAnalyzer() {
  const [username, setUsername] = useState('');

  return (
    <div className="mt-10 text-center">
      <UserInput onSearch={setUsername} />

      {username && (
        <div className="mt-6">
          <p>Analisando perfil de: <strong>{username}</strong></p>
          {/* Aqui futuramente entra o resultado da API */}
        </div>
      )}
    </div>
  );
}
