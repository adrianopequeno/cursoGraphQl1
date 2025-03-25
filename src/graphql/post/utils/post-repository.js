import { ValidationError } from 'apollo-server';

export const createPostFn = async (postData, datasource) => {
  const postInfo = await createPostInfo(postData, datasource);
  const { title, body, userId } = postInfo;

  if (!title || !body || !userId) {
    throw new ValidationError('Some input is required');
  }

  return await datasource.post('', { ...postInfo });
};

const userExists = async (userId, datasource) => {
  console.log('userExists', userId);
  try {
    await datasource.context.dataSources.usersApi.get(`${userId}`);
  } catch (e) {
    throw new ValidationError(`User ${userId} does not exists`);
  }
};

const createPostInfo = async (postData, datasource) => {
  const { userId, title, body } = postData;

  await userExists(userId, datasource);

  const indexRefPost = await datasource.get('', {
    _limit: 1,
    _sort: 'indexRef',
    _order: 'desc',
  });

  const indexRef = indexRefPost[0].indexRef + 1;

  return {
    title,
    body,
    userId,
    indexRef,
    createdAt: new Date().toISOString(),
  };
};
