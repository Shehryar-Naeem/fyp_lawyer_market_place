import React from "react";
import PageHeading from "../../components/pageHeading";
import RadioBtn from "../../components/radioButton";
import FileUploader from "../../components/fileUploader";

const Profile = () => {
  return (
    <div className="flex flex-col pad-y gap-3">
      <PageHeading text="profile detail" />
      <form className="flex flex-col gap-3 md:mx-0 mx-2 ">
        <div className="item-center">
          <FileUploader />
        </div>
        <div className="flex flex-col flex-wrap  gap-2">
          <fieldset className="fieldset-border">
            <legend className="capitalize p-2 bg-slate-gray leading-none">
              personal info
            </legend>
            <div className="flex flex-col gap-1">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="name">Gender</label>
              <div className="flex gap-x-2 h-full">
                <RadioBtn text="male" />
                <RadioBtn text="female" />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="cnic">CNIC</label>
              <input type="number" id="cnic" />
            </div>
          </fieldset>
          <fieldset>
            <legend>contact info</legend>

            <div className="flex flex-col gap-1">
              <label htmlFor="phone">phone number</label>
              <input type="number" id="phone" />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="address">address</label>
              <input type="text" id="address" />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="yourself">your self</label>
              <input type="text" id="yourself" />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="education">education</label>
              <input type="text" id="education" />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="designation">designation</label>
              <input type="text" id="designation" />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="experience">experience</label>
              <input type="text" id="experience" />
            </div>
          </fieldset>
        </div>
      </form>
    </div>
  );
};

export default Profile;
