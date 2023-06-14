import React, { useContext, useEffect, useState } from "react";
import { Button, Image, Stack } from "@chakra-ui/react";
import { useDB } from "@/contexts/common/DBProvider";

type Props = {
  dbName: string;
  itemIcon: string;
  isSelected: boolean;
  onClick?: () => void;
};

export const DBItem = ({
  dbName,
  itemIcon,
  isSelected,
  onClick,
  ...props
}: Props) => {
  const { db, setDb } = useDB();
  console.log("db from dbitem:", dbName);
  useEffect(() => {
    setDb(dbName);
  }, [dbName, setDb]);

  return (
    <Stack spacing={8} direction="row" align="center" {...props}>
      <Button
        height="140px"
        width="348px"
        border="16px"
        bgColor="#EDF2F7"
        _focus={{ outlineColor: isSelected ? "black" : "white" }}
        onClick={onClick}
      >
        <Image src={itemIcon} alt="Polybase" />
      </Button>
    </Stack>
  );
};
