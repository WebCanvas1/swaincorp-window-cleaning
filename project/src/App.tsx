import { useState } from 'react';
import SiteHeader from '@/components/SiteHeader';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Showcase from '@/components/Showcase';
import WhyChoose from '@/components/WhyChoose';
import ProtectInvestment from '@/components/ProtectInvestment';
import Gallery from '@/components/Gallery';
import Process from '@/components/Process';
import ServiceAreas from '@/components/ServiceAreas';
import QuoteSection from '@/components/QuoteSection';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import MobileStickyCta from '@/components/MobileStickyCta';

function App() {
  const [selectedService, setSelectedService] = useState('');

  const requestQuote = (serviceName: string) => {
    setSelectedService(serviceName);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-ivory">
      <SiteHeader />
      <main>
        <Hero />
        <About />
        <Services onRequestQuote={requestQuote} />
        <Showcase />
        <WhyChoose />
        <ProtectInvestment />
        <Gallery />
        <Process />
        <ServiceAreas />
        <QuoteSection selectedService={selectedService} />
        <Contact />
      </main>
      <Footer />
      <MobileStickyCta />
    </div>
  );
}

export default App;
