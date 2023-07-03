import React, { useState } from "react";
import {
  Flex,
  Text,
  IconButton,
  Divider,
  Square,
  HStack,
  VStack,
} from "@chakra-ui/react";
import {
  FiFileText,
  FiPaperclip,
  FiSettings,
  FiAlertCircle,
} from "react-icons/fi";
import { BiLayer, BiRocket, BiChevronLeftSquare, BiMenu } from "react-icons/bi";
import SideBarItem from "./SideBarItem";
import ModelDrawer from "./ModelDrawer";
const SideBarItems = [
  {
    id: 1,
    name: "Schema",
    itemIcon: BiLayer,
  },
  {
    id: 2,
    name: "Content",
    itemIcon: FiFileText,
  },
  {
    id: 3,
    name: "Files",
    itemIcon: FiPaperclip,
  },  
  {
    id: 4,
    name: "API Plyaground",
    itemIcon: BiRocket,
  },
];

const Sidebar = ({ formData }: any) => {
  const [navSize, changeNavSize] = useState("large");
  const [isSelected, setSelect] = useState(false);
  const [heading, setHeading] = useState("jasbdfaiu");
  return (
    <Flex flexDir="row">
      <Flex
        pos="sticky"
        h="88vh"
        marginTop="2.5vh"
        boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
        w={navSize == "small" ? "75px" : "262px"}
        flexDir="column"
        justifyContent="space-between"
        bg={"gray.100"}
      >
        <VStack mt={5}>
          <IconButton
            aria-label={""}
            mr={5}
            fontSize={"2rem"}
            onClick={() => {
              if (navSize == "small") changeNavSize("large");
              else changeNavSize("small");
            }}
            as={navSize == "small" ? BiMenu : BiChevronLeftSquare}
          />
          <HStack mt={30}>
            <IconButton
              aria-label={""}
              alignItems={navSize == "small" ? "center" : "flex-start"}
            >
              <Square bg="Black" size="60px">
                <Text color="white"> demo</Text>
              </Square>
            </IconButton>
            <Flex
              flexDir="column"
              display={navSize == "small" ? "none" : "flex"}
            >
              <Text fontSize="md" as="b">
                Demo Project
              </Text>
              <Text fontSize="xs">Demo Project</Text>
            </Flex>
          </HStack>
        </VStack>
        <Flex
          p="5%"
          w='100%'
          alignItems={navSize == "small" ? "center" : "flex-start"}
          mb={4}
        >
          <Flex flexDir="column">
          {SideBarItems.map((item) => {
            return (
              <SideBarItem
                key={item.id}
                icon={item.itemIcon}
                title={item.name}
                active={false}
                navSize={navSize}
                onClick={() => {
                  setSelect(true);
                  setHeading(item.name);
                }}
              />
            );
          })}
          </Flex>
        </Flex>
        <Flex
          p="5%"
          flexDir="column"
          w="100%"
          alignItems={navSize == "small" ? "center" : "flex-start"}
          mb={4}
        >
          <Divider
            color={"black"}
            display={navSize == "small" ? "none" : "flex"}
          />
          <Flex flexDir="column"
          >
            <SideBarItem
              navSize={navSize}
              icon={FiSettings}
              title="Project Setting"
              active={false}
              onClick={() => {
                setHeading("Project Setting");
              }}
            />
            <SideBarItem
              navSize={navSize}
              icon={FiAlertCircle}
              title="Help"
              active={false}
              onClick={() => {
                setHeading("Help");
              }}
            />
          </Flex>
        </Flex>
      </Flex>
      {isSelected && heading !== "API Plyaground" ? (
        <ModelDrawer heading={heading} />
      ) : (
        ""
      )}
    </Flex>
  );
};

export default Sidebar;
