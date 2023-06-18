import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "./sidebar/SideBar";
import ModelDrawer from "./sidebar/ModelDrawer";

const Studio = () => {
  return (
    <Box>
      <Flex flexDir="row">
        <Sidebar />
      </Flex>
    </Box>
  );
};
export default Studio;
