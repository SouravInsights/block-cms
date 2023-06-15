import { 
  Box, 
  Text
} from '@chakra-ui/react';
import { Welcome, SelectDB } from "../components/commons/sections";

import { usePolybase, useDocument, useCollection } from "@polybase/react";
import { useCurrentUserId } from '@/contexts/common/useCurrentUserId';
import { useDB } from "@/contexts/common/DBProvider";

const PolybaseDashboard = () => (
  <Box>
    This is Polybase Dashboard
  </Box>
)

const CeramicDashboard = () => (
  <Box>
    This is Ceramic Dashboard
  </Box>
)

const Dashboard = () => {
  const polybase = usePolybase();
  const { data, error, loading } =
    useCollection(polybase.collection("users"));

  console.log('user collection:', data?.data);
  const [ publicKey ] = useCurrentUserId();
  const { db, setDb } = useDB();
  console.log("current db:", db);
  return (
    <Box>
      {/* {publicKey ? <SelectDB /> : <Welcome />} */}
      {publicKey && db === "polybase" ? <PolybaseDashboard /> :
        publicKey && db === "ceramic" ? <CeramicDashboard /> : 
          publicKey && db === "" ? <SelectDB /> : ''
      }
    </Box>
  )
}

export default Dashboard;