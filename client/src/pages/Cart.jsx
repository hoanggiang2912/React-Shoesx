import { Col, Row } from "antd";
import { FaArrowRightLong } from "react-icons/fa6";
import ClientLayout from "../components/ClientLayout";
import Section from "../components/Section";
import { useCart } from "../contexts/CartContext";
import CartProduct from "../components/CartProduct";
import { formatCurrency } from "../utils/util";

function Cart() {
  const { cart, cartTotal, cartQty } = useCart();

  return (
    <ClientLayout>
      <Section>
        <h1 className="text-5xl font-bold">Cart ({cartQty})</h1>
        <Row gutter={32}>
          <Col span={16}>
            <div className="cart-products-wrapper mt-12">
              {cart.map((product) => (
                <CartProduct key={product._id} product={product} />
              ))}
            </div>
          </Col>
          <Col span={8}>
            <div className="border border-gray-300 rounded-lg">
              <div className="p-6">
                <h2 className="text-2xl font-bold">Cart Summary</h2>
                <div className="flex justify-between mt-8">
                  <span>Subtotal</span>
                  <span className="text-gray-400">
                    {formatCurrency(cartTotal)}
                  </span>
                </div>
                <div className="flex justify-between mt-4">
                  <span>Shipping</span>
                  <span className="text-gray-400">Calculate at next step</span>
                </div>
                <div className="flex justify-between mt-4">
                  <span>Total</span>
                  <span>{formatCurrency(cartTotal)}</span>
                </div>
                <button className="primary-rounded-btn w-full mt-8 flex items-center font-semibold">
                  Checkout <FaArrowRightLong />
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </Section>
    </ClientLayout>
  );
}

export default Cart;
