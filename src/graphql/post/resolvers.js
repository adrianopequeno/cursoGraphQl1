const posts = async (_, { input }, { getPosts }) => {
  const apiFiltersInput = new URLSearchParams(input).toString();
  // console.log(apiFiltersInput);
  const posts = await getPosts(apiFiltersInput);
  return posts.json();
};

const post = async (_, { id }, { getPosts }) => {
  const response = await getPosts(id);
  const post = await response.json();
  // console.log(post);
  return post;
};

// async (parent)
const user = async ({ userId }, __, { getUsers }) => {
  const response = await getUsers(userId);
  const userData = await response.json();
  return userData;
};

export const postResolvers = {
  Query: {
    posts,
    post,
  },
  Post: { user },
};
