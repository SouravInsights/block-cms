type tableDataTypes = {
  id: string;
  CreatedBy: string;
  /* CreatedAt: Date, */
  UpdatedBy: string;
  /* UpdatedAt: Date, */
  Title: string;
};
export const mockData: tableDataTypes[] = [
  {
    id: "1",
    CreatedBy: "0x58410b9250827A3aD7c97F0973cEE825ff7acEc4",
    UpdatedBy: "0x58410b9250827A3aD7c97F0973cEE825ff7ac16c",
    Title: "Demo Title1",
  },
  {
    id: "2",
    CreatedBy: "0x58410b9250827A3aD7c97F0973cEE825ff7ac16c",
    UpdatedBy: "0x58410b9250827A3aD7c97F0973cEE825ff7ac16c",
    Title: "Demo Title2",
  },
];
