import { Stack, Box, Text, Heading } from "@chakra-ui/react";
import { NavLogin } from "../NavLogin";

export const Welcome = () => {
  return (
    <Box pt={"10rem"}>
      <Stack justify="center" align="center" pt={10}>
        <Heading as="h1" fontSize={"48px"} pb="10px">
          BlockCMS
        </Heading>
        <Text
          fontFamily="Inter"
          lineHeight="1.33"
          fontWeight="semibold"
          fontSize="12px"
          color="black"
          textAlign="center"
        >
          The first Headless Content Management System in the Decentralized
          World{" "}
        </Text>

        <NavLogin />
      </Stack>
    </Box>
  );
};
