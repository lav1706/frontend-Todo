import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context } from "../index.js";
import axios from "axios";
import { server } from "../index.js";
import { toast } from "react-hot-toast";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const submithandler = async (e) => {
    e.preventDefault();
    console.log(email, password);

    try {
      const { data } = await axios.post(
        `${server}/users/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setIsAuthenticated(true);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
      setIsAuthenticated(false);
    }
  };

  if (isAuthenticated) return <Navigate to={"/"} />;

  return (
    <div className="bg-gray-900 container mx-auto flex  justify-between p-10 ">
      <section>
        <form onClick={submithandler}>
          <input
            value={email}
            onChange={(e) => setemail(e.target.value)}
            type="email"
            placeholder="Email"
            className="bg-transparent outline-none border-b-2 py-2 px-5 focus:border-teal-600 mr-2"
          />
          <input
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="bg-transparent outline-none border-b-2 py-2 px-5 focus:border-teal-600"
          />
          <br />
          <button
            className="bg-teal-900/20 py-2 px-4 border-2 border-teal-600 rounded text-teal-500 hover:text-gray-900 hover:bg-teal-500 duration-300 mt-2"
            type="submit"
          >
            Login
          </button>
          <h3 className="text-teal-500 p-2">OR</h3>
          <Link
            to="/register"
            className="bg-teal-900/20 py-2 px-4 border-2 border-teal-600 rounded text-teal-500 hover:text-gray-900 hover:bg-teal-500 duration-300 mt-2"
          >
            Sign Up
          </Link>
        </form>
      </section>
    </div>
  );
};

export default Login;
