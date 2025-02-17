import React, { createContext, useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Home from "../../Pages/Home";
import Error from "../../Pages/Error";
import Form from "../../Pages/Form";
import List from "../../Pages/List";
import SVG from "../../Template/SVG";
import useLocalStorage from "../../Template/useLocalStorage";
import Popup from "../../Template/Popup";
import { dashboardComponents } from "../../Js/data";
import { MdLogout } from "react-icons/md";

export const DigitalContext = createContext();

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [disableBtn, setDisableBtn] = useState(false);
  const [showSidebar, setShowSidebar] = useState(window.innerWidth > 900);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 450);
  const [popupVisibility, setPopupVisiblilty] = useState(null);
  const [selectedIndex, setSelectedIndex] = useLocalStorage(
    "selected-index",
    "Form"
  );

  useEffect(() => {
    const { pathname } = location;
    const myIndex = dashboardComponents.find(
      (nav) =>
        nav.label.toLowerCase() === pathname.replace("/", "").toLowerCase()
    );
    setSelectedIndex(myIndex ? myIndex.label : null);
  }, [location.pathname, selectedIndex]);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      setShowSidebar(screenWidth > 900);
      setDisableBtn(screenWidth > 900);
      setIsMobile(screenWidth < 450);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="flex bg-gray-200 h-screen min-h-screen">
      {popupVisibility === "logout" && (
        <Popup
          gs={"text-red-600"}
          icon={<MdLogout size={30} />}
          greeting="Logout"
          message="Are you sure you want to Logout?"
          closePopup={() => setPopupVisiblilty("")}
          fnBtn={
            <button
              className="py-1 px-4 border-2 border-red-600 bg-red-600 hover:bg-red-700 text-white rounded-[8px]"
              onClick={handleLogout}
            >
              Logout
            </button>
          }
        />
      )}
      <div
        className={`fixed left-0 top-0 h-full w-64 bg-gray-800 transition-transform duration-300 
          ${showSidebar ? "translate-x-0" : "-translate-x-full"} ${
          isMobile ? "z-[1000]" : ""
        }`}
      >
        <div
          onClick={() => {
            navigate("/Home");
            setSelectedIndex("Home");
          }}
          className="flex items-center justify-center h-16 bg-gray-900 cursor-pointer"
        >
          <img
            src="https://pps.whatsapp.net/v/t61.24694-24/473399879_1135208531537657_5628410588546111998_n.jpg?stp=dst-jpg_s96x96_tt6&ccb=11-4&oh=01_Q5AaIClSSxNPpkx0yaphd6ITfy84lmFYiGRGb7h-0dL1h74S&oe=67B6C01D&_nc_sid=5e03e0&_nc_cat=102"
            alt="DP"
            className="h-12 rounded-[50%] mr-2"
          />
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
                  if (isMobile) setShowSidebar(false);
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
        className={`transition-all duration-300 ${!isMobile &&
          showSidebar ? "ml-64" : ""
        } flex-col flex-1 overflow-y-auto min-h-full lg:overflow-y-hidden`}
      >
        <div className="flex items-center justify-between min-h-16 h-16 dark:bg-[#001750] dark:opacity-65 darktext-white bg-white dark:border-b-slate-500 border-b border-gray-200">
          <div className="flex items-center px-4">
            <button
              className="text-gray-500 focus:outline-none focus:text-gray-700 cursor-pointer"
              onClick={() => {
                if (!disableBtn) setShowSidebar(!showSidebar);
              }}
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
          </div>
          <div className="flex items-center pr-4">
            <button
              onClick={() => setPopupVisiblilty("logout")}
              className="select-none flex transition-all duration-200 items-center border-2 text-gray-500 hover:bg-red-600 hover:text-white rounded-3xl px-4 py-2 dark:hover:border-gray-500 hover:border-red-600"
            >
              Logout
            </button>
          </div>
        </div>

        <div
          onClick={() => {
            if (isMobile) setShowSidebar(false);
          }}
        >
          <DigitalContext.Provider
            value={{
              selectedIndex,
              setSelectedIndex,
              popupVisibility,
              setPopupVisiblilty,
            }}
          >
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/form" element={<Form />} />
              <Route path="/students" element={<List />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </DigitalContext.Provider>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
