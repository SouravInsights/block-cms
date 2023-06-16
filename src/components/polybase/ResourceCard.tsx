import { Flex, Text, Card, Box, Image, HStack, Stack } from "@chakra-ui/react";

type Props = {
  heading: string;
  itemIcon: string;
  paragraph: string;
};

export const ResourceCard = ({
  itemIcon,
  heading,
  paragraph,

  ...props
}: Props) => {
  return (
    <>
      <Card p="1rem" background="#FFFFFF" boxShadow="md" {...props}>
        <HStack spacing={8}>
          <Image src={itemIcon} w="10" h="10" alt="image" />

          <Box maxW="80%">
            <Text
              fontFamily="Inter"
              lineHeight="1.5"
              fontWeight="regular"
              fontSize="24px"
              color="black"
            >
              {heading}
            </Text>
            <Text
              fontFamily="Inter"
              lineHeight="1.5"
              fontWeight="regular"
              fontSize="16px"
              color="gray.500"
            >
              {paragraph}
            </Text>
          </Box>
        </HStack>
      </Card>
    </>
  );
};
