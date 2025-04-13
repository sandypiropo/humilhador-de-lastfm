import axios from 'axios';

// Definindo a URL da API de IA (substitua pela URL real da API de IA)
const AI_API_URL = 'URL_DA_API_DE_IA';

// Função para enviar os dados para a API de IA
export const sendToAI = async (userData: any) => {
  try {
    // Enviando os dados para a API de IA (POST)
    const response = await axios.post(AI_API_URL, userData);
    
    // Retornando a resposta da IA (geralmente um texto com a análise)
    return response.data;
  } catch (error) {
    console.error('Erro ao enviar dados para a IA:', error);
    return 'Erro ao analisar dados.'; // Retorna um erro padrão se algo falhar
  }
};
