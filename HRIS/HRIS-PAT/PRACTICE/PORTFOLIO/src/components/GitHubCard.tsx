import { useGitHubProfile } from '../hooks/useGitHubProfile';

export function GitHubCard() {
    const { profile, isLoading, error } = useGitHubProfile('patrickarlan');

    if (isLoading) return <div className="text-zinc-400">Loading profile...</div>;
    if (error) return <div className="text-zinc-500">Error: {error}</div>;
    if (!profile) return null;

    return (
        <div className="flex flex-col items-center md:flex-row gap-6 p-8
        bg-zinc-900 border border-zinc-800 rounded-2xl shadow-lg max-w-2xl w-full text-zinc-100">
            <img
                src={profile.avatar_url}
                alt={profile.name || profile.login}
                className="w-24 h-24 rounded-full border-2 border-zinc-700" />
            <div className="text-center md:text-left flex-1">
                <h3 className="text-2xl font-bold text-zinc-50"> {profile.name}</h3>
                <p className="text-zinc-500 text-sm">@{profile.login}</p>
                <p className="text-zinc-400 mt-2 text-sm italic">{profile.bio || "No bio available"}</p>
                <div className="flex gap-6 mt-4 text-xs font-semibold text-zinc-300">
                    <div> <span className="text-zinc-500">Repos: </span> {profile.public_repos}</div>
                    <div> <span className="text-zinc-500">Followers: </span>{profile.followers}</div>
                </div>
                <a href={profile.html_url} target="_blank" rel="noopener noreferrer"
                    className="inline-block mt-4 text-xs font-bold text-sky-400 hover:underline">
                    View Github Profile &rarr;
                </a>
            </div>
        </div>
    );
}