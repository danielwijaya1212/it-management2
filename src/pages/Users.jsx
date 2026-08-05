import { useState } from "react";

function Users() {
  const [users, setUsers] = useState([
    { name: "Daniel" },
    { name: "Naufal" },
    { name: "Udin" },
  ]);

  const [newUser, setNewUser] = useState("");
  const [deleteMode, setDeleteMode] = useState(false);

  const addUser = () => {
    if (newUser.trim() === "") return;

    setUsers([...users, { name: newUser }]);
    setNewUser("");
  };

  const removeUser = (name) => {
    setUsers(users.filter((user) => user.name !== name));
  };
  
  return (
  <div className="p-8 w-full min-h-screen bg-[#F5F7FA]">
    <div className="bg-orange-100 rounded-3xl shadow-sm border border-gray-200 p-6">

      {/* Header*/}
      <section className="mb-10">
        <div className="flex justify-between items-center mb-3">
          <div>
            <h1 className="text-3xl font-bold">
              User Management
            </h1>

            <p className="text-gray-500">
              Manage all employee accounts
            </p>
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
            placeholder="Enter employee name..."
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
            className={`px-6 rounded-xl font-semibold transition ${deleteMode
              ? "bg-gray-700 hover:bg-gray-800 text-white"
              : "bg-[#DC2626] hover:bg-[#B91C1C] text-white"
              }`}
          >
            {deleteMode ? "Cancel" : "Delete User"}
          </button>

        </div>
      </section>

      {/* USER TABLE */}
      <section className="mb-10">
        <div className="overflow-hidden rounded-xl border">

          <table className="w-full">

            <thead className="bg-slate-50">

              <tr>

                <th className="px-6 py-4 text-left">
                  User
                </th>

                <th className="px-6 py-4 text-left">
                  Status
                </th>

                <th className="px-6 py-4 text-center">
                  {deleteMode ? "Delete" : "Action"}
                </th>

              </tr>

            </thead>
            <tbody>

              {users.map((user, index) => (

                <tr
                  key={index}
                  className="hover:bg-slate-50 transition-all duration-200 border-t"
                >

                  <td className="px-6 py-4 flex items-center gap-3">

                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold">

                      {user.name.charAt(0)}

                    </div>

                    <div>

                      <p className="font-semibold">
                        {user.name}
                      </p>

                      <p className="text-gray-400 text-sm">
                        Employee
                      </p>

                    </div>

                  </td>

                  <td className="px-6">

                    <span className="bg-emerald-100 text-emerald-700 font-medium px-3 py-1 rounded-full text-sm">

                      Active

                    </span>

                  </td>

                  <td className="text-center">

                    {deleteMode ? (
                      <button
                        onClick={() => removeUser(user.name)}
                        className="text-red-600 font-bold text-xl hover:text-red-800"
                      >
                        −
                      </button>
                    ) : (
                      <button className="text-blue-600 hover:underline">
                        Edit
                      </button>
                    )}

                  </td>

                </tr>

              ))}

            </tbody>
          </table>
        </div>
      </section>
    </div>
  </div>
);
}
export default Users;