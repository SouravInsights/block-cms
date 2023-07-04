import {
  Text,
  Box,
  Heading,
  Divider,
  HStack,
  Image,
  IconButton,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  VStack,
} from "@chakra-ui/react";
import { LuMoreHorizontal, LuEdit3, LuEdit } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";

export const Collection = () => {
  return (
    <>
      <Box w="80%">
        <Box p="2rem">
          <HStack spacing="10px" pb="3px">
            <HStack>
              <Heading
                fontFamily="Inter"
                fontWeight="bold"
                fontSize="24px"
                color="black"
              >
                Sample collection
              </Heading>
              <Text
                as="sub"
                fontFamily="Inter"
                fontWeight="regular"
                fontSize="16px"
                color="gray.500"
              >
                #SampleCollection
              </Text>
            </HStack>
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<LuMoreHorizontal />}
                variant="outline"
              />
              <MenuList>
                <MenuItem icon={<LuEdit3 size={"24px"} />}>
                  Edit collection
                </MenuItem>
                <MenuItem icon={<LuEdit size={"24px"} />}>
                  Content editing
                </MenuItem>
                <MenuItem
                  textColor={"red"}
                  icon={<MdDeleteOutline size={"24px"} color="red" />}
                >
                  Delete
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>

          <Text
            fontFamily="Inter"
            lineHeight="1.5"
            fontWeight="regular"
            fontSize="16px"
            color="gray.500"
          >
            A sample collection for testing application.
          </Text>
        </Box>

        <Divider w="100%" mx="auto" pt="10px" />
        <HStack direction={"column"}>
          <VStack w="70%" pb={"3rem"} p={"3rem"}>
            <Image src="./Image/fields-illustration.png" alt="image" />
            <Text
              fontFamily="Inter"
              lineHeight="1.5"
              fontWeight="regular"
              fontSize="16px"
              color="#00000"
            >
              Add your first field
            </Text>
          </VStack>
          {/*<Flex
            bg="gray.300"
            flexDirection={"column"}
            w="30%"
            p={4}
            color="white"
          >
            <Text>Add fields</Text>

            <Text>STRING</Text>
          </Flex>*/}
        </HStack>
      </Box>
    </>
  );
};
