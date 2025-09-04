import React, { useState, useEffect, useMemo } from 'react';

//
const ClockIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const UsersIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.964A3.375 3.375 0 0112 12.75h1.5a3.375 3.375 0 013.375 3.375v6.75A3.375 3.375 0 0112.75 24h-1.5a3.375 3.375 0 01-3.375-3.375V16.125c0-.621.504-1.125 1.125-1.125h1.5c.621 0 1.125.504 1.125 1.125v3.375c0 .621-.504 1.125-1.125 1.125h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5c0-.621.504-1.125 1.125-1.125h1.5c.621 0 1.125.504 1.125 1.125v.75M6.375 16.125a3.375 3.375 0 016.75 0v6.75a3.375 3.375 0 01-6.75 0V16.125z" /></svg>;
const BuildingOfficeIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6h1.5m-1.5 3h1.5m-1.5 3h1.5M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" /></svg>;
const ArrowTrendingUpIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-3.75-.625m3.75.625V3.375" /></svg>;
const XIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>;
const PlayPauseIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" /></svg>;


const initialAuctions = [
    {
        id: 1,
        property: { name: 'Sunrise Villa', address: 'Jaipur, Rajasthan', imageUrl: 'https://thumbs.dreamstime.com/b/home-modern-pool-sunrise-villa-architecture-beautiful-interiors-exteriors-resort-style-hotel-gorgeous-backyard-view-393850835.jpg' },
        startTime: new Date('2025-09-04T15:00:00+05:30'),
        endTime: new Date('2025-09-04T16:00:00+05:30'),
        currentBid: 5250000,
        bidCount: 18,
        leadingBidder: 'Aarav S.',
        isPaused: false,
        status: 'Live',
        bidHistory: [ { bidder: 'Aarav S.', amount: 5250000, time: '3:12 PM' }, { bidder: 'Rohan M.', amount: 5200000, time: '3:10 PM' } ]
    },
    {
        id: 2,
        property: { name: 'Heritage Haveli', address: 'Jodhpur, Rajasthan', imageUrl: 'https://t3.ftcdn.net/jpg/00/61/80/04/360_F_61800455_wDfK8IJqK8K9ffriCBkMBp1RNOkhLZx7.jpg' },
        startTime: new Date('2025-09-04T16:30:00+05:30'),
        endTime: new Date('2025-09-04T17:30:00+05:30'),
        currentBid: 8500000,
        bidCount: 0,
        leadingBidder: 'None',
        isPaused: false,
        status: 'Scheduled',
        bidHistory: [],
    },
    {
        id: 3,
        property: { name: 'Lakeview Apartment', address: 'Udaipur, Rajasthan', imageUrl: 'https://r1imghtlak.ibcdn.com/d8b7157f-4f33-41f4-8172-6ddb615cf3a3.JPG?&output-quality=75&downsize=322:229&crop=322:229;0,6&output-format=webp' },
        startTime: new Date('2025-09-04T14:00:00+05:30'),
        endTime: new Date('2025-09-04T15:00:00+05:30'),
        currentBid: 3850000,
        bidCount: 25,
        leadingBidder: 'Priya K.',
        isPaused: false,
        status: 'Ended',
        bidHistory: [ { bidder: 'Priya K.', amount: 3850000, time: '2:59 PM' }, { bidder: 'Vikram S.', amount: 3800000, time: '2:58 PM' } ]
    },
];


const formatCurrency = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(amount);

