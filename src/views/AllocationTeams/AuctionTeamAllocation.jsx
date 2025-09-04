import React, { useState, useMemo } from "react";

const UsersIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);
const HistoryIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M1 4v6h6"></path>
    <path d="M3.51 15a9 9 0 102.13-9.36L1 10"></path>
  </svg>
);
const XIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const HistoryModal = ({ isOpen, onClose, caseHistory }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg transform transition-all">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-900">
            Allocation History: {caseHistory.caseId}
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"
          >
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <ul className="space-y-4">
            {caseHistory.history.map((entry, index) => (
              <li key={index} className="flex space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-semibold text-sm">
                    {entry.user.charAt(0)}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-800">{entry.action}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(entry.timestamp).toLocaleString()}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const BulkAssignModal = ({
  isOpen,
  onClose,
  onAssign,
  teamMembers,
  selectedCount,
}) => {
  const [assignments, setAssignments] = useState({
    teamLeader: "",
    pcm: "",
    ccm: "",
    rcm: "",
  });

  if (!isOpen) return null;

  const handleAssign = () => {
    // Filter out empty strings so we only assign roles that were selected
    const finalAssignments = Object.fromEntries(
      Object.entries(assignments).filter(([_, value]) => value !== "")
    );
    if (Object.keys(finalAssignments).length > 0) {
      onAssign(finalAssignments);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">
            Bulk Assign Team Members
          </h3>
          <p className="text-sm text-gray-500">
            Assign roles to {selectedCount} selected cases.
          </p>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Team Leader
            </label>
            <AssignmentSelect
              members={teamMembers.teamLeaders}
              value={assignments.teamLeader}
              onChange={(e) =>
                setAssignments({ ...assignments, teamLeader: e.target.value })
              }
              includeDefault={true}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              PCM
            </label>
            <AssignmentSelect
              members={teamMembers.pcms}
              value={assignments.pcm}
              onChange={(e) =>
                setAssignments({ ...assignments, pcm: e.target.value })
              }
              includeDefault={true}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              CCM
            </label>
            <AssignmentSelect
              members={teamMembers.ccms}
              value={assignments.ccm}
              onChange={(e) =>
                setAssignments({ ...assignments, ccm: e.target.value })
              }
              includeDefault={true}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              RCM
            </label>
            <AssignmentSelect
              members={teamMembers.rcms}
              value={assignments.rcm}
              onChange={(e) =>
                setAssignments({ ...assignments, rcm: e.target.value })
              }
              includeDefault={true}
            />
          </div>
        </div>
        <div className="px-6 py-3 bg-gray-50 rounded-b-xl flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleAssign}
            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Assign
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main Component ---
export default function AuctionTeamAllocation() {
  const initialCases = [
    {
      id: 1,
      loanNo: "LN-001",
      property: "456 Oak Avenue, Springfield",
      borrower: "Alice Johnson",
      stage: "Pending Allocation",
      assignments: {
        teamLeader: "Not Assigned",
        pcm: "Not Assigned",
        ccm: "Not Assigned",
        rcm: "Not Assigned",
      },
    },
    {
      id: 2,
      loanNo: "LN-002",
      property: "789 Pine Street, Shelbyville",
      borrower: "Bob Williams",
      stage: "Partially Assigned",
      assignments: {
        teamLeader: "David Chen",
        pcm: "Grace Lee",
        ccm: "Not Assigned",
        rcm: "Not Assigned",
      },
    },
    {
      id: 3,
      loanNo: "LN-003",
      property: "101 Maple Drive, Capital City",
      borrower: "Charlie Brown",
      stage: "Fully Assigned",
      assignments: {
        teamLeader: "Frank White",
        pcm: "Heidi Klum",
        ccm: "Ivy Green",
        rcm: "Jack Black",
      },
    },
    {
      id: 4,
      loanNo: "LN-004",
      property: "212 Birch Road, Springfield",
      borrower: "Diana Miller",
      stage: "Pending Allocation",
      assignments: {
        teamLeader: "Not Assigned",
        pcm: "Not Assigned",
        ccm: "Not Assigned",
        rcm: "Not Assigned",
      },
    },
  ];
  const teamMembers = {
    teamLeaders: ["David Chen", "Emily Rogers", "Frank White"],
    pcms: ["Grace Lee", "Heidi Klum", "Michael Brown"],
    ccms: ["Ivy Green", "Olivia Martinez", "Paul Harris"],
    rcms: ["Jack Black", "Quinn Davis", "Rachel Scott"],
  };

  const [cases, setCases] = useState(initialCases);
  const [selectedCases, setSelectedCases] = useState([]);
  const [isBulkModalOpen, setBulkModalOpen] = useState(false);
  const [isHistoryModalOpen, setHistoryModalOpen] = useState(false);
  const [historyData, setHistoryData] = useState(null);

  const handleAssignmentChange = (caseId, role, member) => {
    setCases(
      cases.map((c) =>
        c.id === caseId
          ? { ...c, assignments: { ...c.assignments, [role]: member } }
          : c
      )
    );
  };

  const handleSelectCase = (caseId) => {
    setSelectedCases((prev) =>
      prev.includes(caseId)
        ? prev.filter((id) => id !== caseId)
        : [...prev, caseId]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedCases(cases.map((c) => c.id));
    } else {
      setSelectedCases([]);
    }
  };

  const handleBulkAssign = (newAssignments) => {
    setCases((prevCases) =>
      prevCases.map((c) =>
        selectedCases.includes(c.id)
          ? { ...c, assignments: { ...c.assignments, ...newAssignments } }
          : c
      )
    );
    setSelectedCases([]);
  };

  const handleViewHistory = (caseItem) => {
    // In a real app, this would be fetched from an API
    setHistoryData({
      caseId: caseItem.loanNo,
      history: [
        {
          user: "Admin",
          action: `Assigned Team Leader: ${caseItem.assignments.teamLeader}`,
          timestamp: new Date(Date.now() - 86400000).toISOString(),
        },
        {
          user: "System",
          action: "Case created and entered allocation queue.",
          timestamp: new Date(Date.now() - 172800000).toISOString(),
        },
      ],
    });
    setHistoryModalOpen(true);
  };

  const stageColor = {
    "Pending Allocation": "bg-yellow-100 text-yellow-800",
    "Partially Assigned": "bg-blue-100 text-blue-800",
    "Fully Assigned": "bg-green-100 text-green-800",
  };

  return (
    <>
      <HistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setHistoryModalOpen(false)}
        caseHistory={historyData}
      />
      <BulkAssignModal
        isOpen={isBulkModalOpen}
        onClose={() => setBulkModalOpen(false)}
        onAssign={handleBulkAssign}
        teamMembers={teamMembers}
        selectedCount={selectedCases.length}
      />

      <div className="min-h-screen bg-gray-100 text-gray-800 p-2 sm:p-4 lg:p-8">
        <div className="max-w-screen-xl mx-auto">
          <header className="mb-4 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h1 className="text-xl sm:text-3xl font-bold text-gray-900">
                Auction Team Allocation
              </h1>
              <p className="text-gray-600 mt-1 text-xs sm:text-base">
                Assign cases to team members for auction processing.
              </p>
            </div>
          </header>

          <main className="bg-white rounded-xl shadow-md">
            <div className="p-2 sm:p-4 border-b border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <h2 className="text-base sm:text-lg font-semibold">
                Cases Pending Allocation ({cases.length})
              </h2>
              <button
                onClick={() => setBulkModalOpen(true)}
                disabled={selectedCases.length === 0}
                className="inline-flex items-center px-2 py-1 sm:px-4 sm:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed"
              >
                <UsersIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 -ml-1" />
                Bulk Assign ({selectedCases.length})
              </button>
            </div>
            <div className="overflow-x-auto w-full">
              <table className="min-w-full divide-y divide-gray-200 rounded-xl shadow-md text-[10px] sm:text-xs md:text-sm lg:text-base">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="p-2 sm:p-4">
                      <input
                        type="checkbox"
                        onChange={handleSelectAll}
                        checked={
                          selectedCases.length > 0 &&
                          selectedCases.length === cases.length
                        }
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Case Details
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Stage
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Team Leader
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      PCM
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      CCM
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      RCM
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {cases.map((caseItem) => (
                    <tr
                      key={caseItem.id}
                      className={`transition-colors ${
                        selectedCases.includes(caseItem.id)
                          ? "bg-indigo-50"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <td className="p-4">
                        <input
                          type="checkbox"
                          checked={selectedCases.includes(caseItem.id)}
                          onChange={() => handleSelectCase(caseItem.id)}
                          className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">
                          {caseItem.loanNo}
                        </div>
                        <div className="text-sm text-gray-600">
                          {caseItem.borrower}
                        </div>
                        <div className="text-xs text-gray-500">
                          {caseItem.property}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            stageColor[caseItem.stage]
                          }`}
                        >
                          {caseItem.stage}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <AssignmentSelect
                          members={teamMembers.teamLeaders}
                          value={caseItem.assignments.teamLeader}
                          onChange={(e) =>
                            handleAssignmentChange(
                              caseItem.id,
                              "teamLeader",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <AssignmentSelect
                          members={teamMembers.pcms}
                          value={caseItem.assignments.pcm}
                          onChange={(e) =>
                            handleAssignmentChange(
                              caseItem.id,
                              "pcm",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <AssignmentSelect
                          members={teamMembers.ccms}
                          value={caseItem.assignments.ccm}
                          onChange={(e) =>
                            handleAssignmentChange(
                              caseItem.id,
                              "ccm",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <AssignmentSelect
                          members={teamMembers.rcms}
                          value={caseItem.assignments.rcm}
                          onChange={(e) =>
                            handleAssignmentChange(
                              caseItem.id,
                              "rcm",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <button
                          onClick={() => handleViewHistory(caseItem)}
                          title="View History"
                          className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-100 rounded-full transition-colors"
                        >
                          <HistoryIcon className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

// Helper component for dropdowns
const AssignmentSelect = ({
  members,
  value,
  onChange,
  includeDefault = false,
}) => (
  <select
    value={value}
    onChange={onChange}
    className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm ${
      value === "Not Assigned" ? "text-gray-500" : ""
    }`}
  >
    <option>{includeDefault ? "Keep Unchanged" : "Not Assigned"}</option>
    {members.map((member) => (
      <option key={member} value={member}>
        {member}
      </option>
    ))}
  </select>
);
