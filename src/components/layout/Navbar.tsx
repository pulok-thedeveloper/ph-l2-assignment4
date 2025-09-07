import { Link } from "react-router-dom";
import { ModeToggle } from "./mode-toggler";

const Navbar = () => {
    return (
        <nav className="max-w-7xl mx-auto h-16 flex justify-between items-center gap-3 px-5">
            <div>
                <span className="font-bold ml-2">Book</span>Store
            </div>
            <ul className="flex gap-5">
                <li className="hover:underline">
                    <Link to="/books">All books</Link>
                </li>
                <li className="hover:underline">
                    <Link to="/borrow-summary">Borrow Summary</Link>
                </li>
            </ul>
            <ModeToggle/>
        </nav>
    );
};

export default Navbar;