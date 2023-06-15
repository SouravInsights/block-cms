import React, { useState, useEffect } from "react";
import { Stack, Box, Text, Button, VStack, Heading } from "@chakra-ui/react";
import { DBItem } from "../DBItem";

import { ArrowForwardIcon } from "@chakra-ui/icons";

import { useDB } from "@/contexts/common/DBProvider";

const itemsData = [
  {
    id: 1,
    dbName: "polybase",
    itemsIcon: "./Image/Polybase.png",
  },
  {
    id: 2,
    dbName: "ceramic",
    itemsIcon: "./Image/ceramic-logo.png",
  },
  {
    id: 3,
    dbName: "tableland",
    itemsIcon: "./Image/tableland-logo.png",
  },
];


export const SelectDB = () => {
  const { db, setDb } = useDB();
  const [isSelected, setSelected] = useState(false);
  const [selectedDb, setSelectedDb] = useState('');

  console.log('isSelected:', isSelected);
  console.log('selectedDb:', selectedDb);
  console.log('db:', db);

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
            <Stack spacing={8} direction="row" align="center">
              {itemsData.map((item) => {
                return (
                  <DBItem
                    key={item.id}
                    dbName={item.dbName}
                    itemIcon={item.itemsIcon}
                    isSelected={isSelected}
                    onClick={() => {
                      setSelected(true);
                      setSelectedDb(item.dbName)
                    }}
                  />
                );
              })}
            </Stack>
          </Stack>
          <Button
            _hover={{ color: "none" }}
            size="lg"
            isActive={!isSelected}
            rightIcon={<ArrowForwardIcon />}
            textColor={"white"}
            bgColor={"#000000"}
            opacity="0.6"
            onClick={() => {
              setDb(selectedDb)
            }}
          >
            Next
          </Button>
        </VStack>
      </Box>
    </>
  );
};
