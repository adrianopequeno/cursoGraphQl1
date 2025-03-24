import { normalizedPath } from '../../utils.js';

export const getUsers =
  (fetch) =>
  async (path = '/') => {
    const response = await fetch(
      `${process.env.API_URL}users${normalizedPath(path)}`,
    );
    if (!response.ok) {
      throw new Error(`Erro ao buscar usuários: ${response.statusText}`);
    }

    return response; // Retorna a resposta corretamente
  };
