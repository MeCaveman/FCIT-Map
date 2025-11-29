import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaSearch,
  FaMousePointer,
  FaRoute,
  FaSearchPlus,
  FaHandPaper,
  FaRedo,
  FaMapMarkerAlt,
  FaLightbulb,
  FaMap,
} from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";

function Help() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleStartUsingMap = () => {
    navigate("/map");
  };

  return (
    <div className="min-h-screen w-full bg-white pb-6">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <FaArrowLeft className="text-xl" />
            <span className="text-lg font-medium">Help & Guide</span>
          </button>
        </div>

        {/* How to Use the Interactive Map Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            How to Use the Interactive Map
          </h1>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Welcome to the FCIT Interactive Map! This guide will help you
            navigate the building and make the most of the map features.
          </p>

          {/* Quick Start Guide */}
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Quick Start Guide
          </h2>
          <div className="space-y-4">
            {/* Step 1 */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-lg">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Select a Floor
                </h3>
                <p className="text-gray-700">
                  Use the floor buttons to switch between different levels of the
                  building
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-lg">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Search for a Room
                </h3>
                <p className="text-gray-700">
                  Type the room name or type in the search bar to quickly find
                  what you need
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-lg">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Click on Rooms
                </h3>
                <p className="text-gray-700">
                  Click on any room on the map or in the sidebar to view details
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-lg">4</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Navigate the Map
                </h3>
                <p className="text-gray-700">
                  Use zoom controls and drag to explore different areas of the
                  floor plan
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Map Controls Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Map Controls</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Zoom In/Out */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <FaSearchPlus className="text-blue-600 text-xl" />
                <h3 className="font-semibold text-gray-900">Zoom In/Out</h3>
              </div>
              <p className="text-sm text-gray-700">
                Click the +/- buttons or use your mouse wheel to zoom
              </p>
            </div>

            {/* Pan the Map */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <FaHandPaper className="text-blue-600 text-xl" />
                <h3 className="font-semibold text-gray-900">Pan the Map</h3>
              </div>
              <p className="text-sm text-gray-700">
                Click and drag to move around the floor plan
              </p>
            </div>

            {/* Reset View */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <FaRedo className="text-blue-600 text-xl" />
                <h3 className="font-semibold text-gray-900">Reset View</h3>
              </div>
              <p className="text-sm text-gray-700">
                Click the reset button to return to default view
              </p>
            </div>

            {/* Room Highlights */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <FaMapMarkerAlt className="text-blue-600 text-xl" />
                <h3 className="font-semibold text-gray-900">
                  Room Highlights
                </h3>
              </div>
              <p className="text-sm text-gray-700">
                Clickable areas on the map show room locations
              </p>
            </div>
          </div>
        </div>

        {/* Frequently Asked Questions Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>

          <div className="space-y-2">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
              <span className="text-gray-900 font-medium">
                How do I find a specific room?
              </span>
              <IoMdArrowDropdown className="text-gray-500 text-xl" />
            </div>

            <div className="flex items-center justify-between p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
              <span className="text-gray-900 font-medium">
                What do the different room types mean?
              </span>
              <IoMdArrowDropdown className="text-gray-500 text-xl" />
            </div>

            <div className="flex items-center justify-between p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
              <span className="text-gray-900 font-medium">
                Can I see all floors at once?
              </span>
              <IoMdArrowDropdown className="text-gray-500 text-xl" />
            </div>

            <div className="flex items-center justify-between p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
              <span className="text-gray-900 font-medium">
                Are there accessible routes in the building?
              </span>
              <IoMdArrowDropdown className="text-gray-500 text-xl" />
            </div>

            <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors cursor-pointer">
              <span className="text-gray-900 font-medium">
                What are the three different layouts?
              </span>
              <IoMdArrowDropdown className="text-gray-500 text-xl" />
            </div>
          </div>
        </div>

        {/* Pro Tips Section */}
        <div className="bg-blue-50 rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <FaLightbulb className="text-blue-600 text-xl" />
            <h2 className="text-xl font-bold text-gray-900">Pro Tips</h2>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>
                Use the search bar to quickly filter rooms by name or type
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>
                Try different layouts from the landing page to find your
                preferred view
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>
                Room details show capacity and available features like WiFi or
                projectors
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>
                Bookmark frequently visited rooms for quick access
              </span>
            </li>
          </ul>
        </div>

        {/* Start Using the Map Button */}
        <button
          onClick={handleStartUsingMap}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-4 px-6 rounded-xl flex items-center justify-center gap-3 shadow-md transition-colors duration-200"
        >
          <FaMap className="text-lg" />
          <span>Start Using the Map</span>
        </button>
      </div>
    </div>
  );
}

export default Help;

