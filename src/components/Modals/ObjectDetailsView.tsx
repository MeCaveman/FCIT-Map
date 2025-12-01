import { ObjectItem } from "@/utils/types";
import { FiNavigation } from "react-icons/fi";
import { DialogBody, DialogHeader } from "../ui/Dialog";

interface ObjectDetailsViewProps {
  object: ObjectItem;
  objectNavigation: () => void;
}

function ObjectDetailsView({ object, objectNavigation }: ObjectDetailsViewProps) {
  // Only show navigation button if the object has a vertexId assigned
  const hasNavigation = object.vertexId !== undefined && object.vertexId !== null && object.vertexId !== "";
  
  return (
    <>
      <DialogHeader>
        <p>{object.categoryName}</p>
      </DialogHeader>
      <DialogBody>
        <div className="mb-6">
          <p className="text-lg font-medium text-gray-900">{object.name}</p>
          <p className="text-md text-gray-700">{object.desc}</p>
          {object.floor && (
            <p className="text-sm text-gray-500 mt-1">{object.floor === "F2" ? "Floor 2" : "Floor 1"}</p>
          )}
        </div>
        {hasNavigation && (
          <div className="inline-flex rounded-md right-0 bottom-0 p-2 absolute">
            <button
              type="button"
              className="text-white bg-teal-700 hover:bg-teal-900 hover:ring-2 focus:outline-none focus:ring-teal-400 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
              onClick={objectNavigation}
            >
              <FiNavigation />
            </button>
          </div>
        )}
      </DialogBody>
    </>
  );
}

export default ObjectDetailsView;
