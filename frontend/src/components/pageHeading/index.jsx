import React from "react";

const PageHeading = ({ text }) => {
  return (
    <div className="item-center">
      <h2 className="shadow-2xl bg-gradient md:p-2 p-1 capitalize md:font-black font-bold md:text-2xl text-xl">{text}</h2>
    </div>
  );
};

export default PageHeading;
