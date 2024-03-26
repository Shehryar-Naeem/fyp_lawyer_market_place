import React from "react";

import Skeleton from "react-loading-skeleton";
import GigCard from "../../card";
const LawyerGigSkeletonLoading = () => {
  return (
    <>
      <div className="f-col md:gap-1 gap-sm justify-start max-w-sm md:p-1 p-0.5 ">
        <div className="min-card-h">
          <Skeleton className="w-full h-full lg:rounded-2xl md:rounded-xl sm:rounded-lg rounded-md" />
        </div>
        <div className="f-col md:gap-1 sm:gap-sm gap-xs">
          <Skeleton className="w-3/4 lg:h-4 md:h-3 h-2 md:rounded-lg sm:rounded-md rounded-sm" />
          <Skeleton className="w-1/2 lg:h-4 md:h-3 h-2 md:rounded-lg sm:rounded-md rounded-sm" />
        </div>
      </div>
    </>
  );
};

export default LawyerGigSkeletonLoading;
