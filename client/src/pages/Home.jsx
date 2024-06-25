import HeroText from "../components/HeroText";
import NormalUserLayout from "../components/NormalUserLayout";

function Home() {
  return (
    <NormalUserLayout>
      <section className="px-48 py-20">
        <HeroText />
      </section>
    </NormalUserLayout>
  );
}

export default Home;
