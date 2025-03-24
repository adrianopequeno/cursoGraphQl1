import DataLoader from 'dataloader';

export const makeUserDataLoader = (getUsers) => {
  return new DataLoader(async (userIds) => {
    const urlQuery = userIds.join('&id=');

    const response = await getUsers(`id=${urlQuery}`);
    // console.log(response);

    if (!response || !response.json) {
      // Verifica se `response.json` existe
      throw new Error('Resposta inválida ao buscar usuários');
    }

    const users = await response.json();

    return userIds.map((id) => users.find((user) => user.id === id) || null);
  });
};
