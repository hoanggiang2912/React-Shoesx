import HeroProducts from "./HeroProducts";
import HeroText from "./HeroText";

function Hero() {
  return (
    <section className="px-48 py-8">
      <HeroText />
      <HeroProducts />
    </section>
  );
}

export default Hero;
