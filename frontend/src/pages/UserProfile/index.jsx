import React, { useEffect, useState } from "react";
import ImageUploader from "../../components/imageUploader";
import { useDispatch, useSelector } from "react-redux";
import { CiEdit } from "react-icons/ci";
import UserModel from "../../components/updateUser";
import { useUpdateUserMutation } from "../../redux/api/userApi";
import { userExist } from "../../redux/reducer/userReducer";
import toast from "react-hot-toast";
import ProfileComp from "../../components/profileComp";
import DesComp from "../../components/descComp";
import GenderComp from "../../components/genderComp";
import DateSetter from "../../components/datePicker";

const UserProfile = () => {
  const { user, loading } = useSelector((state) => state.userReducer);
  const [modal, setModal] = useState(false);
  const [updateUser, { error, data, isSuccess }] = useUpdateUserMutation();
  const diaptch = useDispatch();
  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
      setModal(false);
      diaptch(userExist(data?.user));
    }
    if (error) {
      toast.error(error.data?.message);
    }
  }, [isSuccess, diaptch, error, data]);
  return (
    <>
      {!loading ? (
        <p>loading</p>
      ) : (
        <div className="bg-gray-100 h-full">
          <div className="container grid lg:gap-3 md:gap-2 sm:gap-1 gap-sm md:grid-cols-5 grid-cols-6  layout-pad">
            <div className="md:col-span-2 col-span-3 flex flex-col md:gap-1 gap-sm">
              <div className="block_container">
                <ImageUploader />
                <div className="item-center flex-col">
                  <div className="item-center gap-sm">
                    <span className="lg:text-lg md:text-base text-sm text-black text-center capitalize font-bold">
                      {user?.name}
                    </span>
                    <div onClick={() => setModal(!modal)}>
                      <CiEdit className="icon" />
                    </div>
                  </div>
                  <p className="lg:text-lg md:text-base text-sm text-black-50 lowercase font-medium break-all text-center">
                    {user?.email}
                  </p>
                </div>
              </div>
              <div className="block_container">
                <ProfileComp
                  label={"your self"}
                  data={user?.yourSelf}
                  tooltip={"Edit your self"}
                  Comp={DesComp}
                />
                <ProfileComp
                  label={"gender"}
                  data={user?.gender}
                  tooltip={"Edit your gender"}
                  Comp={GenderComp}
                />
                <ProfileComp label={"DOB"} data={user?.dob} Comp={DateSetter} />
                <ProfileComp label={"age"} data={user?.age} />
                <ProfileComp label={"city"} data={user?.city} />
                <ProfileComp label={"postal code "} data={user?.postalCode} />
              </div>
            </div>
            <div className="col-span-3 flex flex-col md:gap-1 gap-sm">
              <div className="block_container">
                {modal && (
                  <UserModel
                    modal={modal}
                    setModal={setModal}
                    name={user?.name}
                    email={user?.email}
                    updateUser={updateUser}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
