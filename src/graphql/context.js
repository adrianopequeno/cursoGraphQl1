import fetch from 'node-fetch';
import { getUsers } from './user/utils.js';
import { getPosts } from './post/utils.js';

const _getUsers = getUsers(fetch);
const _getPosts = getPosts(fetch);

export const context = () => {
  return {
    getUsers: _getUsers,
    getPosts: _getPosts,
  };
};
