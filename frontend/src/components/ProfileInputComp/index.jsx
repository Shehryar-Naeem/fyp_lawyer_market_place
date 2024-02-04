import React from "react";

const ProfileInputComp = ({ lable, placeholder, type }) => {
  return (
    <div className="flex flex-col gap-1">
        <label
          for={lable}
          class="input-lable"
        >
          {lable}
        </label>
        <input
          type={type}
          id={lable}
          class="bg-black-50 border border-primary text-primary dark:text-green-400 placeholder-black dark:placeholder-green-500 md:text-lg  text-sm rounded-lg focus:ring-primary focus:border-primary capitalize block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
          placeholder={placeholder}
        />
        <p class="mt-2 text-sm text-green-600 dark:text-green-500">
          <span class="font-medium">Well done!</span> Some success message.
        </p>
      </div>
  );
};

export default ProfileInputComp;
