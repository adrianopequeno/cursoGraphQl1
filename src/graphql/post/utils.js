import { normalizedPath } from '../../utils.js';

export const getPosts =
  (fetch) =>
  async (path = '/') => {
    const response = await fetch(
      `${process.env.API_URL}posts${normalizedPath(path)}`,
    );
    if (!response.ok) {
      throw new Error(`Erro ao buscar posts: ${response.statusText}`);
    }

    return response; // Retorna a resposta corretamente
  };
