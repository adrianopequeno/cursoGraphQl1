import { ValidationError } from 'apollo-server';

export const createUserFn = async (userData, datasource) => {
  const userInfo = await createUserInfo(userData, datasource);
  const { firstName, lastName, userName } = userInfo;

  if (!firstName || !lastName || !userName) {
    throw new ValidationError('All fields are required');
  }
  console.log('userInfo', userInfo);
  return await datasource.post('', { ...userInfo });
};

const createUserInfo = async (userData, datasource) => {
  const { firstName, lastName, userName } = userData;

  const indexRefUser = await datasource.get('', {
    _limit: 1,
    _sort: 'indexRef',
    _order: 'desc',
  });

  const indexRef = indexRefUser[0].indexRef + 1;

  return {
    firstName,
    lastName,
    userName,
    indexRef,
    createdAt: new Date().toISOString(),
  };
};
