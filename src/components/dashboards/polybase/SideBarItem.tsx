import React from "react";
import {
  Flex,
  Text,
  Icon,
  Link,
  Menu,
  MenuButton,
  MenuList,
} from "@chakra-ui/react";

type Props = {
  icon: any;
  title: string;
  active: boolean;
  navSize: string;
};

export default function SideBarItem({
  icon,
  title,
  active,
  navSize,
  ...props
}: Props) {
  return (
    <Flex
      mt={30}
      flexDir="column"
      w="100%"
      alignItems={navSize == "small" ? "center" : "flex-start"}
    >
      <Menu placement="right">
        <Link
          backgroundColor={active ? "blackAlpha.300" : ""}
          p={3}
          borderRadius={8}
          _hover={{ color: "none" }}
        >
          <MenuButton w="100%">
            <Flex>
              <Icon as={icon} fontSize="xl" color={"blackS"} />
              <Text ml={5} display={navSize == "small" ? "none" : "flex"}>
                {title}
              </Text>
            </Flex>
          </MenuButton>
        </Link>
      </Menu>
    </Flex>
  );
}
