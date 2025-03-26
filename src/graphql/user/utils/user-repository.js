import { ValidationError } from 'apollo-server';

export const createUserFn = async (userData, datasource) => {
  const userInfo = await createUserInfo(userData, datasource);
  const { firstName, lastName, userName } = userInfo;

  if (!firstName || !lastName || !userName) {
    throw new ValidationError('All fields are required');
  }

  return await datasource.post('', { ...userInfo });
};

export const updateUserFn = async (userId, userData, datasource) => {
  // verificar se o userId foi passado
  if (!userId) {
    throw new ValidationError('UserID is required');
  }

  const { firstName, lastName, userName } = userData;

  if (
    (typeof firstName !== 'undefined' && !firstName) ||
    (typeof lastName !== 'undefined' && !lastName) ||
    (typeof userName !== 'undefined' && !userName)
  ) {
    throw new ValidationError('Missing data. Review your information');
  }

  await userExists(userId, datasource);

  return await datasource.patch(userId, { ...userData });
};

export const deleteUserFn = async (userId, datasource) => {
  await userExists(userId, datasource);
  const deleted = await datasource.delete(userId);
  return !!deleted;
};

const userExists = async (userId, datasource) => {
  console.log('userExists', userId);
  try {
    await datasource.context.dataSources.usersApi.get(`${userId}`);
  } catch (e) {
    throw new ValidationError(`User ${userId} does not exists`);
  }
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
