import React, { useEffect, useState } from "react";
import Form from "../../Pages/Form";
import List from "../../Pages/List";
import { Routes, Route, useNavigate } from "react-router-dom";
import { dashboardComponents } from "../../Js/data";
import SVG from "../../Template/SVG";
import useLocalStorage from "../../Template/useLocalStorage";

const Dashboard = ({ setIsAuthenticated }) => {
  const [showSidebar, setShowSidebar] = useState(window.innerWidth > 800);
  const [selectedIndex, setSelectedIndex] = useLocalStorage(
    "selected-index",
    "Form"
  );
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setShowSidebar(window.innerWidth > 800);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div
        className={`fixed left-0 top-0 h-full w-64 bg-gray-800 transition-transform duration-300 
          ${showSidebar ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-center h-16 bg-gray-900">
          <span className="text-white font-bold uppercase">
            Digital Pathshala
          </span>
        </div>
        <div className="flex flex-col flex-1 overflow-y-auto">
          <nav className="flex-1 px-2 py-4 bg-gray-800">
            {dashboardComponents.map((item, i) => (
              <div
                key={i}
                onClick={() => {
                  setSelectedIndex(item.label);
                  navigate(`/${item.label}`);
                }}
                className={`flex items-center px-4 py-2 text-gray-100 
                  ${
                    selectedIndex === item.label
                      ? "bg-gray-700 cursor-default"
                      : "hover:bg-gray-900 cursor-pointer"
                  }`}
              >
                <SVG stroke={item.svg} cln="mr-2" />
                {item.label}
              </div>
            ))}
          </nav>
        </div>
      </div>

      <div
        className={`transition-all duration-300 ${
          showSidebar ? "ml-62" : ""
        } flex flex-col flex-1 overflow-y-auto`}
      >
        <div className="flex items-center justify-between min-h-16 h-16 bg-white border-b border-gray-200">
          <div className="flex items-center px-4">
            <button
              className="text-gray-500 focus:outline-none focus:text-gray-700 cursor-pointer"
              onClick={() => setShowSidebar(!showSidebar)}
            >
              <SVG
                sw={2}
                stroke={
                  showSidebar
                    ? "M6 18L18 6 M6 6L18 18"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </button>
            <input
              className="mx-4 w-full border rounded-md px-4 py-2"
              type="text"
              placeholder="Search"
            />
          </div>
          <div className="flex items-center pr-4">
            <button
              onClick={handleLogout}
              className="flex transition-all duration-200 items-center border-2 p-1 text-gray-500 hover:bg-red-600 hover:text-white"
            >
              Logout
            </button>
          </div>
        </div>

        <Routes>
          <Route path="/form" element={<Form />} />
          <Route path="/students" element={<List />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
