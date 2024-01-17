import { createContext } from "react";
const GroupContext = createContext();
import { useState } from "react";

const GroupProvider = ({ children }) => {
  const [userName, setUserName] = useState("");
  const [showUserAddModal, setShowUserAddModal] = useState(false);
  const [isUserAdd, setIsUserAd] = useState(false);
  const [isUserDelete, setIsUserDelete] = useState(false);
  return (
    <GroupContext.Provider
      value={{
        userName,
        setUserName,
        showUserAddModal,
        setShowUserAddModal,
        isUserAdd,
        setIsUserAd,
        isUserDelete,
        setIsUserDelete,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
};

export { GroupContext, GroupProvider };
