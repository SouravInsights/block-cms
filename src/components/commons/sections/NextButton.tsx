// NextButton.tsx
import React, { useContext } from "react";
import { Button } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

const NextButton: React.FC = () => {
  return (
    <Button
      _hover={{ color: "none" }}
      size="lg"
      rightIcon={<ArrowForwardIcon />}
      textColor={"white"}
      bgColor={"#000000"}
      opacity="0.6"
    >
      Next
    </Button>
  );
};

export default NextButton;
