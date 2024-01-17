import axios from "axios";
import { useContext, useState } from "react";
import { SearchContext } from "../Context/SearchContext";
import { SideContext } from "../Context/SideBarContext";
import { toast } from "react-toastify";
const GroupsSearch = () => {
  const { searchResult, showLocaTime } = useContext(SearchContext);
  const { isLeaveGroup, setIsLeaveGroup } = useContext(SideContext);
  const [showJoinModal, setShowJoinModal] = useState(false);
  let token = localStorage.getItem("token");

  const handleJoinGroup = async (e, id) => {
    e.preventDefault();
    const password = e.target[0].value;
    try {
      let { data } = await axios.post(
        `/groups/${id}/join`,
        { password },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      toast.success(data.message);
      setShowJoinModal(false);
    } catch (error) {
      toast.error(error.message);
    }
  };
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
                  <button
                    onClick={() => setShowJoinModal(true)}
                    className="bg-[#0d6efd] p-2 px-4 text-white rounded-lg "
                  >
                    Join
                  </button>
                  {showJoinModal ? (
                    <div className="absolute top-[90px] bg-white border rounded-lg  right-[-220px] ">
                      <div className="flex justify-between bg-[#E9ECEF] p-3 rounded-t-lg">
                        <h2>Group password</h2>
                        <button onClick={() => setShowJoinModal(false)}>
                          ✖
                        </button>
                      </div>
                      <form
                        className="flex flex-col gap-4 p-4"
                        onSubmit={(e) => handleJoinGroup(e, group._id)}
                      >
                        <input
                          type="password"
                          className="border rounded-lg p-1 outline-none"
                          placeholder="****"
                        />
                        <button className="bg-[#198754] border rounded-lg  p-1 px-3 text-white">
                          Join Group
                        </button>
                      </form>
                    </div>
                  ) : (
                    ""
                  )}
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
