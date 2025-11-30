import { Suspense, createContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/App.css";
import Map from "./pages/Map";
import Landing from "./pages/Landing";
import Accessibility from "./pages/Accessibility";
import { AdminContextType } from "./utils/types";
import Loading from "./pages/Loading";
import { Analytics } from "@vercel/analytics/react";
import BuildingInfo from "./pages/BuildingInfo";
import Emergency from "./pages/Emergency";
import Help from "./pages/Help";

export const AdminContext = createContext<AdminContextType | null>(null);

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <div className="flex flex-col relative w-full max-h-[100dvh]">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/map/:postion?" element={<Map />} />
          <Route path="/accessibility" element={<Accessibility />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/help" element={<Help />} />
          <Route path="/building-info" element={<BuildingInfo />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        <ToastContainer position="bottom-left" closeOnClick autoClose={2500} />
        <Analytics />
      </div>
    </Suspense>
  );
}

export default App;
