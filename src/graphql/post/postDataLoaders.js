import DataLoader from 'dataloader';

export const makePostDataLoader = (getPosts) => {
  return new DataLoader(async (userId) => {
    // console.log('User IDs recebidos:', userId);

    // Fazemos uma requisição para todos os userIds recebidos
    const promises = userId.map(async (userId) => {
      // relação de N -> 1. Muitos posts de um usuário
      const response = await getPosts(`userId=${userId}`);

      if (!response || !response.json) {
        throw new Error(`Resposta inválida para userId ${userId}`);
      }

      return response.json();
    });

    // Espera todas as requisições serem concluídas
    const results = await Promise.all(promises);
    // console.log('Resultados retornados:', results);

    // Retorna um array onde cada índice corresponde ao userId original
    return results;
  });
};
