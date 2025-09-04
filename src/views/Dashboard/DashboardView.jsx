import React from "react";


const Card = ({ children, className = "" }) => (
  <div className={`bg-white shadow-lg rounded-xl p-6 ${className}`}>
    {children}
  </div>
);



const BuildingIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="9" y1="21" x2="9" y2="9" />
  </svg>
);

const CalendarIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const PercentIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="19" y1="5" x2="5" y2="19"/>
        <circle cx="6.5" cy="6.5" r="2.5"/>
        <circle cx="17.5" cy="17.5" r="2.5"/>
    </svg>
);

const GavelIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m14 12-8.5 8.5a2.12 2.12 0 1 1-3-3L11 9" />
    <path d="m15 13 6 6" />
    <path d="m22 2-3 3" />
    <path d="m2 22 3-3" />
    <path d="m13 15 3.5-3.5" />
    <path d="m17 11 4.5-4.5" />
  </svg>
);




const AuctionTrendsLineChart = () => {
  const data = [
    { month: "Jan", value: 65 }, { month: "Feb", value: 59 },
    { month: "Mar", value: 80 }, { month: "Apr", value: 81 },
    { month: "May", value: 56 }, { month: "Jun", value: 55 },
    { month: "Jul", value: 40 },
  ];
  const points = data.map((p, i) => `${i * 50},${100 - p.value}`).join(' ');

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Auction Trends</h3>
      <div className="w-full h-64">
        <svg viewBox="0 0 300 100" className="w-full h-full" preserveAspectRatio="none">
         
          <line x1="0" y1="100" x2="300" y2="100" stroke="#e5e7eb" strokeWidth="1" />
          <line x1="0" y1="0" x2="0" y2="100" stroke="#e5e7eb" strokeWidth="1" />
          
          <polyline
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
            points={points}
          />
      
          {data.map((p, i) => (
             <circle key={i} cx={i * 50} cy={100 - p.value} r="3" fill="#3b82f6" />
          ))}
        </svg>
         <div className="flex justify-between text-xs text-gray-500 mt-2 px-2">
            {data.map(p => <span key={p.month}>{p.month}</span>)}
        </div>
      </div>
    </Card>
  );
};

const AuctionOutcomePieChart = () => {
  const data = { sold: 75, unsold: 15, cancelled: 10 };
  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Auction Outcome</h3>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
        <div
          className="w-36 h-36 rounded-full"
          style={{
            background: `conic-gradient(
              #22c55e 0% ${data.sold}%,
              #ef4444 ${data.sold}% ${data.sold + data.unsold}%,
              #f97316 ${data.sold + data.unsold}% 100%
            )`,
          }}
        ></div>
        <div className="space-y-2 text-sm">
            <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                <span>Sold: {data.sold}%</span>
            </div>
             <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                <span>Unsold: {data.unsold}%</span>
            </div>
             <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-orange-500 mr-2"></span>
                <span>Cancelled: {data.cancelled}%</span>
            </div>
        </div>
      </div>
    </Card>
  );
};

const StateWiseBarChart = () => {
    const data = [
        { state: 'CA', total: 120, live: 75 },
        { state: 'TX', total: 250, live: 180 },
        { state: 'FL', total: 95, live: 50 },
        { state: 'NY', total: 150, live: 110 },
        { state: 'IL', total: 180, live: 90 },
    ];
    const maxVal = Math.max(...data.map(d => d.total));

    return (
        <Card>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">State-wise Properties</h3>
            <div className="flex justify-between items-end h-48 space-x-2">
                {data.map(item => (
                    <div key={item.state} className="flex-1 flex flex-col items-center justify-end">
                         <div className="w-full flex items-end h-full gap-1 justify-center">
                             <div className="w-1/2 bg-sky-200 rounded-t-md" style={{height: `${(item.live / maxVal) * 100}%`}}></div>
                             <div className="w-1/2 bg-sky-500 rounded-t-md" style={{height: `${(item.total / maxVal) * 100}%`}}></div>
                         </div>
                        <span className="text-xs text-gray-500 mt-2">{item.state}</span>
                    </div>
                ))}
            </div>
             <div className="flex justify-center mt-4 space-x-4 text-sm">
                <div className="flex items-center"><span className="w-3 h-3 bg-sky-200 mr-2 rounded-sm"></span>Live</div>
                <div className="flex items-center"><span className="w-3 h-3 bg-sky-500 mr-2 rounded-sm"></span>Total</div>
            </div>
        </Card>
    );
};




