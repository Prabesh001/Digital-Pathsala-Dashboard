import React, { useContext } from "react";
import { DigitalContext } from "../Components/Dashboard";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  const { selectedIndex, setSelectedIndex } = useContext(DigitalContext);
  return (
    <div className="flex items-center min-h-[90.8vh] p-16 bg-gray-100 dark:bg-gray-700">
      <div className="container flex flex-col items-center ">
        <div className="flex flex-col gap-6 max-w-md text-center">
          <h2 className="font-extrabold text-9xl text-gray-600 dark:text-gray-100">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl md:text-3xl dark:text-gray-300">
            Sorry, we couldn't find this page.
          </p>
          <div
            onClick={() => {
              setSelectedIndex("Home");
              navigate("/Home");
            }}
            className="px-8 py-4 cursor-pointer text-xl font-semibold rounded bg-purple-600 text-gray-50 hover:text-gray-200"
          >
            Back to home
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;
