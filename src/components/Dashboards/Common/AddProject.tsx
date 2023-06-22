import { useState } from "react";
import { Stack, Box, Text, Button, Image, Link } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import ProjectModal from "./ProjectModal";

export const AddProject = () => {
  const [active, setActive] = useState(false);
  const handleClick = () => {
    setActive(!active);
  };
  return (
    <Stack justify={"center"} align={"center"}>
      <Stack spacing="48px">
        <Box pt="3rem">
          <Text
            pb="2rem"
            fontFamily="Inter"
            lineHeight="1"
            fontWeight="bold"
            fontSize="48px"
            color="black"
            textAlign="center"
          >
            Add a new project
          </Text>
          <Text
            fontFamily="Inter"
            lineHeight="1.2"
            fontWeight="bold"
            fontSize="16px"
            color="black"
            textAlign="center"
          >
            Create a blank project or start from a template
          </Text>
        </Box>
        <Stack direction="row" justify="center" align="center" spacing="40px">
          <Stack
            py="11.5rem"
            px="5rem"
            borderRadius="16px"
            justify="center"
            align="center"
            spacing="10px"
            background="gray.100"
          >
            <ProjectModal />
          </Stack>
          <Stack
            padding="16px"
            borderRadius="16px"
            justify="flex-start"
            align="flex-start"
            spacing="12px"
            overflow="hidden"
            background="gray.100"
            onClick={handleClick}
            _focus={{ outlineColor: active ? "black" : "white" }}
          >
            <Box
              borderRadius="8px"
              width="360px"
              height="264.19px"
              maxWidth="100%"
            >
              <Image src="./Image/blog.png" alt="Image" />
            </Box>
            <Text
              fontFamily="Inter"
              lineHeight="1.2"
              fontWeight="bold"
              fontSize="30px"
              color="black"
            >
              Blog
            </Text>
            <Text
              fontFamily="Inter"
              lineHeight="1.5"
              fontWeight="regular"
              fontSize="18px"
              color="black"
              width="360px"
              maxWidth="100%"
            >
              Simple blog focused on content with programmatic page generation.
            </Text>
          </Stack>
          <Stack
            padding="16px"
            borderRadius="16px"
            justify="flex-start"
            align="flex-start"
            spacing="12px"
            overflow="hidden"
            background="gray.100"
          >
            <Box
              borderRadius="8px"
              width="360px"
              height="264.19px"
              maxWidth="100%"
            >
              <Image src="./Image/portfolio.png" alt="Image" />
            </Box>
            <Text
              fontFamily="Inter"
              lineHeight="1.2"
              fontWeight="bold"
              fontSize="30px"
              color="black"
            >
              Portfolio
            </Text>
            <Text
              fontFamily="Inter"
              lineHeight="1.5"
              fontWeight="regular"
              fontSize="18px"
              color="black"
              width="360px"
              maxWidth="100%"
            >
              Simple portfolio focused on content with programmatic page
              generation.
            </Text>
          </Stack>
        </Stack>
      </Stack>

      <Box p="3rem">
        <Button leftIcon={<ArrowBackIcon data-icon="CkArrowBack" />} size="lg">
          Back
        </Button>
      </Box>
    </Stack>
  );
};
