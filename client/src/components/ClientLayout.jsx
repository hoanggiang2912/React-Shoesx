import Footer from "./Footer";
import Header from "./Header";
import styles from "./ClientLayout.module.css";

function ClientLayout({ children }) {
  return (
    <div className="app">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default ClientLayout;
