import { createContext, useState } from "react";
import { useDebounce } from "../lib/hooks";

export type SearchTextContext = {
  searchText: string;
  debouncedSearchText: string;
  handleChangeSearchText: (searchText: string) => void;
};

export const SearchTextContext = createContext<SearchTextContext | null>(null);

export default function SearchTextContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 400);

  const handleChangeSearchText = (searchText: string) => {
    //setCurrentPage(1);
    setSearchText(searchText);
  };

  return (
    <SearchTextContext.Provider
      value={{
        searchText,
        debouncedSearchText,
        handleChangeSearchText,
      }}
    >
      {children}
    </SearchTextContext.Provider>
  );
}
