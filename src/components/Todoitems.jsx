import React from "react";

const Todoitems = ({
  title,
  description,
  iscompleted,
  updateHandler,
  deleteHandler,
  id,
}) => {
  return (
    <div className="task-item flex justify-between items-center bg-gray-800 rounded p-5 hover:bg-gradient-to-r hover:from-teal-800 hover:to-gray-800">
      <div className="item-left flex gap-4 ">
        <div>
          <input
            onChange={() => updateHandler(id)}
            type="checkbox"
            className="accent-teal-500"
            checked={iscompleted}
          ></input>
          <h4 className="group-hover:text-teal-400 text-xl ">{title}</h4>
          <p className="group-hover:text-teal-400 text-lg">{description}</p>
        </div>
        <div className="item-right flex gap-5">
          <button
            onClick={() => deleteHandler(id)}
            className="color-gray-300 hover:text-teal-400 cursor-pointer duration-300"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Todoitems;
