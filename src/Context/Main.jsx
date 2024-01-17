import { SearchProvider } from "./SearchContext";
import { SideBarProvider } from "./SideBarContext";
import { GroupProvider } from "./GroupContext";

const MainProvider = ({ children }) => {
  return (
    <GroupProvider>
      <SearchProvider>
        <SideBarProvider>{children}</SideBarProvider>
      </SearchProvider>
    </GroupProvider>
  );
};
export default MainProvider;
