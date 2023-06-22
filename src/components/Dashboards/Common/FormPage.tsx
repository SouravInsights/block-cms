import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  VStack,
  Icon,
  Text,
} from "@chakra-ui/react";

import { HiPlus } from "react-icons/hi";

const FormPage = ({ onFormSubmit }: any) => {
  const [projectName, setProjectName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const data = {
      projectName,
      lastName,
      email,
    };
    onFormSubmit(data);
  };

  return (
    <div>
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

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit}>
              <FormControl id="projectName">
                <FormLabel>Project Name</FormLabel>
                <Input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </FormControl>
              <br />
              <FormControl id="lastName">
                <FormLabel>Project Description (Optional)</FormLabel>
                <Input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </FormControl>
              <br />
              <Button type="submit" colorScheme="blue">
                Submit
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default FormPage;
