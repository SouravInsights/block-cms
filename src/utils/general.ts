export const truncateAddress = (addy: string) =>
  `${addy?.slice(0, 6)}...${addy.slice(-4)}`;