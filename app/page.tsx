import HomePage from './(home)/page';

export const revalidate = 30; // Revalidate every 30 seconds

export default function Home() {
  return <HomePage />
}