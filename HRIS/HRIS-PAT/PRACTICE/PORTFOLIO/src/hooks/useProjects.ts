// Task 4: Move Project Data to a Custom Hook

import { useState } from "react";

export interface Project {
    title: string;
    description: string;
    tags: string[];
    projectUrl: string;
}

const INITIAL_PROJECTS: Project[] = [{
    title: "AFICS (CAPSTONE PROJECT)",
    description: "This is a description of my first project.",
    tags: ["Python1", " tkinter", "CSS"],
    projectUrl: "https://github.com/"
}, {
    title: "HRIS WEB APP",
    description: "This is a description of my second project.",
    tags: ["React", "C#", "HTML", "CSS"],
    projectUrl: "https://github.com/"
}, {
    title: "HOMELAB SERVER",
    description: "This is a description of my third project.",
    tags: ["Ubuntu", "Linux", "OpenSSH"],
    projectUrl: "https://github.com/"
}]

export function useProjects() {
    const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);

    const addProject = (newProject: Project) => {
        setProjects((prevProjects) => [...prevProjects, newProject]);
    };

    return { projects, addProject }
}