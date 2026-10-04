// src/components/BentoGrid.tsx
import { FeaturedProjectCard } from './FeaturedProjectCard';
import { TechStackCard } from './TechStackCard';
import { InteractiveWidgetCard } from './InteractiveWidgetCard';
import { AboutCard } from './AboutCard';

export function BentoGrid() {
    return (
        <section className="w-full max-w-6xl mx-auto px-6 pb-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FeaturedProjectCard />
                <TechStackCard />
                <InteractiveWidgetCard />
                <AboutCard />
            </div>
        </section>
    );
}