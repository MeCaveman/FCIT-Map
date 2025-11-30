import { ObjectItem } from "@/utils/types";
import { Dialog } from "../ui/Dialog";
import ObjectDetailsView from "./ObjectDetailsView";

interface ObjectItemDetailsModalProps {
  open: boolean;
  onClose: () => void;
  object: ObjectItem;
  objectNavigation: () => void;
}

function ObjectItemDetailsModal({ open, onClose, object, objectNavigation }: ObjectItemDetailsModalProps) {
  return (
    <Dialog
      open={open}
      handler={() => {
        onClose();
      }}
    >
      <ObjectDetailsView object={object} objectNavigation={objectNavigation} />
    </Dialog>
  );
}

export default ObjectItemDetailsModal;
