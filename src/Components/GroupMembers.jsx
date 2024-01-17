const GroupMembers = ({ data }) => {
  return (
    <div>
      <h1 className="text-2xl font-semibold">
        Members{" "}
        <span className=" px-3 text-white bg-[#0D6EFD] rounded-lg">
          {data?.length}
        </span>
      </h1>

      {data?.map((item) => {
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
          </div>
        );
      })}
    </div>
  );
};

export default GroupMembers;
