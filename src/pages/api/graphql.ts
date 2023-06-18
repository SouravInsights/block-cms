import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { generateGqlResolvers } from '@/graphql/utils';

const types = [
  {
    name: 'Post',
    schema: `
      id: ID!
      title: String!
      content: String!
      authorId: ID!
      @refersTo(Author)
    `,
  },
  {
    name: 'Author',
    schema: `
    id: ID!
      name: String!
      posts: [Post]
    `,
  },
];
const resolvers = generateGqlResolvers(types);

// Extract the typeDefs from the generated resolvers
// const typeDefs = `
//   ${postSchema}
// `;

const server = new ApolloServer({
  schema: resolvers
});

export default startServerAndCreateNextHandler(server);