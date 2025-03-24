import DataLoader from 'dataloader';

export const makePostDataLoader = (getPosts) => {
  return new DataLoader(async (userIds) => {
    // console.log('makePostDataLoader', userIds);
    const urlQuery = userIds.join('&userId=');
    const posts = await getPosts('userId=' + urlQuery);
    // console.log('posts', posts);
    return userIds.map((id) => {
      // console.log('id', id);
      return posts.filter((post) => post.userId === id);
    });
  });
};
