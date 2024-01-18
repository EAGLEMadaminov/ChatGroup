import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { GroupContext } from "../Context/GroupContext";
import { toast } from "react-toastify";

function Main() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const { setUserName } = useContext(GroupContext);
  const [copyText, setCopyText] = useState("");

  let token = localStorage.getItem("token");

  useEffect(() => {
    async function getUserData() {
      try {
        let { data } = await axios.get("/auth", {
          headers: {
            "x-auth-token": token,
          },
        });
        console.log(data);
        setUserName(data?.name);
        setCopyText(data?.username);
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    }
    getUserData();
  }, [token]);

  const handleDelete = async () => {
    try {
      let { data } = await axios.delete("/users", {
        headers: {
          "x-auth-token": token,
        },
      });
      if (
        confirm(
          "Are your sure to delete your account? \n You cannot undo this action!"
        )
      ) {
        toast.success(data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleCopyUserName = () => {
    navigator.clipboard.writeText(copyText);
    alert("Copied");
  };

  return (
    <div className="main-image w-full pt-[70px] h-screen ">
      <div className="bg-white flex justify-between items-start mx-7 p-10 py-5 rounded-3xl">
        <div className="flex items-center">
          <div className="">
            <h1 className="text-4xl font-semibold mb-4">Your Profile</h1>
            <div className="border-[3px] flex place-items-center justify-center text-white uppercase border-gray-200 w-[150px] h-[150px] bg-rose-500 text-5xl rounded-[50%]">
              {user.name ? user?.name[0] : ""}
            </div>
          </div>
          <div>
            <h2 className="capitalize font-semibold text-3xl">
              {user.name}{" "}
              <sup
                className={`bg-${
                  user.status == "active" ? "green" : ""
                }-700 bg-${
                  user.status === "deleted" ? "rose" : ""
                }-600 text-white px-2 p-1 text-[16px] rounded-lg`}
              >
                {user.status}
              </sup>
            </h2>
            <p className="mt-4 text-gray-400">{user.username}</p>
          </div>
        </div>
        <div className="flex">
          <button
            onClick={() => handleCopyUserName()}
            className="bg-[#0D6EFD] gap-2 items-center p-2 px-3 rounded-lg flex text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16"
              width="14"
              viewBox="0 0 448 512"
            >
              <path
                fill="#f1f2f3"
                d="M208 0H332.1c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9V336c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V48c0-26.5 21.5-48 48-48zM48 128h80v64H64V448H256V416h64v48c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V176c0-26.5 21.5-48 48-48z"
              />
            </svg>{" "}
            Copy Username
          </button>
          <button
            onClick={() => handleDelete()}
            className="flex items-center p-2 px-3 rounded-lg bg-rose-500 text-white gap-2 ml-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16"
              width="14"
              viewBox="0 0 448 512"
            >
              <path
                fill="#fcfcfd"
                d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
              />
            </svg>{" "}
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Main;
