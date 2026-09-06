// navbar for portfolio activity
import { Link } from 'react-router-dom';

interface NavbarProps {
    isLoggedIn: boolean;
    setIsLoggedIn: (loggedIn: boolean) => void;
}

export function Navbar({ isLoggedIn, setIsLoggedIn }: NavbarProps) {
    return (
        <header>
            <nav className="flex justify-between items-center py-4 px-6 border-b border-zinc-800">
                <p className="font-bold text-white">Patrick's Portfolio</p>
                <ul className="flex gap-4">
                    <li><Link to="/" className="nav-link text-zinc-400 
                    hover:text-white transition colors">
                        About
                    </Link>
                    </li>
                    <li>
                        <Link to="/projects" className="nav-link text-zinc-400 
                        hover:text-white transition colors">
                            Projects
                        </Link>
                    </li>
                    <li>
                        <Link to="#contact" className="nav-link text-zinc-400 
                        hover:text-white transition colors">
                            Contact
                        </Link>
                    </li>
                    <li>
                        <Link to="/secret" className="nav-link text-amber-400 
                        hover:text-amber-300 font-semibold transition-colors">
                            Secret 🔒
                        </Link>
                    </li>
                    <li>
                        <button onClick={() => setIsLoggedIn(!isLoggedIn)} className={`px-3 py-1 text-xs font-semibold rounded cursor-pointer transition-colors ${isLoggedIn ? 'bg-rose-600 hover:bg-rose-500 text-white' : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                            }`}
                        >
                            {isLoggedIn ? 'Log out' : 'Log in'}
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    )
}