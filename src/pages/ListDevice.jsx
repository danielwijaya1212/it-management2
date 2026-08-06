import { useState } from "react";

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
      category: "PC",
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
    if (editId !== null) {
      const updatedDevices = devices.map((device) =>
        device.id === editId ? { ...newDevice, id: editId } : device
      );
      setDevices(updatedDevices);
      setEditId(null);
    } else {
      setDevices([...devices, { ...newDevice, id: Date.now() }]);
    }
    setNewDevice({
      name: "",
      assetCode: "",
      category: "",
      user: "",
      status: "Pending",
    });
  };

  const handleEdit = (device) => {
    setNewDevice(device);
    setEditId(device.id);
  };

  const handleDelete = (id) => {
    const filteredDevices = devices.filter((device) => device.id !== id);
    setDevices(filteredDevices);
  };

  const filteredDevices = devices.filter((device) => {
    const userName = device.user || "";
    const keyword = searchUser || "";
    return userName.toLowerCase().includes(keyword.toLowerCase());
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Available":
        return "bg-blue-100 text-blue-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Disposed":
        return "bg-red-100 text-red-700";
      default:
        return "";
    }
  };

  return (
      <div className="bg-slate-100 rounded-3xl shadow-sm border border-gray-200 p-8">

        {/* Header */}
        <section className="mb-10">

          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Device Management</h1>
              <p className="text-gray-500">Manage company devices and assets</p>
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
                  setNewDevice({ ...newDevice, name: e.target.value })
                }
                className="border rounded-xl px-4 py-3 bg-white"
              />
              <input
                placeholder="Asset Code"
                value={newDevice.assetCode}
                onChange={(e) =>
                  setNewDevice({ ...newDevice, assetCode: e.target.value })
                }
                className="border rounded-xl px-4 py-3 bg-white"
              />
              <input
                placeholder="Assigned User"
                value={newDevice.user}
                onChange={(e) =>
                  setNewDevice({ ...newDevice, user: e.target.value })
                }
                className="border rounded-xl px-4 py-3 bg-white"
              />
            </div>

            {/* Kolom Kanan */}
            <div className="flex flex-col gap-4 items-start w-full">
              <select
                value={newDevice.category}
                onChange={(e) => setNewDevice({ ...newDevice, category: e.target.value })}
                className="cursor-pointer w-44 border rounded-xl px-4 py-3 bg-white"
              >
                <option value="" disabled style={{ display: "none" }}>
                  Select Category
                </option>
                <option >Laptop</option>
                <option>Desktop</option>
                <option>Monitor</option>
                <option>Printer</option>
              </select>

              <select
                value={newDevice.status}
                onChange={(e) => setNewDevice({ ...newDevice, status: e.target.value })}
                className="cursor-pointer w-44 border rounded-xl px-4 py-3 bg-white"
              >
                <option>Pending</option>
                <option>Available</option>
                <option>Active</option>
                <option>Disposed</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={saveDevice}
              className={`cursor-pointer px-6 py-3 rounded-xl font-semibold shadow-sm transition text-white ${
                editId !== null
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-blue-600 hover:bg-blue-700"
                }`}
            >
              {editId !== null ? "💾 Update Device" : "➕ Add Device"}
            </button>

            {editId !== null && (
              <button
                onClick={() => {
                  setEditId(null);
                  setNewDevice({
                    name: "",
                    assetCode: "",
                    category: "",
                    user: "",
                    status: "Pending",
                  });
                }}
                className="cursor-pointer ml-4 px-6 py-3 rounded-xl font-semibold shadow-sm transition text-white bg-gray-500 hover:bg-gray-600"
              >
                Cancel
              </button>
            )}
          </div>
        </section>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left">Device</th>
                <th className="px-6 py-4 text-left">User</th>
                <th className="px-6 py-4 text-left">Category</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredDevices.map((device, index) => (
                <tr key={device.id || index} className="border-t hover:bg-slate-50 transition">
                  <td className="px-6 py-4">
                    <div className="font-semibold">{device.name || "—"}</div>
                    <div className="text-sm text-gray-500">
                      {device.assetCode || "No code"}
                    </div>
                  </td>
                  <td className="px-6 py-4">{device.user || "Unassigned"}</td>
                  <td className="px-6 py-4">{device.category}</td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        device.status
                      )}`}
                    >
                      {device.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() => handleEdit(device)}
                        className="cursore-pointer text-blue-600 hover:text-blue-800 font-medium hover:underline flex items-center gap-1"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(device.id)}
                        className="cursore-pointer text-red-600 hover:text-red-800 font-medium hover:underline flex items-center gap-1"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
  );
}