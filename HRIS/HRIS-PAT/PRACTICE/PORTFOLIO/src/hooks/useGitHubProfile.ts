import { useState, useEffect } from 'react';

interface GitHubUser {
    login: string;
    name: string;
    public_repos: number;
    followers: number;
    avatar_url: string;
    bio: string | null;
    html_url: string;
}

export function useGitHubProfile(username: string) {
    const [profile, setProfile] = useState<GitHubUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchProfie() {
            setIsLoading(true);
            try {
                const response = await
                    fetch(`https://api.github.com/users/${username}`);
                if (!response.ok) throw new Error(`Error: ${response.status}`);

                const data: GitHubUser = await response.json();
                setProfile(data);
            } catch (err) {
                setError(`Error: ${err}`);
            } finally {
                setIsLoading(false);
            }
        }
        fetchProfie();
    }, [username]);

    return { profile, isLoading, error };
}