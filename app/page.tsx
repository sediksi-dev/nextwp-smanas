import { PageWrap } from "@/components/layout/page-wrap";
import { HeroSection } from "@/components/sections/hero-section";
import { SambutanSection } from "@/components/sections/sambutan-section";
import { PrestasiSection } from "@/components/sections/prestasi-section";
import { PostsSection } from "@/components/sections/posts-section";
import { GaleriSection } from "@/components/sections/galeri-section";
import { YoutubeSection } from "@/components/sections/youtube-section";
import { getAchievementsWithImage, getSiteConfig } from "@/lib/wordpress";
import { SlideUp } from "@/components/motion/slide-up";

// ── YouTube channel config ───────────────────────────────────────────
// Edit these two constants to point to a different channel.
const YOUTUBE_CHANNEL_ID = "UCNGkr7r-39mCt897G7HB2nA";
const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@smanasionalmalang910/videos";
// ────────────────────────────────────────────────────────────────────

export default async function Home() {
  const config = await getSiteConfig();

  // Configuration for Hero Section (Slider)
  const sliderItems = config?.slider.items || [];
  if (sliderItems.length === 0) {
    sliderItems.push({
      title: "Selamat Datang di SMANAS",
      subtitle: "Sekolah Menengah Atas Nasional Malang",
      description: "Membangun Generasi Unggul dengan Pendidikan Berkualitas",
      image: "/default-slider.jpg",
      button_text_1: "Jelajahi Sekolah",
      button_url_1: "#",
      button_text_2: "Hubungi Kami",
      button_url_2: "#",
    });
  }

  // Configuration for Sambutan Section (Greetings)
  const greetingsConfig = config?.greetings;
  const sambutanProps = greetingsConfig
    ? {
      name: greetingsConfig.greetings_title,
      role: greetingsConfig.greetings_subtitle,
      photo: greetingsConfig.greetings_photo.url,
      message: greetingsConfig.greetings_description,
      section: {
        title: greetingsConfig.greetings_section_title,
        description: greetingsConfig.greetings_section_description,
        eyebrow: greetingsConfig.greetings_section_eyebrow,
      },
    }
    : undefined;

  // Configuration for Prestasi Section (Achievements)
  const achievements = await getAchievementsWithImage();
  const achievementsProps = config?.achievements
    ? {
      achievements_section_title: config.achievements.achievements_section_title,
      achievements_section_description: config.achievements.achievements_section_description,
      achievements_section_eyebrow: config.achievements.achievements_section_eyebrow,
    }
    : undefined;

  // Configuration for Article Sections
  const postsSectionConfig = config?.articles;
  const postsSectionProps = postsSectionConfig
    ? {
      article_section_title: postsSectionConfig.article_section_title,
      article_section_description: postsSectionConfig.article_section_description,
      article_section_eyebrow: postsSectionConfig.article_section_eyebrow,
      article_groups: {
        ...(postsSectionConfig.article_group_category_1 && {
          group1: {
            title: postsSectionConfig.article_group_title_1,
            category: postsSectionConfig.article_group_category_1,
          }
        }),
        ...(postsSectionConfig.article_group_category_2 && {
          group2: {
            title: postsSectionConfig.article_group_title_2,
            category: postsSectionConfig.article_group_category_2,
          }
        }),
        ...(postsSectionConfig.article_group_category_3 && {
          group3: {
            title: postsSectionConfig.article_group_title_3,
            category: postsSectionConfig.article_group_category_3,
          }
        }),
      }
    } : undefined;

  const galleryConfig = config?.gallery;
  const galeriSectionProps = galleryConfig
    ? {
      title: galleryConfig.gallery_section_title,
      description: galleryConfig.gallery_section_description,
      eyebrow: galleryConfig.gallery_section_eyebrow,
    }
    : undefined;

  const youtubeConfig = config?.youtube;
  // YouTube section will be rendered regardless of config, but we can still pass title/description from config if available
  const youtubeSectionProps = youtubeConfig ? {
    title: youtubeConfig.youtube_section_title,
    description: youtubeConfig.youtube_section_description,
    eyebrow: youtubeConfig.youtube_section_eyebrow,
    channelId: youtubeConfig.youtube_channel_id || YOUTUBE_CHANNEL_ID,
    channelUrl: youtubeConfig.youtube_channel_url || YOUTUBE_CHANNEL_URL,
  }
    : {
      title: "Video Terbaru SMANAS",
      description: "Saksikan berbagai dokumentasi kegiatan, prestasi, dan momen terbaik SMA Nasional Malang.",
      eyebrow: "Channel YouTube",
      channelId: YOUTUBE_CHANNEL_ID,
      channelUrl: YOUTUBE_CHANNEL_URL,
    };


  return (
    <PageWrap>
      <HeroSection sliderItems={sliderItems.map(item => ({
        title: item.title,
        subtitle: item.subtitle !== "" ? item.subtitle : undefined,
        description: item.description !== "" ? item.description : undefined,
        backgroundImage: item.image,
        cta1: item.button_text_1 && item.button_url_1 ? { text: item.button_text_1, href: item.button_url_1 } : undefined,
        cta2: item.button_text_2 && item.button_url_2 ? { text: item.button_text_2, href: item.button_url_2 } : undefined,
      }))} />
      {sambutanProps && <SlideUp><SambutanSection {...sambutanProps} /></SlideUp>}
      {achievementsProps && <SlideUp><PrestasiSection achievements={achievements} {...achievementsProps} /></SlideUp>}
      {postsSectionProps && <SlideUp><PostsSection {...postsSectionProps} /></SlideUp>}
      {galeriSectionProps && <SlideUp><GaleriSection {...galeriSectionProps} /></SlideUp>}
      {youtubeSectionProps && <SlideUp><YoutubeSection {...youtubeSectionProps} /></SlideUp>}
    </PageWrap>
  );
}

