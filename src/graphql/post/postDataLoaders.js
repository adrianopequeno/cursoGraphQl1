import DataLoader from 'dataloader';

export const makePostDataLoader = (getPosts) => {
  return new DataLoader(async (userIds) => {
    const urlQuery = userIds.join('&userId=');
    const posts = await getPosts('userId=' + urlQuery);
    return userIds.map((id) => {
      return posts.filter((post) => post.userId === id);
    });
  });
};
