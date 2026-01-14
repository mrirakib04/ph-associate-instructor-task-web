import HeroSection from "./../components/Home/HeroSection";
import FeaturedBooks from "./../components/Home/FeaturedBooks";
import FeaturedTutorials from "./../components/Home/FeaturedTutorials";
import SupportFAQ from "./../components/Home/SupportFAQ";
import KnowledgeNewsletter from "./../components/Home/KnowledgeNewsletter";

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center">
      <HeroSection></HeroSection>
      <FeaturedBooks></FeaturedBooks>
      <FeaturedTutorials></FeaturedTutorials>
      <SupportFAQ></SupportFAQ>
      <KnowledgeNewsletter></KnowledgeNewsletter>
    </div>
  );
}
