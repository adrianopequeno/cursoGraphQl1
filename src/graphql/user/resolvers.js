const users = async (_, { input }, { dataSources }) => {
  const users = await dataSources.usersApi.getUsers(input);
  return users;
};

const user = async (_, { id }, { dataSources }) => {
  const user = await dataSources.usersApi.getUser(id);
  return user;
};

const posts = async ({ id }, __, { dataSources }) => {
  // console.log(' Resolvers User: ', id);
  return dataSources.postsApi.batchLoadByUserId(id);
};

export const userResolvers = {
  Query: {
    users,
    user,
  },
  User: { posts },
};
