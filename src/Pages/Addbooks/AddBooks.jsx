
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addBook } from '../../utils/bookSlice';
import { nanoid } from 'nanoid';

const AddBooks = () => {
  const [error, setError] = useState('');
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    type: '',
    image: null,
    description: '',
  });

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setBookData({
      ...bookData,
      [name]: files ? files[0] : value,
    });
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const { title, author, image, description } = bookData;

    if (!title || !author || !image || !description) {
      setError('Please ensure all fields are entered.');
      return;
    }

    const newBook = {
      id: nanoid(),
      title,
      img: URL.createObjectURL(image),
      type: bookData.type,
      author,
      description,
      isNew: true,
    };

    dispatch(addBook(newBook));
    navigate('/browsebook');
  };

  return (
    <form className="md:w-1/2 w-full font-Poppins p-12 mx-auto" onSubmit={handleSubmit}>
      <h2 className="font-semibold text-2xl mb-4 text-center">Add New Book</h2>

      <div className="mb-4">
        <label className="font-medium text-lg text-gray-600 mb-2">Title</label>
        <input
          type="text"
          name="title"
          value={bookData.title}
          onChange={handleChange}
          placeholder="Enter the book title"
          className="w-full h-12 pl-2 pr-5 border-2 border-black outline-none"
        />
      </div>

      <div className="mb-4">
        <label className="font-medium text-lg text-gray-600 mb-2">Author</label>
        <input
          type="text"
          name="author"
          value={bookData.author}
          onChange={handleChange}
          placeholder="Enter the author's name"
          className="w-full h-12 pl-2 pr-5 border-2 border-black outline-none"
        />
      </div>

      <div className="mb-4">
        <label className="font-medium text-lg text-gray-600 mb-2">Book Type</label>
        <input
          type="text"
          name="type"
          value={bookData.type}
          onChange={handleChange}
          placeholder="e.g., Fantasy, Non-Fiction, Crime, Fiction, Science"
          className="w-full h-12 pl-2 pr-5 border-2 border-black outline-none"
        />
      </div>

      <div className="mb-4">
        <label className="font-medium text-lg text-gray-600 mb-2">Description</label>
        <textarea
          name="description"
          value={bookData.description}
          onChange={handleChange}
          placeholder="Enter a description"
          className="w-full h-12 pl-2 pr-5 border-2 border-black outline-none"
          rows="5"
        ></textarea>
      </div>

      <div className="mb-4 flex gap-4">
        <label className="font-medium text-lg text-gray-600 mb-2">Upload Image</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="outline-none"
        />
      </div>

      {error && <p className="font-medium text-red-500 text-base mb-4">{error}</p>}

      <button type="submit" className="px-6 py-2 bg-black text-white font-semibold">
        Add Book
      </button>
    </form>
  );
};

export default AddBooks;
