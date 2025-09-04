import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import DashboardView from "./views/Dashboard/DashboardView";
import Loans from "./views/LoansProperties/Loans";
import Properties from "./views/LoansProperties/Properties";

import AuctionTeamAllocation from "./views/AllocationTeams/AuctionTeamAllocation";
import StateHeads from "./views/AllocationTeams/StateHeads";
import SalesExecutives from "./views/AllocationTeams/SalesExecutives";
import ValuationCommittee from "./views/ValuationCommittee/ValuationCommittee";
import AuctionSetup from "./views/Auctions/AuctionSetup";
import LiveAuctions from "./views/Auctions/LiveAuctions";
import BidsManagement from "./views/Auctions/BidsManagement";
import PostAuctionPayments from "./views/PostAuctionPayments/PostAuctionPayments";
import SaleRegistration from "./views/SaleRegistration/SaleRegistration";
import PrivateTreatySettlements from "./views/PrivateTreatySettlements/PrivateTreatySettlements";
import ReportsSearch from "./views/ReportsSearch/ReportsSearch";
import Masters from "./views/MastersSettings/Masters";
import UserRoleManagement from "./views/MastersSettings/UserRoleManagement";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Always show login page for testing
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn && location.pathname !== "/login") {
      navigate("/login", { replace: true });
    }
    if (isLoggedIn && location.pathname === "/login") {
      navigate("/dashboard", { replace: true });
    }
  }, [isLoggedIn, location.pathname, navigate]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="flex">
      {isLoggedIn && <Sidebar />}
      <div
        className={`flex-1 p-6 bg-gray-100 min-h-screen ${
          isLoggedIn ? "lg:ml-64" : ""
        }`}
      >
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          {isLoggedIn && (
            <>
              <Route path="/" element={<DashboardView />} />
              <Route path="/dashboard" element={<DashboardView />} />
              <Route path="/loans" element={<Loans />} />
              <Route path="/properties" element={<Properties />} />
              <Route
                path="/auction-team-allocation"
                element={<AuctionTeamAllocation />}
              />
              <Route path="/stateheads" element={<StateHeads />} />
              <Route path="/sales-executives" element={<SalesExecutives />} />
              <Route
                path="/valuation-committee"
                element={<ValuationCommittee />}
              />
              <Route path="/auction-setup" element={<AuctionSetup />} />
              <Route path="/live-auctions" element={<LiveAuctions />} />
              <Route path="/bids-management" element={<BidsManagement />} />
              <Route
                path="/post-auction-payments"
                element={<PostAuctionPayments />}
              />
              <Route path="/sale-registration" element={<SaleRegistration />} />
              <Route
                path="/private-treaty-settlements"
                element={<PrivateTreatySettlements />}
              />
              <Route path="/reports-search" element={<ReportsSearch />} />
              <Route path="/masters" element={<Masters />} />
              <Route
                path="/user-role-management"
                element={<UserRoleManagement />}
              />
            </>
          )}
        </Routes>
      </div>
    </div>
  );
}

export default App;
