import React from "react";
import { HStack, Heading, Button, Image } from "@chakra-ui/react";
import { useDisconnect, useEnsName } from "wagmi";
import { truncateAddress } from "../../utils/common";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { NavLogin } from "./NavLogin";

type Props = {
  connectWalletClick?: () => void;
  isConnected?: boolean;
  address?: any;
};

export const NavBar = ({ connectWalletClick, isConnected, address }: Props) => {
  return (
    <HStack
      as="nav"
      w="90%"
      px="20px"
      py="14px"
      mx="auto"
      top="20px"
      align="center"
      justify="space-between"
      borderRadius="10px"
      display="flex"
    >
      <Image
        w={"242px"}
        h={"48px"}
        src="./Image/BlockCMS Logo.svg"
        alt="Twitter"
      />
      {isConnected ? (
        <HStack spacing={4}>
          <Heading color="#5a43cc" fontSize="22px" fontWeight="semibold">
            {`${truncateAddress(address)}`}
          </Heading>
          <Button
            bg="#5a43cc"
            color="white"
            _hover={{ bg: "#4731b5" }}
            _active={{ bg: "#4731b5" }}
          >
            Disconnect
          </Button>
        </HStack>
      ) : (
        <NavLogin />
      )}
    </HStack>
  );
};
