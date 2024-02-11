import React from "react";
import PageHeading from "../../components/pageHeading";
import RadioBtn from "../../components/radioButton";
import ImageUploader from "../../components/imageUploader";
import BlackBtn from "../../components/BlackBtn";
import ProfileInputComp from "../../components/ProfileInputComp";

const Profile = () => {
  return (
    <div className="flex flex-col pad-y gap-3">
      <PageHeading text="profile detail" />
      <form className="flex flex-col gap-3 md:mx-0 mx-2 ">
        <div className="item-center">
          <ImageUploader />
        </div>
        <div className="flex flex-col flex-wrap  gap-2">
          <fieldset className="fieldset-border">
            <legend className="field-legend">personal info</legend>
            <ProfileInputComp
              lable="name"
              placeholder="enter your name"
              type="text"
            />

            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="input-lable">
                Gender
              </label>
              <div className="flex gap-x-2 h-full items-center">
                <RadioBtn text="male" />
                <RadioBtn text="female" />
              </div>
              <p class="mt-2 text-sm text-green-600 dark:text-green-500">
                <span class="font-medium">Well done!</span> Some success
                message.
              </p>
            </div>

            <ProfileInputComp
              lable="date of birth"
              placeholder="enter your date of birth"
              type="date"
            />

            <ProfileInputComp
              lable="CNIC"
              placeholder="enter your cnic"
              type="number"
            />

            <ProfileInputComp
              lable="postal code"
              placeholder="enter your postal code"
              type="number"
            />

            <ProfileInputComp
              lable="address"
              placeholder="enter your address"
              type="text"
            />

            <div className="flex flex-col gap-1 col-span-full">
              <label htmlFor="yourself" className="input-lable">
                your self
              </label>
              <textarea
                type="text"
                id="yourself"
                rows={8}
                className="bg-black-50 border border-primary text-primary dark:text-green-400 placeholder-black dark:placeholder-green-500 md:text-lg  text-sm rounded-lg focus:ring-primary focus:border-primary capitalize block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
              />
            </div>
          </fieldset>
          <fieldset className="fieldset-border">
            <legend className="field-legend">contact info</legend>

            <ProfileInputComp
              lable="email"
              placeholder="enter your email"
              type="email"
            />

            <ProfileInputComp
              lable="phone number"
              placeholder="enter your phone number"
              type="number"
            />
          </fieldset>
          <fieldset className="fieldset-border">
            <legend className="field-legend">working experience</legend>
            {/* <div className="flex flex-col gap-1">
              <label htmlFor="education">education</label>
              <input type="text" id="education" />
            </div> */}
            <ProfileInputComp
              lable="education"
              placeholder="enter your education"
              type="text"
            />
            {/* <div className="flex flex-col gap-1">
              <label htmlFor="designation">designation</label>
              <input type="text" id="designation" />
            </div> */}
            <ProfileInputComp
              lable="designation"
              placeholder="enter your designation"
              type="text"
            />
            {/* <div className="flex flex-col gap-1">
              <label htmlFor="experience">experience</label>
              <input type="text" id="experience" />
            </div> */}
            <ProfileInputComp
              lable="experience"
              placeholder="enter your experience"
              type="text"
            />
          </fieldset>
        </div>
        <BlackBtn text={"save now"} />
      </form>
    </div>
  );
};

export default Profile;
