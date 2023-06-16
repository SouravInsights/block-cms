import { useDisclosure } from "@chakra-ui/react";

import { HiPlus } from "react-icons/hi";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";

export const ProjectModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button _hover={{ bg: "none" }} _focus={{ bg: "none" }} onClick={onOpen}>
        <VStack>
          <Icon w="80px" h="80px" as={HiPlus} />
          <Text
            fontFamily="Inter"
            lineHeight="1.2"
            fontWeight="bold"
            fontSize="30px"
            color="black"
          >
            Add project
          </Text>
        </VStack>
      </Button>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add project</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Project Name</FormLabel>
              <Input placeholder="Demo project" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Project Description (Optional)</FormLabel>
              <Input placeholder="Add project description" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              mr={3}
              border={"1px"}
              borderColor={"#000000"}
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button textColor={"white"} bgColor={"#000000"} mr={3}>
              Add Project
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
