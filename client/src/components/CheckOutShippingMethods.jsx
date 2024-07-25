import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { useCart } from "../contexts/CartContext";

function CheckOutShippingMethods({ onShippingMethodSubmit, className }) {
  const [value, setValue] = useState("Standard Shipping");
  const { cartTotal } = useCart();

  const shippingMethods = useMemo(
    () => [
      { name: "Standard Shipping", price: 15000 },
      { name: "Fast Shipping", price: 30000 },
      { name: "Free Shipping", price: 0 },
    ],
    []
  );

  useEffect(() => {
    // Find the selected method only once when value changes
    const selectedMethod = shippingMethods.find(
      (method) => method.name === value
    );
    if (selectedMethod) {
      onShippingMethodSubmit({
        name: selectedMethod.name,
        price: selectedMethod.price,
      });
    }
  }, [onShippingMethodSubmit, value]);

  return (
    <RadioGroup
      defaultValue="Standard Shipping"
      onChange={setValue}
      value={value}
      className={className}
    >
      <Stack direction="column">
        {shippingMethods.map((method, index) => (
          <label
            key={index}
            className={`border-gray-300 border rounded-lg p-3 `}
          >
            <Radio
              // defaultChecked={
              //   method.price === 0 && cartTotal < 2000000 ? false : true
              // }
              value={method.name}
              isDisabled={method.price === 0 && cartTotal < 2000000}
            >
              {method.name}
            </Radio>
          </label>
        ))}
      </Stack>
    </RadioGroup>
  );
}

export default CheckOutShippingMethods;
