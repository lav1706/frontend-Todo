import React, { useContext } from "react";
import { Context } from "../index.js";

const Profile = () => {
  const { user } = useContext(Context);

  return (
    <div className="uppercase font-semibold text-teal-500 tracking-wider flex gap-2 items-center">
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
    </div>
  );
};

export default Profile;
