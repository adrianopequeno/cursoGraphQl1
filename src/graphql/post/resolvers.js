// Querys Resolvers
const posts = async (_, { input }, { dataSources }) => {
  const posts = await dataSources.postsApi.getPosts(input);
  return posts;
};

const post = async (_, { id }, { dataSources }) => {
  const post = await dataSources.postsApi.getPost(id);
  return post;
};

// Mutations Resolvers
const createPost = async (_, { data }, { dataSources }) => {
  return await dataSources.postsApi.createPost(data);
};

const updatePost = async (_, { postId, data }, { dataSources }) => {
  return dataSources.postsApi.updatePost(postId, data);
};

// Fields Resolvers
// async (parent)
const user = async ({ userId }, __, { dataSources }) => {
  return dataSources.usersApi.batchLoadByPostId(userId);
};

export const postResolvers = {
  Query: {
    posts,
    post,
  },
  Mutation: {
    createPost,
    updatePost,
    // deletePost,
    // deleteAllPosts,
  },
  Post: { user },
};
