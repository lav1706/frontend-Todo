import React from "react";

function Item() {
  return (
    <div className="bg-gray-900 container mx-auto flex justify-between p-10">
      <h1>Todays Goals</h1>
      <div className="bg-transparent outline-none border-b-2 py-2 px-5 focus:border-teal-600">
        <input className="title" placeholder="Title"></input>
        <textarea placeholder="Description"></textarea>
        <input className="cloak" placeholder="Set Deadline"></input>
      </div>
      <button className="bg-teal-900/20 py-2 px-5 border-2 border-teal-600 rounded text-teal-500 hover:text-gray-900 hover:bg-teal-500 duration-300">
        Add Task
      </button>
    </div>
  );
}

export default Item;
