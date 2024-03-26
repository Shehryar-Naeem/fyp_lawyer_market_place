import React from "react";

const LawyerDetail = () => {
  return (
    <section className="lg:p-md-ly-pad md:p-sm-ly-pad sm:p-2xl flex flex-col lg:gap-1 md:gap-md gap-sm">
      <div className="fieldset-border">
        <caption className="field-legend">professional info</caption>
        <div className="flex flex-col md:gap-sm gap-xs">
          <div className="info-label-gap">
            <span className="info-label-text-bold">Legal firm Name:</span>
            <span className="info-label-text">John Doe</span>
          </div>
          <div className="info-label-gap">
            <span className="info-label-text-bold">designation:</span>
            <span className="info-label-text">John Doe</span>
          </div>
          <div className="info-label-gap">
            <span className="info-label-text-bold">Bar Membership</span>
          </div>
          <div className="info-label-gap">
            <span className="info-label-text-bold">state</span>
            <span className="info-label-text">John Doe</span>
          </div>
          <div className="info-label-gap">
            <span className="info-label-text-bold">License number</span>
            <span className="info-label-text">John Doe</span>
          </div>
          <div className="info-label-gap">
            <span className="info-label-text-bold">experience:</span>
            <span className="info-label-text">John Doe</span>
          </div>
        </div>
      </div>
      <div className="fieldset-border">
        <caption className="field-legend">Education</caption>
        <div className="flex flex-col md:gap-sm gap-xs">
          <div className="info-label-gap">
            <span className="info-label-text-bold">Institution:</span>
            <span className="info-label-text">John Doe</span>
          </div>
          <div className="info-label-gap">
            <span className="info-label-text-bold">completion year:</span>
            <span className="info-label-text">John Doe</span>
          </div>
        </div>
      </div>
      <div className="fieldset-border">
        <caption className="field-legend">available at</caption>
        <div className="flex flex-col md:gap-sm gap-xs">
          <div className="info-label-gap">
            <span className="info-label-text-bold">Availability hours:</span>
            <span className="info-label-text">John Doe</span>
          </div>
          <div className="info-label-gap">
            <span className="info-label-text-bold">Office Days:</span>
            <span className="info-label-text">John Doe</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LawyerDetail;
