import DataLoader from 'dataloader';

export const makePostDataLoader = (getPosts) => {
  return new DataLoader(async (userIds) => {
    const urlQuery = userIds.join('&userId=');
    const responde = await getPosts('userId=' + urlQuery);
    const posts = await responde.json();
    // console.log('Posts: ', posts);
    return userIds.map((id) => {
      return posts.filter((post) => post.userId === id);
    });
  });
};
