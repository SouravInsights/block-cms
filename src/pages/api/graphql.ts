import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { generateGqlResolvers } from '@/graphql/utils';

const schema = `
type Author {
  id: ID!
  name: String!
  bio: String!
  posts: [Post!]!
}

type Post {
  id: ID!
  title: String!
  content: String!
  author: Author!
}
`

const resolvers = generateGqlResolvers(schema);
console.log('resolvers:', resolvers);

const server = new ApolloServer({
  schema: resolvers
});

export default startServerAndCreateNextHandler(server);