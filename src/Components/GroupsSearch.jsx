import { useContext } from "react";
import { SearchContext } from "../Context/SearchContext";

const GroupsSearch = () => {
  const { searchResult, showLocaTime } = useContext(SearchContext);

  return (
    <div className="absolute mx-auto bg-white left-[325px] z-[2] top-[60px]">
      <div className="bg-white">
        {searchResult.length > 0 ? (
          <div className="p-5 absolute bg-white rounded-lg w-[700px] mx-auto shadow-xl  ">
            <h2 className="text-2xl  font-semibold my-1">Groups</h2>
            {searchResult.map((group) => {
              let date = showLocaTime(group.createdAt);
              return (
                <div
                  className="border p-5 text-black flex justify-between items-center"
                  key={group.id}
                >
                  <div>
                    <h2 className="font-semibold text-xl">
                      {group.name}{" "}
                      <sup className="bg-[#0DCAF0]  text-white px-2 rounded-lg">
                        {date}
                      </sup>
                    </h2>
                    <p className="capitalize mt-3">
                      Created By {group.owner.name}
                    </p>
                  </div>
                  <button className="bg-[#0d6efd] p-2 px-4 text-white rounded-lg ">
                    Join
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default GroupsSearch;
