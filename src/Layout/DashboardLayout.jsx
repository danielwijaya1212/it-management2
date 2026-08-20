import { NavLink, Outlet } from "react-router-dom";

export default function DashboardLayout() {
  // Fungsi kecil buat ngasih warna biru kalau menunya lagi diklik (aktif)
  const navStyle = ({ isActive }) =>
    `block px-4 py-3 rounded-xl font-semibold transition-all ${
      isActive 
        ? "bg-blue-600 text-white shadow-md" 
        : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
    }`;

  return (
    <div className="flex w-full min-h-screen bg-[#F5F7FA]">
      
      {/* 1. SIDEBAR KIRI */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col">
        {/* Logo / Judul */}
        <div className="mb-10 px-4">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <span className="text-blue-600">IT</span> Management
          </h2>
        </div>

        <nav className="flex flex-col gap-2">
          <NavLink to="/dashboard" className={navStyle}>
            📊 Dashboard
          </NavLink>
          <NavLink to="/users" className={navStyle}>
            🧑‍💻 Users
          </NavLink>
          <NavLink to="/device" className={navStyle}>
            💻 Devices
          </NavLink>
        </nav>
        
        <div className="mt-auto">
          <NavLink to="/" className="block px-4 py-3 rounded-xl font-medium text-red-500 hover:bg-red-50 transition text-center border border-red-100">
            🚪 Logout
          </NavLink>
        </div>
      </aside>

      {/* 2. AREA KONTEN KANAN */}
      <main className="flex-1 overflow-y-auto">
        {/* 
          Nah, <Outlet /> ini sangat penting! 
          Halaman Dashboard, Users, dan ListDevice bakal muncul di dalam sini.
        */}
        <Outlet />
      </main>
      
    </div>
  );
}