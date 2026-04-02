import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import WhyUs from "@/components/WhyUs";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <WhyUs />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
