import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { CartProvider } from "./contexts/CartContext";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
