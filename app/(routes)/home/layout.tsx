import { ReactNode } from 'react';

export default function HomeLayout({
    hero,
    technologies,
    projects,
}: {
    hero: ReactNode;
    technologies: ReactNode;
    projects: ReactNode;
}) {
    return (
        <main>
        {hero}
        {technologies}
        {projects}
        </main>
    );
}
