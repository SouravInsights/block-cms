import { Text, Button, Flex, HStack, Heading, IconButton, VStack, Box  } from "@chakra-ui/react";
import { useState } from "react";
import { BiChevronLeftSquare, BiMenu } from "react-icons/bi";
import { FiPlus } from "react-icons/fi";

type Props ={
  heading : string 
}
const ModelDrawer = ({heading} : Props)=> {
const [onClose, setClose]= useState("large")
  return (
    <Flex
      h="88vh"
      marginTop="2.5vh"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      w={onClose == "small" ? "75px" : "262px"}
      flexDir="column"
      bg={"gray.100"}
      alignItems="flex-start"
    >
    <HStack spacing={75} mt={5}>
         <Heading pl='28px' fontSize="xl"  display={onClose == "small"? "none" : "flex"}>{heading}</Heading>
       <IconButton
          aria-label={""}
          fontSize={"2.5rem"}
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
      </HStack>
      <VStack display={onClose == "small"? "none" : "flex"}>
      <HStack mt={30} >
         <Text ml={5} fontSize='lg'>COLLECTIONS</Text>
         <Button
            w='66px'
            h='28px'
            ml={5}
            _hover={{ color: "none" }}
            isActive={!false}
            leftIcon={<FiPlus />}
            textColor={"#2B6CB0"}
            fontSize='md'
            bgColor={"#EBF8FF"}
            opacity="0.6"
          >
            Add
          </Button>
        </HStack>
        <Box ml={5} w='220px' h='28px'>
           <Text fontSize={'12px'}>
               Collections are similar to a table in a traditional database. You must create a collection before adding data to Polybase.
           </Text>
        </Box>
     </VStack>
    </Flex>
  );
};
export default ModelDrawer;
