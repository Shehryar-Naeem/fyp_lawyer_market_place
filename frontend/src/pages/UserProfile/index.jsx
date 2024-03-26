import React, { useEffect, useState } from "react";
import ImageUploader from "../../components/imageUploader";
import { useDispatch, useSelector } from "react-redux";
import { CiEdit } from "react-icons/ci";
import UserModel from "../../components/updateUser";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "../../redux/api/userApi";
import { userExist } from "../../redux/reducer/userReducer";
import toast from "react-hot-toast";
import ProfileComp from "../../components/profileComp";
import DesComp from "../../components/descComp";
import GenderComp from "../../components/genderComp";
import DateSetter from "../../components/datePicker";
import PostalCode from "../../components/postalCode";
import City from "../../components/city";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import LawyerDetail from "../../components/Lawyer/details";
import Gigs from "../../components/Lawyer/gigs";
import Bid from "../../components/Lawyer/bids";
import Chat from "../../components/Lawyer/chats";
import { NavLink, Outlet } from "react-router-dom";

const UserProfile = () => {
  const {
    data: userData,
    isLoading: userLoading,
    isSuccess: userSuccess,
    isError: userIsError,
    error: userError,
  } = useGetUserQuery();
  console.log(userData);
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
      {userLoading ? (
        <p>loading</p>
      ) : (
        <div className="bg-gray-100 h-full">
          <div className="container m-auto grid lg:gap-3 md:gap-2 sm:gap-1 gap-sm md:grid-cols-5 grid-cols-6 layout-pad">
            <div className="md:col-span-2 col-span-3 flex flex-col md:gap-1 gap-sm">
              <div className="block_container">
                <ImageUploader />
                <div className="item-center flex-col">
                  <div className="item-center gap-sm">
                    <span className="lg:text-lg md:text-base text-sm text-black text-center capitalize font-bold">
                      {userData?.name}
                    </span>
                    <div onClick={() => setModal(!modal)}>
                      <CiEdit className="icon" />
                    </div>
                  </div>
                  <p className="lg:text-lg md:text-base text-sm text-black-50 lowercase font-medium break-all text-center">
                    {userData?.email}
                  </p>
                </div>
              </div>
              <div className="block_container">
                <ProfileComp
                  label={"your self"}
                  data={userData?.yourSelf}
                  tooltip={"Edit your self"}
                  Comp={DesComp}
                />
                <ProfileComp
                  label={"gender"}
                  data={userData?.gender}
                  tooltip={"Edit your gender"}
                  Comp={GenderComp}
                />
                {/* <ProfileComp label={"DOB"} data={userData?.dob} Comp={DateSetter} /> */}
                {/* <ProfileComp label={"age"} data={userData?.age} /> */}
                <ProfileComp label={"city"} data={userData?.city} Comp={City} />
                <ProfileComp
                  label={"postal code "}
                  data={userData?.postalCode}
                  Comp={PostalCode}
                />
              </div>
            </div>
            <div className="col-span-3 flex flex-col md:gap-1 gap-sm">
              <div className="h-full w-full flex gap-1 flex-col bg-white shadow-2xl lg:p-2 md:p-1 p-0.5">
                <div className="flex w-full overflow-auto">
                  <NavLink to={"/user-profile"}  end className={"underline-tab"}>
                    lawyer info
                  </NavLink>
                  <NavLink
                    to={"/user-profile/gigs"}
                    className={"underline-tab"}
                    end
                  >
                    gigs
                  </NavLink>
                  <NavLink
                    to={"/user-profile/bids"}
                    className={"underline-tab"}
                    end
                  >
                    bids
                  </NavLink>
                  <NavLink
                    to={"/user-profile/chat"}
                    className={"underline-tab"}
                    end
                  >
                    chat
                  </NavLink>
                </div>

                <div>
                  <Outlet />
                </div>
                {/* <TabPanel>
                    <Outlet />
                  </TabPanel>
                  <TabPanel>
                    <Gigs />
                  </TabPanel>
                  <TabPanel>
                    <Bid />
                  </TabPanel>
                  <TabPanel>
                    <Chat />
                  </TabPanel> */}
              </div>
            </div>
          </div>
        </div>
      )}
      {modal && (
        <UserModel
          modal={modal}
          setModal={setModal}
          name={userData?.name}
          email={userData?.email}
          updateUser={updateUser}
        />
      )}
    </>
  );
};

export default UserProfile;
