import React from "react";
import { Images } from "../../assets/images";

const AuthWithGoogle = ({ func, text }) => {
  return (
    <div
      className="item-center cursor-pointer shadow-2xl rounded-1  overflow-hidden"
      onClick={func}
    >
      <div>
        <img
          src={Images.Google}
          alt="google"
          className="px-1 w-icon-width cursor-pointer  "
        />
      </div>

      <div className=" bg-blue-500 capitalize text-white font-medium md:text-sm text-xs p-2 leading-loose">
        <span>{text}</span>
      </div>
    </div>
  );
};

export default AuthWithGoogle;
