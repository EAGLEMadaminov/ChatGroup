import { createContext, useState } from "react";

const SideContext = createContext();

const SideBarProvider = ({ children }) => {
  const [group, setGroup] = useState({});
  return (
    <SideContext.Provider value={{ group, setGroup }}>
      {children}
    </SideContext.Provider>
  );
};

export { SideContext, SideBarProvider };
