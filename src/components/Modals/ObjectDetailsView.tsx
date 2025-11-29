import { ObjectItem } from "@/utils/types";
import {
  FaMapMarkerAlt,
  FaTimes,
  FaInfoCircle,
  FaBuilding,
  FaUsers,
  FaClock,
  FaWheelchair,
  FaRoute,
} from "react-icons/fa";

interface ObjectDetailsViewProps {
  object: ObjectItem;
  handleEditClick: () => void;
  objectNavigation: () => void;
  onClose: () => void;
}

function ObjectDetailsView({
  object,
  handleEditClick: _handleEditClick,
  objectNavigation,
  onClose,
}: ObjectDetailsViewProps) {
  // Helper function to extract capacity from description
  const extractCapacity = (desc: string): string | null => {
    const capacityMatch = desc.match(/capacity[:\s]*(\d+)/i) || desc.match(/(\d+)\s*people?/i);
    if (capacityMatch) {
      return `${capacityMatch[1]} people`;
    }
    // If desc is just a number, assume it's capacity
    if (/^\d+$/.test(desc.trim())) {
      return `${desc.trim()} people`;
    }
    return null;
  };

  // Helper function to determine floor (can be enhanced with actual data)
  const getFloor = (): string => {
    // Check if name contains floor indicator (e.g., H1, L1 = Floor 1, H2, L2 = Floor 2)
    if (object.name.match(/[HL][12]/)) {
      const floorMatch = object.name.match(/[HL]([12])/);
      return floorMatch ? `Floor ${floorMatch[1]}` : "Floor 1";
    }
    return "Floor 1";
  };

  // Helper function to get features (can be enhanced with actual data)
  const getFeatures = (): string[] => {
    const features: string[] = [];
    const descLower = object.desc?.toLowerCase() || "";
    const nameLower = object.name?.toLowerCase() || "";

    // Check for common features in description or category
    if (descLower.includes("projector") || nameLower.includes("lab")) {
      features.push("Projector");
    }
    if (descLower.includes("whiteboard") || object.categoryName?.toLowerCase().includes("classroom")) {
      features.push("Whiteboard");
    }
    if (descLower.includes("air") || descLower.includes("ac") || descLower.includes("conditioning")) {
      features.push("Air Conditioning");
    }

    // Default features for classrooms
    if (object.categoryName?.toLowerCase().includes("classroom") && features.length === 0) {
      features.push("Projector", "Whiteboard", "Air Conditioning");
    }

    return features;
  };

  // Helper function to check accessibility (can be enhanced with actual data)
  const isAccessible = (): boolean => {
    // For now, assume all rooms are accessible (can be enhanced with actual data)
    return true;
  };

  const capacity = extractCapacity(object.desc || "");
  const floor = getFloor();
  const features = getFeatures();
  const accessible = isAccessible();

  return (
    <div className="p-6">
      {/* Header with Close Button */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-gray-900">
            {object.categoryName || "Room"}
          </h2>
          <FaMapMarkerAlt className="text-gray-500" />
        </div>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Close"
        >
          <FaTimes className="text-xl" />
        </button>
      </div>

      {/* Subtitle */}
      <p className="text-gray-600 mb-6">
        {object.categoryName || "Room"} - {object.name}
      </p>

      {/* General Information */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">
          General Information
        </h3>

        {/* Info Bubble */}
        <div className="flex items-start gap-2 mb-4 p-3 bg-blue-50 rounded-lg">
          <FaInfoCircle className="text-blue-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-gray-700">
            {object.desc || "Standard room for lectures and tutorials"}
          </p>
        </div>

        {/* Floor */}
        <div className="flex items-center gap-3 mb-3">
          <FaBuilding className="text-gray-500" />
          <div>
            <p className="text-xs text-gray-500">Floor</p>
            <p className="text-sm font-medium text-gray-900">{floor}</p>
          </div>
        </div>

        {/* Capacity */}
        {capacity && (
          <div className="flex items-center gap-3 mb-3">
            <FaUsers className="text-gray-500" />
            <div>
              <p className="text-xs text-gray-500">Capacity</p>
              <p className="text-sm font-medium text-gray-900">{capacity}</p>
            </div>
          </div>
        )}

        {/* Availability */}
        <div className="flex items-center gap-3">
          <FaClock className="text-gray-500" />
          <div>
            <p className="text-xs text-gray-500">Availability</p>
            <p className="text-sm font-medium text-gray-900">Check schedule</p>
          </div>
        </div>
      </div>

      {/* Features & Amenities */}
      {features.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            Features & Amenities
          </h3>
          <div className="flex flex-wrap gap-2">
            {features.map((feature, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Accessibility */}
      {accessible && (
        <div className="mb-6 p-3 bg-green-50 rounded-lg flex items-center gap-2">
          <FaWheelchair className="text-green-600 text-lg" />
          <p className="text-sm font-medium text-green-800">
            This room is wheelchair accessible
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4 border-t">
        <button
          onClick={onClose}
          className="flex-1 px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
        >
          Close
        </button>
        <button
          onClick={objectNavigation}
          className="flex-1 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <FaRoute className="text-sm" />
          <span>Get Directions</span>
        </button>
      </div>
    </div>
  );
}

export default ObjectDetailsView;
