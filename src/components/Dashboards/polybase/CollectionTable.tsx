import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Checkbox,
  Text,
  Box,
} from "@chakra-ui/react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { mockData } from "./data/MockData";
import { truncateAddress } from "@/utils/common";

const CollectionTable = () => {
  const columnHelper = createColumnHelper<any>();

  const columns = [
    columnHelper.accessor("id", {
      header: "id",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("CreatedBy", {
      header: "Created By",
      cell: (info) => truncateAddress(info.getValue()),
    }),
    columnHelper.accessor("CreatedAt", {
      header: "Created At",
      cell: (info) => info.getValue(),
    }),
    ,
    columnHelper.accessor("UpdatedBy", {
      header: "Updated By",
      cell: (info) => truncateAddress(info.getValue()),
    }),
    columnHelper.accessor("UpdatedAt", {
      header: "Updated At",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("Title", {
      header: "Title",
      cell: (info) => info.getValue(),
    }),
  ];
  const data = React.useMemo(() => mockData, []);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <TableContainer mx="36px" border="1px solid #E2E8F0" borderRadius="12px">
      <Table>
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map((row) => (
            <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default CollectionTable;