function Dashboard() {
  const stateData = [
    { state: "California", head: "John Doe", total: 120, live: 15, success: "88%" },
    { state: "Texas", head: "Jane Smith", total: 250, live: 30, success: "92%" },
    { state: "Florida", head: "Jim Brown", total: 95, live: 8, success: "85%" },
    { state: "New York", head: "Emily White", total: 150, live: 22, success: "90%" },
  ];

  const KpiCard = ({ icon, title, value, colorClass }) => (
      <Card>
          <div className="flex items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${colorClass.bg}`}>
                  {icon}
              </div>
              <div className="ml-4">
                  <p className="text-gray-500 text-sm">{title}</p>
                  <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
              </div>
          </div>
      </Card>
  );

  return (
    <div className="space-y-6">
   
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">System Dashboard</h1>
          <p className="text-gray-500 mt-1">Here is the summary of the auction for today.</p>
        </div>
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <select className="p-2 border rounded-lg bg-white text-sm">
            <option>All States</option>
          </select>
          <select className="p-2 border rounded-lg bg-white text-sm">
            <option>All Stages</option>
          </select>
          <input type="date" className="p-2 border rounded-lg bg-white text-sm"/>
        </div>
      </div>

   
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <KpiCard
              icon={<BuildingIcon className="w-6 h-6 text-blue-600" />}
              title="Total Properties"
              value="2,480"
              colorClass={{bg: "bg-blue-100"}}
          />
          <KpiCard
              icon={<CalendarIcon className="w-6 h-6 text-green-600" />}
              title="Auctions Scheduled"
              value="1,289"
              colorClass={{bg: "bg-green-100"}}
          />
          <KpiCard
              icon={<PercentIcon className="w-6 h-6 text-indigo-600" />}
              title="Recovery %"
              value="91.5%"
              colorClass={{bg: "bg-indigo-100"}}
          />
          <KpiCard
              icon={<GavelIcon className="w-6 h-6 text-amber-600" />}
              title="Auction Success Rate"
              value="88.9%"
              colorClass={{bg: "bg-amber-100"}}
          />
      </div>

 
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
            <AuctionTrendsLineChart />
            <StateWiseBarChart />
        </div>
        <div className="lg:col-span-1 space-y-6">
            <AuctionOutcomePieChart />
          
            <Card>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">State Wise Auction Details</h3>
                <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead>
                    <tr className="bg-gray-100 text-gray-600 uppercase text-xs">
                        <th className="p-3 font-semibold">State</th>
                        <th className="p-3 font-semibold text-center">Total</th>
                        <th className="p-3 font-semibold text-center">Live</th>
                        <th className="p-3 font-semibold text-center">Success %</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {stateData.map((row) => (
                        <tr key={row.state} className="hover:bg-gray-50">
                        <td className="p-3 whitespace-nowrap font-medium text-gray-800">
                            {row.state}
                        </td>
                         <td className="p-3 whitespace-nowrap text-gray-600 text-center">
                            {row.total}
                        </td>
                        <td className="p-3 whitespace-nowrap text-gray-600 text-center">
                            {row.live}
                        </td>
                        <td className="p-3 whitespace-nowrap text-green-600 font-semibold text-center">
                            {row.success}
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            </Card>
        </div>
      </div>
    </div>
  );
}


export default function App() {
  return (
    <div className="bg-slate-50 min-h-screen p-4 sm:p-6 md:p-8 font-sans">
      <main>
        <Dashboard />
      </main>
    </div>
  );
}


