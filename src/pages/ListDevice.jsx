import { useState } from "react";
import { Chip, Button, Input, Select } from "@heroui/react";

export default function ListDevice() {
  const [searchUser, setSearchUser] = useState("");

  const [newDevice, setNewDevice] = useState({
    name: "",
    assetCode: "",
    category: "",
    user: "",
    status: "Pending",
  });

  const [editId, setEditId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    assetCode: "",
    category: "",
    user: "",
    status: "Pending",
  });

  const [devices, setDevices] = useState([
    {
      id: 1,
      name: "HP",
      assetCode: "001",
      category: "Laptop",
      user: "Daniel Wijaya",
      status: "Active",
    },
    {
      id: 2,
      name: "Dell Monitor",
      assetCode: "002",
      category: "Desktop",
      user: "Naufal Prawiro",
      status: "Pending",
    },
  ]);

  const saveDevice = () => {
    if (
      newDevice.name.trim() === "" ||
      newDevice.assetCode.trim() === "" ||
      newDevice.category.trim() === "" ||
      newDevice.user.trim() === ""
    ) {
      alert("WOI DI ISI SEMUA DULU KOCAK.");
      return;
    }
    setDevices([...devices, { ...newDevice, id: Date.now() }]);

    setNewDevice({
      name: "",
      assetCode: "",
      category: "",
      user: "",
      status: "Pending",
    });
  };

  const handleEdit = (device) => {
    setEditId(device.id);
    setEditFormData(device);
  };

  const handleCancelEdit = () => {
    setEditId(null);
  };

  const handleSaveEdit = () => {
    setDevices((prevDevices) =>
      prevDevices.map((device) =>
        device.id === editId ? { ...editFormData, id: editId } : device
      )
    );
    setEditId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Lu serius mau menghapus device ini?")) {
      setDevices(devices.filter((device) => device.id !== id));
    }
  };

  const filteredDevices = devices.filter((device) => {
    const userName = device.user || "";
    const keyword = searchUser || "";
    return userName.toLowerCase().includes(keyword.toLowerCase());
  });

  const statusColorMap = {
    active: "bg-emerald-100 text-emerald-700 font-medium px-3 py-1 rounded-full text-sm",
    available: "bg-blue-100 text-blue-700 font-medium px-3 py-1 rounded-full text-sm",
    pending: "bg-yellow-100 text-yellow-700 font-medium px-3 py-1 rounded-full text-sm",
    disposed: "bg-red-500/20 text-red-700 font-medium px-3 py-1 rounded-full text-sm",
  };

  const inpuStyle = `w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400 text-gray-700`;

  return (
    <div className="p-8 w-full min-h-screen bg-[F5F7FA] relative">
      {editId !== null && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-md z-40 transition-all duratione-500 ease-out"
          onClick={handleCancelEdit}
        />
      )}

      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6">

        {/* Header */}
        <section className="mb-10">

          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Device Management</h1>
              <p className="text-gray-500 font-medium mt-1">Manage company devices and assets</p>
            </div>
            <div className="bg-blue-50 text-blue-700 px-5 py-3 rounded-2xl font-semibold border border-blue-200">
              {devices.length} Devices
            </div>
          </div>
        </section>

        {/* Search */}
        <section className="mb-8">
          <input
            type="text"
            placeholder="🔍Search Username..."
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
            disabled={editId !== null}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
          />
        </section>

        {/* Form Input */}
        <section className="mb-10">
          <div className="grid grid-cols-2 gap-4 ">

            {/* Kolom Kiri */}
            <div className="flex flex-col gap-4">
              <input
                placeholder="Device Name"
                value={newDevice.name}
                onChange={(e) =>
                  setNewDevice({ ...newDevice, name: e.target.value })}
                disabled={editId !== null}
                className="border rounded-xl px-4 py-3 bg-white"
              />
              <input
                placeholder="Asset Code"
                value={newDevice.assetCode}
                onChange={(e) =>
                  setNewDevice({ ...newDevice, assetCode: e.target.value })}
                disabled={editId !== null}
                className="border rounded-xl px-4 py-3 bg-white"
              />
              <input
                placeholder="Assigned User"
                value={newDevice.user}
                onChange={(e) =>
                  setNewDevice({ ...newDevice, user: e.target.value })}
                disabled={editId !== null}
                className="border rounded-xl px-4 py-3 bg-white"
              />
            </div>

            {/* Kolom Kanan */}
            <div className="flex flex-col gap-4 items-start w-full">
              <select
                value={newDevice.category}
                onChange={(e) => setNewDevice({ ...newDevice, category: e.target.value })}
                disabled={editId !== null}
                className="cursor-pointer w-44 border rounded-xl px-4 py-3 bg-white"
              >
                <option value="" disabled style={{ display: "none" }}>
                  Select Category
                </option>
                <option value="Laptop">Laptop</option>
                <option value="Desktop">Desktop</option>
                <option value="Monitor">Monitor</option>
                <option value="Printer">Printer</option>
              </select>

              <select
                value={newDevice.status}
                onChange={(e) => setNewDevice({ ...newDevice, status: e.target.value })}
                disabled={editId !== null}
                className="cursor-pointer w-44 border rounded-xl px-4 py-3 bg-white"
              >
                <option value="Pending">Pending</option>
                <option value="Available">Available</option>
                <option value="Active">Active</option>
                <option value="Disposed">Disposed</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={saveDevice}
              disabled={editId !== null}
              className="cursor-pointer px-6 py-3 rounded-xl font-semibold shadow-sm transition text-white bg-blue-600 hover:bg-blue-700"
            >
              ➕ Add Device
            </button>
          </div>
        </section>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border">
          <table className="w-full" style={{ borderCollapse: "separate", borderSpacing: "0" }}>
            <thead className="bg-white">
              <tr>
                <th className="px-6 py-4 text-left rounded-tl-lg">Device</th>
                <th className="px-6 py-4 text-left" >User</th>
                <th className="px-6 py-4 text-left">Category</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center rounded-tr-lg" >Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredDevices.map((device, index) => (
                <tr
                  key={device.id || index}
                  className={`transition-all duration-500 ease-out group ${editId === device.id
                      ? "relative z-50 bg-white shadow-md-[0_0_30px_rgba(0,0,0,0.15)] scale-[1.02] ring-2 ring-blue-500 rounded-lg"
                      : "border-b hover:bg-blue-50"
                    }`}
                >
                  {editId === device.id ? (
                    <>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          value={editFormData.name}
                          onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                          className="w-full border border-gray-300 rounded-lg px-3 py-1.5 mb-2 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                        />
                        <input
                          type="text"
                          value={editFormData.assetCode}
                          onChange={(e) => setEditFormData({ ...editFormData, assetCode: e.target.value })}
                          className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                        />
                      </td>
                      <td className="px-6 py-4 align-bottom pb-6">
                        <input
                          type="text"
                          value={editFormData.user}
                          onChange={(e) => setEditFormData({ ...editFormData, user: e.target.value })}
                          className="w-full border border-gray-300 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                        />
                      </td>
                      <td className="px-6 py-4 align-bottom pb-6">
                        <select
                          value={editFormData.category}
                          onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })}
                          className="w-full min-w-[120px] pr-8 border border-gray-300 rounded-lg px-2 py-1.5 bg-white cursor-pointer outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="Laptop">Laptop</option>
                          <option value="Desktop">Desktop</option>
                          <option value="Monitor">Monitor</option>
                          <option value="Printer">Printer</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 align-bottom pb-6">
                        <select
                          value={editFormData.status}
                          onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
                          className="w-full min-w-[120px] pr-8 border border-gray-300 rounded-lg px-2 py-1.5 bg-white cursor-pointer outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Available">Available</option>
                          <option value="Active">Active</option>
                          <option value="Disposed">Disposed</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-center align-bottom pb-6">
                        <div className="flex justify-center gap-4">
                          <button
                            onClick={handleCancelEdit}
                            className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleSaveEdit}
                            className="px-3 py-1.5 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md transition shadow-sm"
                          >
                            Save
                          </button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-800">{device.name || "—"}</div>
                        <div className="text-sm text-gray-500">{device.assetCode || "No code"}</div>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{device.user || "Unassigned"}</td>
                      <td className="px-6 py-4 text-gray-700">{device.category || "—"}</td>
                      <td className="px-6 py-4">
                        <Chip
                          className={`font-semibold border-none ${statusColorMap[device.status.toLowerCase()] || "bg-gray-500/20 text-gray-700"}`}
                          size="sm"
                          radius="md"
                        >
                          {device.status}
                        </Chip>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center gap-4">
                          <button
                            onClick={() => handleEdit(device)}
                            disabled={editId !== null}
                            className="cursor-pointer text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                          >
                            ✏ Edit
                          </button>
                          <button
                            onClick={() => handleDelete(device.id)}
                            disabled={editId !== null}
                            className="cursor-pointer text-red-600 hover:text-red-800 font-medium flex items-center gap-1"
                          >
                            🗑 Delete
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}

              {filteredDevices.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-gray-500">
                    No devices found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}