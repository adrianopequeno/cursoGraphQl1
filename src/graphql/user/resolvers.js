const users = async (_, { input }, { getUsers }) => {
  const apiFiltersInput = new URLSearchParams(input).toString();
  const users = await getUsers(apiFiltersInput);
  return users.json();
};

const user = async (_, { id }, { getUsers }) => {
  const response = await getUsers(id);
  const user = await response.json();
  // console.log(user);
  return user;
};

const posts = async ({ id }, __, { postDataLoader }) => {
  // console.log(' Resolvers User: ', id);
  return postDataLoader.load(id);
};

export const userResolvers = {
  Query: {
    users,
    user,
  },
  User: { posts },
};
