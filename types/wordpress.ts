export type WpRendered = {
    rendered: string;
};

export type WpPost = {
    id: number;
    slug: string;
    date: string;
    title: WpRendered;
    excerpt?: WpRendered;
    content?: WpRendered;
};

export type WpMedia = {
    id: number;
    source_url: string;
    alt_text?: string;
};

export type WpSimpleItem = {
    id: number;
    slug: string;
    title: WpRendered;
    content?: WpRendered;
};
