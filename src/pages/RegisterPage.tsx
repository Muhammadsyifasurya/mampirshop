import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      if (!name || !email || !password) {
        setError("All fields are required");
        return;
      }

      const newUser = {
        name,
        email,
        password,
        avatar: avatar || "https://via.placeholder.com/150",
      };

      const response = await fetch("https://api.escuelajs.co/api/v1/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error("Failed to register user");
      }

      setError("");
      setSuccess(true); // Tampilkan popup sukses

      // Reset form
      setName("");
      setEmail("");
      setPassword("");
      setAvatar("");

      // Redirect setelah 2 detik
      setTimeout(() => {
        setSuccess(false);
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError("An error occurred during registration");
      console.log(err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 rounded">
      <div className="mt-48 shadow-xl p-8">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        {error && <p className="text-red-500">{error}</p>}
        {success && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded shadow-xl text-center">
              <h2 className="text-green-500 text-lg font-bold mb-4">
                Account Registered Successfully!
              </h2>
              <p>Redirecting to login...</p>
            </div>
          </div>
        )}
        <div className="mb-4">
          <label className="block text-sm font-medium">Name</label>
          <input
            title="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
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
        <div className="mb-4">
          <label className="block text-sm font-medium">
            Avatar URL (Optional)
          </label>
          <input
            title="avatar"
            type="text"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          onClick={handleRegister}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
