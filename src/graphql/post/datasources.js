import { RESTDataSource } from 'apollo-datasource-rest';

export class PostsApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.API_URL + 'posts';
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
}
