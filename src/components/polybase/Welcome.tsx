import { Stack, Text, Box, Heading, Image, HStack } from "@chakra-ui/react";
import { ResourceCard } from "./ResourceCard";

const itemsData = [
  {
    heading: "Documentation",
    paragraph: "Discover the concepts, guides & tutorials",
    itemsIcon: "./Image/Documentation.png",
  },
  {
    heading: "Examples",
    paragraph: "Learn by testing real project developed by the community",
    itemsIcon: "./Image/Example.png",
  },
  {
    heading: "Tutorials",
    paragraph: "Discover the concepts, guides & tutorials",
    itemsIcon: "./Image/Tutorial.png",
  },
];

export const Welcome = () => {
  return (
    <Box maxW={"70%"} mx="auto" p="5rem">
      <Box pb="5rem">
        <Heading
          fontFamily="Inter"
          lineHeight="1"
          fontWeight="bold"
          fontSize="48px"
          color="black"
          pb={"1rem"}
        >
          Welcome 👋🏻
        </Heading>
        <Text
          fontFamily="Inter"
          lineHeight="1.5"
          fontWeight="regular"
          fontSize="16px"
          color="gray.500"
        >
          Demo project to create web3 blog.
        </Text>
      </Box>
      <Stack w="100%" gap={"10"} direction="row">
        <Stack justify={"space-between"} w="60%">
          {itemsData.map((item, i) => {
            return (
              <ResourceCard
                key={i}
                heading={item.heading}
                paragraph={item.paragraph}
                itemIcon={item.itemsIcon}
              />
            );
          })}
        </Stack>
        <Stack w="40%" spacing="24px">
          <Box p="1rem" borderRadius="8px" boxShadow="md" background="#FFFFFF">
            <Heading
              fontFamily="Inter"
              lineHeight="1.5"
              fontWeight="regular"
              fontSize="24px"
              color="black"
            >
              Join the community
            </Heading>
            <Text
              fontFamily="Inter"
              lineHeight="1.5"
              fontWeight="regular"
              fontSize="16px"
              color="gray.500"
            >
              Discuss with team members, contributors and developers on
              different channels.
            </Text>

            <HStack pt="2rem">
              <Image src="./Image/discord.svg" alt="Discord" />
              <Text
                fontFamily="Inter"
                lineHeight="1.5"
                fontWeight="regular"
                fontSize="18px"
                color="#000000"
              >
                Discord
              </Text>
            </HStack>
            <HStack pt="2rem">
              <Image src="./Image/twitter.svg" alt="Twitter" />
              <Text
                fontFamily="Inter"
                lineHeight="1.5"
                fontWeight="regular"
                fontSize="18px"
                color="#000000"
              >
                Twitter
              </Text>
            </HStack>
            <HStack pt="2rem">
              <Image src="./Image/github.svg" alt="Github" />
              <Text
                fontFamily="Inter"
                lineHeight="1.5"
                fontWeight="regular"
                fontSize="18px"
                color="#000000"
              >
                Github
              </Text>
            </HStack>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};
