
import Navbar from "../components/sections/navbar/default";
import Footer from "../components/ui/Footer";
import FAQ from "../components/ui/faq";
import SocialProof from "../components/ui/SocialProof";
import Herosection from "../components/ui/herosection";

export default function Home() {
  return (
    <main className="min-h-screen w-full overflow-hidden bg-background text-foreground">
      <Navbar />
      <Herosection/>
      <SocialProof />
      











      <FAQ />
      <Footer />
   
    </main>
  );
}
