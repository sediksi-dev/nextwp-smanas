import { PageWrap } from "@/components/layout/page-wrap";
import { HeroSection } from "@/components/sections/hero-section";
import { SambutanSection } from "@/components/sections/sambutan-section";
import { PrestasiSection } from "@/components/sections/prestasi-section";
import { PostsSection } from "@/components/sections/posts-section";
import { GaleriSection } from "@/components/sections/galeri-section";
import { getAchievementsWithImage, getSiteConfig } from "@/lib/wordpress";


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
  console.log("Achievements section config:", config);

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
      {sambutanProps && <SambutanSection {...sambutanProps} />}
      {achievementsProps && <PrestasiSection achievements={achievements} {...achievementsProps} />}
      <PostsSection />
      <GaleriSection />
    </PageWrap>
  );
}

