import React, { useState, useEffect } from 'react';


const SearchIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>;
const PipelineIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2H5a2 2 0 00-2 2v2m14 0h-2M5 11H3" /></svg>;
const ChartBarIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;


const mockDatabase = [
    { type: 'Loan', loanNo: 'LN-001', borrower: 'Alice Johnson', propertyAddress: '123 Maple St', auctionStage: 'Sold' },
    { type: 'Property', loanNo: 'LN-002', borrower: 'Bob Williams', propertyAddress: '456 Oak Avenue', auctionStage: 'Published' },
    { type: 'Loan', loanNo: 'LN-003', borrower: 'Charlie Brown', propertyAddress: '789 Pine Lane', auctionStage: 'Failed' },
    { type: 'Borrower', loanNo: 'LN-004', borrower: 'Diana Miller', propertyAddress: '101 Birch Road', auctionStage: 'Valuation Pending' },
    { type: 'Property', loanNo: 'LN-005', borrower: 'Ethan Smith', propertyAddress: '212 Cedar Court, Jaipur', auctionStage: 'Sold' },
];

export default function ReportsSearch() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

  
    useEffect(() => {
        setIsSearching(true);
        const handler = setTimeout(() => {
            if (searchQuery.trim() === '') {
                setSearchResults([]);
                setIsSearching(false);
                return;
            }

            const lowercasedQuery = searchQuery.toLowerCase();
            const results = mockDatabase.filter(item => 
                item.loanNo.toLowerCase().includes(lowercasedQuery) ||
                item.borrower.toLowerCase().includes(lowercasedQuery) ||
                item.propertyAddress.toLowerCase().includes(lowercasedQuery) ||
                item.auctionStage.toLowerCase().includes(lowercasedQuery)
            );
            setSearchResults(results);
            setIsSearching(false);
        }, 500); 

        return () => {
            clearTimeout(handler);
        };
    }, [searchQuery]);

    const reportList = [
        { title: 'Auction Pipeline', description: 'Track properties at every stage leading up to an auction.', icon: <PipelineIcon />, color: 'bg-blue-500' },
        { title: 'Auction Outcomes', description: 'Analyze results of completed auctions.', icon: <ChartBarIcon />, color: 'bg-green-500' },
       
    ];

    return (
        <div className="p-6 md:p-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports & Search</h1>
            <p className="text-gray-600 mb-8">Quickly find records or generate system reports.</p>

            
            <div className="mb-8">
                <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                        <SearchIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="search"
                        name="globalSearch"
                        id="globalSearch"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="block w-full rounded-full border-0 py-4 pl-11 pr-6 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Search by Loan No, Borrower, Property Address, or Auction Stage..."
                    />
                </div>
            </div>

        
            {(isSearching || searchResults.length > 0 || searchQuery) && (
                 <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        {isSearching ? 'Searching...' : `Results for "${searchQuery}" (${searchResults.length})`}
                    </h2>
                    {isSearching ? (
                        <div className="text-center py-8 text-gray-500">Loading results...</div>
                    ) : searchResults.length > 0 ? (
                        <ul className="divide-y divide-gray-200">
                           {searchResults.map((item, index) => (
                               <li key={index} className="py-4 flex flex-col md:flex-row justify-between md:items-center">
                                   <div>
                                       <p className="font-semibold text-indigo-600">{item.propertyAddress}</p>
                                       <p className="text-sm text-gray-700">Borrower: <span className="font-medium">{item.borrower}</span> | Loan: <span className="font-medium">{item.loanNo}</span></p>
                                   </div>
                                   <div className="mt-2 md:mt-0">
                                       <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                           {item.auctionStage}
                                       </span>
                                   </div>
                               </li>
                           ))}
                        </ul>
                    ) : (
                         <div className="text-center py-8 text-gray-500">No results found.</div>
                    )}
                </div>
            )}
           

         
            <details className="bg-white p-6 rounded-lg shadow-md mb-8">
                 <summary className="text-xl font-semibold text-gray-800 cursor-pointer">Advanced Search & Filters</summary>
                 <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                   
                     <div>
                         <label htmlFor="loanNo" className="block text-sm font-medium text-gray-700">Loan No.</label>
                         <input type="text" id="loanNo" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />
                     </div>
                      <div>
                         <label htmlFor="borrower" className="block text-sm font-medium text-gray-700">Borrower Name</label>
                         <input type="text" id="borrower" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />
                     </div>
                     <div className="lg:col-span-3 flex justify-end gap-3 mt-4">
                         <button type="reset" className="rounded-md bg-gray-200 px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300">Reset</button>
                         <button type="submit" className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-6 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700">Search</button>
                     </div>
                 </form>
            </details>
            

         
            <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Available Reports</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {reportList.map((report) => (
                        <div key={report.title} className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
                             <div className="p-5">
                                 <div className="flex items-center">
                                     <div className={`flex-shrink-0 ${report.color} rounded-md p-3`}>{report.icon}</div>
                                     <div className="ml-4"><h3 className="text-lg font-semibold text-gray-800">{report.title}</h3></div>
                                 </div>
                                 <p className="mt-3 text-sm text-gray-600">{report.description}</p>
                             </div>
                             <div className="bg-gray-50 px-5 py-3">
                                 <button onClick={() => alert(`Generating report: ${report.title}`)} className="text-sm font-medium text-indigo-600 hover:text-indigo-800">Generate Report</button>
                             </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}







