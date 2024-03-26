import React from "react";
import { FloatingLabel } from "flowbite-react";
const InputComp = ({ text, type, name, register }) => {
  return (
    <div className="relative">
      <FloatingLabel
        variant="outlined"
        label={text.charAt(0).toUpperCase() + text.slice(1)}
     
        name={name}
        type={type}
        {...register(name)}
        className="peer md:px-2 px-1 text-light-gray active:border-black focus:border-black border-light-gray lg:text-xl md:text-base sm:text-sm text-xs lg:peer-focus:text-lg md:peer-focus:text-sm peer-focus:text-xs lg:peer-focus:-translate-y-5 peer-focus:text-black active:text-black "
        sizing={"sm"}
      />
    </div>
  );
};

export default InputComp;
