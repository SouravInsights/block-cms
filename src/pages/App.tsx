import { Box } from '@chakra-ui/react';
import { usePolybase, useDocument, useCollection } from "@polybase/react";

import { useCurrentUserId } from '@/contexts/common/useCurrentUserId';
import { useAccount } from "wagmi";
import { useDB } from "@/contexts/common/DBProvider";
import { Welcome, SelectDB } from "../components/commons/sections";

export default function App() {

  const polybase = usePolybase();
  const { data, error, loading } =
    useDocument(polybase.collection("users").record("id"));
  // console.log('user id:', data);

  const { isConnected } = useAccount();
  const { db, setDb } = useDB();
  console.log("db ulll:", db);
  const [ publicKey ] = useCurrentUserId();

  console.log('currentUserId:', publicKey);

  return (
    <Box>
      {isConnected ? <SelectDB /> : <Welcome />}
    </Box>
  )
}
