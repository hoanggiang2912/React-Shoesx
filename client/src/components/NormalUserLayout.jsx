import Footer from "./Footer";
import Header from "./Header";
import styles from "./NormalUserLayout.module.css";

function NormalUserLayout({ children }) {
  return (
    <div className="app">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default NormalUserLayout;
