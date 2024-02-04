import React from "react";

const RadioBtn = ({ text }) => {
  return (
    <div className="flex items-center me-4">
      <input
        id="red-radio"
        type="radio"
        value={text.toLowerCase()}
        name="colored-radio"
        className="w-4 h-4 text-primary bg-gray-100 border-primary focus:ring-primary dark:focus:ring-primary dark:ring-offset-primary focus:ring-2 dark:bg-primary dark:border-primary"
      />
      <label
        for="red-radio"
        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 capitalize"
      >
        {text}
      </label>
    </div>
  );
};

export default RadioBtn;
