// navbar for portfolio activity
export function Navbar() {
    return (
        <header>
            <nav className="flex justify-between items-center py-4 px-6 border-b border-zinc-800">
                <p className="font-bold text-white">Patrick's Portfolio</p>
                <ul className="flex gap-4">
                    <li><a href="#about" className="nav-link text-zinc-400 
                    hover:text-white transition colors">
                        About
                    </a>
                    </li>
                    <li>
                        <a href="#projects" className="nav-link text-zinc-400 
                        hover:text-white transition colors">
                            Projects
                        </a>
                    </li>
                    <li>
                        <a href="#contact" className="nav-link text-zinc-400 
                        hover:text-white transition colors">
                            Contact
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}