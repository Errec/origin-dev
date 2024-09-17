import { ReactNode } from 'react';

export default function HomeLayout({
  hero,
  benefits,
  technologies,
  projects,
  contact,
}: {
  hero: ReactNode;
  benefits: ReactNode;
  technologies: ReactNode;
  projects: ReactNode;
  contact: ReactNode;
}) {
  return (
    <main>
      {hero}
      {technologies}
      {projects}
      {benefits}
      {contact}
    </main>
  );
}
