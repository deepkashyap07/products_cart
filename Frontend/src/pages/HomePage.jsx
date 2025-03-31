import ProductCart from "../component/ProductCart";
import { useProductStore } from "../store/product";
import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore(); // Assuming you have a store to fetch products
  useEffect(() => {
    fetchProducts(); // Fetch products when the component mounts
  }, [fetchProducts]);

  return (
    <Container>
      <VStack spacing={8}>
        <Text fontSize={"2xl"} fontWeight={"bold"} textAlign={"center"} mb={8}>
          Current Products
        </Text>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          spacing={8}
          w={"100%"}
          p={4}>
          {/* Map through products here */}
         
          {products.map((product) => {
           return <ProductCart key={product._id} product={product} />;
          })}
          
        </SimpleGrid>

        <Text fontSize={"xl"} textAlign={"center"} color={"gray.500"} mb={4}>
          Want to add a new product?
          <Link to={"/create"}>
            <Text as={"span"} color={"blue.500"} fontWeight={"bold"} ml={1}>
              Create a new product
            </Text>
          </Link>
        </Text>
      </VStack>
    </Container>
  );
};

export default HomePage;
