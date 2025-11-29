import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaWheelchair,
  FaRestroom,
  FaLaptop,
  FaChalkboardTeacher,
  FaCoffee,
  FaBook,
  FaParking,
  FaBus,
  FaHandPaper,
  FaRoute,
  FaQuestionCircle,
  FaPhone,
  FaEnvelope,
  FaClock,
} from "react-icons/fa";
import { IoAccessibility } from "react-icons/io5";
import { MdElevator } from "react-icons/md";

function Accessibility() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleViewRoutes = () => {
    navigate("/map");
  };

  const handleGetHelp = () => {
    // TODO: Implement help functionality
    console.log("Get Help clicked");
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
            <span className="text-lg font-medium">Accessibility Information</span>
          </button>
        </div>

        {/* Accessible for Everyone Section */}
        <div className="bg-green-50 rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="mt-1">
              <IoAccessibility className="text-green-600 text-3xl" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Accessible for Everyone
              </h2>
              <p className="text-gray-700 leading-relaxed">
                The FCIT building is designed to be fully accessible to all
                students, faculty, staff, and visitors. We are committed to
                providing an inclusive environment for people with disabilities.
              </p>
            </div>
          </div>
        </div>

        {/* Accessible Entrances Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <FaMapMarkerAlt className="text-green-600 text-xl" />
            <h2 className="text-xl font-bold text-gray-900">
              Accessible Entrances
            </h2>
          </div>

          {/* Main Entrance */}
          <div className="bg-green-50 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-3 mb-2">
              <FaCheckCircle className="text-green-600 text-xl mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Main Entrance (E-101)
                </h3>
                <p className="text-gray-700 mb-2 text-sm">
                  The main entrance features automatic sliding doors, wide
                  doorways (36+ inches), level access with no steps, and
                  accessible push-button controls.
                </p>
                <p className="text-gray-600 text-sm">
                  <span className="font-medium">Features:</span> Automatic
                  doors, ramp access, tactile paving, accessible height call
                  button
                </p>
              </div>
            </div>
          </div>

          {/* Emergency Exits */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <FaCheckCircle className="text-green-600 text-xl mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Emergency Exits - West & South (E-103, E-104)
                </h3>
                <p className="text-gray-700 text-sm">
                  Both emergency exits are wheelchair accessible with ramp access
                  and wide doorways.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Elevators Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <MdElevator className="text-green-600 text-xl" />
            <h2 className="text-xl font-bold text-gray-900">Elevators</h2>
          </div>
          <p className="text-gray-700 mb-4">
            Two accessible elevators are available in the building, located near
            the main entrance and providing access to all three floors.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Elevator A */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">
                Elevator A - Main Lobby
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-green-600 mt-1">•</span>
                  <span>Braille floor buttons</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-green-600 mt-1">•</span>
                  <span>Audio floor announcements</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-green-600 mt-1">•</span>
                  <span>Accessible height controls</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-green-600 mt-1">•</span>
                  <span>Emergency communication system</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-green-600 mt-1">•</span>
                  <span>Handrails on three sides</span>
                </li>
              </ul>
            </div>

            {/* Elevator B */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">
                Elevator B - East Wing
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-green-600 mt-1">•</span>
                  <span>Braille floor buttons</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-green-600 mt-1">•</span>
                  <span>Audio floor announcements</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-green-600 mt-1">•</span>
                  <span>Accessible height controls</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-green-600 mt-1">•</span>
                  <span>Emergency communication system</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-green-600 mt-1">•</span>
                  <span>Handrails on three sides</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Accessible Restrooms Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <FaRestroom className="text-green-600 text-xl" />
            <h2 className="text-xl font-bold text-gray-900">
              Accessible Restrooms
            </h2>
          </div>
          <p className="text-gray-700 mb-4">
            Accessible restrooms are available on every floor of the building.
          </p>

          <div className="space-y-4">
            {/* Floor 1 */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Floor 1</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  <span className="font-medium">Men's Restroom (WC-101)</span>{" "}
                  - Accessible stalls, grab bars, lowered sinks
                </li>
                <li>
                  <span className="font-medium">Women's Restroom (WC-102)</span>{" "}
                  - Accessible stalls, grab bars, lowered sinks
                </li>
                <li>
                  <span className="font-medium">Family Restroom (WC-103)</span>{" "}
                  - Single-user, fully accessible, changing table
                </li>
              </ul>
            </div>

            {/* Floor 2 */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Floor 2</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  <span className="font-medium">Men's Restroom (WC-201)</span>{" "}
                  - Accessible stalls, grab bars
                </li>
                <li>
                  <span className="font-medium">Women's Restroom (WC-202)</span>{" "}
                  - Accessible stalls, grab bars
                </li>
                <li>
                  <span className="font-medium">Prayer Room</span> - Fully
                  accessible with ramps
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Accessible Facilities & Services Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Accessible Facilities & Services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Computer Labs */}
            <div className="bg-gray-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <FaLaptop className="text-green-600 text-xl" />
                <h3 className="font-semibold text-gray-900">Computer Labs</h3>
              </div>
              <p className="text-sm text-gray-700">
                All computer labs feature adjustable-height desks, accessible
                workstations with screen readers, and wheelchair-accessible
                aisles (minimum 36 inches wide).
              </p>
            </div>

            {/* Lecture Halls */}
            <div className="bg-gray-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <FaChalkboardTeacher className="text-green-600 text-xl" />
                <h3 className="font-semibold text-gray-900">Lecture Halls</h3>
              </div>
              <p className="text-sm text-gray-700">
                Designated wheelchair seating areas with companion seats,
                assistive listening systems available, and wheelchair-accessible
                podiums.
              </p>
            </div>

            {/* Cafeteria */}
            <div className="bg-gray-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <FaCoffee className="text-green-600 text-xl" />
                <h3 className="font-semibold text-gray-900">Cafeteria</h3>
              </div>
              <p className="text-sm text-gray-700">
                Lowered service counters, accessible seating, wide aisles, and
                assistance available upon request.
              </p>
            </div>

            {/* Study Areas */}
            <div className="bg-gray-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <FaBook className="text-green-600 text-xl" />
                <h3 className="font-semibold text-gray-900">Study Areas</h3>
              </div>
              <p className="text-sm text-gray-700">
                Adjustable-height tables, accessible power outlets, adequate
                maneuvering space, and quiet zones for focused work.
              </p>
            </div>
          </div>
        </div>

        {/* Parking & Transportation Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Parking & Transportation
          </h2>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <div className="w-3 h-3 rounded-full bg-green-600"></div>
              </div>
              <div>
                <p className="font-medium text-gray-900 mb-1">
                  Accessible Parking
                </p>
                <p className="text-sm text-gray-700">
                  10 designated accessible parking spaces located near the main
                  entrance, with van-accessible spaces available
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-1">
                <div className="w-3 h-3 rounded-full bg-green-600"></div>
              </div>
              <div>
                <p className="font-medium text-gray-900 mb-1">Drop-off Zone</p>
                <p className="text-sm text-gray-700">
                  Covered drop-off area at the main entrance with level access
                  to the building
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-1">
                <div className="w-3 h-3 rounded-full bg-green-600"></div>
              </div>
              <div>
                <p className="font-medium text-gray-900 mb-1">Campus Shuttle</p>
                <p className="text-sm text-gray-700">
                  Accessible campus shuttle service with wheelchair lifts stops
                  directly in front of the building
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Assistive Technology Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <FaHandPaper className="text-green-600 text-xl" />
            <h2 className="text-xl font-bold text-gray-900">
              Assistive Technology
            </h2>
          </div>
          <h3 className="font-semibold text-gray-900 mb-3">
            Available Technology
          </h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-3">
              <FaCheckCircle className="text-green-600 text-lg mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">
                <span className="font-medium">Screen Readers:</span> JAWS and
                NVDA available on all public computers
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FaCheckCircle className="text-green-600 text-lg mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">
                <span className="font-medium">Voice Recognition:</span> Dragon
                NaturallySpeaking software available
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FaCheckCircle className="text-green-600 text-lg mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">
                <span className="font-medium">Magnification Software:</span>{" "}
                ZoomText and built-in accessibility features
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FaCheckCircle className="text-green-600 text-lg mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">
                <span className="font-medium">Alternative Input Devices:</span>{" "}
                Trackballs, ergonomic keyboards, and other adaptive equipment
              </span>
            </li>
          </ul>
        </div>

        {/* Navigation & Wayfinding Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Navigation & Wayfinding
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="mt-1">
                <div className="w-2 h-2 rounded-full bg-green-600"></div>
              </div>
              <span className="text-gray-700">
                <span className="font-medium">Braille Signage:</span> All room
                numbers and directional signs include Braille labels
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-1">
                <div className="w-2 h-2 rounded-full bg-green-600"></div>
              </div>
              <span className="text-gray-700">
                <span className="font-medium">Tactile Maps:</span> Raised-relief
                tactile maps available at main entrance and each floor landing
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-1">
                <div className="w-2 h-2 rounded-full bg-green-600"></div>
              </div>
              <span className="text-gray-700">
                <span className="font-medium">High Contrast:</span>{" "}
                Color-contrasted signs and wayfinding markers for low vision
                accessibility
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-1">
                <div className="w-2 h-2 rounded-full bg-green-600"></div>
              </div>
              <span className="text-gray-700">
                <span className="font-medium">Clear Pathways:</span> Wide
                hallways (minimum 60 inches) with minimal obstructions
              </span>
            </li>
          </ul>
        </div>

        {/* Need Assistance Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Need Assistance?
          </h2>
          <p className="text-gray-700 mb-4">
            Our Accessibility Services Office is here to help. Contact us for
            personalized assistance, accommodations, or to report any
            accessibility concerns.
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-gray-500 mt-1 flex-shrink-0" />
              <span className="text-gray-700">
                <span className="font-medium">Office Location:</span> Room 102,
                First Floor
              </span>
            </div>
            <div className="flex items-start gap-3">
              <FaPhone className="text-gray-500 mt-1 flex-shrink-0" />
              <span className="text-gray-700">
                <span className="font-medium">Phone:</span> (555) 123-4570
              </span>
            </div>
            <div className="flex items-start gap-3">
              <FaEnvelope className="text-gray-500 mt-1 flex-shrink-0" />
              <span className="text-gray-700">
                <span className="font-medium">Email:</span>{" "}
                accessibility@fcit.edu.sa
              </span>
            </div>
            <div className="flex items-start gap-3">
              <FaClock className="text-gray-500 mt-1 flex-shrink-0" />
              <span className="text-gray-700">
                <span className="font-medium">Hours:</span> Sunday-Thursday,
                8:00 AM - 4:00 PM
              </span>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={handleViewRoutes}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-4 px-6 rounded-xl flex items-center justify-center gap-3 shadow-md transition-colors duration-200"
          >
            <FaRoute className="text-lg" />
            <span>View Accessible Routes</span>
          </button>
          <button
            onClick={handleGetHelp}
            className="w-full bg-white hover:bg-gray-50 text-gray-800 font-medium py-4 px-6 rounded-xl flex items-center justify-center gap-3 border border-gray-300 transition-colors duration-200"
          >
            <FaQuestionCircle className="text-lg" />
            <span>Get Help</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Accessibility;

