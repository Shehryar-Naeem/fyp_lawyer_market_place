import React, { useEffect, useState } from "react";
import FileUploader from "../../components/fileUploader";
import { useSelector } from "react-redux";
import { CiEdit } from "react-icons/ci";
import UserModel from "../updateUser";
const UserProfile = () => {
  const { user, loading } = useSelector((state) => state.userReducer);
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    setName(user?.name);
    setEmail(user?.email);
  }, [user]);
  return (
    <>
      {!loading ? (
        <p>loading</p>
      ) : (
        <div className="grid lg:gap-3 md:gap-2 sm:gap-1 gap-sm md:grid-cols-5 grid-cols-6  layout-pad">
          <div className="md:col-span-2 col-span-3 item-center gap-1 flex-col bg-white shadow-2xl lg:p-2 md:p-1 p-0.5">
            <FileUploader />
            <div className="item-center flex-col">
              <div className="item-center gap-sm">
                <span className="lg:text-lg md:text-base text-sm text-black capitalize font-bold">
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
          <div className="col-span-3 bg-white shadow-2xl lg:p-2 md:p-1 p-0.5">
            {modal && <UserModel modal={modal} setModal={setModal} name={user?.name} email={user?.email}/>}
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
