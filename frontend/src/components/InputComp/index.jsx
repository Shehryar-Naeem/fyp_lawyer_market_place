import React from "react";

const InputComp = ({text}) => {
  return (
    <div class="relative">
      <input
        type="text"
        id="floating_outlined"
        class="block px-2.5 pb-2.5 pt-4 w-full md:text-lg text-sm text-black bg-transparent rounded-lg border-1 border-black appearance-none dark:text-white dark:border-white dark:focus:border-black 0 focus:outline-none focus:ring-0 focus:border-black peer"
        placeholder=""
      />
      <label
        for="floating_outlined"
        class="absolute capitalize md:text-lg text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white peer-focus:bg-primary dark:bg-gray-900 px-2 peer-focus:mx-2 peer-focus:px-2 peer-focus:text-white peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
      >
        {text}
      </label>
    </div>
  );
};

export default InputComp;
