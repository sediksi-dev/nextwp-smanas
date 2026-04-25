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

// ── Site Config ───────────────────────────────────────────────────────────────── 
export type WpSiteInfo = {
    name: string;
    description: string;
    url: string;
    home: string;
    logo_id: number | null;
    logo_url: string | null;
    icon_id: string | null;
    icon_url: string | null;
};

export type SliderItem = {
    title: string;
    subtitle: string;
    description: string;
    image: string;
    button_text_1: string;
    button_url_1: string;
    button_text_2: string;
    button_url_2: string;
};

export type SliderSettings = {
    items: SliderItem[];
};


export type GreetingsSectionConfig = {
    greetings_title: string;
    greetings_subtitle: string;
    greetings_photo: {
        id: number;
        url: string;
    };
    greetings_description: string;
};

export type SmanasSiteConfig = {
    site: WpSiteInfo;
    slider: SliderSettings;
    greetings: GreetingsSectionConfig;
}

// ──── Achievements ────────────────────────────────────────────────────────────────

export type AchievementScope = "kecamatan" | "regional" | "provinsi" | "nasional" | "internasional" | "lainnya";

export type Achievement = {
    _ID: number;
    title: string;
    scope: AchievementScope;
    year: number;
    awardee?: string;
    image?: string;
    host?: string;
};
