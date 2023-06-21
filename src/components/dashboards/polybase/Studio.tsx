import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "./sidebar/SideBar";

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
