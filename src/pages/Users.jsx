import { useState } from "react";

function Users() {
  const [users, setUsers] = useState([
    { id: 1, name: "Daniel", email: "daniel.wijaya@ifca.co.id", role: "CEO", status: "Active" },
    { id: 2, name: "Naufal", email: "naufal.prawiro@ifca.co.id", role: "Developer", status: "Active" },
    { id: 3, name: "Udin", email: "udin@ifca.co.id", role: "Designer", status: "Inactive" },
  ]);

  const [newUser, setNewUser] = useState("");
  const [deleteMode, setDeleteMode] = useState(false);

  const addUser = () => {
    if (newUser.trim() === "") return;

    const newEmployee = {
      id: Date.now(),
      name: newUser,
      email: `${newUser.toLowerCase().replace(/\s+/g, ".")}@ifca.co.id`,
      role: "Employee",
      status: "Active",
    }
    setUsers([...users, newEmployee]);
    setNewUser("");
  };

  const removeUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const toggleStatus = (id) => {
    setUsers(
      users.map((user) => {
        if (user.id === id) {
          return {
            ...user,
            status: user.status === "Active" ? "Inactive" : "Active",
          };
        }
        return user;
      })
    );
  };

  const statusColorMap = {
    "Active": "bg-emerald-100 text-emerald-700 font-medium px-3 py-1 rounded-full text-sm",
    "Inactive": "bg-red-500/20 text-red-700 font-medium px-3 py-1 rounded-full text-sm"
  }

  return (
    <div className="p-8 w-full min-h-screen bg-[#F5F7FA]">
      <div className="bg-slate-100 rounded-3xl shadow-sm border border-gray-200 p-8">

        {/* Header */}
        <section className="mb-10">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h1 className="text-3xl font-bold">User Management</h1>
              <p className="text-gray-500 font-medium mt-1">Manage all employee accounts</p>
            </div>
            <div className="bg-blue-50 text-blue-700 px-5 py-3 rounded-2xl font-semibold border border-blue-200">
              {users.length} Users
            </div>
          </div>
        </section>

        {/* ADD USER */}
        <section className="mb-10">
          <div className="flex gap-4 mb-8">
            <input
              value={newUser}
              onChange={(e) => setNewUser(e.target.value)}
              placeholder="Enter Employee Name..."
              className="flex-1 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button
              onClick={addUser}
              className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-6 rounded-xl font-semibold transition"
            >
              + Add User
            </button>
            <button
              onClick={() => setDeleteMode(!deleteMode)}
              className={`px-6 rounded-xl font-semibold transition ${deleteMode ? "bg-gray-700 hover:bg-gray-800 text-white" : "bg-[#DC2626] hover:bg-[#B91C1C] text-white"}`}
            >
              {deleteMode ? "Cancel" : "Delete User"}
            </button>
          </div>
        </section>

        {/* USER LIST (FIXED LAYOUT) */}
        <section className="mb-10">

          <div className="grid grid-cols-3 items-center px-8 py-2 mb-2">
            <div className="flex-1 text-xs font-bold uppercase tracking-widest text-black-400">Employee Profile</div>
            <div className="flex-1 text-center text-xs font-bold uppercase tracking-widest text-black-400">Role</div>
            <div className="flex-1 text-right text-xs font-bold uppercase tracking-widest text-black-400 pr-16">Status</div>
          </div>
          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-2 flex flex-col gap-1">

            {users.map((user) => (
              <div
                key={user.id}
                className="flex justify-between items-center px-6 py-4 border-b last:border-b-0 hover:bg-blue-50 transition-all"  //EDIT OR NO ??
              >
                {/* Info User */}
                <div className="flex-1 flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-blue-100 to-blue-50 flex items-center justify-center text-blue-600 font-bold text-lg shrink-0 shadow-sm">
                    {user.name.charAt(0)}
                  </div>

                  <div className="flex flex-col">
                    <h3 className={`text-base font-semibold ${user.status === 'Inactive' ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                      {user.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-0.5">{user.email}</p>
                  </div>
                </div>

                {/* Role */}
                <div className="flex-1 flex justify-center text-center">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                    {user.role}
                  </p>
                </div>

                {/* Status dan Tombol Aksi aja */}
                <div className="flex-1 flex items-center justify-end gap-4">

                  {/* Teks Status Aja */}
                  <div className="text-right w-16">
                    <span className={statusColorMap[user.status]}>
                      {user.status}
                    </span>
                  </div>

                  {/* Tombol Aksi (Delete atau Dropdown) */}
                  <div className="w-10 text-center flex justify-center items-center shrink-0">
                    {deleteMode ? (
                      <button
                        onClick={() => removeUser(user.id)}
                        className="text-red-600 font-bold text-3xl hover:text-red-800 leading-none pb-1"
                      >
                        −
                      </button>
                    ) : (
                      <div className="relative group cursor-pointer p-2">
                        <span className="text-2xl text-gray-400 hover:text-black font-bold">⋮</span>

                        {/* Dropdown Menu */}
                        <div className="absolute right-0 top-8 w-44 bg-white border border-gray-200 shadow-xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 overflow-hidden">
                          <button
                            onClick={() => toggleStatus(user.id)}
                            className="block w-full cursor-pointer text-left px-4 py-3 hover:bg-gray-100 text-sm font-medium text-black"
                          >
                            Set to {user.status === "Active" ? "Inactive" : "Active"}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}

export default Users;