import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from React Router

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
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null); // State for storing logged-in user name

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setLoggedInUser(user); // Set state if user is already logged in
    }
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

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
        setLoggedInUser(user.name); // Store user name to state
        setError(""); // Clear error
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
      <div className="max-w-md p-4 mx-auto">
        <div className="p-8 mt-40 shadow-md rounded-3xl">
          <h1 className="mb-4 text-2xl font-bold">Hi, {loggedInUser}!</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md p-4 mx-auto">
      <div className="p-8 mt-40 shadow-md">
        <h1 className="mb-4 text-2xl font-bold">Login</h1>
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4">
          <label className="block text-sm font-medium">Email</label>
          <input
            title="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
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
            required
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Login
        </button>
        <div className="mt-4 text-center">
          <p className="text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
