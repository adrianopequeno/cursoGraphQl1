import fetch from 'node-fetch';
import { getUsers } from './user/utils.js';
import { makeUserDataLoader } from './user/dataloaders.js';
import { getPosts } from './post/utils.js';
import { makePostDataLoader } from './post/postDataLoaders.js';

const API_URL = process.env.API_URL;

export const context = () => {
  return {
    userDataLoader: makeUserDataLoader(getUsers(fetch)),
    getUsers: getUsers(fetch),
    postDataLoader: makePostDataLoader(getPosts(fetch)),
    getPosts: getPosts(fetch),
  };
};
