import React, { useState } from "react";

const ProfileComp = ({ label, data, tooltip, Comp }) => {
  const [show, setshow] = useState(false);
  return (
    <div className="flex flex-col gap-sm w-full border-bottom pb-5">
      <div className="flex w-full items-center justify-between">
        <span className="left-label">{label}</span>
        <span
          onClick={() => setshow(!show)}
          className="edit-label"
          data-te-toggle="tooltip"
          data-te-placement="top"
          data-te-ripple-init
          data-te-ripple-color="dark"
          title={tooltip}
        >
          {" "}
          edit
        </span>
      </div>
      {show ? (
        <Comp compData={data} show={show} setshow={setshow} />
      ) : (
        <span className="desc-label">{data}</span>
      )}
    </div>
  );
};

export default ProfileComp;
