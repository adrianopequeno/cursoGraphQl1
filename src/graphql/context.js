import fetch from 'node-fetch';
import { normalizedPath } from '../utils.js';
import { getUsers } from './user/utils';
import { makeUserDataLoader } from './user/dataloaders.js';

const API_URL = process.env.API_URL;

export const context = () => {
  return {
    userDataLoader: makeUserDataLoader(getUsers(fetch)),
    getUsers: getUsers(fetch),
    getPosts: (path = '/') => {
      return fetch(`${API_URL}posts${normalizedPath(path)}`);
    },
  };
};

// const normalizedPath = (path) => {
//   if (typeof path === 'object' && path !== null) {
//     // Se for um objeto, transforma em query string
//     const queryString = new URLSearchParams(path).toString();
//     return queryString ? `?${queryString}` : '';
//   }

//   // Converte para string caso venha como número, null ou undefined
//   const strPath = String(path);

//   if (strPath === '/') {
//     return strPath;
//   } else if (/^\d+$/.test(strPath)) {
//     return `/${strPath.replace(/^\/+/, '')}`;
//   } else {
//     return `?${strPath}`;
//   }
// };
