import { Box, Button, Divider, HStack, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsFilter } from "react-icons/bs";
import CollectionTable from "./CollectionTable";
import Sidebar from "./sidebar/SideBar";

type props = {
  schemaName: string;
  onHandleNewEntry?: () => void;
  onFilter?: () => void;
  onConfigure?: () => void;
};
const ContentDashBoard = ({
  schemaName,
  onHandleNewEntry,
  onFilter,
  onConfigure,
}: props) => {
  return (
    <HStack alignItems="flex-start">
      <Sidebar />
      <Sidebar />
      <Box w="100%">
        <Text fontSize="24px" fontWeight="semibold">
          {schemaName}
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
          <Button
            size="lg"
            bg="#718096"
            color="white"
            _hover={{}}
            onClick={onHandleNewEntry}
          >
            <Icon as={AiOutlinePlus} />
            Add New Entry
          </Button>
          <HStack>
            <Button
              variant="outline"
              color="#718096"
              _hover={{}}
              onClick={onFilter}
            >
              <Icon as={BsFilter} size="md" boxSize={6} mr="5px" />
              Filter
            </Button>
            <Button
              variant="outline"
              border="1px solid #A0AEC0"
              _hover={{}}
              onClick={onConfigure}
            >
              Configure Columns
            </Button>
          </HStack>
        </HStack>
        <CollectionTable />
      </Box>
    </HStack>
  );
};

export default ContentDashBoard;
