import React, { useState } from "react";
import { Stack } from "@chakra-ui/react";
import { DBItem } from "./DBItem";

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
  const [selectedId, setSelectedId] = useState(0);
  return (
    <Stack spacing={8} direction="row" align="center">
      {itemsData.map((item, i) => {
        return (
          <DBItem
            key={item.id}
            dbName={item.dbName}
            itemIcon={item.itemsIcon}
            isSelected={selected}
            onClick={() => {
              setSelected(true);
              setSelectedId(i);
            }}
          />
        );
      })}
    </Stack>
  );
};
