import { Routes, Route } from "react-router-dom";
import { TooltipProvider } from "./components/ui/tooltip";
import { ThemeProvider } from "./theme/ThemeProvider";
import { SidebarProvider } from "./context/SidebarContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import UserManagager from "./pages/UserManager";
import Schools from "./pages/Schools";
import Challenges from "./pages/Challenges";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import ProgressTracking from "./pages/ProgressTrack";
import Events from "./pages/Events";
import Mentors from "./pages/Mentors";

const App = () => (
  <ThemeProvider>
    <TooltipProvider>
      <SidebarProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="home" element={<Home />} />
            <Route path="users" element={<UserManagager />} />
            <Route path="schools" element={<Schools />} />
            <Route path="challenges" element={<Challenges />} />
            <Route path="mentors" element={<Mentors />} />
            <Route path="events" element={<Events />} />
            <Route path="progress" element={<ProgressTracking />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </SidebarProvider>
    </TooltipProvider>
  </ThemeProvider>
);

export default App;
