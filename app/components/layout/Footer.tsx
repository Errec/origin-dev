import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="fixed bottom-0 left-0 right-0 h-16 p-4 dark:bg-stone-800 bg-stone-600 opacity-90 flex flex-col items-center justify-center">
      <div className="flex gap-6 mb-1">
        <a href="https://github.com/Errec" target="_blank" rel="noopener noreferrer" className="text-stone-200">
          <GitHubLogoIcon className="w-5 h-5" />
        </a>
        <a href="https://www.linkedin.com/in/raniro/" target="_blank" rel="noopener noreferrer" className="text-stone-200">
          <LinkedInLogoIcon className="w-5 h-5" />
        </a>
      </div>
      <p className="text-sm dark:text-stone-200 text-stone-50">
        Copyright © {currentYear} Raniro Coelho, Errec Inc.
      </p>
    </footer>
  );
}
