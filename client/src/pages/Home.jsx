import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import ClientLayout from "../components/ClientLayout";
import ProductSection from "../components/ProductSection";
import WhyChooseUs from "../components/WhyChooseUs";
import axios from "axios";
import TabProducts from "../components/TabProducts";
import ContactSection from "../components/ContactSection";
import Feedbacks from "../components/Feedbacks";

function Home() {
  const [newProducts, setNewProducts] = useState([]);
  const [mostViewProducts, setMostViewProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/products?limit=10&date=true`)
      .then((response) => {
        // console.log(response.data.products);
        setNewProducts(response.data.products);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`http://localhost:3000/api/v1/products?limit=10&view=true`)
      .then((response) => {
        // console.log(response.data.products);
        setMostViewProducts(response.data.products);
      });
  }, []);

  return (
    <ClientLayout>
      <Hero />
      <WhyChooseUs />
      <ProductSection
        title="new arrivals"
        products={newProducts}
        superTitle={true}
      />
      <ProductSection
        title="most view"
        products={mostViewProducts}
        className="mt-8"
      />
      <TabProducts />
      <ContactSection />
      <Feedbacks />
      <img src="/client/src/assets/join-us-banner.svg" alt="" />
    </ClientLayout>
  );
}

export default Home;
