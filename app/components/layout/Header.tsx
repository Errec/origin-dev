import Navbar from '../common/Navbar';

export default function Header() {
  return (
    <header className="z-10 fixed top-0 left-0 right-0 h-18 py-4 px-4 md:px-12 lg:px-24 dark:bg-stone-800 bg-stone-500 opacity-70">
      <Navbar />
    </header>
  );
}
