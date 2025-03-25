import { ValidationError } from 'apollo-server';

export const createPostFn = async (postData, datasource) => {
  const postInfo = await createPostInfo(postData, datasource);
  const { title, body, userId } = postInfo;

  if (!title || !body || !userId) {
    throw new ValidationError('Some input is required');
  }

  return await datasource.post('', { ...postInfo });
};

export const updatePostFn = async (postId, postData, datasource) => {
  if (!postId) {
    throw new ValidationError('ID is required');
  }

  const { title, body, userId } = postData;

  if (typeof title !== 'undefined') {
    if (!title) {
      throw new ValidationError('Title is required');
    }
  }

  if (typeof body !== 'undefined') {
    if (!body) {
      throw new ValidationError('Body is required');
    }
  }

  if (typeof userId !== 'undefined') {
    if (!userId) {
      throw new ValidationError('User Id is required');
    }
    await userExists(userId, datasource);
  }

  return await datasource.patch(postId, { ...postData });
};

export const deletePostFn = async (postId, datasource) => {
  if (!postId) {
    throw new ValidationError('ID is required');
  }

  const deleted = await datasource.delete(postId);
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
