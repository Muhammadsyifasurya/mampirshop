import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link dari React Router

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  avatar: string;
}

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null); // State untuk menyimpan nama pengguna

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setLoggedInUser(user); // Set state jika sudah login
    }
  }, []);

  const handleLogin = async () => {
    try {
      const response = await fetch("https://api.escuelajs.co/api/v1/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const users: User[] = await response.json();

      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        localStorage.setItem("user", user.name);
        setLoggedInUser(user.name); // Simpan nama pengguna ke state
        setError("");
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("An error occurred during login");
      console.log(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setLoggedInUser(null);
  };

  if (loggedInUser) {
    return (
      <div className="max-w-md mx-auto p-4">
        <div className="mt-40 shadow-md p-8 rounded-3xl">
          <h1 className="text-2xl font-bold mb-4">Hai, {loggedInUser}!</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="mt-40 p-8 shadow-md">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4">
          <label className="block text-sm font-medium">Email</label>
          <input
            title="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Password</label>
          <input
            title="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
        >
          Login
        </button>
        <div className="mt-4 text-center">
          <p className="text-sm">
            Belum punya akun?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Daftar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
