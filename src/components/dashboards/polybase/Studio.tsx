import React, { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "./sidebar/SideBar";
import FormPage from "../Common/FormPage";
import { Welcome } from "./Welcome";
import { Collection } from "./Collection";

const Studio = () => {
  const [formData, setFormData] = useState(null);

  const handleFormSubmit = (data: any) => {
    setFormData(data);
  };

  return (
    <Box>
      <Flex flexDir="row">
        <div>
          {!formData ? (
            <FormPage onFormSubmit={handleFormSubmit} />
          ) : (
            <Sidebar formData={formData} />
          )}
        </div>
        {/*<Welcome />*/}

        <Collection />
      </Flex>
    </Box>
  );
};
export default Studio;
