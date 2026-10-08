import { useState } from "react";
import {
  Home,
  FileText,
  Users,
  ShoppingCart,
  Search,
  ChevronDown,
  Puzzle,
  Monitor,
  User,
  Tag,
  MenuIcon,
  BookOpen,
  CircleUserRound,
  ChevronRight,
} from "lucide-react";
import { MdOutlineExplore } from "react-icons/md";
import { LuLayoutDashboard } from "react-icons/lu";
import { RiAdminFill, RiAdminLine } from "react-icons/ri";
import { MdContentPaste } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { IoTicketOutline } from "react-icons/io5";

const LeftsideNavbar = ({ user }) => {
  const location = useLocation();

  const [openSection, setOpenSection] = useState("dashboard");
  const [pagesOpen, setPagesOpen] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSection = (section) => {
    if (openSection === section) setOpenSection(null);
    else setOpenSection(section);
  };

  const handlePages = (option) => {
    if (pagesOpen === option) setPagesOpen(null);
    else setPagesOpen(option);
  };

  // Check if current path matches the link path for active styling
  const isActive = (path) => location.pathname === path;

  // Enhanced function for partial matching for sections with nested routes
  const isActiveStartsWith = (path) => location.pathname.startsWith(path);

  return (
    <>
      {/* Desktop Sidebar */}
      <nav className="bg-white shadow-lg w-80 min-h-full flex-col sidebar-responsive px-2 hidden md:flex">
        <div className="flex items-center px-5 py-2 font-semibold text-lg">
          <MenuIcon className="w-5 h-5 mr-2" />
          <span>Navigation</span>
        </div>

        {/* Dashboard */}
        <div
          className={`gap-1 flex items-center justify-start px-5 rounded-lg transition cursor-pointer hover:bg-blue-200
           ${
             isActive("/dashboard")
               ? "bg-blue-400 text-black font-semibold"
               : "text-gray-700"
           }`}
          onClick={() => handleSection("dashboard")}
        >
          <LuLayoutDashboard className="w-5 h-5" />
          <button className="text-left px-5 py-2">
            <Link to={"/dashboard"}>Dashboard</Link>
          </button>
        </div>

        {/* Pages */}
        <div
          className={`gap-1 flex items-center justify-start px-5 rounded-lg transition cursor-pointer hover:bg-blue-200
           ${
             openSection === "pages" || isActiveStartsWith("/home") || isActiveStartsWith("/explore")
               ? "bg-blue-400 font-semibold text-black"
               : "text-gray-700"
           }`}
          onClick={() => handleSection("pages")}
        >
          <BookOpen className="w-5 h-5" />
          <button className="text-left px-5 py-2">Pages</button>
        </div>

        {/* Pages Submenu */}
        {openSection === "pages" && (
          <div className="flex flex-col border-gray-200">
            {/* Home submenu */}
            <div
              className={`gap-2 flex items-center justify-start px-6 rounded-lg mt-1 cursor-pointer ${
                pagesOpen === "home" || isActiveStartsWith("/home")
                  ? "bg-blue-300 font-semibold text-black"
                  : ""
              }`}
              onClick={() => handlePages("home")}
            >
              <ChevronRight className="w-5 h-5" />
              <button className="text-left py-2">Home</button>
            </div>
            {pagesOpen === "home" && (
              <div className="flex flex-col border-gray-100">
                <div
                  className={`flex items-center justify-start py-1 px-8 cursor-pointer ${
                    isActive("/home/journey") ? "bg-blue-200 text-black" : ""
                  }`}
                >
                  <ChevronRight className="w-5 h-5" />
                  <button className="text-left px-4 py-2">
                    <Link to={"/home/journey"}>Journey</Link>
                  </button>
                </div>
                <div
                  className={`flex items-center justify-start py-1 px-8 cursor-pointer ${
                    isActive("/home/jackpot") ? "bg-blue-200 text-black" : ""
                  }`}
                >
                  <ChevronRight className="w-5 h-5" />
                  <button className="text-left px-4 py-2">
                    <Link to={"/home/jackpot"}>Jackpot</Link>
                  </button>
                </div>
                <div
                  className={`flex items-center justify-start py-1 px-8 cursor-pointer ${
                    isActive("/home/spinluck") ? "bg-blue-200 text-black" : ""
                  }`}
                >
                  <ChevronRight className="w-5 h-5" />
                  <button className="text-left px-4 py-2">
                    <Link to={"/home/spinluck"}>SpinLuck offers</Link>
                  </button>
                </div>
              </div>
            )}

            {/* Explore submenu */}
            <div
              className={`gap-2 flex items-center justify-start px-6 rounded-lg cursor-pointer ${
                pagesOpen === "explore" || isActiveStartsWith("/explore")
                  ? "bg-blue-300 font-semibold text-black"
                  : ""
              }`}
              onClick={() => handlePages("explore")}
            >
              <ChevronRight className="w-5 h-5" />
              <button className="text-left py-2">Explore</button>
            </div>
            {pagesOpen === "explore" && (
              <div className="flex flex-col border-gray-100">
                <div
                  className={`flex items-center justify-start py-1 px-8 cursor-pointer ${
                    isActive("/explore/dreamtrip") ? "bg-blue-200 text-black" : ""
                  }`}
                >
                  <ChevronRight className="w-5 h-5" />
                  <button className="text-left px-4 py-2">
                    <Link to={"/explore/dreamtrip"}>DreamTrip Slide</Link>
                  </button>
                </div>
                <div
                  className={`flex items-center justify-start py-1 px-8 cursor-pointer ${
                    isActive("/explore/tripinfo") ? "bg-blue-200 text-black" : ""
                  }`}
                >
                  <ChevronRight className="w-5 h-5" />
                  <button className="text-left px-4 py-2">
                    <Link to={"/explore/tripinfo"}>TripInfo Slide</Link>
                  </button>
                </div>
                <div
                  className={`flex items-center justify-start py-1 px-8 cursor-pointer ${
                    isActive("/explore/goldenwinner") ? "bg-blue-200 text-black" : ""
                  }`}
                >
                  <ChevronRight className="w-5 h-5" />
                  <button className="text-left px-4 py-2">
                    <Link to={"/explore/goldenwinner"}>Golden winner</Link>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Users Section */}
        <div
          className={`gap-1 flex items-center justify-start px-5 rounded-lg transition cursor-pointer hover:bg-blue-200 ${
            openSection === "users" || isActiveStartsWith("/users")
              ? "bg-blue-400 font-semibold text-black"
              : "text-gray-700"
          }`}
          onClick={() => handleSection("users")}
        >
          <User className="w-5 h-5" />
          <button className="text-left px-5 py-2">Users</button>
        </div>

        {openSection === "users" && (
          <div className="flex flex-col pl-8 gap-1">
            {user && ["superadmin"].includes(user.role.toLowerCase()) && (
              <div
                className={`flex justify-start items-center cursor-pointer hover:bg-blue-200 rounded-lg ${
                  isActive("/users/superadmin") ? "bg-blue-200 text-black font-semibold" : ""
                }`}
              >
                <RiAdminFill className="w-5 h-5" />
                <button className="text-left px-4 py-2">
                  <Link to={"/users/superadmin"}>super Admin</Link>
                </button>
              </div>
            )}
            {user && ["admin", "superadmin"].includes(user.role.toLowerCase()) && (
              <div
                className={`flex justify-start items-center cursor-pointer hover:bg-blue-200 rounded-lg ${
                  isActive("/users/admin") ? "bg-blue-200 text-black font-semibold" : ""
                }`}
              >
                <RiAdminLine className="w-5 h-5" />
                <button className="text-left px-4 py-2">
                  <Link to={"/users/admin"}>Admin</Link>
                </button>
              </div>
            )}
            {user &&
              ["content-creator", "admin", "superadmin"].includes(user.role.toLowerCase()) && (
                <div
                  className={`flex justify-start items-center cursor-pointer hover:bg-blue-200 rounded-lg ${
                    isActive("/users/content-creator") ? "bg-blue-200 text-black font-semibold" : ""
                  }`}
                >
                  <MdContentPaste className="w-5 h-5" />
                  <button className="text-left px-4 py-2">
                    <Link to={"/users/content-creator"}>Content-Creater</Link>
                  </button>
                </div>
              )}
          </div>
        )}

        {/* Client Section */}
        {user && ["admin", "superadmin"].includes(user.role.toLowerCase()) && (
          <div
            className={`gap-1 flex items-center justify-start px-5 rounded-lg transition cursor-pointer hover:bg-blue-200 ${
              openSection === "client" || isActiveStartsWith("/dashboard/client")
                ? "bg-blue-400 font-semibold text-black"
                : "text-gray-700"
            }`}
            onClick={() => handleSection("client")}
          >
            <Users className="w-5 h-5" />
            <button className="text-left px-5 py-2">
              <Link to={"/dashboard/client"}>Client</Link>
            </button>
          </div>
        )}

        {/* Tickets Section */}
        <div
          className={`gap-1 flex items-center justify-start px-5 rounded-lg transition cursor-pointer hover:bg-blue-200 ${
            openSection === "tickets" || isActiveStartsWith("/dashboard/tickets")
              ? "bg-blue-400 font-semibold text-black"
              : "text-gray-700"
          }`}
          onClick={() => handleSection("tickets")}
        >
          <IoTicketOutline className="w-5 h-5" />
          <button className="text-left px-5 py-2">
            <Link to={"/dashboard/tickets"}>Tickets</Link>
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar Button */}
      <button
        className="md:hidden fixed top-11 left-0 z-20 p-1 bg-white"
        aria-label="Open sidebar"
        onClick={() => setSidebarOpen((prev) => !prev)}
      >
        <MenuIcon className="w-6 h-6" />
      </button>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="absolute top-11 left-0 bg-white flex flex-col gap-4 p-4 md:hidden z-10 h-auto w-auto shadow-lg rounded-md">
          {/* Mobile Dashboard */}
          <div
            className={`gap-1 flex items-center justify-start px-5 rounded-lg transition cursor-pointer hover:bg-blue-200 ${
              isActive("/dashboard") ? "bg-blue-200 text-black font-semibold" : "text-gray-700"
            }`}
            onClick={() => {
              handleSection("dashboard");
              setSidebarOpen(false);
            }}
          >
            <LuLayoutDashboard className="w-5 h-5" />
            <button className="text-left px-5 py-2">
              <Link to={"/dashboard"}>Dashboard</Link>
            </button>
          </div>

          {/* Mobile Pages */}
          <div
            className={`gap-1 flex items-center justify-start px-5 rounded-lg transition cursor-pointer hover:bg-blue-200 ${
              openSection === "pages" || isActiveStartsWith("/home") || isActiveStartsWith("/explore")
                ? "bg-blue-400 font-semibold text-black"
                : "text-gray-700"
            }`}
            onClick={() => handleSection("pages")}
          >
            <BookOpen className="w-5 h-5" />
            <button className="text-left px-5 py-2">Pages</button>
          </div>

          {openSection === "pages" && (
            <div className="flex flex-col border-gray-200">
              {/* Home Submenu */}
              <div
                className={`gap-2 flex items-center justify-start px-6 rounded-lg mt-1 cursor-pointer ${
                  pagesOpen === "home" || isActiveStartsWith("/home")
                    ? "bg-blue-200 font-semibold text-black"
                    : ""
                }`}
                onClick={() => handlePages("home")}
              >
                <ChevronRight className="w-5 h-5" />
                <button className="text-left py-2">Home</button>
              </div>
              {pagesOpen === "home" && (
                <div className="flex flex-col border-gray-100">
                  <div
                    className={`flex items-center justify-start py-1 px-8 cursor-pointer ${
                      isActive("/home/journey") ? "bg-blue-200 text-black" : ""
                    }`}
                  >
                    <ChevronRight className="w-5 h-5" />
                    <button className="text-left px-4 py-2">
                      <Link to={"/home/journey"}>Journey</Link>
                    </button>
                  </div>
                  <div
                    className={`flex items-center justify-start py-1 px-8 cursor-pointer ${
                      isActive("/home/jackpot") ? "bg-blue-200 text-black" : ""
                    }`}
                  >
                    <ChevronRight className="w-5 h-5" />
                    <button className="text-left px-4 py-2">
                      <Link to={"/home/jackpot"}>Jackpot</Link>
                    </button>
                  </div>
                  <div
                    className={`flex items-center justify-start py-1 px-8 cursor-pointer ${
                      isActive("/home/spinluck") ? "bg-blue-200 text-black" : ""
                    }`}
                  >
                    <ChevronRight className="w-5 h-5" />
                    <button className="text-left px-4 py-2">
                      <Link to={"/home/spinluck"}>SpinLuck offers</Link>
                    </button>
                  </div>
                </div>
              )}

              {/* Explore Submenu */}
              <div
                className={`gap-2 flex items-center justify-start px-6 rounded-lg cursor-pointer ${
                  pagesOpen === "explore" || isActiveStartsWith("/explore")
                    ? "bg-blue-200 font-semibold text-black"
                    : ""
                }`}
                onClick={() => handlePages("explore")}
              >
                <ChevronRight className="w-5 h-5" />
                <button className="text-left py-2">Explore</button>
              </div>
              {pagesOpen === "explore" && (
                <div className="flex flex-col border-gray-100">
                  <div
                    className={`flex items-center justify-start py-1 px-8 cursor-pointer ${
                      isActive("/explore/dreamtrip") ? "bg-blue-200 text-black" : ""
                    }`}
                  >
                    <ChevronRight className="w-5 h-5" />
                    <button className="text-left px-4 py-2">
                      <Link to={"/explore/dreamtrip"}>DreamTrip Slide</Link>
                    </button>
                  </div>
                  <div
                    className={`flex items-center justify-start py-1 px-8 cursor-pointer ${
                      isActive("/explore/tripinfo") ? "bg-blue-200 text-black" : ""
                    }`}
                  >
                    <ChevronRight className="w-5 h-5" />
                    <button className="text-left px-4 py-2">
                      <Link to={"/explore/tripinfo"}>TripInfo Slide</Link>
                    </button>
                  </div>
                  <div
                    className={`flex items-center justify-start py-1 px-8 cursor-pointer ${
                      isActive("/explore/goldenwinner") ? "bg-blue-200 text-black" : ""
                    }`}
                  >
                    <ChevronRight className="w-5 h-5" />
                    <button className="text-left px-4 py-2">
                      <Link to={"/explore/goldenwinner"}>Golden winner</Link>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Mobile Users Section */}
          <div
            className={`gap-1 flex items-center justify-start px-5 rounded-lg transition cursor-pointer hover:bg-blue-200 ${
              openSection === "users" || isActiveStartsWith("/users")
                ? "bg-blue-400 font-semibold text-black"
                : "text-gray-700"
            }`}
            onClick={() => {
              handleSection("users");
              setSidebarOpen(false);
            }}
          >
            <User className="w-5 h-5" />
            <button className="text-left px-5 py-2">Users</button>
          </div>

          {/* Mobile Users Submenu */}
          {openSection === "users" && (
            <div className="flex flex-col pl-8 gap-1">
              {user && ["superadmin"].includes(user.role.toLowerCase()) && (
                <div
                  className={`flex justify-start items-center cursor-pointer hover:bg-blue-200 rounded-lg ${
                    isActive("/users/superadmin") ? "bg-blue-200 text-black font-semibold" : ""
                  }`}
                >
                  <RiAdminFill className="w-5 h-5" />
                  <button className="text-left px-4 py-2">
                    <Link to={"/users/superadmin"}>super Admin</Link>
                  </button>
                </div>
              )}
              {user && ["admin", "superadmin"].includes(user.role.toLowerCase()) && (
                <div
                  className={`flex justify-start items-center cursor-pointer hover:bg-blue-200 rounded-lg ${
                    isActive("/users/admin") ? "bg-blue-200 text-black font-semibold" : ""
                  }`}
                >
                  <RiAdminLine className="w-5 h-5" />
                  <button className="text-left px-4 py-2">
                    <Link to={"/users/admin"}>Admin</Link>
                  </button>
                </div>
              )}
              {user &&
                ["content-creator", "admin", "superadmin"].includes(user.role.toLowerCase()) && (
                  <div
                    className={`flex justify-start items-center cursor-pointer hover:bg-blue-200 rounded-lg ${
                      isActive("/users/content-creator") ? "bg-blue-200 text-black font-semibold" : ""
                    }`}
                  >
                    <MdContentPaste className="w-5 h-5" />
                    <button className="text-left px-4 py-2">
                      <Link to={"/users/content-creator"}>Content-Creater</Link>
                    </button>
                  </div>
                )}
            </div>
          )}

          {/* Mobile Client Section */}
          {user && ["admin", "superadmin"].includes(user.role.toLowerCase()) && (
            <div
              className={`gap-1 flex items-center justify-start px-5 rounded-lg transition cursor-pointer hover:bg-blue-200 ${
                openSection === "client" || isActiveStartsWith("/dashboard/client")
                  ? "bg-blue-400 font-semibold text-black"
                  : "text-gray-700"
              }`}
              onClick={() => {
                handleSection("client");
                setSidebarOpen(false);
              }}
            >
              <Users className="w-5 h-5" />
              <button className="text-left px-5 py-2">
                <Link to={"/dashboard/client"}>Client</Link>
              </button>
            </div>
          )}

          {/* Mobile Tickets Section */}
          <div
            className={`gap-1 flex items-center justify-start px-5 rounded-lg transition cursor-pointer hover:bg-blue-200 ${
              openSection === "tickets" || isActiveStartsWith("/dashboard/tickets")
                ? "bg-blue-400 font-semibold text-black"
                : "text-gray-700"
            }`}
            onClick={() => {
              handleSection("tickets");
              setSidebarOpen(false);
            }}
          >
            <IoTicketOutline className="w-5 h-5" />
            <button className="text-left px-5 py-2">
              <Link to={"/dashboard/tickets"}>Tickets</Link>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default LeftsideNavbar;
