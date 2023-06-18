import { Button, Image, Stack } from "@chakra-ui/react";

type Props = {
  dbName: string;
  itemIcon: string;
  isSelected: boolean;
  onClick: () => void;
};

export const DBItem = ({
  dbName,
  itemIcon,
  isSelected,
  onClick,
  ...props
}: Props) => {
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
