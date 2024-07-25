import React, { Suspense } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Router,
  Routes,
} from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { ChakraProvider } from "@chakra-ui/react";

import UserLayout from "./components/UserLayout";
import Loader from "./components/Loader";
import ClerkTest from "./components/ClerkTest";
import { AuthProvider } from "./contexts/AuthContext";
import UserResetPassword from "./pages/UserResetPassword";
// import { StatusContext } from "./contexts/StatusContext";

const Home = React.lazy(() => import("./pages/Home"));
const Shop = React.lazy(() => import("./pages/Shop"));
const Contact = React.lazy(() => import("./pages/Contact"));
const AboutUs = React.lazy(() => import("./pages/AboutUs"));
const Checkout = React.lazy(() => import("./pages/Checkout"));
const Confirm = React.lazy(() => import("./pages/Confirm"));
const PageNotFound = React.lazy(() => import("./pages/PageNotFound"));
const Cart = React.lazy(() => import("./pages/Cart"));
const ProductDetail = React.lazy(() => import("./pages/ProductDetail"));
const UserGeneral = React.lazy(() => import("./pages/UserGeneral"));
const UserOrders = React.lazy(() => import("./pages/UserOrders"));
const UserForgotPassword = React.lazy(() =>
  import("./pages/UserForgotPassword")
);

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <AuthProvider>
        <ChakraProvider>
          <CartProvider>
            <BrowserRouter>
              <Routes>
                <Route index element={<Home />}></Route>
                <Route path="/shop" element={<Shop />}></Route>
                <Route
                  path="/product/:idProduct"
                  element={<ProductDetail />}
                ></Route>
                <Route path="/contact" element={<Contact />}></Route>
                <Route path="/about-us" element={<AboutUs />}></Route>
                <Route path="/cart" element={<Cart />}></Route>
                <Route path="/cart/checkout" element={<Checkout />}></Route>
                <Route
                  path="/cart/confirm/:idOrder"
                  element={<Confirm />}
                ></Route>
                <Route path="/user" element={<UserLayout />}>
                  <Route
                    index
                    element={<Navigate replace to={"general"} />}
                  ></Route>
                  <Route path="general" element={<UserGeneral />}></Route>
                  <Route path="orders" element={<UserOrders />}></Route>
                  <Route
                    path="forgot-password"
                    element={<UserForgotPassword />}
                  ></Route>
                  <Route
                    path="reset-password/:idUser"
                    element={<UserResetPassword />}
                  ></Route>
                  <Route path="*" element={<PageNotFound />}></Route>
                </Route>
                <Route path="/clecktest" element={<ClerkTest />}></Route>
                <Route path="*" element={<PageNotFound />}></Route>
              </Routes>
            </BrowserRouter>
          </CartProvider>
        </ChakraProvider>
      </AuthProvider>
    </Suspense>
  );
}

export default App;
