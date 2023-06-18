import { Flex, Heading, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { BiChevronLeftSquare, BiMenu } from "react-icons/bi";

const ModelDrawer =() => {
const [onClose, setClose]= useState("small")
  return (
    <Flex
      h="88vh"
      marginTop="2.5vh"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      w={onClose == "small" ? "75px" : "262px"}
      flexDir="row"
      justifyContent="space-between"
      bg={"gray.100"}
      alignItems="flex-start"
    >
      <Heading fontSize="xl "  display={onClose == "small"? "none" : "flex"}>Schema</Heading>
      <IconButton
          aria-label={""}
          fontSize={"2rem"}
          onClick={() => {
            onClose == "small"? setClose('large') : setClose('small') 
          }
        }
        >
             {onClose == "small"? (
            <BiMenu />
             ) : (
            <BiChevronLeftSquare />
             )}
        </IconButton>
    </Flex>
  );
};
export default ModelDrawer;
