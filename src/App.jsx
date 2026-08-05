// import { Routes, Route } from "react-router-dom";
// import Login from "./pages/login";
// import Dashboard from "./pages/dashboard";
// import ListDevice from "./pages/ListDevice";

// export default function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Login />} />
//       <Route path="/dashboard" element={<Dashboard />} />
//       <Route path="/ListDevice" element={<ListDevice />} />
//     </Routes>
    
//   );
// }

// <Routes>

// <Route path="/" element={<Login />} />

// <Route path="/dashboard" element={<Dashboard />} />

// <Route path="/ListDevice" element={<ListDevice />} />

// </Routes>


import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/dashboard";
import Device from "./pages/ListDevice";
import Users from "./pages/Users";
import DashboardLayout from "./Layout/DashboardLayout";

function App() {
  return (

    <Routes>

      <Route path="/" element={<Login />} />
      
      <Route element={<DashboardLayout />}>

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/device" element={<Device />} />
        <Route path="/users" element={<Users />} />

      </Route>

    </Routes>

  );
}

export default App;