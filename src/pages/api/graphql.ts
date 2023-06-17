import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { generateGqlResolvers } from '@/graphql/utils';

const postSchema = `#graphql
type Post {
  id: ID!
  title: String!
  content: String!
}
`;

const resolvers = generateGqlResolvers({ schema: postSchema });

// Extract the typeDefs from the generated resolvers
const typeDefs = `
  ${postSchema}
`;

const server = new ApolloServer({
  schema: resolvers
});

export default startServerAndCreateNextHandler(server);