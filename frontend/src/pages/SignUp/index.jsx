import React, { useEffect, useState } from "react";
import InputComp from "../../components/InputComp";
import { Images } from "../../assets/images/index";
import BlackBtn from "../../components/BlackBtn";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import toast from "react-hot-toast";
import { useSignupMutation } from "../../redux/api/userApi";
import AuthWithGoogle from "../../components/AuthWithGoogle";
import { useDispatch, useSelector } from "react-redux";
import { userExist } from "../../redux/reducer/userReducer";
const SignUp = () => {
  const [signup, { isLoading, data, isError, isSuccess, error }] =
    useSignupMutation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const sigupWithgoogle = async (e) => {
    e.preventDefault();

    try {
      const provider = new GoogleAuthProvider();
      // provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
      const { user } = await signInWithPopup(auth, provider);
      if (user.accessToken) {
      }
    } catch (err) {
      console.error(err);

      // Check if there is a specific error message in the response
      if (err.response && err.response.data && err.response.data.msg) {
        toast.error(err.response.data.msg);
      } else {
        toast.error("Something went wrong");
      }
    }
  };
  useEffect(() => {
    if (isSuccess) {
      dispatch(userExist(data?.user));
      toast.success(data.msg);
    }
    if (isError) {
      toast.error(error.data.message);
    }
  }, [isSuccess, isError, error, dispatch]);
  const submitHandler = (e) => {
    e.preventDefault();
    signup({ name, email, password });
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
          <InputComp
            text="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <InputComp
            text="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="flex flex-col w-full gap-sm cursor-pointer capitalize">
            <InputComp
              text="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="text-right text-black-50">forget password</span>
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
