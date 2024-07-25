import { Link, useParams } from "react-router-dom";
import { FaCheck } from "react-icons/fa6";
import { Checkbox, Col, Row } from "antd";
import Section from "../components/Section";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import { formatCurrency } from "../utils/util";

function Confirm() {
  const { idOrder } = useParams();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `http://localhost:3000/api/v1/bills/${idOrder}`
        );
        // console.log(response);
        // console.log(response.data);
        if (response.status === 200) {
          setOrder(response.data);
        } else {
          setIsError("Error fetching order");
        }
      } catch (error) {
        setIsError(error.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [idOrder]);

  return (
    <Section className={"!py-0"}>
      {isLoading && <Loader></Loader>}
      <Row>
        {/* checkout form */}
        <Col span={14}>
          <div className="p-8">
            <div className="flex gap-4">
              <div className="icon">
                <div className="rounded-full p-3 text-xl text-green-400 border-green-400 border-2">
                  <FaCheck />
                </div>
              </div>
              <div className="informations w-full">
                <p className="text-md uppercase text-gray-600">
                  Code: {order?._id}
                </p>
                <p className="text-lg font-semibold text-gray-800">
                  Thank you {order?.name}!
                </p>
                <div className="mt-5 border rounded-lg w-full">
                  <div className="p-4">
                    <p className="text-base">Your order was recieved</p>
                    <p className="mt-3 text-sm text-gray-500">
                      Our team will contact you soon to confirm your order
                    </p>
                  </div>
                  <div className="p-4 bg-slate-200 w-full flex gap-2">
                    <Checkbox id="email" />
                    <label
                      htmlFor="email"
                      className="cursor-pointer select-none"
                    >
                      Get the latest informations about products and promotions
                    </label>
                  </div>
                </div>
                <div className="mt-5 border rounded-lg w-full">
                  <div className="p-4">
                    <h4 className="text-base">Customer Informations</h4>
                    <Row className="mt-3" gutter={32}>
                      <Col span={12}>
                        <div className="block">
                          <p className="text-sm font-medium">
                            Contact informations
                          </p>
                          <p className="text-sm font-normal text-gray-500 mt-2">
                            {order?.email}
                          </p>
                        </div>
                        <div className="block mt-5">
                          <p className="text-sm font-medium">Address</p>
                          <p className="text-sm font-normal text-gray-500 mt-2">
                            {order?.name}
                          </p>
                          <p className="text-sm font-normal text-gray-500 mt-2">
                            {order?.address}
                          </p>
                          <p className="text-sm font-normal text-gray-500 mt-2">
                            {order?.addressDetail}
                          </p>
                        </div>
                      </Col>
                      <Col span={12}>
                        <div className="block">
                          <p className="text-sm font-medium">Shipping method</p>
                          <p className="text-sm font-normal text-gray-500 mt-2">
                            {order?.shippingMethod}
                          </p>
                        </div>
                        <div className="block mt-5">
                          <p className="text-sm font-medium">Payment method</p>
                          <p className="text-sm font-normal text-gray-500 mt-2">
                            Cash
                          </p>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-5">
                  <Link
                    to={"/contact"}
                    className="flex gap-2 text-gray-500 hover:text-gray-700 hover:bg-gray-300 p-4 rounded-full transition"
                  >
                    Need help? Contact us
                  </Link>
                  <Link
                    to={"/"}
                    className="flex gap-2 bg-gray-900 text-white font-semibold hover:bg-gray-700 hover:text-white p-4 rounded-full transition"
                  >
                    Continue shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Col>
        {/* summary */}
        <Col span={10}>
          <div className="flex flex-col p-8">
            <div className="summary px-8 w-full">
              <div className="flex w-full items-center justify-between">
                <span className="text-md">Subtotal</span>
                <span className="text-md">
                  {formatCurrency(order?.subTotal)}
                </span>
              </div>
              <div className="mt-5 flex w-full items-center justify-between">
                <span className="text-md">Shipping</span>
                <span className="text-md">
                  {formatCurrency(order?.shippingFee)}
                </span>
              </div>
              <div className="mt-5 flex w-full items-center justify-between">
                <span className="text-lg font-bold">Total</span>
                <span className="text-lg font-bold">
                  {formatCurrency(order?.shippingFee + order?.subTotal)}
                </span>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Section>
  );
}

export default Confirm;
