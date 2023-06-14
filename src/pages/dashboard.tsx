import { 
  Box, 
  Text
} from '@chakra-ui/react';
import { usePolybase, useDocument, useCollection } from "@polybase/react";

const Dashboard = () => {
  const polybase = usePolybase();
  const { data, error, loading } =
    useCollection(polybase.collection("users"));

  console.log('user collection:', data?.data);

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