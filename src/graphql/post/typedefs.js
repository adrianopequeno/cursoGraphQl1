import { gql } from 'apollo-server';

/* {
  "id": "860",
  "title": "Et voluptatem nulla omnis et iusto ullam.",
  "body": "Ad non pariatur. Aut molestias accusamus et inventore sunt voluptates non doloremque illum. Perspiciatis et provident vel et fugiat dolores ut. Quos quibusdam impedit cupiditate quia at eaque quae.",
  "userId": "29",
  "indexRef": 10,
  "createdAt": "2018-08-10T23:41:51.714Z"
}, */

export const postTypeDefs = gql`
  extend type Query {
    post(id: ID!): Post
    posts(input: ApiFiltersInput): [Post!]!
  }

  extend type Mutation {
    createPost(data: CreatePostInput!): Post!
    updatePost(postId: ID!, data: UpdatePostInput!): Post!
    # deletePost(id: ID!): Boolean!
    # deleteAllPosts: Boolean!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    indexRef: Int!
    createdAt: String!
    user: User!
  }

  input CreatePostInput {
    title: String!
    body: String!
    userId: String!
  }

  input UpdatePostInput {
    title: String
    body: String
    userId: String
  }
`;
