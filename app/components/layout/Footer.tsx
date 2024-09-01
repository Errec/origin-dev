import ScrollToTopButton from '@/components/ui/ScrollToTopButton'; // Import the new component
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="h-10 px-10 flex justify-between cursor-default"
      role="contentinfo"
      style={{ backgroundColor: "transparent" }}
    >
      <p className="font-light">
        <span className="bg-white text-black">ORIGIN</span>DEV<span className="text-[0.7em] relative left-[0.08em] -top-[0.6em] font">®</span> ©{currentYear}
      </p>
      <div className="flex space-x-6">
        <a
          href="https://github.com/Errec"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit Raniro Coelho's GitHub profile"
        >
          <GitHubLogoIcon className="w-5 h-5" />
        </a>
        <a
          href="https://www.linkedin.com/in/raniro/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit Raniro Coelho's LinkedIn profile"
        >
          <LinkedInLogoIcon className="w-5 h-5" />
        </a>
        <ScrollToTopButton />
      </div>
    </footer>
  );
}
