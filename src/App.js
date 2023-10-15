import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import Register from "./Pages/Register";
import { Toaster } from "react-hot-toast";
import { useContext, useEffect } from "react";
import axios from "axios";
import { Context, server } from "./index.js";
import Footer from "./components/Footer";

function App() {
  const { setUser, setIsAuthenticated } = useContext(Context);
  useEffect(() => {
    axios
      .get(`${server}/users/me`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.user);
        setIsAuthenticated(true);
      })
      .catch((error) => {
        setUser({});
        setIsAuthenticated(false);
      });
  });

  return (
    <div className="wrapper bg-gradient-to-t from-gray-900 to-teal-700 min-h-screen text-xl text-gray-100 flex flex-col py-10 px-14">
      <main className="bg-gray-900 container p-8 mx-auto border-b border-dashed border-teal-500 rounded-tl-xl rounded-tr-xl">
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
          <Footer />
          <Toaster />
        </Router>
      </main>
    </div>
  );
}

export default App;
