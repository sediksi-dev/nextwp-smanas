
export type SiteLink = {
    label: string;
    href: string;
};

export type NavChild = {
    label: string;
    href: string;
};

export type NavItem = {
    label: string;
    href?: string;
    children?: NavChild[];
};
