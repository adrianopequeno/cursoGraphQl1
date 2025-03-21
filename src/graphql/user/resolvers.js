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

export const userResolvers = {
  Query: {
    users,
    user,
  },
};
