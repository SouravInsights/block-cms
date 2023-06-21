import React from "react";
import {
  Flex,
  Text,
  Icon,
  Button,
} from "@chakra-ui/react";

type Props = {
  icon: any;
  title: string;
  active: boolean;
  navSize: string;
  onClick:()=> void;
};
export default function SideBarItem({
  icon,
  title,
  active,
  navSize,
  onClick,
  ...props
}: Props) {
  return (
    <Button mt={30}>
      <Flex
      flexDir="row"
      w="100%"
      alignItems={navSize == "small" ? "center" : "flex-start"}
      onClick={onClick}
    >
       <Icon as={icon} fontSize="xl" color={"blackS"} />
       <Text ml={5} display={navSize == "small" ? "none" : "flex"}>
                {title}
       </Text>
      </Flex>
    </Button>
  );
}
