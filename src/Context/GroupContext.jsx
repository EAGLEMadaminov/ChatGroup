import { createContext } from "react";
const GroupContext = createContext();
import { useState } from "react";

const GroupProvider = ({ children }) => {
  const [userName, setUserName] = useState("");
  return (
    <GroupContext.Provider value={{ userName, setUserName }}>
      {children}
    </GroupContext.Provider>
  );
};

export { GroupContext, GroupProvider };
