import fetch from 'node-fetch';
import { getUsers } from './user/utils.js';
import { makeUserDataLoader } from './user/dataloaders.js';
import { getPosts } from './post/utils.js';
import { makePostDataLoader } from './post/postDataLoaders.js';

const _getUsers = getUsers(fetch);
const _getPosts = getPosts(fetch);

export const context = () => {
  return {
    userDataLoader: makeUserDataLoader(_getUsers),
    getUsers: _getUsers,
    postDataLoader: makePostDataLoader(_getPosts),
    getPosts: _getPosts,
  };
};
