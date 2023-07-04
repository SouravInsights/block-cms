import { Box, Text } from "@chakra-ui/react";
import { SelectDB } from "../components/commons/sections";
import { usePolybase, useCollection } from "@polybase/react";
import { useCurrentUserId } from "@/contexts/common/useCurrentUserId";
import { useDB } from "@/contexts/common/DBProvider";
import { AddProject } from "../components/Dashboards/Common/AddProject";
import { Studio } from "../components/Dashboards/polybase";

const Dashboard = () => {
  const polybase = usePolybase();
  const { data, error, loading } = useCollection(polybase.collection("users"));

  console.log("user collection:", data?.data);
  const [publicKey] = useCurrentUserId();
  const { db } = useDB();
  console.log("current db:", db);
  return (
    <Box>
      {publicKey && db === "polybase" ? (
        <AddProject />
      ) : publicKey && db === "ceramic" ? (
        <Studio />
      ) : publicKey && db === "" ? (
        <SelectDB />
      ) : (
        ""
      )}
    </Box>
  );
};

export default Dashboard;
