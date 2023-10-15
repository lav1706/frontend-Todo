import axios from "axios";
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { server } from "../index.js";
import { toast } from "react-hot-toast";
import { Context } from "../index.js";
import { useContext } from "react";

const Register = () => {
  const [name, setname] = useState();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const submithandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${server}/users/new`,
        {
          name,
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
    <div className="bg-gray-900 container mx-auto flex justify-between p-10 mr-2 ">
      <section>
        <form onSubmit={submithandler}>
          <input
            value={name}
            onChange={(e) => setname(e.target.value)}
            type="text"
            placeholder="Name"
            className="bg-transparent outline-none border-b-2 py-2 px-5 focus:border-teal-600 mr-2"
          />
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
            className="bg-transparent outline-none border-b-2 py-2 px-5 focus:border-teal-600 mr-2"
          />
          <button
            className="bg-teal-900/20 py-2 px-4 border-2 border-teal-600 rounded text-teal-500 hover:text-gray-900 hover:bg-teal-500 duration-300 mt-2"
            type="submit"
          >
            Login
          </button>
          <h3 className="text-teal-500 p-2">OR</h3>
          <Link
            className="bg-teal-900/20 py-2 px-4 border-2 border-teal-600 rounded text-teal-500 hover:text-gray-900 hover:bg-teal-500 duration-300 mt-2"
            to="/login"
          >
            Log In
          </Link>
        </form>
      </section>
    </div>
  );
};

export default Register;
