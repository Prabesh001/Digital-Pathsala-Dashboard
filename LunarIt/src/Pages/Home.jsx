import React, { useState, useEffect } from "react";
import { fetchStudents, sendEmails } from "../Js";
import { staffData } from "../Js/data";
import { ToastContainer, toast } from "react-toastify";
import { MdOutlinePendingActions } from "react-icons/md";
import { RiChatFollowUpLine } from "react-icons/ri";
import { PiStudent } from "react-icons/pi";
import { BiPurchaseTagAlt } from "react-icons/bi";

const Home = () => {
  const [homeComponents, setHomeComponents] = useState([
    {
      label: "Total Students",
      num: 0,
      icon: <PiStudent size={23} />,
    },
    {
      label: "Pending",
      num: 12,
      emails: [],
      icon: <MdOutlinePendingActions size={23} />,
    },
    {
      label: "Follow Up",
      num: 0,
      icon: <RiChatFollowUpLine size={23} />,
    },
    {
      label: "Purchased",
      num: 0,
      icon: <BiPurchaseTagAlt size={23} />,
    },
  ]);

  useEffect(() => {
    const updateCounts = async () => {
      const students = await fetchStudents();

      const totalCount = students.length;

      const pendingEmails = students
        .filter((student) => student.status === "Pending")
        .map((student) => student.email);

      const pendingCount = pendingEmails.length; // The number of students with "Pending" status
      const followUpCount = students.filter(
        (student) => student.status === "Follow Up"
      ).length;

      const purchasedCount = students.filter(
        (student) => student.status === "Purchased"
      ).length;

      setHomeComponents((prevState) =>
        prevState.map((component) => {
          switch (component.label) {
            case "Pending":
              return { ...component, num: pendingCount, emails: pendingEmails }; // Store emails in "Pending" component
            case "Purchased":
              return { ...component, num: purchasedCount };
            case "Follow Up":
              return { ...component, num: followUpCount };
            case "Total Students":
              return { ...component, num: totalCount };
            default:
              return component;
          }
        })
      );
    };

    updateCounts();
  }, []);

  const handleSendEmails = () => {
    // Get the emails of pending students from the state
    const pendingEmails = homeComponents.find(
      (component) => component.label === "Pending"
    )?.emails;

    if (pendingEmails && pendingEmails.length > 0) {
      sendEmails(pendingEmails);
      toast.success("Email sent successfully");
    }
  };

  return (
    <div
      className={`w-full p-1 pb-4 dark:bg-gray-700`}
      style={{ minHeight: "90.8vh" }}
    >
      <ToastContainer />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:py-4 lg:px-8">
        <h2
          className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white"
          style={{ textShadow: "0px 1px gray" }}
        >
          Digital Pathsala Member Statistics
        </h2>
        <div className="grid transition-all duration-300 gap-4 mt-4 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
          {homeComponents.map((item, i) => (
            <div
              key={i}
              className="bg-white overflow-hidden shadow rounded-lg dark:bg-gray-900 p-4 min-w-[250px] max-w-[1fr]"
            >
              <div className="px-4 py-5 sm:p-6 relative">
                <dl>
                  <dt className="text-sm leading-5 font-medium text-gray-500 truncate dark:text-gray-400 flex gap-2">
                    {item.icon}
                    {item.label}
                    {item.label === "Pending" && (
                      <Button
                        className="absolute bottom-0 right-0"
                        onClick={handleSendEmails}
                      />
                    )}
                  </dt>
                  <dd className="mt-1 text-3xl leading-9 font-semibold text-indigo-600 dark:text-indigo-400 ml-10">
                    {item.num}
                  </dd>
                </dl>
              </div>
            </div>
          ))}

          {staffData.map((ele, i) => (
            <div
              key={i}
              className="bg-white overflow-hidden shadow rounded-lg dark:bg-gray-900 p-4 min-w-[250px] max-w-[1fr]"
            >
              <div className="px-4 py-5 sm:p-6">
                <dl>
                  <dt className="text-sm leading-5 font-medium text-gray-500 truncate dark:text-gray-400 flex gap-2">
                    {ele.icon}
                    {ele.label}
                  </dt>
                  <dd className="mt-1 text-3xl leading-9 font-semibold text-indigo-600 dark:text-indigo-400 ml-10">
                    {ele.num}
                  </dd>
                </dl>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Button = ({ className, onClick }) => {
  return (
    <div
      className={`text-white border border-indigo-600 py-2 px-3 rounded inline-flex items-center ${className} hover:cursor-pointer`}
      onClick={onClick}
    >
      <span>Send Mail</span>
      <svg
        className="w-4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        style={{ width: "1.5rem", height: "1.25rem", marginLeft: "0.5rem" }}
      >
        <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
      </svg>
    </div>
  );
};

export default Home;
