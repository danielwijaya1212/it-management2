import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const users = [
    { username: "daniel.wijaya", password: "@Dan12345" },
    { username: "naufal.prawiro", password: "@Nau12345" }
  ];

  const handleLogin = (e) => {
    e.preventDefault();

    const success = users.some(
      (u) => u.username === username && u.password === password
    );

    
    if (success) {
      // login berhasil (tidak disimpan ke localStorage supaya user harus login ulang)
      navigate("/dashboard");
    } else {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-700 p-6">
      <form
          onSubmit={handleLogin}
          className="w-full max-w-sm bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl"
        >
      <div className="w-full max-w-sm bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h1>

        

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)} 
          className="w-full border border-gray-300 px-4 py-2 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 px-4 py-2 rounded-lg mb-6 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Login
        </button>
      </div>
      </form>
    </div>
  );
}
