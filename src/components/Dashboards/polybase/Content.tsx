import { Box, Button, Divider, HStack, Text } from "@chakra-ui/react";
import React from "react";
import CollectionTable from "./CollectionTable";
import Sidebar from "./sidebar/SideBar";

const ContentDashBoard = () => {
  return (
    <HStack alignItems="flex-start">
      <Sidebar />
      <Sidebar />
      <Box w="100%">
        <Text fontSize="24px" fontWeight="semibold">
          Sample Collection
        </Text>
        <Divider orientation="horizontal" />
        <HStack
          justifyContent="space-between"
          border="1px solid #E2E8F0"
          borderRadius="12px"
          my="24px"
          mx="36px"
          p="10px"
        >
          <Button size="lg">Add New Entry</Button>
          <HStack>
            <Button>Filter</Button>
            <Button>Configure Columns</Button>
          </HStack>
        </HStack>
        <CollectionTable />
      </Box>
    </HStack>
  );
};

export default ContentDashBoard;