const formatTimeLeft = (milliseconds, isPaused) => {
    if (isPaused) return { text: "Paused", color: "text-yellow-600", isLive: true, hasEnded: false };
    if (milliseconds <= 0) return { text: "Auction Ended", color: "text-gray-500", isLive: false, hasEnded: true };

    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    let text = '';
    if (hours > 0) text += `${hours.toString().padStart(2, '0')}:`;
    text += `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    return { text, color: totalSeconds < 60 ? "text-red-500 font-bold animate-pulse" : "text-gray-800", isLive: true, hasEnded: false };
};



const KpiCard = ({ title, value, icon, iconBgColor }) => (
    <div className="bg-white p-5 rounded-xl shadow-md flex items-center">
        <div className={`rounded-full p-3 ${iconBgColor}`}>{icon}</div>
        <div className="ml-4"><p className="text-sm text-gray-500 font-medium">{title}</p><p className="text-2xl font-bold text-gray-900">{value}</p></div>
    </div>
);

const AuctionCard = ({ auction, onShowBids, onManage }) => {
    const { text: timerText, color: timerColor, isLive, hasEnded } = formatTimeLeft(auction.timeLeft, auction.isPaused);
    const status = hasEnded ? { text: 'Ended', bg: 'bg-gray-200', textClr: 'text-gray-700' } :
                   auction.isPaused ? { text: 'Paused', bg: 'bg-yellow-100', textClr: 'text-yellow-800' } :
                   isLive ? { text: 'Live', bg: 'bg-green-100', textClr: 'text-green-800' } :
                   { text: `Starts in ${formatTimeLeft(auction.timeUntilStart).text}`, bg: 'bg-blue-100', textClr: 'text-blue-800' };

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
            <img className="h-48 w-full object-cover" src={auction.property.imageUrl} alt={auction.property.name} />
            <div className="p-4 flex-grow flex flex-col">
                <div className="flex justify-between items-start">
                    <div><p className="font-bold text-lg text-gray-900">{auction.property.name}</p><p className="text-sm text-gray-500">{auction.property.address}</p></div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${status.bg} ${status.textClr}`}>{status.text}</span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div><p className="text-gray-500">Current Bid</p><p className="font-bold text-lg text-green-600">{formatCurrency(auction.currentBid)}</p></div>
                    <div className="text-right"><p className="text-gray-500">Time Remaining</p><p className={`font-semibold text-lg ${timerColor}`}>{timerText}</p></div>
                    <div><p className="text-gray-500">Bidders</p><p className="font-semibold">{auction.bidCount}</p></div>
                    <div className="text-right"><p className="text-gray-500">Leading</p><p className="font-semibold">{auction.leadingBidder}</p></div>
                </div>
                <div className="mt-auto pt-4 border-t border-gray-200 flex space-x-2">
                    <button onClick={() => onShowBids(auction)} className="btn-secondary flex-1">View Bids</button>
                    <button onClick={() => onManage(auction)} disabled={!isLive} className="btn-primary flex-1">Manage</button>
                </div>
            </div>
        </div>
    );
};

const BidHistoryModal = ({ auction, onClose }) => {
    if (!auction) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
                <div className="p-4 border-b flex justify-between items-center"><h3 className="text-lg font-semibold">Bid History: {auction.property.name}</h3><button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100"><XIcon className="w-6 h-6"/></button></div>
                <ul className="p-4 max-h-80 overflow-y-auto divide-y">{auction.bidHistory.length > 0 ? auction.bidHistory.map((bid, i) => (<li key={i} className="py-2 flex justify-between"><div><p className="font-medium">{bid.bidder}</p><p className="text-xs text-gray-500">{bid.time}</p></div><p className="font-semibold">{formatCurrency(bid.amount)}</p></li>)) : <p className="text-center text-gray-500 py-4">No bids placed yet.</p>}</ul>
            </div>
        </div>
    );
};

const ManageAuctionModal = ({ auction, onClose, onExtend, onTogglePause, onCancel }) => {
    if (!auction) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
                <div className="p-4 border-b flex justify-between items-center"><h3 className="text-lg font-semibold">Manage: {auction.property.name}</h3><button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100"><XIcon className="w-6 h-6"/></button></div>
                <div className="p-6 space-y-4">
                    <div><p className="text-sm font-medium text-gray-600">Extend Auction Time</p><div className="flex space-x-2 mt-1"><button onClick={() => onExtend(auction.id, 5)} className="btn-secondary flex-1">5 Mins</button><button onClick={() => onExtend(auction.id, 15)} className="btn-secondary flex-1">15 Mins</button><button onClick={() => onExtend(auction.id, 30)} className="btn-secondary flex-1">30 Mins</button></div></div>
                    <div><p className="text-sm font-medium text-gray-600">Auction Controls</p><div className="flex space-x-2 mt-1"><button onClick={() => onTogglePause(auction.id)} className="btn-secondary flex-1 flex items-center justify-center"><PlayPauseIcon className="w-5 h-5 mr-2"/>{auction.isPaused ? 'Resume' : 'Pause'}</button><button onClick={() => onCancel(auction.id)} className="btn-danger flex-1">Cancel Auction</button></div></div>
                </div>
            </div>
        </div>
    );
}


