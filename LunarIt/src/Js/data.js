import React from "react";
import { PiChalkboardTeacher } from "react-icons/pi";
import { MdOutlineGroups2 } from "react-icons/md";

export const staffData = [
  {
    label: "Teacher",
    num: 5,
    icon: React.createElement(PiChalkboardTeacher, { size: 22 }),
  },
  {
    label: "Employee",
    num: 13,
    icon: React.createElement(MdOutlineGroups2, { size: 22 }),
  },
];

export const dashboardComponents = [
  {
    label: "Home",
    svg: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z",
  },
  {
    label: "Form",
    svg: "M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z",
  },
  {
    label: "Students",
    svg: "M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z",
  },
  // {
  //   label: "Transactions",
  //   svg: "M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z",
  // },
  // {
  //   label: "Settings",
  //   svg: "M13 10V3L4 14h7v7l9-11h-7z",
  // },
];

export const columns = [
  { field: "rank", headerName: "S.N.", width: 70 },
  { field: "id", headerName: "ID", width: 50 },
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    cellClassName: "name-column--cell",
    minWidth: 175,
  },
  {
    field: "phone",
    headerName: "Phone Number",
    flex: 1,
    minWidth: 100,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
    minWidth: 100,
  },
  {
    field: "date",
    headerName: "Date",
    flex: 1,
    minWidth: 100,
  },
  {
    field: "course",
    headerName: "Interested",
    flex: 1,
    minWidth: 100,
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    minWidth: 100
  },
  {
    field: "remarks",
    headerName: "Remarks",
    headerAlign: "left",
    flex: 3,
    minWidth: 100,
  },
];
