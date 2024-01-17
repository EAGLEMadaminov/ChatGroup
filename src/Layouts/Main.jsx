import { Outlet } from "react-router-dom";
import SideBar from "../Components/SideBar";
import Header from "../Components/Header";
import GroupsSearch from "../Components/GroupsSearch";
import { useContext } from "react";
import { SearchContext } from "../Context/SearchContext";

const Main = () => {
  const { showSearch } = useContext(SearchContext);
  return (
    <>
      <Header />
      <div className="flex">
        <SideBar />
        {showSearch ? <GroupsSearch /> : ""}

        <Outlet />
      </div>
    </>
  );
};

export default Main;
