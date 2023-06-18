import { Flex, Heading } from "@chakra-ui/react";

const ModelDrawer = () => {
  return (
    <Flex
      h="88vh"
      marginTop="2.5vh"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      w={"262px"}
      flexDir="column"
      justifyContent="space-between"
      bg={"gray.100"}
      alignItems="center"
    >
      <Heading fontSize="xl">Schema</Heading>
    </Flex>
  );
};
export default ModelDrawer;
