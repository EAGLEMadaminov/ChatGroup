import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    try {
      let { data: user } = await axios.post("/users", data);

      if (user) {
        toast.success("Your sign up succsessfully");
        localStorage.setItem("token", user.token);
        navigate("/main");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <div className=" bg-[#6C757D] top-0 left-0 bottom-0 right-0">
      <div className="flex h-screen items-center justify-center mx-auto px-[80px] container">
        <div className=" flex flex-col justify-between items-center rounded-l-[20px] text-center h-[500px]  w-full bg-[#212529] text-white p-[50px]">
          <p className="text-[#0D6EFD] text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="120"
              width="120"
              viewBox="0 0 512 512"
            >
              <path
                fill="#0d6efd"
                d="M192 32c0 17.7 14.3 32 32 32c123.7 0 224 100.3 224 224c0 17.7 14.3 32 32 32s32-14.3 32-32C512 128.9 383.1 0 224 0c-17.7 0-32 14.3-32 32zm0 96c0 17.7 14.3 32 32 32c70.7 0 128 57.3 128 128c0 17.7 14.3 32 32 32s32-14.3 32-32c0-106-86-192-192-192c-17.7 0-32 14.3-32 32zM96 144c0-26.5-21.5-48-48-48S0 117.5 0 144V368c0 79.5 64.5 144 144 144s144-64.5 144-144s-64.5-144-144-144H128v96h16c26.5 0 48 21.5 48 48s-21.5 48-48 48s-48-21.5-48-48V144z"
              />
            </svg>
          </p>
          <p>Welcome back to</p>
          <h1 className="text-7xl font-thin">Shopping List</h1>
        </div>

        <div className=" bg-white h-[500px] w-full rounded-r-[20px] shadow-lg p-[50px] ">
          <h2 className="text-[#0D6EFD] text-center text-3xl font-semibold">
            Register
          </h2>
          <form
            className="flex flex-col my-3 gap-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="eshmatjon"
              className="border outline-none rounded-lg p-2"
              {...register("name")}
            />
            <label htmlFor="username">Username</label>
            <input
              type="text"
              placeholder="eshmatjon123"
              id="username"
              className="border p-2 rounded-lg
             outline-none"
              {...register("username")}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="******"
              {...register("password")}
              className="p-2 rounded-lg border outline-none"
            />
            <button
              type="submit"
              className="bg-[#0D6EFD] my-2 rounded-[15px] w-full p-2 text-white"
            >
              Sign Up
            </button>
          </form>
          <p>
            Already have an account?
            <Link to="/login" className=" ml-2 text-[#0D6EFD] underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
