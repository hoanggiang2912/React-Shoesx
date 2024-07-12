import { FaChevronLeft, FaCheck } from "react-icons/fa6";
import { HStack, Radio, RadioGroup, useRadioGroup } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import Section from "../components/Section";
import { Checkbox, Col, Row } from "antd";
import ShippingMethod from "../components/ShippingMethod";
import { useCart } from "../contexts/CartContext";
import CartProductPopup from "../components/CartProductPopup";

function Checkout() {
  const { cart } = useCart();
  console.log(cart);

  const shippingMethods = [
    { name: "Free Shipping", price: 0 },
    { name: "Standard Shipping", price: 5 },
    { name: "Fast Shipping", price: 10 },
  ];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "shippingMethod",
    defaultValue: {
      name: "Free Shipping",
      price: 0,
    },
  });

  const group = getRootProps();

  return (
    <form action="#">
      <Section className={"!py-0"}>
        <Row>
          {/* checkout form */}
          <Col span={14}>
            <div className="p-8">
              <div className="checkout-form-header">
                <img src="../../src/assets/Shoesx.svg" alt="" />
                <Breadcrumbs
                  className={"mt-8"}
                  items={[
                    { name: "Cart", to: "/cart" },
                    { name: "Checkout", to: "/checkout", active: true },
                  ]}
                />
              </div>
              <div className="form__group mt-8 flex flex-col">
                <label htmlFor="name" className="text-lg font-semibold">
                  Contact
                </label>
                <input
                  className="primary-form-input"
                  type="text"
                  id="name"
                  name="name"
                />
              </div>
              <div className="form__group mt-4 flex items-center gap-2">
                <Checkbox id="emailCheckbox" />
                <label
                  htmlFor="emailCheckbox"
                  className="text-sm cursor-pointer"
                >
                  Email me with news and offers
                </label>
              </div>
              <h2 className="text-lg font-semibold mt-8">Shipping Address</h2>
              <div className="flex gap-5">
                <div className="form__group flex-1 mt-5 flex flex-col">
                  <input
                    className="primary-form-input"
                    type="text"
                    id="fullname"
                    name="fullname"
                    placeholder="Full Name"
                  />
                </div>
                <div className="form__group flex-1 mt-5 flex flex-col">
                  <input
                    className="primary-form-input"
                    type="number"
                    id="phone"
                    name="phone"
                    placeholder="Phone"
                  />
                </div>
              </div>
              <div className="form__group mt-5 flex flex-col">
                <input
                  className="primary-form-input"
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Address"
                />
              </div>
              <div className="form__group mt-5 flex flex-col">
                <textarea
                  className="primary-form-input"
                  type="text"
                  id="address-detail"
                  name="address-detail"
                  placeholder="Apartment, suite, etc. (optional)"
                />
              </div>
              <div className="payment-method mt-5">
                <h2 className="text-lg font-semibold mt-8">Payment Method</h2>
                <span className="text-xl text-gray-800 mt-3 flex items-center gap-3">
                  <FaCheck className="" />
                  Cash
                </span>
              </div>
              <div className="shipping-method mt-5">
                <h2 className="text-lg font-semibold mt-8">Shipping Method</h2>
                <HStack {...group} className="mt-3">
                  {shippingMethods.map((item) => {
                    const radio = getRadioProps(item);
                    return (
                      <ShippingMethod key={item.name} {...radio}>
                        {item.name}
                      </ShippingMethod>
                    );
                  })}
                </HStack>
              </div>
              <div className="flex justify-between items-center mt-5">
                <Link className="flex gap-2 text-gray-500 hover:text-gray-700 hover:bg-gray-300 p-4 rounded-full transition">
                  <FaChevronLeft className="text-xl" />
                  Return to cart
                </Link>
                <Link className="flex gap-2 bg-gray-900 text-white font-semibold hover:bg-gray-700 hover:text-white p-4 rounded-full transition">
                  Order Placement
                </Link>
              </div>
            </div>
          </Col>
          {/* summary */}
          <Col span={10}>
            <div className="flex flex-col p-8">
              {cart.map((product) => (
                <CartProductPopup
                  key={product._id}
                  product={product}
                  removeable={false}
                />
              ))}
            </div>
            <div className="summary px-8 w-full">
              <div className="flex w-full items-center justify-between">
                <span className="text-md">Subtotal</span>
                <span className="text-md">2.350.500 VND</span>
              </div>
              <div className="mt-5 flex w-full items-center justify-between">
                <span className="text-md">Shipping</span>
                <span className="text-md">50.500 VND</span>
              </div>
              <div className="mt-5 flex w-full items-center justify-between">
                <span className="text-md">Total</span>
                <span className="text-md font-semibold">2.350.500 VND</span>
              </div>
              <div className="mt-5 flex w-full items-center justify-between">
                <span className="text-lg font-bold">Total</span>
                <span className="text-lg font-bold">2.350.500 VND</span>
              </div>
            </div>
          </Col>
        </Row>
      </Section>
    </form>
  );
}

export default Checkout;
