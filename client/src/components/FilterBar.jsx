import { Checkbox } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";

function FilterBar({ categories, isLoading, products, setProducts, setTotal }) {
  const [checkedItems, setCheckedItems] = useState([]);
  // console.log(checkedItems);
  useEffect(() => {
    if (checkedItems.length > 0) {
      const string = checkedItems.join(",");
      axios
        .get(
          `http://localhost:3000/api/v1/products/categories?idsCategory=${string}`
        )
        .then((response) => {
          // console.log(response);
          setProducts(response.data);
          setTotal(response.data.length);
        });
    } else {
      //
    }
  }, [checkedItems, products, setProducts, setTotal]);

  return (
    <div className={`p-5 rounded-xl border relative flex flex-col gap-4`}>
      {isLoading && (
        <div className="absolute top-0 right-0 left-0 bottom-0 bg-black bg-opacity-15 flex items-center justify-center">
          <Spin indicator={<LoadingOutlined spin />} size="large" />
        </div>
      )}
      {!isLoading &&
        categories.map((category) => (
          <Checkbox
            key={category._id}
            value={category.categoryId}
            onChange={(e) => {
              setCheckedItems((currentItems) => {
                // Check if the item is already in the array
                const isItemChecked = currentItems.includes(e.target.value);
                if (!isItemChecked) {
                  // If not, add the item to the array
                  return [...currentItems, e.target.value];
                } else {
                  // If the item is already checked, you might want to remove it or handle differently
                  // This example removes the item
                  return currentItems.filter((item) => item !== e.target.value);
                }
              });
            }}
          >
            {category.name}
          </Checkbox>
        ))}
    </div>
  );
}

export default FilterBar;
