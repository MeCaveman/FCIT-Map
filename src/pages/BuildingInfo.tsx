import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaWifi,
  FaCoffee,
  FaPrint,
  FaUsers,
} from "react-icons/fa";

function BuildingInfo() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleViewMap = () => {
    navigate("/map");
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 pb-6">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <FaArrowLeft className="text-xl" />
            <span className="text-lg font-medium">Building Information</span>
          </button>
        </div>

        {/* FCIT College Building Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            FCIT College Building
          </h1>
          <p className="text-gray-600 mb-6 leading-relaxed">
            The Faculty of Computing and Information Technology building is a
            modern educational facility designed to support innovative learning
            and research in computer science and IT fields.
          </p>

          {/* Contact and Location Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <FaMapMarkerAlt className="text-gray-500 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Address</p>
                <p className="text-gray-900">University Campus, Building 12</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-1">
                <FaPhone className="text-gray-500 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Phone</p>
                <p className="text-gray-900">+966 12 345 6789</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-1">
                <FaEnvelope className="text-gray-500 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Email</p>
                <p className="text-gray-900">info@fcit.edu.sa</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-1">
                <FaClock className="text-gray-500 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Opening Hours</p>
                <p className="text-gray-900">Sun-Thu: 7:00 AM - 9:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Floors Overview Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Floors Overview
          </h2>

          <div className="space-y-4">
            {/* Floor 1 */}
            <div className="flex gap-4">
              <div className="w-1 bg-blue-600 rounded-full flex-shrink-0"></div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Floor 1 - Ground Floor
                </h3>
                <p className="text-gray-600">
                  Classrooms, computer labs, lecture halls, student lounges,
                  electronic library, and main facilities.
                </p>
              </div>
            </div>

            {/* Floor 2 */}
            <div className="flex gap-4">
              <div className="w-1 bg-blue-600 rounded-full flex-shrink-0"></div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Floor 2 - Faculty Offices
                </h3>
                <p className="text-gray-600">
                  Professor offices, prayer room, main hall, and administrative
                  spaces.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Facilities & Amenities Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Facilities & Amenities
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Free WiFi */}
            <div className="flex items-start gap-4">
              <div className="mt-1">
                <FaWifi className="text-blue-600 text-2xl" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Free WiFi</h3>
                <p className="text-sm text-gray-600">
                  High-speed internet throughout.
                </p>
              </div>
            </div>

            {/* Cafeteria */}
            <div className="flex items-start gap-4">
              <div className="mt-1">
                <FaCoffee className="text-blue-600 text-2xl" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Cafeteria</h3>
                <p className="text-sm text-gray-600">
                  Floor 1, open 8 AM - 6 PM.
                </p>
              </div>
            </div>

            {/* Print Services */}
            <div className="flex items-start gap-4">
              <div className="mt-1">
                <FaPrint className="text-blue-600 text-2xl" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Print Services
                </h3>
                <p className="text-sm text-gray-600">
                  Available on all floors.
                </p>
              </div>
            </div>

            {/* Study Areas */}
            <div className="flex items-start gap-4">
              <div className="mt-1">
                <FaUsers className="text-blue-600 text-2xl" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Study Areas
                </h3>
                <p className="text-sm text-gray-600">
                  Collaborative and quiet zones.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* View Interactive Map Button */}
        <button
          onClick={handleViewMap}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-6 rounded-xl flex items-center justify-center gap-3 shadow-md transition-colors duration-200"
        >
          <FaMapMarkerAlt className="text-lg" />
          <span>View Interactive Map</span>
        </button>
      </div>
    </div>
  );
}

export default BuildingInfo;

