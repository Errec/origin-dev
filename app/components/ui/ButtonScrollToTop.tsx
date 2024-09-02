'use client';

import { Button } from "@/components/ui/Button";
import { DoubleArrowUpIcon } from "@radix-ui/react-icons";

export default function ButtonScrollToTop() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Button
            onClick={scrollToTop}
            ariaLabel="Back to the top"
            tooltip="Top"
            variant="ghost"
            size="icon"
            className="flex items-start justify-center font-bold hover:bg-transparent"
        >
            <DoubleArrowUpIcon className="w-5 h-5" />
        </Button>
    );
}
