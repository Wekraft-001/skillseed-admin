import { Route, Routes } from "react-router-dom";
import Signin from "./pages/signin";
import DashboardRoute from "./DashboardRoute";
import { HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <>
      <HelmetProvider>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/*" element={<DashboardRoute />} />
        </Routes>
      </HelmetProvider>
    </>
  );
}

export default App;
