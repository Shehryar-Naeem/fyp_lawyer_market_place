import React, { useEffect, useState } from "react";
import InputComp from "../../components/InputComp";
import BlackBtn from "../../components/BlackBtn";

import toast from "react-hot-toast";
import { useLoginMutation, useSignupMutation } from "../../redux/api/userApi";
import { useDispatch } from "react-redux";
import { userExist } from "../../redux/reducer/userReducer";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import YupPassword from "yup-password";
import FailureAlert from "../../components/alert";
import { IoMdEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import CustomModal from "../../components/model";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useCreateLawyerMutation } from "../../redux/api/lawyerApi";
import { useNavigate } from "react-router-dom";
YupPassword(yup);

const signUpSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .password()
    .min(
      8,
      "password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special"
    )
    .minLowercase(1, "password must contain at least 1 lower case letter")
    .minUppercase(1, "password must contain at least 1 upper case letter")
    .minNumbers(1, "password must contain at least 1 number")
    .minSymbols(1, "password must contain at least 1 special character"),
});

const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup
    .string()
    .password()
    .min(
      8,
      "password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special"
    )
    .minLowercase(1, "password must contain at least 1 lower case letter")
    .minUppercase(1, "password must contain at least 1 upper case letter")
    .minNumbers(1, "password must contain at least 1 number")
    .minSymbols(1, "password must contain at least 1 special character"),
});

