import React, { useEffect, useState } from "react";
import { useUpdateUserMutation } from "../../redux/api/userApi";
import { userExist } from "../../redux/reducer/userReducer";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const GenderComp = ({ compData, show, setshow }) => {
  const dispatch = useDispatch();
  const [gender, setGender] = useState("");

  const [updateUser, { data, isSuccess,isError,error }] = useUpdateUserMutation();
  console.log(error);
  useEffect(() => {
    setGender(compData);
    if (isSuccess) {
      toast.success(data?.message);
      setshow(false);
      dispatch(userExist(data?.user));
    }
    if(isError){
        toast.error(error?.data.message);
      }
  }, [data, isSuccess, dispatch]);
  const update = (e) => {
    e.preventDefault();
    updateUser({ gender: gender });
  };
  return (
    <div className="bg-gray-200 rounded-md md:p-sm-ly-pad p-0.5 flex flex-col gap-sm ">
      <select
        id="gender"
        onChange={(e) => setGender(e.target.value)}
        value={gender}
        className="bg-gray-50 border capitalize border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full md:p-2.5 p-0.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="">select gender</option>
        <option value="male">male</option>
        <option value="female">female</option>
      </select>
      <div className="flex-column gap-sm">
        <button
          type="button"
          onClick={() => setshow(!show)}
          className="gray-btn"
        >
          cancel
        </button>
        <button onClick={update} type="button" className="blue-btn">
          update
        </button>
      </div>
    </div>
  );
};

export default GenderComp;
