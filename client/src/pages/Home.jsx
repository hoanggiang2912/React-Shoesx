import Hero from "../components/Hero";
import NormalUserLayout from "../components/NormalUserLayout";
import ProductSection from "../components/ProductSection";
import WhyChooseUs from "../components/WhyChooseUs";

function Home() {
  return (
    <NormalUserLayout>
      <Hero />
      <WhyChooseUs />
      <ProductSection title="new arrivals" />
    </NormalUserLayout>
  );
}

export default Home;
