import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "./sidebar/SideBar";
import ModelDrawer from "./sidebar/ModelDrawer";
import { Welcome } from "./Welcome";

const Studio = () => {
  return (
    <Box>
      <Flex flexDir="row">
        <Sidebar />
        <Welcome />
      </Flex>
    </Box>
  );
};
export default Studio;
