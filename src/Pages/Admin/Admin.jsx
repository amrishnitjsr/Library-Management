import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [book, setBook] = useState({ title: "", author: "", description: "", cover: "" });

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (credentials.username === "admin" && credentials.password === "admin123") {
      localStorage.setItem("role", "admin");
      setIsAuthenticated(true);
    } else {
      alert("Invalid admin credentials!");
    }
  };

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setBook({ ...book, cover: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let books = JSON.parse(localStorage.getItem("books")) || [];
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
    setBook({ title: "", author: "", description: "", cover: "" });
    alert("Book Added Successfully!");
  };

  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/login");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h2 className="text-3xl font-bold mb-4">Admin Login</h2>
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-700">Username</label>
              <input
                type="text"
                name="username"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                className="w-full border p-2 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="w-full border p-2 rounded-md"
                required
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h2 className="text-3xl font-bold mb-4">Admin Panel</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Book Title</label>
            <input
              type="text"
              name="title"
              value={book.title}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Author</label>
            <input
              type="text"
              name="author"
              value={book.author}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Book Description</label>
            <textarea
              name="description"
              value={book.description}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Book Cover</label>
            <input type="file" accept="image/*" onChange={handleFileChange} className="w-full border p-2 rounded-md" />
          </div>
          {book.cover && (
            <div className="mt-2">
              <img src={book.cover} alt="Book Cover" className="w-full h-40 object-cover rounded-md" />
            </div>
          )}
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-md">
            Add Book
          </button>
        </form>
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 text-white py-2 rounded-md mt-4"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
