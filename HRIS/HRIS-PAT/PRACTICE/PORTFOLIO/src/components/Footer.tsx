// Footer for portfolio activity    
export function Footer() {
    return (
        <footer>
            <nav className="flex justify-between items-center py-4 px-6 border-t border-zinc-800">
                <p className="text-zinc-400">Copyright &copy; {new Date().getFullYear()} Patrick's Portfolio</p>
                <ul className="flex gap-4">
                    <li><a href="#about" className="nav-link text-zinc-400 
                hover:text-white transition-colors">About</a></li>
                    <li><a href="#projects" className="nav-link text-zinc-400 
                hover:text-white transition-colors">Projects</a></li>
                    <li><a href="#contact" className="nav-link text-zinc-400 
                hover:text-white transition-colors">Contact</a></li>
                </ul>
            </nav>
        </footer>
    )
}