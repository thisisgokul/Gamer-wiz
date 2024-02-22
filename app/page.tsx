import Footer from "@/components/shared/Footer";
import Hero from "@/components/shared/Hero";
import HeroItems from "@/components/shared/HeroItems";

export default function Home() {
  return (
  <main>
    <section className="padding bg-darkBlack"><Hero/></section>
    <section className=""><HeroItems/></section>
    <Footer/>
  </main>
  );
}
