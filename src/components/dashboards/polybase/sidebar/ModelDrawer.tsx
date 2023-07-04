import {
  Text,
  Button,
  Flex,
  HStack,
  Heading,
  IconButton,
  VStack,
  Box,
  Divider,
  Center,
} from "@chakra-ui/react";
import { useState } from "react";
import { BiChevronLeftSquare, BiMenu } from "react-icons/bi";
import { FiPlus } from "react-icons/fi";
import { ArrowRightIcon, ArrowLeftIcon } from "@chakra-ui/icons";

type Props = {
  heading: string;
};
const ModelDrawer = ({ heading }: Props) => {
  const [onClose, setClose] = useState("large");
  return (
    <Flex
      h="88vh"
      marginTop="2.5vh"
      w={onClose == "small" ? "0px" : "262px"}
      borderRight={"1px solid #CBD5E0"}
      flexDir="column"
      alignItems="flex-start"
    >
      <IconButton
        zIndex={"1"}
        position={"absolute"}
        rounded="20%"
        boxShadow={"sm"}
        size="sm"
        aria-label={""}
        fontSize="10px"
        onClick={() => {
          onClose == "small" ? setClose("large") : setClose("small");
        }}
      >
        {onClose == "small" ? <ArrowRightIcon /> : <ArrowLeftIcon />}
      </IconButton>
      <HStack spacing={75} mt={5}>
        <Heading
          pl="28px"
          fontSize="xl"
          display={onClose == "small" ? "none" : "flex"}
        >
          {heading}
        </Heading>
      </HStack>

      <VStack display={onClose == "small" ? "none" : "flex"}>
        <HStack mt={30}>
          <Text ml={5} fontSize="lg">
            COLLECTIONS
          </Text>
          <Button
            w="66px"
            h="28px"
            ml={5}
            _hover={{ color: "none" }}
            isActive={!false}
            leftIcon={<FiPlus />}
            textColor={"#2B6CB0"}
            fontSize="md"
            bgColor={"#EBF8FF"}
            opacity="0.6"
          >
            Add
          </Button>
        </HStack>
        <Box ml={5} w="220px" h="28px">
          <Text fontSize={"12px"}>
            Collections are similar to a table in a traditional database. You
            must create a collection before adding data to Polybase.
          </Text>
        </Box>
      </VStack>
    </Flex>
  );
};
export default ModelDrawer;
