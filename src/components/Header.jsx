import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context, server } from "../index.js";
import axios from "axios";
import { toast } from "react-hot-toast";

function Header() {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const logouthandler = async () => {
    try {
      await axios.get(
        `${server}/users/logout`,

        {
          withCredentials: true,
        }
      );
      toast.success("Logged out Sucessfully");
      setIsAuthenticated(false);
    } catch (error) {
      toast.error(error.response.data.message);

      setIsAuthenticated(true);
    }
  };

  return (
    <nav className=" bg-gray-900 container p-8 mx-auto border-b border-dashed border-teal-500 rounded-tl-xl rounded-tr-xl flex justify-between">
      <div>
        <h1 className="uppercase font-semibold text-teal-500 tracking-wider flex gap-2 items-center">
          Todo
        </h1>
      </div>
      <div className="uppercase font-semibold text-teal-500 tracking-wider flex gap-2 items-center ">
        <Link className="links" to={"/"}>
          Home
        </Link>
        <Link className="links" to={"/profile"}>
          Profile
        </Link>
        {isAuthenticated ? (
          <button className="btn_todo" onClick={logouthandler}>
            Logout
          </button>
        ) : (
          <Link className="links" to={"/login"}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Header;
