import React from "react";

import Skeleton from "react-loading-skeleton";
import GigCard from "../../card";
const CardSkeletonLoading = () => {
  return (
    <>
      <div className="f-col md:gap-1 gap-sm justify-start h-max-w-sm md:p-1 p-0.5 ">
        <div className="card-h">
          <Skeleton className="w-full h-full lg:rounded-2xl md:rounded-xl sm:rounded-lg rounded-md" />
        </div>
        <div className="f-col md:gap-1 sm:gap-sm gap-xs">
          <div className="flex md:gap-1 sm:gap-sm gap-xs items-center">
            <Skeleton
              circle
              className="md:w-sm-img w-xs-img md:h-sm-img h-xs-img"
            />
            <div className="w-full">
              <Skeleton className="lg:h-4 md:h-3 h-2 md:rounded-lg sm:rounded-md rounded-sm" />
            </div>
          </div>
          <Skeleton className="w-3/4 lg:h-4 md:h-3 h-2 md:rounded-lg sm:rounded-md rounded-sm" />
          <Skeleton className="w-1/2 lg:h-4 md:h-3 h-2 md:rounded-lg sm:rounded-md rounded-sm" />
          <Skeleton className="w-1/4 lg:h-4 md:h-3 h-2 md:rounded-lg sm:rounded-md rounded-sm" />
        </div>
      </div>
      <GigCard/>
    </>
  );
};

export default CardSkeletonLoading;
