export const fallbackMessages = [
    "Tão ruim que ficou impossível de descrever.",
    "Até a IA ficou sem palavras pra isso.",
    "Não tem salvação, é só vergonha mesmo.",
    "O nível de vergonha alheia bateu no teto.",
    "Nem com toda a crueldade do mundo consigo comentar.",
    "Last.fm pediu pra eu não comentar sobre isso.",
    "Seu gosto é tão peculiar que até a IA bugou.",
    "Eu tentei, mas isso não tem conserto.",
  ];
    
  export function getRandomFallbackMessage() {
    const index = Math.floor(Math.random() * fallbackMessages.length);
    return fallbackMessages[index];
  }
  