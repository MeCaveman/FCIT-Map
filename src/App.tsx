import { Suspense, createContext } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/App.css";
import Map from "./pages/Map";
import Landing from "./pages/Landing";
import BuildingInfo from "./pages/BuildingInfo";
import Accessibility from "./pages/Accessibility";
import Emergency from "./pages/Emergency";
import Help from "./pages/Help";
import { AdminContextType } from "./utils/types";
import Loading from "./pages/Loading";
import { Analytics } from "@vercel/analytics/react";
export const AdminContext = createContext<AdminContextType | null>(null);
function App() {
  return (
    <Suspense fallback={<Loading />}>
      <div className="flex flex-col relative w-full max-h-[100dvh]">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/building-info" element={<BuildingInfo />} />
          <Route path="/accessibility" element={<Accessibility />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/help" element={<Help />} />
          <Route path="/map/:position?" element={<Map />} />
        </Routes>
        <ToastContainer position="bottom-left" closeOnClick autoClose={2500} />
        <Analytics />
      </div>
    </Suspense>
  );
}

export default App;
