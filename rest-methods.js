import fetch from 'node-fetch';

// v2/list
// ?page=2&limit=100

// const API = 'https://picsum.photos';
const API = 'http://localhost:3000';

const get = (endPoint, urlParam, requestInit = {}) => {
  console.log(
    'URL: ' + `${API}/${endPoint}?${new URLSearchParams(urlParam).toString()}`,
  );
  return fetch(
    `${API}/${endPoint}?${new URLSearchParams(urlParam).toString()}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      ...requestInit,
    },
  );
};

const post = (endPoint, body, requestInit = {}) => {
  console.log('URL: ' + `${API}/${endPoint}`);
  return fetch(`${API}/${endPoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    ...requestInit,
  });
};

const put = (endPoint, body, requestInit = {}) => {
  console.log('URL: ' + `${API}/${endPoint}`);
  return fetch(`${API}/${endPoint}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    ...requestInit,
  });
};

const patch = (endPoint, body, requestInit = {}) => {
  console.log('URL: ' + `${API}/${endPoint}`);
  return fetch(`${API}/${endPoint}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    ...requestInit,
  });
};

const del = (endPoint, requestInit = {}) => {
  console.log('URL: ' + `${API}/${endPoint}`);
  return fetch(`${API}/${endPoint}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    ...requestInit,
  });
};

(async () => {
  // GET -> Ler
  // const photoGetResponse = await get('users/903', {
  //   // page: 2,
  //   // limit: 10,
  //   // id: 903,
  // });
  // const data = await photoGetResponse.json();
  // console.log(data);

  // POST -> Criar
  // const usersPostResponse = await post('users', {
  //   id: '1005',
  //   firstName: 'CRIADO - Marcelo',
  //   lastName: 'CRIADO - Carvalho',
  //   userName: 'CRIADO - marcelo_carvalho',
  //   indexRef: 4,
  //   createdAt: '2019-09-30T19:31:56.383Z',
  // });
  // const data = await usersPostResponse.json();
  // console.log(data);

  // PUT -> Atualizar todo o objeto
  // const usersPutResponse = await put('users/1000', {
  //   id: '1000',
  //   firstName: 'ATUALIZADO COM PUT - Marcelo',
  //   lastName: 'ATUALIZADO COM PUT - Carvalho',
  //   userName: 'ATUALIZADO COM PUT - marcelo_carvalho',
  //   indexRef: 4,
  //   createdAt: '2019-09-30T19:31:56.383Z',
  // });
  // const data = await usersPutResponse.json();
  // console.log(data);

  // PATCH -> Atualizar parte do objeto
  // const usersPatchResponse = await patch('users/1000', {
  //   firstName: 'ATUALIZADO COM PATCH - Marcelo',
  // });
  // const data = await usersPatchResponse.json();
  // console.log(data);

  // DELETE -> Deletar
  const usersDeleteResponse = await del('users/1000');
  const data = await usersDeleteResponse.json();
  console.log(data);
})();
