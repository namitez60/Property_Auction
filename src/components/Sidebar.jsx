import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
const SidebarGroup = ({ label, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        className="w-full text-left px-2 py-2 rounded hover:bg-gray-800 flex items-center justify-between"
        onClick={() => setOpen((o) => !o)}
      >
        <span>{label}</span>
        <span>{open ? "▲" : "▼"}</span>
      </button>
      {open && <div className="ml-4 mt-2 flex flex-col gap-2">{children}</div>}
    </div>
  );
};

const Sidebar = ({ onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerTimeout = useRef(null);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const autoCloseDrawer = (target) => {
    setDrawerOpen(false);
    if (drawerTimeout.current) clearTimeout(drawerTimeout.current);
    drawerTimeout.current = setTimeout(() => setDrawerOpen(false), 400);
  };

  const sidebarContent = (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold flex items-center gap-2">
          🏠ProAuctions
        </h1>
        <button
          onClick={() => {
            localStorage.removeItem("isLoggedIn");
            if (onLogout) onLogout();
            navigate("/login", { replace: true });
          }}
          title="Logout"
          className="text-red-500 hover:text-red-700 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          {/* Logout Icon (SVG) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M18 15l3-3m0 0l-3-3m3 3H9"
            />
          </svg>
        </button>
      </div>
      <nav className="flex flex-col gap-4">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `px-2 py-1 rounded hover:bg-gray-700 transition-all ${
              isActive ? "bg-gray-800 shadow-lg text-blue-400" : ""
            }`
          }
          onClick={() => autoCloseDrawer("/dashboard")}
        >
          Dashboard
        </NavLink>
        <SidebarGroup label="Loans & Properties">
          <NavLink
            to="/loans"
            className={({ isActive }) =>
              `px-2 py-1 rounded hover:bg-gray-700 transition-all ${
                isActive ? "bg-gray-800 shadow-lg text-blue-400" : ""
              }`
            }
            onClick={() => autoCloseDrawer("/loans")}
          >
            Loans
          </NavLink>
          <NavLink
            to="/properties"
            className={({ isActive }) =>
              `px-2 py-1 rounded hover:bg-gray-700 transition-all ${
                isActive ? "bg-gray-800 shadow-lg text-blue-400" : ""
              }`
            }
            onClick={() => autoCloseDrawer("/properties")}
          >
            Properties
          </NavLink>
          {/* <Link
            to="/documents"
            className="px-2 py-1 rounded hover:bg-gray-700"
            onClick={() => autoCloseDrawer("/documents")}
          >
            Documents
          </Link> */}
        </SidebarGroup>
        <SidebarGroup label="Allocation & Teams">
          <NavLink
            to="/auction-team-allocation"
            className={({ isActive }) =>
              `px-2 py-1 rounded hover:bg-gray-700 transition-all ${
                isActive ? "bg-gray-800 shadow-lg text-blue-400" : ""
              }`
            }
            onClick={() => autoCloseDrawer("/auction-team-allocation")}
          >
            Auction Team Allocation
          </NavLink>
          <NavLink
            to="/stateheads"
            className={({ isActive }) =>
              `px-2 py-1 rounded hover:bg-gray-700 transition-all ${
                isActive ? "bg-gray-800 shadow-lg text-blue-400" : ""
              }`
            }
            onClick={() => autoCloseDrawer("/stateheads")}
          >
            StateHeads
          </NavLink>
          <NavLink
            to="/sales-executives"
            className={({ isActive }) =>
              `px-2 py-1 rounded hover:bg-gray-700 transition-all ${
                isActive ? "bg-gray-800 shadow-lg text-blue-400" : ""
              }`
            }
            onClick={() => autoCloseDrawer("/sales-executives")}
          >
            Sales Executives
          </NavLink>
        </SidebarGroup>
        <NavLink
          to="/valuation-committee"
          className={({ isActive }) =>
            `px-2 py-1 rounded hover:bg-gray-700 transition-all ${
              isActive ? "bg-gray-800 shadow-lg text-blue-400" : ""
            }`
          }
          onClick={() => autoCloseDrawer("/valuation-committee")}
        >
          Valuation & Committee
        </NavLink>
        <SidebarGroup label="Auctions">
          <NavLink
            to="/auction-setup"
            className={({ isActive }) =>
              `px-2 py-1 rounded hover:bg-gray-700 transition-all ${
                isActive ? "bg-gray-800 shadow-lg text-blue-400" : ""
              }`
            }
            onClick={() => autoCloseDrawer("/auction-setup")}
          >
            Setup
          </NavLink>
          <NavLink
            to="/live-auctions"
            className={({ isActive }) =>
              `px-2 py-1 rounded hover:bg-gray-700 transition-all ${
                isActive ? "bg-gray-800 shadow-lg text-blue-400" : ""
              }`
            }
            onClick={() => autoCloseDrawer("/live-auctions")}
          >
            Live Auctions
          </NavLink>
          <NavLink
            to="/bids-management"
            className={({ isActive }) =>
              `px-2 py-1 rounded hover:bg-gray-700 transition-all ${
                isActive ? "bg-gray-800 shadow-lg text-blue-400" : ""
              }`
            }
            onClick={() => autoCloseDrawer("/bids-management")}
          >
            Bids Management
          </NavLink>
        </SidebarGroup>
        <NavLink
          to="/post-auction-payments"
          className={({ isActive }) =>
            `px-2 py-1 rounded hover:bg-gray-700 transition-all ${
              isActive ? "bg-gray-800 shadow-lg text-blue-400" : ""
            }`
          }
          onClick={() => autoCloseDrawer("/post-auction-payments")}
        >
          Post-Auction & Payments
        </NavLink>
        <NavLink
          to="/sale-registration"
          className={({ isActive }) =>
            `px-2 py-1 rounded hover:bg-gray-700 transition-all ${
              isActive ? "bg-gray-800 shadow-lg text-blue-400" : ""
            }`
          }
          onClick={() => autoCloseDrawer("/sale-registration")}
        >
          Sale & Registration
        </NavLink>
        <NavLink
          to="/private-treaty-settlements"
          className={({ isActive }) =>
            `px-2 py-1 rounded hover:bg-gray-700 transition-all ${
              isActive ? "bg-gray-800 shadow-lg text-blue-400" : ""
            }`
          }
          onClick={() => autoCloseDrawer("/private-treaty-settlements")}
        >
          Private Treaty & Settlements
        </NavLink>
        <NavLink
          to="/reports-search"
          className={({ isActive }) =>
            `px-2 py-1 rounded hover:bg-gray-700 transition-all ${
              isActive ? "bg-gray-800 shadow-lg text-blue-400" : ""
            }`
          }
          onClick={() => autoCloseDrawer("/reports-search")}
        >
          Reports & Search
        </NavLink>
        <SidebarGroup label="Masters & Settings">
          <NavLink
            to="/masters"
            className={({ isActive }) =>
              `px-2 py-1 rounded hover:bg-gray-700 transition-all ${
                isActive ? "bg-gray-800 shadow-lg text-blue-400" : ""
              }`
            }
            onClick={() => autoCloseDrawer("/masters")}
          >
            Masters
          </NavLink>
          <NavLink
            to="/user-role-management"
            className={({ isActive }) =>
              `px-2 py-1 rounded hover:bg-gray-700 transition-all ${
                isActive ? "bg-gray-800 shadow-lg text-blue-400" : ""
              }`
            }
            onClick={() => autoCloseDrawer("/user-role-management")}
          >
            User & Role Management
          </NavLink>
        </SidebarGroup>
      </nav>
    </>
  );
  // ...existing code...

  // Keep Users dropdown open if on /user-setup or /user-bids
  const isUserSubpage =
    location.pathname === "/user-setup" || location.pathname === "/user-bids";
  if (isUserSubpage && !usersOpen) setUsersOpen(true);

  return (
    <>
      {/* Hamburger button for mobile */}
      <button
        className="fixed top-4 left-4 z-50 lg:hidden bg-gray-900 text-white p-2 rounded-md shadow-lg"
        onClick={() => setDrawerOpen(true)}
        aria-label="Open sidebar"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Sidebar Drawer for mobile */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-40 transition-opacity lg:hidden ${
          drawerOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setDrawerOpen(false)}
      />
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white flex flex-col p-4 z-50 transform transition-transform duration-300 lg:hidden ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ minWidth: "16rem" }}
      >
        {/* Close button for mobile drawer */}
        <button
          className="lg:hidden absolute top-4 right-4 text-white bg-gray-800 rounded-full p-2"
          onClick={() => setDrawerOpen(false)}
          aria-label="Close sidebar"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {sidebarContent}
      </aside>

      {/* Desktop Sidebar (This now shows correctly by itself on desktop) */}
      <aside className="hidden lg:flex w-64 min-h-screen h-screen bg-gray-900 text-white flex-col p-4 overflow-y-auto fixed top-0 left-0">
        {sidebarContent}
      </aside>
    </>
  );
};

export default Sidebar;
