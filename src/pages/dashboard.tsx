import { Box, Text } from "@chakra-ui/react";
import { SelectDB, AddProject } from "../components/commons/sections";
import { Welcome } from "../components/polybase/Welcome";
import { Schema } from "../components/polybase/Schema";
import { usePolybase, useDocument, useCollection } from "@polybase/react";
import { useCurrentUserId } from "@/contexts/common/useCurrentUserId";
import { useDB } from "@/contexts/common/DBProvider";

const Dashboard = () => {
  const polybase = usePolybase();
  const { data, error, loading } = useCollection(polybase.collection("users"));

  console.log("user collection:", data?.data);
  const [publicKey] = useCurrentUserId();
  const { db, setDb } = useDB();
  console.log("current db:", db);
  return (
    <Box>
      {publicKey && db === "polybase" ? (
        <Schema />
      ) : publicKey && db === "ceramic" ? (
        <AddProject />
      ) : publicKey && db === "" ? (
        <SelectDB />
      ) : (
        ""
      )}
    </Box>
  );
};

export default Dashboard;
