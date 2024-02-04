import React from "react";
import InputComp from "../../components/InputComp";
import { Images } from "../../assets/images/index";
import BlackBtn from "../../components/BlackBtn";
const SignUp = () => {
  return (
    <div className="sign-padding flex-col item-center max-w-screen-sm  m-auto gap-2 md:p-0 p-4">
      <div className="w-full">
        <h1 className="lg:text-4xl md:text-2xl text-xl text-center font-black capitalize text-primary">
          sign up
        </h1>
      </div>
      <form className="w-full">
        <div className="flex flex-col gap-2">
          <InputComp text="name" />
          <InputComp text="email" />
          <div className="flex flex-col w-full gap-sm cursor-pointer text-slate-gray capitalize">
            <InputComp text="password" />
            <span className="text-right">forget password</span>
          </div>
          <BlackBtn text={"sign up"}/>
        </div>
      </form>
      <div className="flex flex-col gap-1">
        <p>Or Sign up Using</p>
        <div className="item-center">
          <img
            src={Images.Google}
            alt="google"
            className="w-icon-width cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
