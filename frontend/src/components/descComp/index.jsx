import React, { useEffect, useState } from "react";
import { useUpdateUserMutation } from "../../redux/api/userApi";
import { userExist } from "../../redux/reducer/userReducer";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const DesComp = ({ compData, show, setshow }) => {
  const dispatch = useDispatch();
  const [desc, setDesc] = useState("");
  const [updateUser, { data, isSuccess, error }] = useUpdateUserMutation();

  useEffect(() => {
    setDesc(compData);
    if (isSuccess) {
      toast.success(data?.message);
      setshow(false);
      dispatch(userExist(data?.user));
    }
    if(error.data.message){
      toast.error(error.data.message);
    }
  }, [data, isSuccess, dispatch]);
  const update = (e) => {
    e.preventDefault();
    updateUser({ yourSelf: desc });
  };
  return (
    <form>
      <div className="text-center bg-gray-200 rounded-md md:p-sm-ly-pad p-0.5 flex flex-col gap-sm">
        <textarea
          id="message"
          rows="5"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your thoughts here..."
        ></textarea>
        <div className="flex-column gap-sm">
          <button
            type="button"
            onClick={() => setshow(!show)}
            className="gray-btn "
          >
            cancel
          </button>
          <button onClick={update} type="button" className="blue-btn">
            update
          </button>
        </div>
      </div>
    </form>
  );
};

export default DesComp;
