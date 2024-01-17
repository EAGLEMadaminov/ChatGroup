import { createContext, useState } from "react";

const SideContext = createContext();

const SideBarProvider = ({ children }) => {
  const [group, setGroup] = useState({});
  const [isLeaveGroup, setIsLeaveGroup] = useState(false);
  return (
    <SideContext.Provider
      value={{ group, setGroup, isLeaveGroup, setIsLeaveGroup }}
    >
      {children}
    </SideContext.Provider>
  );
};

export { SideContext, SideBarProvider };
