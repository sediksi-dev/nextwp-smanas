import { PageWrap } from "@/components/layout/page-wrap";
import { HeroSection } from "@/components/sections/hero-section";
import { SambutanSection } from "@/components/sections/sambutan-section";
import { PrestasiSection } from "@/components/sections/prestasi-section";
import { PostsSection } from "@/components/sections/posts-section";
import { GaleriSection } from "@/components/sections/galeri-section";

export default function Home() {
  return (
    <PageWrap>
      <HeroSection />
      <SambutanSection />
      <PrestasiSection />
      <PostsSection />
      <GaleriSection />
    </PageWrap>
  );
}

