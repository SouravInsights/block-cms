import React, { useState } from "react";
import NextButton from "./NextButton";
import { DBlist } from "../DBList";

import { Stack, Box, Text,  VStack, Heading } from "@chakra-ui/react";

export const SelectDB = () => {
  return (
    <>
      <Box>
        <VStack pt={"10rem"}>
          <Box pb="5rem">
            <Heading as="h1" fontSize={"48px"}>
              Select Database
            </Heading>
            <Text
              fontFamily="Inter"
              lineHeight="1.2"
              fontWeight="bold"
              fontSize="16px"
              color="black"
              textAlign="center"
            >
              Select your database to continue
            </Text>
          </Box>
          <Stack
            pb="5rem"
            direction="row"
            justify="center"
            align="center"
            spacing="24px"
          >
            <DBlist />
          </Stack>
          <NextButton />
        </VStack>
      </Box>
    </>
  );
};
