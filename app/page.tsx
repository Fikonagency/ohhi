import I18nProvider from "@/components/I18nProvider";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import InstagramFeed from "@/components/InstagramFeed";
import VisitSection from "@/components/VisitSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <I18nProvider>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Gallery />
        <InstagramFeed />
        <VisitSection />
      </main>
      <Footer />
    </I18nProvider>
  );
}
