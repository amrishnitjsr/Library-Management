import { useEffect, useState } from "react";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [showIssueForm, setShowIssueForm] = useState(false);
  const [selectedBookIndex, setSelectedBookIndex] = useState(null);
  const [studentDetails, setStudentDetails] = useState({
    name: "",
    mobile: "",
    email: "",
    regNo: "",
    issueDate: "",
    returnDate: "",
  });

  useEffect(() => {
    const storedBooks = localStorage.getItem("books");
    const storedIssuedBooks = localStorage.getItem("issuedBooks");

    setBooks(storedBooks ? JSON.parse(storedBooks) : []);
    setIssuedBooks(storedIssuedBooks ? JSON.parse(storedIssuedBooks) : []);
  }, []);

  const handleDelete = (index) => {
    const updatedBooks = books.filter((_, i) => i !== index);
    setBooks(updatedBooks);
    localStorage.setItem("books", JSON.stringify(updatedBooks));
  };

  const handleIssueClick = (index) => {
    setSelectedBookIndex(index);
    setShowIssueForm(true);
  };

  const handleIssueSubmit = (e) => {
    e.preventDefault();

    if (selectedBookIndex === null || books[selectedBookIndex] === undefined) return;

    const updatedBooks = [...books];
    const book = updatedBooks[selectedBookIndex];
    book.studentDetails = { ...studentDetails };
    book.fine = 0;

    setBooks(updatedBooks);
    setIssuedBooks([...issuedBooks, book]);

    localStorage.setItem("books", JSON.stringify(updatedBooks));
    localStorage.setItem("issuedBooks", JSON.stringify([...issuedBooks, book]));

    setShowIssueForm(false);
    setStudentDetails({
      name: "",
      mobile: "",
      email: "",
      regNo: "",
      issueDate: "",
      returnDate: "",
    });
  };

  const handleReturn = (index) => {
    const updatedIssuedBooks = issuedBooks.filter((_, i) => i !== index);
    setIssuedBooks(updatedIssuedBooks);
    localStorage.setItem("issuedBooks", JSON.stringify(updatedIssuedBooks));
  };

  const calculateFine = (returnDate) => {
    if (!returnDate) return 0;
    const returnDateObj = new Date(returnDate);
    const today = new Date();
    const differenceInTime = today - returnDateObj;
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays > 0 ? differenceInDays * 10 : 0;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold mb-4">Browse Books</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {books.length > 0 ? (
          books.map((book, index) => (
            <div key={index} className="p-4 bg-white rounded-lg shadow-md">
              {book.cover && (
                <img src={book.cover} alt="Book Cover" className="w-full h-40 object-cover rounded-md mb-2" />
              )}
              <h3 className="text-xl font-semibold">{book.title}</h3>
              <p className="text-gray-700">Author: {book.author}</p>
              <p className="text-gray-600 mt-2">{book.description}</p>
              <button
                className="mt-2 bg-blue-600 text-white py-1 px-3 rounded-md"
                onClick={() => handleIssueClick(index)}
              >
                Issue Book
              </button>
              <button
                className="mt-2 bg-red-600 text-white py-1 px-3 rounded-md ml-2"
                onClick={() => handleDelete(index)}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No books available.</p>
        )}
      </div>

      {/* Issue Book Form */}
      {showIssueForm && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Issue Book</h2>
            <form onSubmit={handleIssueSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700">Student Name</label>
                <input
                  type="text"
                  name="name"
                  value={studentDetails.name}
                  onChange={(e) => setStudentDetails({ ...studentDetails, name: e.target.value })}
                  className="w-full border p-2 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Mobile Number</label>
                <input
                  type="text"
                  name="mobile"
                  value={studentDetails.mobile}
                  onChange={(e) => setStudentDetails({ ...studentDetails, mobile: e.target.value })}
                  className="w-full border p-2 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={studentDetails.email}
                  onChange={(e) => setStudentDetails({ ...studentDetails, email: e.target.value })}
                  className="w-full border p-2 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Registration No</label>
                <input
                  type="text"
                  name="regNo"
                  value={studentDetails.regNo}
                  onChange={(e) => setStudentDetails({ ...studentDetails, regNo: e.target.value })}
                  className="w-full border p-2 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Issue Date</label>
                <input
                  type="date"
                  name="issueDate"
                  value={studentDetails.issueDate}
                  onChange={(e) => setStudentDetails({ ...studentDetails, issueDate: e.target.value })}
                  className="w-full border p-2 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Return Date</label>
                <input
                  type="date"
                  name="returnDate"
                  value={studentDetails.returnDate}
                  onChange={(e) => setStudentDetails({ ...studentDetails, returnDate: e.target.value })}
                  className="w-full border p-2 rounded-md"
                  required
                />
              </div>
              <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-md">
                Confirm Issue
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Issued Books Section */}
      {issuedBooks.length > 0 && (
        <div className="mt-8 p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Issued Books</h2>
          <ul>
            {issuedBooks.map((book, index) => (
              <li key={index} className="p-3 border-b">
                <strong>{book.title}</strong> - Issued to{" "}
                <span className="text-blue-600">{book.studentDetails?.name || "Unknown"}</span>
                <p>Mobile: {book.studentDetails?.mobile || "N/A"} | Email: {book.studentDetails?.email || "N/A"}</p>
                <p>Issued on: {book.studentDetails?.issueDate} | Return by: {book.studentDetails?.returnDate}</p>
                <p className="text-red-600">Fine: ₹{calculateFine(book.studentDetails?.returnDate)}</p>
                <button className="bg-green-600 text-white py-1 px-3 rounded-md mt-2" onClick={() => handleReturn(index)}>
                  Return Book
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
