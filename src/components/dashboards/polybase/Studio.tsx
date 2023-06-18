import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "./SideBar";
import ModelDrawer from "./ModelDrawer";

const Studio = () => {
  return (
    <Box>
      <Flex flexDir="row">
        <Sidebar />
        <ModelDrawer />
      </Flex>
    </Box>
  );
};
export default Studio;
