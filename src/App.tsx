import { Suspense, createContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/App.css";
import Map from "./pages/Map";
import Landing from "./pages/Landing";
import { AdminContextType } from "./utils/types";
import Loading from "./pages/Loading";
import { Analytics } from "@vercel/analytics/react";

export const AdminContext = createContext<AdminContextType | null>(null);

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <div className="flex flex-col relative w-full max-h-[100dvh]">
        <Routes>
          {/* Default page */}
          <Route path="/" element={<Landing />} />

          {/* Map page */}
          <Route path="/map/:postion?" element={<Map />} />

          {/* Redirect unknown routes to landing */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        <ToastContainer position="bottom-left" closeOnClick autoClose={2500} />
        <Analytics />
      </div>
    </Suspense>
  );
}

export default App;

