import React from "react";

const SVG = ({stroke, sw, cln}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`h-6 w-6 ${cln} dark:text-gray-100`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={sw}
        d={stroke}
      />
    </svg>
  );
};

export default SVG;
