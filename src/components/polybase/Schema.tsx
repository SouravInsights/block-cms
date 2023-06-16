import {
  Text,
  Box,
  Heading,
  Link,
  HStack,
  Image,
  Button,
  Flex,
} from "@chakra-ui/react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { CollectionModal } from "./CollectionModal";

export const Schema = () => {
  return (
    <Box maxW={"70%"} mx="auto" p="3rem">
      <Box>
        <Heading
          fontFamily="Inter"
          fontWeight="bold"
          fontSize="24px"
          color="black"
          pb={"1rem"}
        >
          Collections
        </Heading>
        <Text
          fontFamily="Inter"
          lineHeight="1.5"
          fontWeight="regular"
          fontSize="16px"
          color="gray.500"
        >
          Collections are similar to a table in a traditional database. You must
          create a collection before adding data to Polybase. Collections (aka
          database tables) define the fields and rules for a collection of
          records. All records created by a collection are guaranteed to follow
          the rules of that collection. This is in contrast to other smart
          contract languages, where each smart contract is equivalent to a
          single record.
        </Text>
        <Link>
          <HStack
            pt={"1rem"}
            pb="3rem"
            color={"#2B6CB0"}
            alignItems="center"
            gridGap="8px"
          >
            <Text fontSize="sm"> Learn more</Text>
            <FaExternalLinkAlt />
          </HStack>
        </Link>
        <Flex
          borderColor={"#CBD5E0"}
          borderWidth="3px"
          borderRadius={"16px"}
          borderStyle={"dotted"}
          align="center"
          justify="center"
          direction={"column"}
          p={"3rem"}
        >
          <Box pb={"3rem"}>
            <Image src="./Image/collection_illsutration.png" alt="image" />
          </Box>
          <CollectionModal />
        </Flex>
      </Box>
    </Box>
  );
};
