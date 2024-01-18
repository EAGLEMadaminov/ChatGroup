import axios from "axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import { GroupContext } from "../Context/GroupContext";
import { SideContext } from "../Context/SideBarContext";
import { useNavigate } from "react-router-dom";

const GroupMembers = ({ data }) => {
  const { setIsUserDelete, currentUser } = useContext(GroupContext);
  const { setIsLeaveGroup } = useContext(SideContext);
  let token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleRemoveGroup = async (id) => {
    try {
      let { data: user } = await axios.delete(
        `/groups/${data._id}/members/${id}`,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      console.log(user);
      setIsUserDelete(true);
      setIsLeaveGroup(true);
      toast.success(user.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold">
        Members{" "}
        <span className=" px-3 text-white bg-[#0D6EFD] rounded-lg">
          {data?.members?.length}
        </span>
      </h1>

      {data.members?.map((item) => {
        return (
          <div
            className="border rounded-lg flex items-center p-2 my-3"
            key={item._id}
          >
            <p className="px-3 p-1 capitalize text-white bg-[#0D6EFD] rounded-lg">
              {" "}
              {item?.name[0]}
            </p>
            <div className="ml-4">
              <p className="capitalize my-1">{item?.name}</p>
              <p className="text-gray-500">{item?.username}</p>
            </div>
            {data?.owner?.name === currentUser?.name &&
            item.name !== data?.owner?.name ? (
              <button
                onClick={() => handleRemoveGroup(item._id)}
                className="p-2 px-3 ml-auto bg-rose-500 rounded-lg"
              >
                ✖
              </button>
            ) : (
              ""
            )}
          </div>
        );
      })}
    </div>
  );
};

export default GroupMembers;
