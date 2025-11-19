import './App.css';
import '@fontsource/anton-sc';
import Header from './components/Header'
import Hero from "./components/Hero";
import Sponsors from "./components/Sponsors";
import EventInfo from "./components/EventInfo";
import ImageModule from "./components/ImageModule";
import Speakers from "./components/Speakers";
import StatsModule from "./components/StatsModule";
import ImageCarousel from "./components/ImageCarousel";
import SoapOperaModule from "./components/SoapOperaModule";
import BenefitsModule from "./components/BenifitsModule";
import FinalModule from "./components/FinalModule";
import ScheduleModule from "./components/ScheduleModule";
import SpeakersSection from "./components/SpeakersSection";
import SponsorsSection from "./components/SponsorsSection";
import PreviousSponsors from "./components/PreviousSponsors";
import QuizBlock from "./blocks/QuizBlockTrimmed";
import FAQSection from "./components/FAQSection";
import LocationSection from "./components/LocationSection";
import ApeInSection from "./components/ApeInSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

function App() {
  return (
      <div className="min-h-screen bg-black">
          <div className="px-4 py-6 space-y-6">
              <Header />
              <Hero />
              <Sponsors />
              <EventInfo />
              <ImageModule />
              <Speakers />
              <StatsModule/>
              <ImageCarousel />
              <SoapOperaModule/>
              <BenefitsModule/>
              <FinalModule/>
              <ScheduleModule/>
              <SpeakersSection/>
              <SponsorsSection/>
              <PreviousSponsors/>
              <QuizBlock/>
              <FAQSection/>
              <LocationSection/>
              <ApeInSection/>
              <ContactSection/>
              <Footer/>
          </div>
      </div>
  );
}

export default App;
