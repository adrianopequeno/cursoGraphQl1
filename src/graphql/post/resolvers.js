const posts = async (_, { input }, { dataSources }) => {
  const posts = await dataSources.postsApi.getPosts(input);
  return posts;
};

const post = async (_, { id }, { dataSources }) => {
  const post = await dataSources.postsApi.getPost(id);
  return post;
};

// async (parent)
const user = async ({ userId }, __, { dataSources }) => {
  return dataSources.usersApi.batchLoadByPostId(userId);
};

export const postResolvers = {
  Query: {
    posts,
    post,
  },
  Post: { user },
};
