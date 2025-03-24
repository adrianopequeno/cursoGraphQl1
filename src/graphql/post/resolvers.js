import DataLoader from 'dataloader';
import fetch from 'node-fetch';

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

const userDataloader = new DataLoader(async (userIds) => {
  // 1&id=2&id=3...
  const urlQuery = userIds.join('&id=');
  const url = 'http://localhost:3000/users/?id=' + urlQuery;
  const response = await fetch(url);
  const users = await response.json();
  return userIds.map((id) => users.find((user) => user.id === id));
});

// async (parent)
const user = async ({ userId }, __, { getUsers }) => {
  return userDataloader.load(userId);
};

export const postResolvers = {
  Query: {
    posts,
    post,
  },
  Post: { user },
};
