import { 
  Box, 
  Button,
} from '@chakra-ui/react';
import { usePolybase, useDocument, useCollection } from "@polybase/react";

import { useCurrentUserId } from '@/contexts/common/useCurrentUserId';

export default function App() {
  const polybase = usePolybase();
  const { data, error, loading } =
    useDocument(polybase.collection("users").record("id"));
  // console.log('user id:', data);

  const [ publicKey ] = useCurrentUserId();
  console.log('currentUserId:', publicKey);
  return (
    <Box>
      
    </Box>
  )
}