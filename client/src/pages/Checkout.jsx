import { FaChevronLeft, FaCheck } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import Section from "../components/Section";
import Input from "../components/Input";
import Loader from "../components/Loader";
import {
  addressValidation,
  emailValidation,
  nameValidation,
  phoneValidation,
  textValidation,
} from "../utils/inputValidations";
import { Checkbox, Col, Row } from "antd";
import { useCart } from "../contexts/CartContext";
import { useAuth, useAuthRedirect } from "../contexts/AuthContext";
import CartProductPopup from "../components/CartProductPopup";
import { useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import CheckOutShippingMethods from "../components/CheckOutShippingMethods";
import axios from "axios";
import { formatCurrency } from "../utils/util";

function Checkout() {
  // Redirect to login if not authenticated
  useAuthRedirect();

  // states
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const { cart, cartTotal, dispatch } = useCart();
  const [order, setOrder] = useState(null);
  const [selectedShippingMethod, setSelectedShippingMethod] = useState({
    name: "Standard Shipping",
    price: 15000,
  });
  const navigate = useNavigate();
  // console.log(cart);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigate(`/cart/confirm/${order._id}`);
      }, 3000);
    }
  }, [success, order]);

  const handleShippingMethodSubmit = useCallback((value) => {
    setSelectedShippingMethod(value);
    // You can also handle other form submission logic here
  }, []);

  const { user } = useAuth();
  const methods = useForm({
    defaultValues: {
      email: user?.email,
      name: user?.name,
      phone: user?.phone,
      address: "",
    },
  });

  const onSubmit = methods.handleSubmit(async (data) => {
    // console.log({
    //   ...data,
    //   shippingMethod: selectedShippingMethod.name,
    //   shippingFee: selectedShippingMethod.price,
    // });

    const order = {
      products: cart,
      shippingMethod: selectedShippingMethod.name,
      shippingFee: selectedShippingMethod.price,
      subTotal: cartTotal,
      total: cartTotal + selectedShippingMethod.price,
      paymentMethod: "Cash",
      status: "Processing",
      idUser: user._id,
      ...data,
    };

    // console.log(order);

    try {
      setIsLoading(true);
      setIsError(null);
      setMessage("");

      // Call API to create order
      const response = await axios.post(
        "http://localhost:3000/api/v1/bills",
        order
      );
      // Handle response
      if (response.data.success) {
        setSuccess(true);
        setMessage("Order placed successfully!");
        setOrder(response.data.savedBill);
        dispatch({ type: "clearCart" });
      }
    } catch (error) {
      setIsError(error);
      setMessage("Error placing order");
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <FormProvider {...methods}>
      {isLoading && <Loader></Loader>}
      <form action="#" onSubmit={(e) => e.preventDefault()}>
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
                  <Input
                    inputClassName={"primary-form-input w-full"}
                    {...emailValidation}
                  ></Input>
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
                    <Input
                      inputClassName={"primary-form-input w-full"}
                      {...nameValidation}
                    ></Input>
                  </div>
                  <div className="form__group flex-1 mt-5 flex flex-col">
                    <Input
                      inputClassName={"primary-form-input w-full"}
                      {...phoneValidation}
                    ></Input>
                  </div>
                </div>
                <div className="form__group mt-5 flex flex-col">
                  <Input
                    inputClassName={"primary-form-input w-full"}
                    {...addressValidation}
                    validation={{
                      ...addressValidation.validation,
                      required: {
                        value: true,
                        message: "Address is required",
                      },
                    }}
                    placeholder="Address"
                  ></Input>
                </div>
                <div className="form__group mt-5 flex flex-col">
                  <Input
                    multiline={true}
                    inputClassName="primary-form-input"
                    {...textValidation}
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
                  <h2 className="text-lg font-semibold mt-8">
                    Shipping Method
                  </h2>
                  <CheckOutShippingMethods
                    onShippingMethodSubmit={handleShippingMethodSubmit}
                    className="mt-5"
                  ></CheckOutShippingMethods>
                </div>
                <div className="flex justify-between items-center mt-5">
                  <Link
                    className="flex gap-2 text-gray-500 hover:text-gray-700 hover:bg-gray-300 p-4 rounded-full transition"
                    to={"/cart"}
                  >
                    <FaChevronLeft className="text-xl" />
                    Return to cart
                  </Link>
                  <button
                    className="flex gap-2 bg-gray-900 text-white font-semibold hover:bg-gray-700 hover:text-white p-4 rounded-full transition"
                    onClick={onSubmit}
                  >
                    Order Placement
                  </button>
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
                  <span className="text-md">{formatCurrency(cartTotal)}</span>
                </div>
                <div className="mt-5 flex w-full items-center justify-between">
                  <span className="text-md">Shipping</span>
                  <span className="text-md">
                    {formatCurrency(selectedShippingMethod.price)}
                  </span>
                </div>
                <div className="mt-5 flex w-full items-center justify-between">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-lg font-bold">
                    {formatCurrency(selectedShippingMethod.price + cartTotal)}
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </Section>
      </form>
    </FormProvider>
  );
}

export default Checkout;