export default function LiveAuctions() {
    const [auctions, setAuctions] = useState(initialAuctions);
    const [selectedAuction, setSelectedAuction] = useState(null);
    const [managingAuction, setManagingAuction] = useState(null);

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            setAuctions(prevAuctions => prevAuctions.map(auc => {
                if (auc.isPaused || auc.status === 'Ended' || auc.status === 'Cancelled') {
                    return auc;
                }
                return { ...auc, timeLeft: new Date(auc.endTime) - now, timeUntilStart: new Date(auc.startTime) - now };
            }));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const kpis = useMemo(() => {
        const liveNow = auctions.filter(a => a.timeLeft > 0 && a.timeUntilStart <= 0);
        return { liveCount: liveNow.length, totalBids: auctions.reduce((sum, a) => sum + a.bidCount, 0), highestBid: Math.max(0, ...liveNow.map(a => a.currentBid)) };
    }, [auctions]);

    const handleExtend = (id, minutes) => {
        setAuctions(auctions.map(auc => auc.id === id ? { ...auc, endTime: new Date(new Date(auc.endTime).getTime() + minutes * 60000) } : auc));
    };
    const handleTogglePause = (id) => {
        setAuctions(auctions.map(auc => auc.id === id ? { ...auc, isPaused: !auc.isPaused, timeLeftOnPause: !auc.isPaused ? auc.timeLeft : null, endTime: auc.isPaused ? new Date(Date.now() + (auc.timeLeftOnPause || 0)) : auc.endTime } : auc));
    };
    const handleCancel = (id) => {
        if (window.confirm("Are you sure you want to cancel this auction? This action cannot be undone.")) {
            setAuctions(auctions.map(auc => auc.id === id ? { ...auc, status: 'Ended', timeLeft: 0, isPaused: false, endTime: new Date() } : auc));
            setManagingAuction(null);
        }
    };

    return (
        <div className="p-4 sm:p-8 bg-gray-100 min-h-screen font-sans">
            {selectedAuction && <BidHistoryModal auction={selectedAuction} onClose={() => setSelectedAuction(null)} />}
            {managingAuction && <ManageAuctionModal auction={managingAuction} onClose={() => setManagingAuction(null)} onExtend={handleExtend} onTogglePause={handleTogglePause} onCancel={handleCancel} />}
            <header className="mb-8"><h1 className="text-3xl font-bold text-gray-900">Live Auction Monitor</h1><p className="text-md text-gray-500 mt-1">ProAuctions Admin Panel</p></header>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <KpiCard title="Live Auctions" value={kpis.liveCount} icon={<BuildingOfficeIcon className="w-6 h-6 text-white"/>} iconBgColor="bg-green-500" />
                <KpiCard title="Total Bids Today" value={kpis.totalBids} icon={<UsersIcon className="w-6 h-6 text-white"/>} iconBgColor="bg-blue-500" />
                <KpiCard title="Highest Active Bid" value={formatCurrency(kpis.highestBid)} icon={<ArrowTrendingUpIcon className="w-6 h-6 text-white"/>} iconBgColor="bg-indigo-500" />
            </div>
            <main>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {auctions.map(auction => (<AuctionCard key={auction.id} auction={auction} onShowBids={setSelectedAuction} onManage={setManagingAuction} />))}
                </div>
            </main>
             <style>{`
                .btn-primary { padding: 0.5rem 1rem; border: 1px solid transparent; border-radius: 0.5rem; font-weight: 600; color: white; background-color: #4f46e5; transition: background-color 0.2s; }
                .btn-primary:hover { background-color: #4338ca; }
                .btn-primary:disabled { background-color: #a5b4fc; cursor: not-allowed; }
                .btn-secondary { padding: 0.5rem 1rem; border: 1px solid #d1d5db; border-radius: 0.5rem; font-weight: 600; color: #374151; background-color: white; transition: background-color 0.2s; }
                .btn-secondary:hover { background-color: #f9fafb; }
                .btn-danger { padding: 0.5rem 1rem; border: 1px solid transparent; border-radius: 0.5rem; font-weight: 600; color: white; background-color: #dc2626; transition: background-color 0.2s; }
                .btn-danger:hover { background-color: #b91c1c; }
            `}</style>
        </div>
    );
}