const SignUp = () => {
  const [passwordShown, setPasswordShown] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate()

  const [
    signup,
    {
      data: signupData,
      isError: signupError,
      isLoading: siginLoading,
      isSuccess: signupSuccess,
      error: signupErrorMsg,
    },
  ] = useSignupMutation();

  const [
    login,
    {
      data: loginData,
      isError: loginError,
      isLoading: loginLoading,
      isSuccess: loginSuccess,
      error: loginErrorMsg,
    },
  ] = useLoginMutation();
  const [
    createLawyer,
    {
      data: createLawyerData,
      isError: createLawyerError,
      isLoading: createLawyerLoading,
      isSuccess: createLawyerSuccess,
      error: createLawyerErrorMsg,
    },
  ] = useCreateLawyerMutation();

  const {
    register: registerSignUp,
    handleSubmit: handleSubmitSignUp,
    reset: resetSignUp,
    formState: { errors: signUpErrors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    reset: resetLogin,
    formState: { errors: loginErrors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const dispatch = useDispatch();

  const createLaywerHandler = async () => {
    await createLawyer();
    setOpenModal(false);
  };
  useEffect(() => {
    if (signupData?.success) {
      dispatch(userExist(signupData?.user));

      toast.success(signupData.msg);
      setOpenModal(true);
    }

    if (signupError) {
      console.log(signupErrorMsg);
      toast.error(signupErrorMsg?.data?.message);
    }
  }, [
    signupSuccess,
    signupError,
    dispatch,
    signupData,
    signupErrorMsg,
    siginLoading,
  ]);
  useEffect(() => {
    if (loginSuccess) {
      dispatch(userExist(loginData?.user));
      if(loginData?.redirectUrl==="lawyer"){
        navigate("/lawyer")
      }else if(loginData?.redirectUrl==="client"){
        navigate("/gigs")
      }else if(loginData?.redirectUrl==="admin"){
        navigate("/admin")
      }
      toast.success(loginData.msg);
    }
    if (loginError) {
      toast.error(loginErrorMsg?.data?.message);
    }
  }, [loginSuccess, loginError, loginData, loginErrorMsg, dispatch]);

  useEffect(() => {
    if (createLawyerSuccess) {
      toast.success(createLawyerData.message);
    }
    if (createLawyerError) {
      toast.error(createLawyerErrorMsg?.data?.message);
    }
  }, [
    createLawyerSuccess,
    createLawyerError,
    createLawyerData,
    createLawyerErrorMsg,
    createLawyerLoading,
  ]);

  const registerHandler = async (data) => {
    try {
      const user = {
        name: data.name,
        email: data.email,
        password: data.password,
      };
      await signup(user);
      resetSignUp();
    } catch (err) {
      console.error(err);
    }
  };
  const loginHandler = async (data) => {
    console.log("loginHandler");
    try {
      const user = {
        email: data.email,
        password: data.password,
      };
      await login(user);
      resetLogin();
    } catch (err) {
      console.error(err);
    }
  };
  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };
  return (
    <>
      <div className=" h-full bg-gray-100">
        <div className="container h-full flex-col item-center max-w-screen-sm  m-auto gap-2 md:p-0 p-4">
          <div className="bg-white shadow-2xl w-full z-10 p-2 rounded-lg">
            <Tabs className={"w-full"}>
              <TabList className="item-center">
                <Tab className="tab">Rigister</Tab>
                <Tab className="tab">Login</Tab>
              </TabList>
              <TabPanel>
                <div className="flex flex-col gap-1">
                  <div className="w-full">
                    <h1 className="lg:text-3xl md:text-2l text-lg text-center font-black capitalize text-black">
                      register User
                    </h1>
                  </div>
                  <form
                    className="w-full"
                    onSubmit={handleSubmitSignUp(registerHandler)}
                  >
                    <div className="flex flex-col gap-1">
                      <div>
                        <InputComp
                          type="text"
                          text={"name"}
                          name={"name"}
                          register={registerSignUp}
                        />
                        {signUpErrors?.name?.message && (
                          <FailureAlert error={signUpErrors?.name?.message} />
                        )}
                      </div>
                      <div>
                        <InputComp
                          type="email"
                          name={"email"}
                          text={"email"}
                          register={registerSignUp}
                        />
                        {signUpErrors?.email?.message && (
                          <FailureAlert error={signUpErrors?.email?.message} />
                        )}
                      </div>
                      <div>
                        <div className="relative">
                          <InputComp
                            type={passwordShown ? "password" : "text"}
                            text={"password"}
                            name={"password"}
                            register={registerSignUp}
                          />
                          <div
                            className="absolute top-0 right-0 h-full mr-3 item-center text-xl"
                            onClick={togglePasswordVisibility}
                          >
                            {passwordShown ? <IoMdEye /> : <IoIosEyeOff />}
                          </div>
                        </div>

                        {signUpErrors?.password?.message && (
                          <FailureAlert
                            error={signUpErrors?.password?.message}
                          />
                        )}
                      </div>

                      <BlackBtn text={"sign up"} loading={siginLoading} />
                    </div>
                  </form>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="w-full">
                  <h1 className="lg:text-3xl md:text-2l text-lg text-center font-black capitalize text-black">
                    login User
                  </h1>
                </div>
                <form
                  className="w-full"
                  onSubmit={handleSubmitLogin(loginHandler)}
                >
                  <div className="flex flex-col gap-2">
                    <div>
                      <InputComp
                        type={"email"}
                        name={"email"}
                        text={"email"}
                        register={registerLogin}
                      />

                      {loginErrors?.email?.message && (
                        <FailureAlert error={loginErrors?.email?.message} />
                      )}
                    </div>

                    <div className="flex flex-col w-full gap-sm cursor-pointer capitalize">
                      <div className="relative">
                        <InputComp
                          type={passwordShown ? "password" : "text"}
                          text={"password"}
                          name={"password"}
                          register={registerLogin}
                        />
                        <div
                          className="absolute top-0 right-0 h-full mr-3 item-center text-xl"
                          onClick={togglePasswordVisibility}
                        >
                          {passwordShown ? <IoMdEye /> : <IoIosEyeOff />}
                        </div>
                      </div>

                      <span className="text-right text-black-50">
                        forget password
                      </span>
                    </div>
                    {loginErrors?.password?.message && (
                      <FailureAlert error={loginErrors?.password?.message} />
                    )}
                    <BlackBtn text={"login"} />
                  </div>
                </form>
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </div>
      {openModal && (
        <CustomModal
          title={"create lawyer account"}
          openModal={openModal}
          setOpenModal={setOpenModal}
          createLaywerHandler={createLaywerHandler}
          createLawyerLoading={createLawyerLoading}
        >
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              you want to create a lawyer account?
            </h3>
          </div>
        </CustomModal>
      )}
    </>
  );
};
export default SignUp;
