import { useEffect, useState } from 'react'
import { GitHubCard } from '../components/GitHubCard'
import { useNavigate } from 'react-router-dom'

export function HomePage() {
    const [likes, setLikes] = useState(0)
    const navigate = useNavigate()

    const handleLikeClick = () => {
        setLikes(likes + 1)
    }

    useEffect(() => {
        console.log("Likes: ", likes)
    }, [likes])

    return (
        <>
            <section className="flex flex-col items-center text-center py-12">
                <h1 className="text-3xl font-bold">Hi! These are my projects!</h1>
                <p className="m-2 text-zinc-400">
                    I am a Computer Engineering Student with the passion to build mini projects!
                </p>

                <div className="flex items-center justify-center gap-4 mt-8">
                    <p className='bg-white text-zinc-950 px-3 py-2 border border-zinc-300 rounded-lg font-semibold'>
                        Likes: {likes}
                    </p>
                    <button onClick={handleLikeClick} className='px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 cursor-pointer transition-colors'>
                        👍 Like Portfolio
                    </button>

                    <button
                        onClick={() => navigate('/projects')}
                        className='px-4 py-2 bg-zinc-100 text-zinc-900 font-bold rounded 
                        hover:bg-zinc-300 cursor-pointer transition-colors'>
                        View My Projects &rarr;
                    </button>
                </div>
            </section>

            <section id="about" className='flex flex-col items-center py-12 px-6'>
                <h2 className="text-3xl font-bold mb-6 text-zinc-50">About Me</h2>
                <GitHubCard />
            </section>
        </>
    )

}