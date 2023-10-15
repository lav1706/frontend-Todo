import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Context, server } from "..";
import { toast } from "react-hot-toast";
import Todoitems from "../components/Todoitems";
import { Navigate } from "react-router-dom";

function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const { isAuthenticated } = useContext(Context);
  const updateHandler = async (id) => {
    try {
      const { data } = await axios.put(
        `${server}/task/${id}`,
        {},
        { withCredentials: true }
      );
      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`${server}/task/${id}`, {
        withCredentials: true,
      });
      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }

    toast.error(id);
  };

  const submithandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${server}/task/new`,
        { title, description },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setTitle("");
      setDescription("");
      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    axios
      .get(`${server}/task/my`, {
        withCredentials: true,
      })
      .then((res) => {
        setTasks(res.data.tasks);
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  }, [refresh]);
  if (!isAuthenticated) return <Navigate to={"/login"} />;

  return (
    <div>
      <div className="bg-gray-900 container mx-auto flex justify-between p-10 ">
        <section>
          <form onClick={submithandler}>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Title"
            />
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              placeholder="Description"
            />
            <br />
            <button
              className="bg-teal-900/20 py-2 px-4 border-2 border-teal-600 rounded text-teal-500 hover:text-gray-900 hover:bg-teal-500 duration-300 mt-2"
              type="submit"
            >
              Add Task
            </button>
          </form>
        </section>
      </div>

      <section className="Todocontainer">
        {tasks.map((i) => (
          <Todoitems
            title={i.title}
            description={i.description}
            iscompleted={i.iscompleted}
            updateHandler={updateHandler}
            deleteHandler={deleteHandler}
            id={i._id}
            key={i._id}
          />
        ))}
      </section>
    </div>
  );
}

export default Home;
