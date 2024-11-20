import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Body from "@/components/Body";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <Body />
      <Footer />
    </div>
  );
}
