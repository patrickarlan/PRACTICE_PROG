import { Hero } from "../components/Hero";
import { BentoGrid } from "../components/BentoGrid";

export function HomePage() {
    return (
        <>
            {/* 1. Home Section — anchor target for Navbar #home link */}
            <section id="home" className="scroll-mt-20">
                <Hero />
                <BentoGrid />
            </section>
        </>
    );
}