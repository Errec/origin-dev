import HomePage from './components/pages/home/HomePage';

export const revalidate = 30; // Revalidate every 30 seconds

export default function Home() {
  return <HomePage />
}