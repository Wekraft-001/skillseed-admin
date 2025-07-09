import { Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import DashboardRoute from "./DashboardRoute";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <DashboardRoute />
              </ProtectedRoute>
            }
          />
        </Routes>
      </>
    </>
  );
}

export default App;
