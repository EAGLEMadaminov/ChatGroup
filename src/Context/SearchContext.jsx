import { createContext, useState } from "react";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [searchResult, setSearchResult] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [isJoindedGroup, setIsJoinedGroup] = useState(false);

  const showLocaTime = (time) => {
    let newdate = new Date(time);
    let day = String(newdate.getDate()).padStart(2, 0);
    let month = String(newdate.getMonth()).padStart(2, 0);
    let year = newdate.getFullYear();
    let hour = String(newdate.getHours()).padStart(2, 0);
    let min = String(newdate.getMinutes()).padStart(2, 0);
    let result = `${hour}:${min}, ${day}-${month}-${year}`;
    return result;
  };

  return (
    <SearchContext.Provider
      value={{
        searchResult,
        setSearchResult,
        showLocaTime,
        showSearch,
        setShowSearch,
        isJoindedGroup,
        setIsJoinedGroup,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export { SearchProvider, SearchContext };
