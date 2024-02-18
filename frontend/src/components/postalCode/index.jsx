import React, { useEffect, useState } from "react";
import { useUpdateUserMutation } from "../../redux/api/userApi";
import { userExist } from "../../redux/reducer/userReducer";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const PostalCode = ({ compData, show, setshow }) => {
  const dispatch = useDispatch();
  const [postalCode, setPostalCode] = useState(0);
  const [updateUser, { data, isSuccess, error }] = useUpdateUserMutation();

  useEffect(() => {
    setPostalCode(compData);
    if (isSuccess) {
      toast.success(data?.message);
      setshow(false);
      dispatch(userExist(data?.user));
    }
    if (error?.data.message) {
      toast.error(error?.data.message);
    }
  }, [data, isSuccess, dispatch]);
  const update = (e) => {
    e.preventDefault();
    updateUser({ postalCode: postalCode });
  };
  return (
    <form>
      <div className="profile-edit-container">
        <input
          type="number"
          id="postalCode"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter your postal code"
        />
        <div className="flex-column gap-sm">
          <button
            type="button"
            onClick={() => setshow(!show)}
            className="gray-btn "
          >
            cancel
          </button>
          <button type="button" onClick={update} className="blue-btn">
            update
          </button>
        </div>
      </div>
    </form>
  );
};

export default PostalCode;
