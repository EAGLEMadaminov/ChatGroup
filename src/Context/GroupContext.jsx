import axios from "axios";
import { createContext } from "react";
const GroupContext = createContext();
import { useState, useEffect } from "react";

const GroupProvider = ({ children }) => {
  const [userName, setUserName] = useState("");
  const [showUserAddModal, setShowUserAddModal] = useState(false);
  const [isUserAdd, setIsUserAd] = useState(false);
  const [isUserDelete, setIsUserDelete] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  let token = localStorage.getItem("token");
  useEffect(() => {
    async function getUserInfo() {
      let { data } = await axios.get("/auth", {
        headers: {
          "x-auth-token": token,
        },
      });
      setCurrentUser(data);
    }
    getUserInfo();
  }, [token]);
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
        currentUser,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
};

export { GroupContext, GroupProvider };
