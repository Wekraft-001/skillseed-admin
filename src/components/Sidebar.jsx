import React, { useState, useEffect } from "react";
import {
  Home,
  Users,
  ChevronDown,
  ChevronUp,
  School,
  Trophy,
  UserCheck,
  Calendar,
  TrendingUp,
  Bell,
  Settings,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";
import { ScrollArea } from "./ui/scroll-area";
import { useSidebar } from "../context/SidebarContext";

const Sidebar = () => {
  const { isOpen } = useSidebar();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeToggle, setActiveToggle] = useState("add-ons"); // Default to Add-Ons selected
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [submenuPosition, setSubmenuPosition] = useState({ top: 0, left: 0 });
  const location = useLocation();

  // Close submenu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      const target = event.target;
      if (
        !target.closest(".sidebar-submenu") &&
        !target.closest(".sidebar-icon")
      ) {
        setShowSubmenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Check if the current path is within a dropdown section
  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath.startsWith("/support")) {
      setActiveDropdown("/support");
    } else if (currentPath.startsWith("/more")) {
      setActiveDropdown("/more");
    } else if (currentPath.startsWith("/tools")) {
      setActiveDropdown("/tools");
    }
  }, [location]);

  const toggleDropdown = (e, path) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation(); // Prevent event bubbling
    setActiveDropdown(activeDropdown === path ? null : path);
  };

  const isDropdownActive = (path) => activeDropdown === path;

  const toggleSubmenu = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();

    setSubmenuPosition({
      top: rect.top,
      left: rect.right + 10, // Position to the right of the icon
    });

    if (showSubmenu && activeDropdown === path) {
      setShowSubmenu(false);
      setActiveDropdown(null);
    } else {
      setShowSubmenu(true);
      setActiveDropdown(path);
    }
  };

  const navItems = [
    { icon: <Home className="w-5 h-5 mr-2" />, label: "Home", path: "/home" },
    {
      icon: <Users className="w-5 h-5 mr-2" />,
      label: "Users",
      path: "/users",
    },
    {
      icon: <School className="w-5 h-5 mr-2" />,
      label: "Schools",
      path: "/schools",
    },
    {
      icon: <Trophy className="w-5 h-5 mr-2" />,
      label: "Challenges",
      path: "/challenges",
    },
    {
      icon: <UserCheck className="w-5 h-5 mr-2" />,
      label: "Mentors",
      path: "/mentors",
    },
    {
      icon: <Calendar className="w-5 h-5 mr-2" />,
      label: "Events",
      path: "/events",
    },
    {
      icon: <TrendingUp className="w-5 h-5 mr-2" />,
      label: "Progress Tracking",
      path: "/progress",
    },
    {
      icon: <Bell className="w-5 h-5 mr-2" />,
      label: "Notifications",
      path: "/notifications",
    },
    {
      icon: <Settings className="w-5 h-5 mr-2" />,
      label: "Settings",
      path: "/settings",
    },
  ];
  const renderSubMenu = (path) => {
    if (path === "/tools" && isDropdownActive("/tools") && item.subItems) {
      return (
        <div className="pl-10 space-y-4 py-3">
          {item.subItems.map(() => (
            <NavLink
              key={idx}
              to={subItem.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center py-1 text-base font-medium",
                  isActive
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                )
              }
            >
              {subItem.icon}
              <span>{subItem.label}</span>
            </NavLink>
          ))}
        </div>
      );
    }
    return null;
  };

  // Define the renderSubmenuPopup function
  const renderSubmenuPopup = () => {
    if (showSubmenu && activeDropdown === "/tools") {
      const toolsItem = navItems.find((item) => item.path === "/tools");
      if (toolsItem && toolsItem.subItems) {
        return (
          <div
            className="sidebar-submenu fixed bg-white rounded-md shadow-lg border border-gray-200 p-3 z-50"
            style={{
              top: `${submenuPosition.top}px`,
              left: `${submenuPosition.left}px`,
            }}
          >
            <div className="font-medium text-gray-800 mb-2">Tools</div>
            <div className="space-y-2">
              {toolsItem.subItems.map((item, idx) => (
                <NavLink
                  key={idx}
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center py-1 text-sm font-medium",
                      isActive
                        ? "text-blue-600"
                        : "text-gray-700 hover:text-blue-600"
                    )
                  }
                >
                  {item.icon}
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>
          </div>
        );
      }
    }
    return null;
  };

  // Desktop sidebar - full width
  const desktopSidebarClasses = cn(
    "w-[259px] bg-[#092043] border-r border-gray-200 h-[calc(100vh-4rem)] fixed top-16 left-0 z-40 hidden md:block transition-transform duration-300",
    !isOpen && "transform -translate-x-full"
  );

  // Mobile sidebar with only icons
  const mobileSidebarClasses = cn(
    "w-[60px] bg-gray-100 border-r border-gray-200 h-screen fixed top-0 left-0 z-40 flex flex-col items-center py-6 md:hidden transition-transform duration-300",
    !isOpen && "transform -translate-x-full"
  );

  return (
    <>
      {/* Desktop sidebar - full width */}
      <div className={desktopSidebarClasses}>
        <ScrollArea className="flex-1 h-[calc(100vh-16rem)]">
          <div className="p-4 space-y-1">
            {navItems.map((item, index) => (
              <div
                key={index}
                className={cn(
                  "relative w-full",
                  isDropdownActive(item.path) && "mb-0"
                )}
              >
                {item.hasDropdown ? (
                  <div
                    className={cn(
                      "flex items-center px-3 py-3 text-base font-medium cursor-pointer w-full text-white hover:bg-[#14305a] transition-colors duration-150",
                      isDropdownActive(item.path)
                        ? "bg-[#14305a] text-white"
                        : "text-white hover:bg-[#14305a]"
                    )}
                    onClick={(e) => toggleDropdown(item.path, e)}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                    <div className="ml-auto">
                      {isDropdownActive(item.path) ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </div>
                ) : (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center px-3 py-3 text-base font-medium w-full text-white hover:bg-[#14305a] transition-colors duration-150",
                        isActive
                          ? "bg-[#14305a] text-white"
                          : "text-white hover:bg-[#14305a]"
                      )
                    }
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </NavLink>
                )}
                {isDropdownActive(item.path) && (
                  <div
                    className="absolute left-0 w-1 top-0 h-full bg-blue-500"
                    aria-hidden="true"
                  ></div>
                )}
                {renderSubMenu(item.path, item)}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Mobile sidebar with only icons */}
      <div className={mobileSidebarClasses}>
        {navItems.map((item, index) => (
          <div key={index} className="mb-6">
            <button
              className={cn(
                "sidebar-icon flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm",
                isDropdownActive(item.path) && "text-blue-600"
              )}
              onClick={(e) =>
                item.hasDropdown ? toggleSubmenu(e, item.path) : null
              }
            >
              {React.cloneElement(item.icon, { className: "w-5 h-5" })}
            </button>
          </div>
        ))}
      </div>

      {/* Popup menu */}
      {renderSubmenuPopup()}
    </>
  );
};

export default Sidebar;
