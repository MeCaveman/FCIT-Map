import { useNavigate } from "react-router-dom";
import logo from "../assets/img/FCITMapLogo.svg";
import {
  FaMapMarkerAlt,
  FaInfoCircle,
  FaWheelchair,
  FaExclamationTriangle,
  FaQuestionCircle,
} from "react-icons/fa";

function Landing() {
  const navigate = useNavigate();

  const handleStartNavigation = () => {
    navigate("/map");
  };

  const handleBuildingInfo = () => {
    navigate("/building-info");
  };

  const handleAccessibility = () => {
    navigate("/accessibility");
  };

  const handleEmergency = () => {
    navigate("/emergency");
  };

  const handleHelp = () => {
    navigate("/help");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-green-50">
      <div className="flex flex-col items-center justify-center px-6 py-12 max-w-md w-full">
        {/* Logo */}
        <div className="mb-6">
          <div className="w-20 h-20 bg-white rounded-xl shadow-sm flex items-center justify-center">
            <img src={logo} alt="FCIT Logo" className="w-16 h-16" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-green-600 mb-3 text-center">
          FCIT Interactive Map
        </h1>

        {/* Description */}
        <p className="text-gray-700 text-center mb-8 max-w-sm">
          Navigate through the Faculty of Computing and Information Technology
          building with ease.
        </p>

        {/* Primary Button - Start Navigation */}
        <button
          onClick={handleStartNavigation}
          className="w-full max-w-xs bg-green-600 hover:bg-green-700 text-white font-medium py-4 px-6 rounded-xl flex items-center justify-center gap-3 shadow-md transition-colors duration-200 mb-6"
        >
          <FaMapMarkerAlt className="text-lg" />
          <span>Start Navigation</span>
        </button>

        {/* Secondary Buttons Grid */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
          {/* Building Info */}
          <button
            onClick={handleBuildingInfo}
            className="bg-white hover:bg-gray-50 text-gray-800 font-medium py-4 px-4 rounded-xl flex flex-col items-center justify-center gap-2 shadow-sm border border-gray-200 transition-colors duration-200"
          >
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
              <FaInfoCircle className="text-gray-700 text-xl" />
            </div>
            <span className="text-sm">Building Info</span>
          </button>

          {/* Accessibility */}
          <button
            onClick={handleAccessibility}
            className="bg-white hover:bg-gray-50 text-gray-800 font-medium py-4 px-4 rounded-xl flex flex-col items-center justify-center gap-2 shadow-sm border border-gray-200 transition-colors duration-200"
          >
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
              <FaWheelchair className="text-gray-700 text-xl" />
            </div>
            <span className="text-sm">Accessibility</span>
          </button>

          {/* Emergency */}
          <button
            onClick={handleEmergency}
            className="bg-white hover:bg-gray-50 text-gray-800 font-medium py-4 px-4 rounded-xl flex flex-col items-center justify-center gap-2 shadow-sm border border-gray-200 transition-colors duration-200"
          >
            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
              <FaExclamationTriangle className="text-red-600 text-xl" />
            </div>
            <span className="text-sm">Emergency</span>
          </button>

          {/* Help */}
          <button
            onClick={handleHelp}
            className="bg-white hover:bg-gray-50 text-gray-800 font-medium py-4 px-4 rounded-xl flex flex-col items-center justify-center gap-2 shadow-sm border border-gray-200 transition-colors duration-200"
          >
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
              <FaQuestionCircle className="text-gray-700 text-xl" />
            </div>
            <span className="text-sm">Help</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Landing;

