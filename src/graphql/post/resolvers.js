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
  // const post = await dataSources.postsApi.createPost(data);
  // return post;
  console.log(data);
  return {
    id: '1',
    title: 'title',
    body: 'body',
    indexRef: 1,
    createdAt: new Date().toISOString(),
    userId: '502',
  };
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
    // updatePost,
    // deletePost,
    // deleteAllPosts,
  },
  Post: { user },
};
