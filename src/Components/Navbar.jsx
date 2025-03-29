import { Link } from "react-router-dom";
import { useState } from "react";
import { HiOutlineMenu } from "react-icons/hi";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="w-full">
            <div className="bg-white bg-opacity-65 font-Poppins flex justify-between items-center p-5 sticky top-0">
                <h2 className="font-Oswald font-base text-2xl text-black">eBook</h2>
                <ul className="hidden md:flex items-center gap-5 text-medium font-base cursor-pointer">
                    <Link to="/"><li>Home</li></Link>
                    <Link to="/browsebook"><li>Browse Book</li></Link>
                    <Link to="/admin"><li>Admin</li></Link>
                    <Link to="/login">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                            Login
                        </button>
                    </Link>
                    <Link to="/signup">
                        <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                            Signup
                        </button>
                    </Link>
                </ul>
                <div className="md:hidden">
                    <HiOutlineMenu className="w-8 h-8" onClick={() => setIsOpen(!isOpen)} />
                </div>
            </div>

            {/* Mobile Navigation */}
            <div className="p-2">
                {isOpen && (
                    <ul className="md:hidden flex flex-col justify-start gap-5 bg-black rounded-sm text-white w-full text-medium font-base cursor-pointer p-3">
                        <Link to="/"><li>Home</li></Link>
                        <Link to="/browsebook"><li>Browse Book</li></Link>
                        <Link to="/admin"><li>Admin</li></Link>
                        <Link to="/login">
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                                Login
                            </button>
                        </Link>
                        <Link to="/signup">
                            <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                                Signup
                            </button>
                        </Link>
                    </ul>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
