import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useContext } from "react";
import { SearchContext } from "../Context/SearchContext";
import GroupMembers from "./../Components/GroupMembers";
import { GroupContext } from "../Context/GroupContext";
const Groups = () => {
  const [getCurrentGroup, setGetCurrentGroup] = useState([]);
  const [isCreateItem, setIsCreateItem] = useState(false);
  const { showLocaTime } = useContext(SearchContext);
  const [isBought, setIsBought] = useState(false);
  const [isDeleteItem, setIsDeleteItem] = useState(false);
  const { userName } = useContext(GroupContext);
  const params = useParams();
  const id = params.groupsID;
  let token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const value = e.target[0].value;
    if (!value) {
      return;
    }
    let item = {
      title: value,
      groupId: id,
    };
    try {
      let { data } = await axios.post("/items", item, {
        headers: {
          "x-auth-token": token,
        },
      });
      console.log(data);
      toast.success(data.message);
      setIsCreateItem(true);
    } catch (error) {
      console.log(error);
    }
    e.target.reset();
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    async function getAllGroups() {
      try {
        let { data } = await axios.get("/groups", {
          headers: {
            "x-auth-token": token,
          },
        });
        if (data) {
          let current = data.filter((item) => item._id === id);
          console.log(current);
          setGetCurrentGroup(current[0]);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getAllGroups();

    return () => {};
  }, [id, isCreateItem, isBought, isDeleteItem]);

  const handleBought = async (id) => {
    try {
      let { data } = await axios.post(`/items/${id}/mark-as-bought`, null, {
        headers: {
          "x-auth-token": token,
        },
      });
      if (data) {
        toast.success(data.message);
        setIsBought(!isBought);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBack = async (id) => {
    try {
      let { data } = await axios.delete(`/items/${id}/mark-as-bought`, {
        headers: {
          "x-auth-token": token,
        },
      });
      if (data) {
        toast.success(data.message);
        setIsBought(!isBought);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response.data.message);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      let { data } = await axios.delete(`/items/${id}`, {
        headers: {
          "x-auth-token": token,
        },
      });
      if (data) {
        console.log(data);
        toast.success(data.message);
        setIsDeleteItem(true);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response.data.message);
    }
  };
  return (
    <div className="flex gap-5 p-7 mt-[40px] bg-gray-600 w-full">
      <div className=" w-full">
        <h2 className="text-white text-5xl">{getCurrentGroup?.name}</h2>
        <div className="rounded-xl bg-white my-3 p-4">
          <div className="flex justify-between">
            <p className="text-xl font-semibold">
              Items{" "}
              <span className="p-1 rounded-lg bg-[#0D6DFB] px-3 text-white">
                {getCurrentGroup?.items?.length}
              </span>
            </p>
            <div>
              <form
                className="flex items-center gap-1 "
                onSubmit={handleSubmit}
              >
                <input
                  type="text"
                  placeholder="Title"
                  className="w-[200px] border p-2 rounded-lg outline-none"
                />
                <button className="pb-1 rounded-lg text-3xl bg-[#0D6DFB] px-3 text-white">
                  +
                </button>
              </form>
            </div>
          </div>
          {getCurrentGroup?.items?.map((item) => {
            let time = showLocaTime(item?.owner?.createdAt);
            let boughtTime = showLocaTime(item?.boughtAt);
            return (
              <div
                key={item._id}
                className="border my-4 justify-between  items-center flex rounded-lg w-full p-4"
              >
                <p className="p-1 rounded-lg bg-[#0D6DFB] px-3 text-white text-xl font-semibold">
                  {item.title[0]}
                </p>
                <div>
                  <p>
                    {item.title}{" "}
                    {item.isBought ? (
                      <sup className="capitalize bg-[#0DCAF0] py-[2px] text-white px-1 font-semibold rounded-lg">
                        Bought By {item?.boughtBy?.name} {boughtTime}
                      </sup>
                    ) : (
                      " "
                    )}
                  </p>
                  <p className="capitalize text-gray-400">
                    Created By {item.owner.name} <span>({time})</span>
                  </p>
                </div>
                <div className="flex gap-2">
                  {!item.isBought  ? (
                    <button
                      onClick={() => handleBought(item._id)}
                      className="p-3  rounded-lg bg-green-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="18"
                        width="20"
                        viewBox="0 0 576 512"
                      >
                        <path
                          fill="#fafcff"
                          d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96zM252 160c0 11 9 20 20 20h44v44c0 11 9 20 20 20s20-9 20-20V180h44c11 0 20-9 20-20s-9-20-20-20H356V96c0-11-9-20-20-20s-20 9-20 20v44H272c-11 0-20 9-20 20z"
                        />
                      </svg>
                    </button>
                  ) : (
                    <button
                      className="p-3  rounded-lg bg-yellow-400"
                      onClick={() => handleBack(item._id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="16"
                        width="20"
                        viewBox="0 0 640 512"
                      >
                        <path
                          fill="#00060f"
                          d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7l-54.8-43V224H512V376L384 275.7V224H320v1.5L277.2 192H603.2c20.3 0 36.8-16.5 36.8-36.8c0-7.3-2.2-14.4-6.2-20.4L558.2 21.4C549.3 8 534.4 0 518.3 0H121.7c-16 0-31 8-39.9 21.4L74.1 32.8 38.8 5.1zM36.8 192h85L21 112.5 6.2 134.7c-4 6.1-6.2 13.2-6.2 20.4C0 175.5 16.5 192 36.8 192zM320 384H128V224H64V384v80c0 26.5 21.5 48 48 48H336c26.5 0 48-21.5 48-48V398.5l-64-50.4V384zM544 512l-.3 0h.6l-.3 0z"
                        />
                      </svg>
                    </button>
                  )}
                  {userName === item?.owner?.name ? (
                    <button
                      onClick={() => handleDeleteItem(item._id)}
                      className="p-2 rounded-lg bg-rose-500"
                    >
                      ✖
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full">
        <div className="flex  items-center justify-end gap-5">
          <p className="bg-white p-2  capitalize rounded-lg">
            Owner:{" "}
            <span className="capitalize bg-[#0D6EFD] px-2 text-white rounded-lg">
              {getCurrentGroup?.owner?.name[0]}
            </span>{" "}
            {getCurrentGroup?.owner?.name} (
            <span className="text-gray-400">
              {getCurrentGroup?.owner?.username}
            </span>
            )
          </p>
          <button className="flex bg-white items-center gap-2 rounded-lg p-1 px-2">
            <span className="pb-2">...</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="12"
              width="8"
              viewBox="0 0 320 512"
            >
              <path
                fill="#010813"
                d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"
              />
            </svg>
          </button>
        </div>
        <div className="bg-white rounded-xl p-4 my-5">
          <GroupMembers data={getCurrentGroup?.members} />
        </div>
      </div>
    </div>
  );
};

export default Groups;
