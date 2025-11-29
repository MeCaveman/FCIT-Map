import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaExclamationTriangle,
  FaPhone,
  FaMapMarkerAlt,
  FaSignOutAlt,
  FaShieldAlt,
  FaFileAlt,
  FaUsers,
  FaDownload,
  FaMap,
} from "react-icons/fa";

function Emergency() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleViewExitMap = () => {
    navigate("/map");
  };

  const handleDownloadGuide = () => {
    // TODO: Implement download functionality
    console.log("Download Emergency Guide clicked");
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
            <span className="text-lg font-medium">Emergency Information</span>
          </button>
        </div>

        {/* In Case of Emergency Section */}
        <div className="bg-red-50 rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="mt-1">
              <FaExclamationTriangle className="text-red-600 text-3xl" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                In Case of Emergency
              </h2>
              <p className="text-gray-700 leading-relaxed">
                In the event of an emergency, remain calm and follow the
                evacuation procedures. Exit the building immediately and proceed
                to the nearest assembly point.
              </p>
            </div>
          </div>
        </div>

        {/* Emergency Contacts Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <FaPhone className="text-blue-600 text-xl" />
            <h2 className="text-xl font-bold text-gray-900">
              Emergency Contacts
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Emergency Services */}
            <div className="bg-red-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                Emergency Services
              </h3>
              <p className="text-3xl font-bold text-red-600 mb-1">911</p>
              <p className="text-sm text-gray-600">Police, Fire, Medical</p>
            </div>

            {/* Campus Security */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                Campus Security
              </h3>
              <p className="text-2xl font-bold text-blue-600 mb-1">
                (555) 123-4567
              </p>
              <p className="text-sm text-gray-600">24/7 Available</p>
            </div>

            {/* Building Manager */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                Building Manager
              </h3>
              <p className="text-2xl font-bold text-blue-600 mb-1">
                (555) 123-4568
              </p>
              <p className="text-sm text-gray-600">8 AM - 5 PM</p>
            </div>
          </div>
        </div>

        {/* Assembly Points Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <FaMapMarkerAlt className="text-blue-600 text-xl" />
            <h2 className="text-xl font-bold text-gray-900">Assembly Points</h2>
          </div>
          <p className="text-gray-700 mb-4">
            In case of evacuation, proceed to the nearest assembly point and wait
            for further instructions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Primary Assembly Point */}
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-green-600 text-xl mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Primary Assembly Point
                  </h3>
                  <p className="text-gray-800 mb-1">
                    Main parking lot, northwest corner
                  </p>
                  <p className="text-sm text-gray-600">For floors 1-2</p>
                </div>
              </div>
            </div>

            {/* Secondary Assembly Point */}
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-green-600 text-xl mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Secondary Assembly Point
                  </h3>
                  <p className="text-gray-800 mb-1">
                    East lawn area near Engineering building
                  </p>
                  <p className="text-sm text-gray-600">For Floor 2 evacuation</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Exits Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <FaSignOutAlt className="text-blue-600 text-xl" />
            <h2 className="text-xl font-bold text-gray-900">Emergency Exits</h2>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li>
              <span className="font-medium">Floor 1:</span> 4 exits - Main
              entrance, East door, West door, South emergency exit
            </li>
            <li>
              <span className="font-medium">Floor 2:</span> Multiple stairwells
              - East and West stairwells leading to ground level
            </li>
          </ul>
        </div>

        {/* Safety Equipment Locations Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <FaShieldAlt className="text-blue-600 text-xl" />
            <h2 className="text-xl font-bold text-gray-900">
              Safety Equipment Locations
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Fire Extinguishers
              </h3>
              <p className="text-sm text-gray-700">
                Located near all stairwells and lab entrances on every floor
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                First Aid Kits
              </h3>
              <p className="text-sm text-gray-700">
                Available at main office, security desk, and each lab hallway
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">AED Devices</h3>
              <p className="text-sm text-gray-700">
                Main entrance lobby and Floor 2 central hallway
              </p>
            </div>
          </div>
        </div>

        {/* Emergency Procedures Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <FaFileAlt className="text-blue-600 text-xl" />
            <h2 className="text-xl font-bold text-gray-900">
              Emergency Procedures
            </h2>
          </div>

          <div className="space-y-6">
            {/* Fire Emergency */}
            <div>
              <h3 className="font-bold text-gray-900 mb-3">Fire Emergency</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Activate the nearest fire alarm pull station</li>
                <li>
                  Evacuate the building immediately using the nearest safe exit
                </li>
                <li>Close doors behind you (do not lock)</li>
                <li>Do not use elevators</li>
                <li>Proceed to your designated assembly point</li>
                <li>Do not re-enter the building until authorized</li>
              </ol>
            </div>

            <div className="border-t border-gray-200 pt-6">
              {/* Medical Emergency */}
              <h3 className="font-bold text-gray-900 mb-3">Medical Emergency</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Call 911 immediately</li>
                <li>Contact campus security at (555) 123-4567</li>
                <li>
                  Do not move the injured person unless necessary for safety
                </li>
                <li>Provide first aid if trained and safe to do so</li>
                <li>Wait for emergency services to arrive</li>
              </ol>
            </div>

            <div className="border-t border-gray-200 pt-6">
              {/* Severe Weather */}
              <h3 className="font-bold text-gray-900 mb-3">Severe Weather</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Move to interior rooms away from windows</li>
                <li>Avoid elevators and stairwells</li>
                <li>Stay away from glass doors and windows</li>
                <li>Wait for all-clear announcement</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Emergency Preparedness Team Section */}
        <div className="bg-cyan-50 rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <FaUsers className="text-cyan-700 text-xl" />
            <h2 className="text-xl font-bold text-gray-900">
              Emergency Preparedness Team
            </h2>
          </div>
          <p className="text-gray-700 mb-6">
            For questions about emergency procedures or to report safety
            concerns, contact the Emergency Preparedness Team at{" "}
            <a
              href="mailto:safety@fcit.edu"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              safety@fcit.edu
            </a>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={handleDownloadGuide}
              className="w-full bg-white hover:bg-gray-50 text-gray-800 font-medium py-3 px-6 rounded-xl flex items-center justify-center gap-3 border border-gray-300 transition-colors duration-200"
            >
              <FaDownload className="text-lg" />
              <span>Download Emergency Guide</span>
            </button>
            <button
              onClick={handleViewExitMap}
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-3 px-6 rounded-xl flex items-center justify-center gap-3 shadow-md transition-colors duration-200"
            >
              <FaMap className="text-lg" />
              <span>View Exit Map</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Emergency;

