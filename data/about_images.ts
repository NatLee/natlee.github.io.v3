export interface AboutImage {
    url: string;
    alt: string;
    caption?: string;
}

export const aboutImages: AboutImage[] = [
    {
        url: "/assets/placeholder-1.jpg",
        alt: "Trading Strategy Meeting",
        caption: "Analyzing market trends with the team"
    },
    {
        url: "/assets/placeholder-2.jpg",
        alt: "System Architecture",
        caption: "Designing high-frequency trading systems"
    },
    {
        url: "/assets/placeholder-3.jpg",
        alt: "Global Operations",
        caption: "Monitoring global markets 24/7"
    }
];
