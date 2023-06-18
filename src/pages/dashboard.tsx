import { 
  Box, 
  Text
} from '@chakra-ui/react';
import { usePolybase, useCollection } from "@polybase/react";
import { generatePolybaseSchema } from '@/utils';
import { generateGqlSchema, generateGqlResolvers } from '@/graphql/utils';

const PostSchemaFileds = [
  {
    "id": "1",
    "content_type_id": "1",
    "name": "Title",
    "api_id": "title",
    "type": "string",
    "field_options": {
      "required": true,
      "max_length": 100
    }
  },
  {
    "id": "2",
    "content_type_id": "1",
    "name": "Slug",
    "api_id": "slug",
    "type": "string",
    "field_options": {
      "required": false,
      "max_length": 14
    }
  },
  {
    "id": "3",
    "content_type_id": "1",
    "name": "Content",
    "api_id": "content",
    "type": "string",
    "field_options": {
      "required": true,
      "max_length": 5000
    }
  },
  {
    "id": "4",
    "content_type_id": "1",
    "name": "Author",
    "api_id": "author",
    "type": "Author",
    "field_options": {
      "required": true
    }
  }
]

const schema = `
  type Query {
    post: String
  }

  type Mutation {
    createPost(input: CreatePostInput): Post
    updatePost(input: UpdatePostInput): Post
    deletePost(id: ID!): Boolean
  }

  type Post {
    id: ID!
    title: String!
    content: String!
  }

  input CreatePostInput {
    title: String!
    content: String!
  }

  input UpdatePostInput {
    id: ID!
    title: String
    content: String
  }
`;

/* Test cases for the `generateGraphqlSchema` function */
  // Test Case 1: Invalid Polybase schema (missing collection name)
  const polybaseSchema1 = `
    @public
    collection {
      id: string;
      name: string;
    }
  `;

  // Test Case 2: Invalid Polybase schema (no fields found)
  const polybaseSchema2 = `
    @public
    collection Post {
    }
  `;

  // Test Case 3: Invalid Polybase schema (missing field name or type)
  const polybaseSchema3 = `
    @public
    collection Post {
      id: string;
      : string;
      name: string;
      description: ;
    }
  `;

const Dashboard = () => {
  const polybase = usePolybase();
  const { data, error, loading } =
    useCollection(polybase.collection("users"));

  const polybaseSchema = generatePolybaseSchema('Post', PostSchemaFileds);
  const graphqlSchema = generateGqlSchema(polybaseSchema);

  // try {
  //   const graphqlSchema = generateGqlSchema(polybaseSchema1);
  //   console.log('test case 1:', graphqlSchema);
  // } catch (error) {
  //   console.error(error.message);
  // }

  // try {
  //   const graphqlSchema = generateGqlSchema(polybaseSchema2);
  //   console.log('test case 2:', graphqlSchema);
  // } catch (error) {
  //   console.error(error.message);
  // }

  // const typeName = 'Post'; // The type for which you want to generate queries and mutations

  // const generatedResolvers = generateGqlResolvers(schema, typeName);
  // console.log('generatedResolvers:', generatedResolvers);

  const types = [
    {
      name: 'Post',
      schema: `
        id: ID!
        title: String!
        content: String!
      `,
    },
    {
      name: 'Author',
      schema: `
        id: ID!
        name: String!
      `,
    },
  ]; 
  
  const resolvers = generateGqlResolvers(types);
  console.log('resolvers from dashboard:', resolvers);
  return (
    <Box>
      {data?.data.map(({ data }, id) => (
        <Text key={id} fontSize='4xl' fontWeight='bold'>
          {`My public key: ${data.id}`}
        </Text>
      ))}
    </Box>
  )
}

export default Dashboard;