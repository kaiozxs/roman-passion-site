import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import Gallery from "./components/sections/Gallery";
import Atelier from "./components/sections/Atelier";
import Occasions from "./components/sections/Occasions";
import Awards from "./components/sections/Awards";
import Order from "./components/sections/Order";

export default function App() {
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>

      <Header />

      <main id="conteudo">
        <Hero />
        <Gallery />
        <Atelier />
        <Occasions />
        <Awards />
        <Order />
      </main>

      <Footer />
    </>
  );
}
