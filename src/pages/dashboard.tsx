import { 
  Box, 
  Text
} from '@chakra-ui/react';
import { usePolybase, useDocument, useCollection } from "@polybase/react";
import { generatePolybaseSchema } from '@/utils';
import { generateGraphQLSchema } from '@/graphql/utils';

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
  console.log('polybaseSchema:', polybaseSchema);

  try {
    const graphqlSchema = generateGraphQLSchema(polybaseSchema);
    console.log('correct gnnnql schema:', graphqlSchema);
  } catch (error) {
    console.error(error.message);
  }

  try {
    const graphqlSchema = generateGraphQLSchema(polybaseSchema1);
    console.log('test case 1:', graphqlSchema);
  } catch (error) {
    console.error(error.message);
  }

  try {
    const graphqlSchema = generateGraphQLSchema(polybaseSchema2);
    console.log('test case 2:', graphqlSchema);
  } catch (error) {
    console.error(error.message);
  }

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