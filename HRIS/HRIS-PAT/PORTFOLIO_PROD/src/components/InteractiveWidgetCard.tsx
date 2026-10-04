import { useState, useEffect } from 'react';
import { ThumbsUp, Activity } from 'lucide-react';

export function InteractiveWidgetCard() {
    const [likes, setLikes] = useState<number>(0);
    const [time, setTime] = useState<string>('');

    useEffect(() => {
        const update = () => setTime(new Date().toLocaleTimeString());
        update();
        const interval = setInterval(update, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="col-span-1 rounded-2xl bg-[#5B2A86]/25 border boroder-[#5B2A86]/50 hover:border-[#9B6DCC]/60 p-7 flex flex-col
        justify-between transition-all duration-300">

            <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-[#FFD1E8] flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5" /> Live Widget
                </span>
                <span className="text-xs font-mono text-[#9B6DCC]">{time}</span>
            </div>

            <div>
                <h4 className="text-base font-bold text-[#F2D7FF] mb-1">Interactive React State</h4>
                <p className="text-xs text-[#F2D7FF]/70 mb-4">
                    Demonstrates client-side state persistence and lifecycle hooks.
                </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#5B2A86]/40">
                <span className="text-sm font-semibold text-[#F2D7FF]">
                    Likes: <span className="text-[#FFD1E8] font-bold">{likes}</span>
                </span>
                <button
                    onClick={() => setLikes(likes + 1)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold 
                     bg-[#5B2A86]/50 text-[#FFD1E8] border border-[#9B6DCC]/40 
                     hover:bg-[#5B2A86]/80 hover:border-[#FFD1E8]/60 transition-all cursor-pointer"
                >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    Give Kudos
                </button>
            </div>
        </div>
    )
}