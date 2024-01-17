import { Outlet } from "react-router-dom";
import SideBar from "../Components/SideBar";
import Header from "../Components/Header";
import GroupsSearch from "../Components/GroupsSearch";
const Main = () => {
  return (
    <>
      <Header />
      <div className="flex">
        <SideBar />
        <GroupsSearch />
        <Outlet />
      </div>
    </>
  );
};

export default Main;
