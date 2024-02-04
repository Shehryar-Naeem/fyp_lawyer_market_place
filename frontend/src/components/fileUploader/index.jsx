import React from "react";
import { Images } from "../../assets/images";

const FileUploader = () => {
  return (
    <div className="md:w-img w-sm-img md:h-img-height h-sm-img-height ">
      <label
        for="dropzone-file"
        className="flex flex-col items-center justify-center h-full border-2 border-gray-300 border-dashed rounded-full cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 overflow-hidden shadow-2xl relative"
      >
        <img src={Images.ProfilImg} alt="profile"/>
        <div className="absolute bg-primary/30 item-center w-full h-full opacity-0 transition-opacity duration-300 hover:opacity-100 backdrop-blur-sm">
          {/* <svg
            className="w-16 h-16 text-primary dark:text-gray00-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg> */}
          <img src={Images.UploadLogo} alt="upload" className="w-16 h-16"/>
        </div>

        <input id="dropzone-file" type="file" className="hidden" />
      </label>
    </div>
  );
};

export default FileUploader;
