import { ReactNode } from 'react';

export default function HomeLayout({
  hero,
  technologies,
  projects,
  contact,
}: {
  hero: ReactNode;
  technologies: ReactNode;
  projects: ReactNode;
  contact: ReactNode;
}) {
  return (
    <main>
      {hero}
      {technologies}
      {projects}
      {contact}
    </main>
  );
}
