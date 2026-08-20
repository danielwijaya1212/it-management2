import { useState, useEffect } from "react";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDevices: 0,
    activeDevices: 0,
    openTickets: 0
  });

  useEffect(() => {
    // Narik data ringkasan dari Backend
    fetch('http://localhost:3001/api/dashboard')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error("Gagal narik data dashboard:", err));
  }, []);

  // Komponen kecil buat Card biar kodenya rapi
  const StatCard = ({ title, value, icon, color }) => (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6 hover:shadow-md transition-all">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-gray-500 font-medium text-sm mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-gray-800">{value}</h3>
      </div>
    </div>
  );

  return (
    <div className="p-8 w-full min-h-screen bg-[#F5F7FA]">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-800">IT Overview</h1>
        <p className="text-gray-500 font-medium mt-1">Welcome back! Here is what's happening today.</p>
      </div>

      {/* Grid untuk 4 KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard 
          title="Total Users" 
          value={stats.totalUsers} 
          icon="🧑‍💻" 
          color="bg-blue-50 text-blue-600" 
        />
        <StatCard 
          title="Total Devices" 
          value={stats.totalDevices} 
          icon="💻" 
          color="bg-purple-50 text-purple-600" 
        />
        <StatCard 
          title="Active Devices" 
          value={stats.activeDevices} 
          icon="⚡" 
          color="bg-emerald-50 text-emerald-600" 
        />
        <StatCard 
          title="Open Tickets" 
          value={stats.openTickets} 
          icon="🎫" 
          color="bg-rose-50 text-rose-600" 
        />
      </div>

      {/* Area buat grafik atau log aktivitas nantinya */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 min-h-[300px] flex items-center justify-center">
        <p className="text-gray-400 font-medium">Area ini nanti kita isi grafik atau tabel tiket terbaru ya bro!</p>
      </div>
    </div>
  );
}