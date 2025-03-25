import { RESTDataSource } from 'apollo-datasource-rest';

import { makePostDataLoader } from './postDataLoaders.js';
import { createPostFn } from './utils/post-repository.js';

export class PostsApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.API_URL + 'posts';
    this.dataLoader = makePostDataLoader(this.getPosts.bind(this));
  }

  async getPosts(urlParams = {}) {
    // console.log('getPosts', urlParams);
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

  async createPost(postData) {
    return createPostFn(postData, this);
  }

  batchLoadByUserId(id) {
    return this.dataLoader.load(id);
  }
}
