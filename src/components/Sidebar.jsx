import { Link } from "react-router-dom";
import logo from "../assets/IFCA-Black-.png";

export default function Sidebar() {
  return (
    <div className="flex h-screen w-64 flex-col border-r bg-white">

      <div className="flex items-center gap-2 p-4 border-b">
        <img src={logo} alt="logo" className="h-10" />
        <span className="font-bold text-gray-700">IT Management</span>
      </div>

      <nav className="flex flex-col gap-2 p-4">

        <Link
          to="/dashboard"
          className="rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100"
        >
          Dashboard
        </Link>
        
        <Link
        to="/users"
        className="rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100"
        >
          Users
        </Link>

        <Link
          to="/device"
          className="rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100"
        >
          Device
        </Link>

      </nav>
    </div>
  );
}