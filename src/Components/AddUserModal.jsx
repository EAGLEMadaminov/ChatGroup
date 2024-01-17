import { useContext, useState } from "react";
import { GroupContext } from "../Context/GroupContext";
import axios from "axios";
import { toast } from "react-toastify";

const AddUserModal = ({ groupId }) => {
  const { setShowUserAddModal, setIsUserAd } = useContext(GroupContext);
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  const handleChange = async (e) => {
    try {
      let { data } = await axios.get(`/users/search?q=${e.target.value}`);
      setUsers(data);
    } catch (error) {
      toast.error(error.massage);
    }
  };

  const handleAddUser = async (id) => {
    try {
      let { data } = await axios.post(
        `/groups/${groupId}/members`,
        { memberId: id },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      if (data) {
        setIsUserAd(true);
        setShowUserAddModal(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);

    }
  };
  return (
    <div
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      className="absolute left-0  right-0 top-0 bottom-0 flex justify-center"
    >
      <div className="relative bg-white w-[700px] mt-10 min-h-[450px] mx-auto rounded-xl">
        <div className="flex justify-between items-center border-b p-5 ">
          <h2 className="text-4xl font-semibold"> Add Member</h2>
          <button className="" onClick={() => setShowUserAddModal(false)}>
            ✖
          </button>
        </div>
        <form className="my-3 px-3">
          <input
            type="search"
            onKeyUp={(e) => handleChange(e)}
            className="border rounded-lg p-2 w-full outline-none"
            placeholder="Search user"
          />
        </form>
        {users.length > 0 ? (
          <div className="px-4">
            {users.map((user) => {
              return (
                <button
                  key={user._id}
                  onClick={() => handleAddUser(user._id)}
                  className="flex w-full p-2 justify-between border "
                >
                  <p className="">{user.name}</p>
                </button>
              );
            })}
          </div>
        ) : (
          ""
        )}

        <div className=" border-t absolute bottom-6 pt-6 text-right w-full">
          <button
            className="mr-10 bg-[#0D6EFD] p-2 px-3 rounded-lg text-white"
            onClick={() => setShowUserAddModal(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;
