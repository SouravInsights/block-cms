import { Box, Heading, Container, Text, Stack } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function CallToActionWithAnnotation() {
  return (
    <>
      <Container maxW={"3xl"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            BlockCMS
          </Heading>
          <Text color={"gray.500"}>
            The first Headless Content Management System in the Decentralized
            World
          </Text>
          <Stack
            direction={"column"}
            spacing={3}
            align={"center"}
            alignSelf={"center"}
            position={"relative"}
          >
            <ConnectButton accountStatus="address" chainStatus="icon" />
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
