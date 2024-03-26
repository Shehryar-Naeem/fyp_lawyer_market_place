import React from "react";
import { Card, Flowbite } from "flowbite-react";

const GigCard = () => {
  const customTheme = {
    card: {
      root: {
        base: "p-1 flex rounded-lg border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-800",
        children: "flex h-full flex-col justify-center gap-4 p-0",
      },
    },
  };
  return (
    <Flowbite theme={{ theme: customTheme }}>
      <Card>
        <div className="card-h lg:rounded-2xl md:rounded-xl sm:rounded-lg rounded-md overflow-hidden">
          <img
            src="https://via.placeholder.com/150"
            alt="gig"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="f-col md:gap-1 sm:gap-sm gap-xs">
          <div className="flex md:gap-1 sm:gap-sm gap-xs items-center">
            <img
              src="https://via.placeholder.com/150"
              className="md:w-sm-img w-xs-img md:h-sm-img h-xs-img rounded-full"
            />
            <h3 className="text-black lg:text-xl md:text-lg sm:text-base text-sm md:font-bold font-medium">
              title
            </h3>
          </div>

          <span className="card-text">price</span>
          <div className="flex justify-between">
            <span className="card-text">location</span>
            <span className="card-text">rating</span>
          </div>
          <ul className="flex md:gap-sm gap-xs flex-wrap">
            <li className="tag-text">tag1</li>
            <li className="tag-text">tag2</li>
            <li className="tag-text">tag3</li>
            <li className="tag-text">tag4</li>
            <li className="tag-text">tag5</li>
          </ul>
        </div>
      </Card>
    </Flowbite>
  );
};

export default GigCard;
