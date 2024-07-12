import { motion } from "framer-motion";
import axios from "axios";
import ClientLayout from "../components/ClientLayout";
import { FaAngleDown } from "react-icons/fa6";
import { FaFilter } from "react-icons/fa6";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
} from "@chakra-ui/react";
import { Col, Row, Pagination, Spin } from "antd";
import FilterBar from "../components/FilterBar";
import { useEffect, useRef, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import Product from "../components/Product";
import { Outlet } from "react-router-dom";

function Shop() {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const originalProductsRef = useRef([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [isShowFilter, setIsShowFilter] = useState(true);

  const fetchProducts = (page = 1) => {
    const url = `http://localhost:3000/api/v1/products?page=${page}&limit=10`;
    setIsLoading(true);

    axios
      .get(url)
      .then((response) => {
        // console.log(response.data);
        setProducts(response.data.products);
        setTotal(response.data.total);
        originalProductsRef.current = [...response.data.products];
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    setIsLoading(true);
    // Fetch categories
    fetch("http://localhost:3000/api/v1/categories")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setCategories(data);
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => fetchProducts(page), [page]);

  return (
    <ClientLayout>
      <div className="title xl:px-48 md:px-20 sm:px-5 px-48 mt-10 flex justify-between">
        <div className="flex gap-2 items-center">
          <span className="bg-slate-600 w-1 h-10"></span>
          <h1 className="uppercase text-5xl font-bold leading-none">shop</h1>
        </div>
        <span className="text-base w-1/3">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque
          incidunt nam voluptatem recusandae reprehenderit. Ratione, ab sapiente
        </span>
      </div>

      <div className="xl:px-48 md:px-20 sm:px-5 px-48 mt-10">
        <div className="product-bar flex gap-4 justify-end">
          <Button
            borderRadius={1000}
            gap={2}
            alignItems={"center"}
            onClick={() => setIsShowFilter(!isShowFilter)}
          >
            Filter bar <FaFilter />
          </Button>
          <Menu>
            <MenuButton
              borderRadius={1000}
              as={Button}
              rightIcon={<FaAngleDown />}
            >
              Sort by
            </MenuButton>
            <MenuList>
              <MenuOptionGroup
                onChange={(value) => {
                  if (value === "none") {
                    setProducts([...originalProductsRef.current]);
                  }

                  setProducts((currentProducts) => {
                    // Create a new array to sort to avoid direct mutation
                    const sortedProducts = [...currentProducts].sort((a, b) => {
                      // Convert prices to numbers for comparison
                      const priceA = Number(a.price);
                      const priceB = Number(b.price);
                      return value === "asc"
                        ? priceA - priceB
                        : priceB - priceA;
                    });

                    return sortedProducts;
                  });
                }}
                title="Price"
                type="radio"
              >
                <MenuItemOption value="asc">Ascending</MenuItemOption>
                <MenuItemOption value="desc">Descending</MenuItemOption>
                <MenuItemOption value="none">None</MenuItemOption>
              </MenuOptionGroup>
              <MenuOptionGroup
                title="Name"
                type="radio"
                onChange={(value) => {
                  if (value === "none") {
                    setProducts([...originalProductsRef.current]);
                  }

                  setProducts((currentProducts) => {
                    const sortedProducts = [...currentProducts].sort((a, b) => {
                      const nameA = a.title.toUpperCase();
                      const nameB = b.title.toUpperCase();
                      if (value === "asc") {
                        return nameA.localeCompare(nameB);
                      } else {
                        // "desc"
                        return nameB.localeCompare(nameA);
                      }
                    });

                    return sortedProducts;
                  });
                }}
              >
                <MenuItemOption value="asc">Ascending</MenuItemOption>
                <MenuItemOption value="desc">Descending</MenuItemOption>
                <MenuItemOption value="none">None</MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
        </div>
      </div>

      <div className="xl:px-48 md:px-20 sm:px-5 px-48 mt-10">
        <Row gutter={32}>
          <Col lg={isShowFilter ? 6 : 0} md={6} sm={0} xs={0} span={6}>
            <FilterBar
              categories={categories}
              isLoading={isLoading}
              products={products}
              setProducts={setProducts}
              total={total}
              setTotal={setTotal}
            />
          </Col>
          <Col lg={isShowFilter ? 18 : 24} md={18} sm={24} xs={24} span={18}>
            {isLoading && (
              <div className="absolute top-0 right-0 left-0 bottom-0 bg-black bg-opacity-15 flex items-center justify-center">
                <Spin indicator={<LoadingOutlined spin />} size="large" />
              </div>
            )}
            {!isLoading && (
              <>
                <Row gutter={[32, 22]}>
                  {products.map((product) => (
                    <Col
                      lg={8}
                      md={8}
                      sm={12}
                      xs={12}
                      span={6}
                      key={product._id}
                    >
                      <Product product={product} />
                    </Col>
                  ))}
                </Row>
                <div className="mt-8 flex justify-center">
                  <Pagination
                    defaultCurrent={page}
                    total={total}
                    onChange={(page) => {
                      setPage(page);
                    }}
                  />
                </div>
              </>
            )}
          </Col>
        </Row>
      </div>
      <Outlet />
    </ClientLayout>
  );
}

export default Shop;
