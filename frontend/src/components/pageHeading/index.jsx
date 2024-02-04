import React from "react";

const PageHeading = ({ text }) => {
  return (
    <div className="item-center">
      <h2 className="shadow-2xl bg-gradient p-2 capitalize font-black text-2xl">{text}</h2>
    </div>
  );
};

export default PageHeading;
