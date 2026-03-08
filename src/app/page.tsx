import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Challenge from "@/components/Challenge";
import Services from "@/components/Services";
import Platform from "@/components/Platform";
import Agents from "@/components/Agents";
import DeliveryModel from "@/components/DeliveryModel";
import Pricing from "@/components/Pricing";
import HowItWorks from "@/components/HowItWorks";
import WhySolynta from "@/components/WhySolynta";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Challenge />
      <Services />
      <Platform />
      <Agents />
      <DeliveryModel />
      <Pricing />
      <HowItWorks />
      <WhySolynta />
      <Contact />
      <Footer />
    </main>
  );
}
