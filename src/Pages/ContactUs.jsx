import { useState } from "react";

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.phone) {
      newErrors.phone = "Phone is required";
    } else if (!/^\d{10,}$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number (must be at least 10 digits)";
    }
    if (!formData.email) {
      
      
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email";
    }
    if (!formData.message) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Message Sent Successfully!");
      setFormData({ name: "", phone: "", email: "", message: "" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Contact Us</h2>

      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-gray-700">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
            />
            {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
