import React from "react";
import InputComp from "../../components/InputComp";
import { Images } from "../../assets/images/index";
import BlackBtn from "../../components/BlackBtn";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import toast from "react-hot-toast";
import { useSignupMutation } from "../../redux/api/userApi";
import AuthWithGoogle from "../../components/AuthWithGoogle";
const SignUp = () => {
  const [signup] = useSignupMutation();
  const sigupWithgoogle = async (e) => {
    e.preventDefault();

    try {
      const provider = new GoogleAuthProvider();
      // provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
      const {user} = await signInWithPopup(auth, provider);
      if(user.accessToken){
        
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const { data } = await signup({
      name: "shehryar",
      email: "bsf2000745@ue.edu.pk",
      password: "sherik@123",
      role: "client",
    });
    if (data.success) {
      toast.success(data.msg);
    }
  };
  return (
    <div className="h-full flex-col item-center max-w-screen-sm  m-auto gap-2 md:p-0 p-4">
      <div className="w-full">
        <h1 className="lg:text-4xl md:text-2xl text-xl text-center font-black capitalize text-primary">
          sign up
        </h1>
      </div>
      <form className="w-full" onSubmit={submitHandler}>
        <div className="flex flex-col gap-2">
          <InputComp text="name" />
          <InputComp text="email" />
          <div className="flex flex-col w-full gap-sm cursor-pointer text-slate-gray capitalize">
            <InputComp text="password" />
            <span className="text-right">forget password</span>
          </div>
          <BlackBtn text={"sign up"} />
        </div>
      </form>
      <div className="flex flex-col gap-1 text-center">
        <p className="md:text-lg text-sm capitalize font-bold">
          Or Sign up Using
        </p>
        <AuthWithGoogle func={sigupWithgoogle} text={"register with google"} />
      </div>
    </div>
  );
};
export default SignUp;