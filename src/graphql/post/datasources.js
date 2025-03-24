import { RESTDataSource } from 'apollo-datasource-rest';

import { makePostDataLoader } from './postDataLoaders.js';

export class PostsApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.API_URL + 'posts';
    this.dataLoader = makePostDataLoader(this.getPosts.bind(this));
  }

  async getPosts(urlParams = {}) {
    const response = await this.get('', urlParams, {
      cacheOptions: { ttl: 60 }, // 60seg
    });
    return response;
  }

  async getPost(id) {
    const response = await this.get(`/${id}`, undefined, {
      cacheOptions: { ttl: 60 }, // 60seg
    });
    return response;
  }

  batchLoadByUserId(id) {
    return this.dataLoader.load(id);
  }
}
