import React, { useEffect, useState } from "react";
import { Stack } from "@chakra-ui/react";
import { DBItem } from "./DBItem";
import { useDB } from "@/contexts/common/DBProvider";

const itemsData = [
  {
    id: 1,
    dbName: "polybase",
    itemsIcon: "./Image/Polybase.png",
  },
  {
    id: 2,
    dbName: "ceramic",
    itemsIcon: "./Image/ceramic-logo.png",
  },
  {
    id: 3,
    dbName: "tableland",
    itemsIcon: "./Image/tableland-logo.png",
  },
];

export const DBlist = () => {
  const [selected, setSelected] = useState(false);
  const { db, setDb } = useDB();
  return (
    <Stack spacing={8} direction="row" align="center">
      {itemsData.map((item) => {
        return (
          <DBItem
            key={item.id}
            dbName={item.dbName}
            itemIcon={item.itemsIcon}
            isSelected={selected}
            onClick={() => {
              setSelected(true);
              setDb(item.dbName)
            }}
          />
        );
      })}
    </Stack>
  );
};
