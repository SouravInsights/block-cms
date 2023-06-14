
import { Button } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useDB } from "@/contexts/common/DBProvider";
import { useEffect, useState } from "react";

const NextButton = () => {
 const { db, setDb } = useDB();
 const [isSelected, setselected] = useState(true)
 useEffect(() => {
if (db !=""){
  setselected(false)
}
 }, [db])
 
  return (
    <Button
      _hover={{ color: "none" }}
      size="lg"
      isActive={isSelected}
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
