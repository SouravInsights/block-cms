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

const Dashboard = () => {
  const polybase = usePolybase();
  const { data, error, loading } =
    useCollection(polybase.collection("users"));

  const polybaseSchema = generatePolybaseSchema('Post', PostSchemaFileds);
  console.log('polybaseSchema:', polybaseSchema);

  console.log('gql schema:', generateGraphQLSchema(polybaseSchema));

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