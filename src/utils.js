export const normalizedPath = (path) => {
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
