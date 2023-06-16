import { useDisclosure } from "@chakra-ui/react";

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
  Divider,
  FormHelperText,
  Text,
} from "@chakra-ui/react";

import { AddIcon } from "@chakra-ui/icons";

export const CollectionModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        _hover={{ color: "none" }}
        leftIcon={<AddIcon />}
        bg={"#000000"}
        textColor={"#FFFFFF"}
        onClick={onOpen}
      >
        Add Collection
      </Button>

      <Modal
        size={"xl"}
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Collection</ModalHeader>
          <Divider border={"1px"} color={"#A0AEC0"} />
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel textColor={"#000000"}>
                Display Name
                <Text fontSize={"12px"} textColor={"gray.400"}>
                  Name that will be displayed in BlockCMS
                </Text>
              </FormLabel>

              <Input />
            </FormControl>

            <FormControl mt={3}>
              <FormLabel>
                API ID
                <Text fontSize={"12px"} textColor={"gray.400"}>
                  ID used for accessing this collection through the API
                </Text>
              </FormLabel>

              <Input />
            </FormControl>

            <FormControl mt={3}>
              <FormLabel>
                Description (Optional)
                <Text fontSize={"12px"} textColor={"gray.400"}>
                  Displays a hint for content editors and API users
                </Text>
              </FormLabel>

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
              Add Collection
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
