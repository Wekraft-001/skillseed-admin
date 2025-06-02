import { Routes, Route } from "react-router-dom";
import { TooltipProvider } from "./components/ui/tooltip";
import { ThemeProvider } from "./theme/ThemeProvider";
import { SidebarProvider } from "./context/SidebarContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";

// import Index from "./pages/Index";
// import Analytics from "./pages/Analytics";
// import NotFound from "./pages/NotFound";
// import UserManagement from "./pages/UserManagement";
// import Schools from "./pages/Schools";
// import ChallengesPage from "./pages/Challenges";
// import Mentors from "./pages/Mentors";
// import Events from "./pages/Events";
// import ProgressTracking from "./pages/ProgressTracking";
// import Notifications from "./pages/Notifications";
// import Settings from "./pages/Settings";

const App = () => (
  <>
    <TooltipProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <SidebarProvider>
          <Layout>
            <Routes>
              <Route path="/home" element={<Home />} />
              {/* <Route path="users" element={<UserManagement />} />
                <Route path="schools" element={<Schools />} />
                <Route path="challenges" element={<ChallengesPage />} />
                <Route path="mentors" element={<Mentors />} />
                <Route path="events" element={<Events />} />
                <Route path="progress" element={<ProgressTracking />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="settings" element={<Settings />} />

                <Route path="analytics" element={<Analytics />} />
                Tools section with nested routes
                <Route path="tools" element={<ToolsIndex />} />
                <Route path="*" element={<NotFound />} /> */}
            </Routes>
          </Layout>
        </SidebarProvider>
      </ThemeProvider>
    </TooltipProvider>
  </>
);

export default App;
