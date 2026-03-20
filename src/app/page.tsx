import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Challenge from "@/components/Challenge";
import UseCases from "@/components/UseCases";
import Services from "@/components/Services";
import Platform from "@/components/Platform";
import DeliveryModel from "@/components/DeliveryModel";
import StartupSection from "@/components/StartupSection";
import Pricing from "@/components/Pricing";
import HowItWorks from "@/components/HowItWorks";
import WhySolynta from "@/components/WhySolynta";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Manifesto />
      <Challenge />
      <UseCases />
      <Services />
      <Platform />
      <DeliveryModel />
      <StartupSection />
      <Pricing />
      <HowItWorks />
      <WhySolynta />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
