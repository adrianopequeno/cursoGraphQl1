import DataLoader from 'dataloader';

export const makeUserDataLoader = (getUsers) => {
  return new DataLoader(async (userIds) => {
    console.log('userIds: ', userIds);
    const urlQuery = userIds.join('&id=');
    const response = await getUsers(`id=${urlQuery}`);
    console.log(response);
    if (!response) {
      throw new Error('Resposta inválida ao buscar usuários');
    }

    return userIds.map((id) => response.find((user) => user.id === id) || null);
  });
};
