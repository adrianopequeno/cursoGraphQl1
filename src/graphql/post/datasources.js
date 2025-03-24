import { RESTDataSource } from 'apollo-datasource-rest';

export class PostsApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.API_URL + 'posts';
  }

  async getPosts(urlParams = {}) {
    const response = await this.get('', urlParams);
    // return Array.isArray(response)
    //   ? response.map((post) => this.postReducer(post))
    //   : [];
    return response;
  }

  async getPost(id) {
    const response = await this.get(`/${id}`);
    // return this.postReducer(response);
    return response;
  }

  // postReducer(post) {
  //   return {
  //     id: post.id,
  //     title: post.title,
  //     body: post.body,
  //     userId: post.userId,
  //   };
  // }
}
