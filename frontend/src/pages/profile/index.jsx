import React from "react";
import PageHeading from "../../components/pageHeading";
import RadioBtn from "../../components/radioButton";
import FileUploader from "../../components/fileUploader";

const Profile = () => {
  return (
    <div className="flex flex-col pad-y gap-3">
      <PageHeading text="personal info" />
      <form className="flex flex-col gap-3">
        <div className="item-center">
          <FileUploader />
        </div>
        <div className="flex flex-wrap gap-2">
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" />
          </div>
          <div className="flex gap-x-2 items-center">
            <label htmlFor="name">Gender</label>
            <div className="flex gap-x-2">
              <RadioBtn text="male" />
              <RadioBtn text="female" />
            </div>
          </div>
          <div>
            <label htmlFor="cnic">CNIC</label>
            <input type="number" id="cnic" />
          </div>

          <div>
            <label htmlFor="phone">phone number</label>
            <input type="number" id="phone" />
          </div>
          <div>
            <label htmlFor="address">address</label>
            <input type="text" id="address" />
          </div>
          <div>
            <label htmlFor="yourself">your self</label>
            <input type="text" id="yourself" />
          </div>
          <div>
            <label htmlFor="education">education</label>
            <input type="text" id="education" />
          </div>
          <div>
            <label htmlFor="designation">designation</label>
            <input type="text" id="designation" />
          </div>
          <div>
            <label htmlFor="experience">experience</label>
            <input type="text" id="experience" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
