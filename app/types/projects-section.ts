export type Project = {
    title: string;
    subtitle: string;
    image: {
        asset: {
            url: string;
        };
    };
    hoverVideo?: {
        asset: {
            url: string;
        };
    };
};

export type ProjectsSection = {
    title: string;
    projects: Project[];
};
