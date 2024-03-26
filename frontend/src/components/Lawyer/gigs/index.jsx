import React from "react";
import { MdAdd } from "react-icons/md";
import LawyerGigSkeletonLoading from "../../skeletonLoading/lawyergig";
const Gigs = () => {
  return (
    <div className="lg:p-md-ly-pad md:p-sm-ly-pad sm:p-2xl flex flex-col lg:gap-1 md:gap-md gap-sm">
      <div className="grid md:gap-sm gap-xs lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
        <LawyerGigSkeletonLoading/>
        <div className="white-shadow md:rounded-sm rounded-xs item-center flex-col lg:gap-sm md:gap-xs sm:gap-xxs">
          <span className="gray-circle">
            <MdAdd />
          </span>
          <span className="md:text-base sm:text-sm text-xs text-black md:font-semibold font-medium ">
            Create a new Gig
          </span>
        </div>
      </div>
    </div>
  );
};

export default Gigs;
