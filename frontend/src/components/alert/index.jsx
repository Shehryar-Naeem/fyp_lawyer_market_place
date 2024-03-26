import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";

const FailureAlert = ({ error }) => {
  return (
    <Alert color="failure" className="p-0.5 capitalize">
      <div className="item-center">
        <HiInformationCircle className="text-red-500 mr-1" size={24} />
        <span className="text-base font-bold">Error:</span> &nbsp;
        <span className="text-sm font-medium item-center lowercase leading-3">{error}</span>
      </div>
    </Alert>
  );
};

export default FailureAlert;
