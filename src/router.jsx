import { createBrowserRouter } from "react-router-dom"; // ✅ Import this!
import App from "./App";
import Home from "./Pages/Home/Home";
import Books from "./Pages/Browsebook/Books";
import AddBooks from "./Pages/Addbooks/AddBooks";
import BookDetail from "./Pages/Bookdetail/BookDetail";
import Error from "./Pages/Error/Error";
import BookPage from "./Components/BookPage";
import Login from "./Pages/Login/Login"; // ✅ Add Login Page
import Admin from "./Pages/Admin/Admin"; // ✅ Add Admin Page
import Signup from "./Pages/SignUp/SignUp";
const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/browsebook', element: <Books /> },
            { path: '/addbooks', element: <AddBooks /> },
            { path: '/book/:id', element: <BookDetail /> },
            { path: '/books/:category', element: <BookPage /> },
            { path: '/login', element: <Login /> },   // ✅ Add Login Route
            { path: '/admin', element: <Admin /> },
            { path: '/signup', element: <Signup /> }
        ],
        errorElement: <Error />
    }
]);

export default router;
