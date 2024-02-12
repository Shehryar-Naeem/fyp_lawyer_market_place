import React, { useState ,useEffect} from "react";
import { DatePicker } from "antd";
import { useUpdateUserMutation } from "../../redux/api/userApi";
import { userExist } from "../../redux/reducer/userReducer";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const DateSetter = ({ compData, show, setshow }) => {
  const dispatch = useDispatch();

  const [date, setDate] = useState(new Date());
  const [updateUser, { data, isSuccess,isError,error }] = useUpdateUserMutation();
  function onChange(date, dateString) {
    setDate(date);
  }
  
  useEffect(() => {
    setDate(compData);
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
    updateUser({ dob: date });
  };
  return (
    <div className="profile-edit-container">
      <DatePicker onChange={onChange}  />
      <div className="flex-column gap-sm">
        <button
          type="button"
          onClick={() => setshow(!show)}
          className="gray-btn"
        >
          cancel
        </button>
        <button 
        onClick={update}
         type="button" className="blue-btn">
          update
        </button>
      </div>
    </div>
  );
};

export default DateSetter;
