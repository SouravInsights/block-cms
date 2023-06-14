import React, {
  useState,
  createContext,
  useContext,
  ReactNode,
  SetStateAction,
  Dispatch,
} from "react";

export type DBContextValue = {
  db: string;
  setDb: Dispatch<SetStateAction<string>>;
};

export const DBContext = createContext<DBContextValue>({
  db: "",
  setDb: () => {},
});

export interface DBProviderProps {
  children: ReactNode;
}

export function DBProvider({ children }: DBProviderProps) {
  const [db, setDb] = useState("");

  return (
    <DBContext.Provider value={{ db, setDb }}>{children}</DBContext.Provider>
  );
}

export function useDB() {
  return useContext(DBContext);
}
