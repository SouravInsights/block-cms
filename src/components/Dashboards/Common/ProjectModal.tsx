import React, { useState } from "react";

import FormPage from "./FormPage";
import Sidebar from "../polybase/sidebar/SideBar";

const ProjectModal = () => {
  const [formData, setFormData] = useState(null);

  const handleFormSubmit = (data: any) => {
    setFormData(data);
  };

  return (
    <>
      {!formData ? (
        <FormPage onFormSubmit={handleFormSubmit} />
      ) : (
        <Sidebar formData={formData} />
      )}
    </>
  );
};

export default ProjectModal;
