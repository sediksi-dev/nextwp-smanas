export type WpRendered = {
    rendered: string;
};

export type WpPost = {
    id: number;
    slug: string;
    date: string;
    date_gmt: string;
    guid: WpRendered;
    modified: string;
    modified_gmt: string;
    status: string;
    type: string;
    link: string;
    title: WpRendered;
    content: WpRendered & { protected: boolean };
    excerpt: WpRendered & { protected: boolean };
    author: number;
    featured_media: number;
    comment_status: string;
    ping_status: string;
    sticky: boolean;
    template: string;
    format: string;
    meta: {
        footnotes: string;
    };
    categories: number[];
    tags: number[];
    class_list: string[];
};

export type WpCategory = {
    id: number;
    count: number;
    description: string;
    link: string;
    name: string;
    slug: string;
    taxonomy: string;
    parent: number;
};

export type WpTag = {
    id: number;
    count: number;
    description: string;
    link: string;
    name: string;
    slug: string;
    taxonomy: string;
};

export type WpMediaItem = {
    id: number;
    date: string;
    slug: string;
    status: string;
    type: string;
    link: string;
    title: WpRendered;
    author: number;
    description: WpRendered;
    caption: WpRendered;
    alt_text: string;
    media_type: string;
    mime_type: string;
    source_url: string;
}

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

export type SEOConfig = {
    smanas_meta_title: string;
    smanas_meta_description: string;
    smanas_global_image: string;
    smanas_site_logo: string;
    smanas_site_favicon: string;
};

export type PPDBConfig = {
    header_button_text: string;
    header_button_url: string;
    active_ppdb: number | null;
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
    greetings_section_title: string;
    greetings_section_description?: string;
    greetings_section_eyebrow?: string;
    greetings_title: string;
    greetings_subtitle: string;
    greetings_photo: {
        id: number;
        url: string;
    };
    greetings_description: string;
};

export type AchievementsSectionConfig = {
    achievements_section_title: string;
    achievements_section_description?: string;
    achievements_section_eyebrow?: string;
};

export type ArticleCategory = {
    id: number;
    name: string;
    slug: string;
};

export type ArticleGroup = {
    title: string;
    category: ArticleCategory;
};

export type ArticleSectionConfig = {
    article_section_title: string;
    article_section_description?: string;
    article_section_eyebrow?: string;
    article_group_title_1?: string;
    article_group_category_1?: ArticleCategory;
    article_group_title_2?: string;
    article_group_category_2?: ArticleCategory;
    article_group_title_3?: string;
    article_group_category_3?: ArticleCategory;
};

export type GallerySectionConfig = {
    gallery_section_title: string;
    gallery_section_description?: string;
    gallery_section_eyebrow?: string;
};

export type YoutubeSectionConfig = {
    youtube_section_title: string;
    youtube_section_description?: string;
    youtube_section_eyebrow?: string;
    youtube_channel_id: string;
    youtube_channel_url: string;
};

export type SmanasSiteConfig = {
    site: WpSiteInfo;
    seo: SEOConfig;
    ppdb: PPDBConfig;
    slider: SliderSettings;
    greetings: GreetingsSectionConfig;
    achievements: AchievementsSectionConfig;
    articles: ArticleSectionConfig;
    gallery: GallerySectionConfig;
    youtube: YoutubeSectionConfig;
}

// ── Profiles Config ───────────────────────────────────────────────────────────────────────────

export type AboutUsHeadings = {
    about_us_title: string;
    about_us_description: string;
    profile_page_title: string;
    profile_page_description: string;
    vision_page_title: string;
    vision_page_description: string;
    structure_page_title: string;
    structure_page_description: string;
};

export type ProfilePage = {
    profile_photo: string;
    profile_name: string;
    profile_role: string;
    profile_intro: string;
    profile_history_title: string;
    profile_history_content?: string;
    profile_emblem_title: string;
    profile_emblem_image: string;
    profile_emblem_content?: string;
    profile_committee_title: string;
    profile_committee_content?: string;
    profile_march_title: string;
    profile_march_content?: string;
};

export type VisionMissionPage = {
    school_vision: string;
    school_mission: Array<{ school_mission_item: string }>;
    school_goal: Array<{ school_goal_item: string }>;
};

export type OrganizationStructurePage = {
    structure_principal: string;
    structure_vice_1: string;
    structure_vice_2: string;
    structure_vice_3: string;
    structure_vice_4: string;
    structure_hoa: string;
    structure_treasurer: string;
};

export type SmanasProfilesConfig = {
    headings: AboutUsHeadings;
    profile: ProfilePage;
    vision_mission: VisionMissionPage;
    organization_structure: OrganizationStructurePage;
};

// ── Contact Config ────────────────────────────────────────────────────────────────────────────

export type SmanasContactConfig = {
    headings: {
        contact_page_title: string;
        contact_page_subtitle: string;
        contact_page_description: string;
    };
    office: {
        contact_address: string;
        contact_opentime: string;
        contact_closetime: string;
        contact_openday: string;
        contact_closeday: string;
    };
    contact: {
        contact_email: string;
        contact_phone_1: string;
        contact_phone_2: string;
        contact_facebook: string;
        contact_instagram: string;
        contact_threads: string;
        contact_tiktok: string;
        contact_youtube: string;
        contact_linkedin: string;
    };
};

// ── PPDB (custom post type) ───────────────────────────────────────────────────────────────────

/** Normalised related link item from meta.related_links */
export type PpdbRelatedLink = {
    title: string;
    url: string;
};

export type WpPpdbMeta = {
    /** URL to the promotional flyer image — used as featured image */
    flyer: string;
    /** Admission year, e.g. "2021" */
    year_open: string;
    /** Array of WP post/page IDs (as strings) to display in the sidebar */
    related_content: string[];
    /**
     * External links for the sidebar.
     * Can be `""` (no links) or an object like `{ "item-0": { title, url }, "item-1": ... }`
     */
    related_links: "" | Record<string, PpdbRelatedLink>;
    /** URL to an xlsx file with admission results */
    admission_results: string;
    footnotes: string;
};

export type WpPpdbItem = {
    id: number;
    slug: string;
    date: string;
    date_gmt: string;
    modified: string;
    status: string;
    type: string;
    link: string;
    title: WpRendered;
    content: WpRendered & { protected: boolean };
    template: string;
    meta: WpPpdbMeta;
    class_list: string[];
};

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

// ──── Gallery (jet-cct) ──────────────────────────────────────────────────────────

export type WpGalleryItem = {
    _ID: string;
    gallery_title: string;
    gallery_description: string;
    gallery_photos: string;
    cct_status: string;
    cct_author_id: string;
    cct_created: string;
    cct_modified: string;
    cct_slug: string;
};

// ──── Teachers (jet-cct) ─────────────────────────────────────────────────────────

export type TeacherCategory = "kepsek" | "wakasek" | "guru" | "staf";

export type WpTeacher = {
    _ID: string;
    name: string;
    role: string;
    category: TeacherCategory;
    motto: string;
    birthplace: string;
    birthdate: string;
    email: string;
    photo: string;
    nuptk: string;
    cct_status: string;
    cct_author_id: string;
    cct_created: string;
    cct_modified: string;
    cct_slug: string;
};

