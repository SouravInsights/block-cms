import React, { useState } from "react";
import {
  Flex,
  Text,
  IconButton,
  Divider,
  Avatar,
  Heading,
  Image,
  Box,
  Square,
} from "@chakra-ui/react";
import {
  FiFileText,
  FiPaperclip,
  FiSettings,
  FiAlertCircle,
} from "react-icons/fi";
import {
  BiLayer,
  BiRocket,
  BiChevronLeftSquare,
  BiMenu,
} from "react-icons/bi";
import SideBarItem from "../SideBarItem";
import ModelDrawer from "./ModelDrawer";

const Sidebar = () => {
  const [navSize, changeNavSize] = useState("large");
  const [isSelected, setSelect] = useState(false)
  const [heading, setHeading] = useState('jasbdfaiu')
  return (
    <Flex flexDir= 'row' >
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
      <Flex flexDir="row" p="5%">
        <IconButton
          aria-label={""}
          alignItems={navSize == "small" ? "center" : "flex-start"}
          pt={navSize == "small" ? "5" : ""}
        >
          <Square bg="Black" size="60px">
            <Text color="white"> demo</Text>
          </Square>
        </IconButton>
        <Flex
          flexDir="column"
          pl="5"
          display={navSize == "small" ? "none" : "flex"}
        >
          <Text fontSize="md" as="b">
            Demo Project
          </Text>
          <Text fontSize="xs">Demo Project</Text>
        </Flex>
        <IconButton
          aria-label={""}
          fontSize={"2rem"}
          onClick={() => {
            if (navSize == "small") changeNavSize("large");
            else changeNavSize("small");
          }
        }
        >
             {navSize == "small" ? (
            <BiMenu />
             ) : (
            <BiChevronLeftSquare />
             )}
        </IconButton>
      </Flex>
        <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize == "small" ? "center" : "flex-start"}
        mb={4}
      >
        <SideBarItem
          navSize={navSize}
          icon={BiLayer}
          title="Schema"
          active={false}
          onClick ={
            ()=>{
              setHeading('Schema')
              setSelect(true)
           }
          }
          />
        <SideBarItem
          navSize={navSize}
          icon={FiFileText}
          title="Content"
          active={true}
          onClick ={
            ()=>{
              setHeading('Content')
           }
          }
        />
        <SideBarItem
          navSize={navSize}
          icon={FiPaperclip}
          title="Files"
          active={false}
          onClick ={
            ()=>{
              setHeading('Files')
           }
          }
        />
        <SideBarItem
          navSize={navSize}
          icon={BiRocket}
          title="API Playground"
          active={false}
          onClick ={
            ()=>{
              setHeading('API Playground')
           }
          }
        />
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
        <Flex flexDir="column">
          <SideBarItem
            navSize={navSize}
            icon={FiSettings}
            title="Project Setting"
            active={false}
            onClick ={
              ()=>{
                setHeading('Project Setting')
             }
            }
          />
          <SideBarItem
            navSize={navSize}
            icon={FiAlertCircle}
            title="Help"
            active={false}
            onClick ={
              ()=>{
                setHeading('Help')
             }
            }
          />
        </Flex>
      </Flex>
    </Flex>
    {isSelected? 
    (<ModelDrawer />):('')}
  </Flex>
  );
};

export default Sidebar;
