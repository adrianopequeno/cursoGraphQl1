import fetch from 'node-fetch';

const API_URL = 'http://localhost:3000/';

export const context = () => {
  return {
    getUsers: (path = '/') => {
      return fetch(`${API_URL}users${normalizedPath(path)}`);
    },
    getPosts: (path = '/') => {
      // console.log(path);
      // console.log(normalizedPath(path));
      return fetch(`${API_URL}posts${normalizedPath(path)}`);
    },
  };
};

const normalizedPath = (path) => {
  if (typeof path === 'object' && path !== null) {
    // Se for um objeto, transforma em query string
    const queryString = new URLSearchParams(path).toString();
    return queryString ? `?${queryString}` : '';
  }

  // Converte para string caso venha como número, null ou undefined
  const strPath = String(path);

  if (strPath === '/') {
    return strPath;
  } else if (/^\d+$/.test(strPath)) {
    return `/${strPath.replace(/^\/+/, '')}`;
  } else {
    return `?${strPath}`;
  }
};
