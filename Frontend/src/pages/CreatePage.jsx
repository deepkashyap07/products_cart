import { useProductStore } from "../store/product";
import { useColorModeValue } from "../components/ui/color-mode";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { toaster } from "../components/ui/toaster";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const { createProduct } = useProductStore();
  const handleCreateProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    if (success) {
      toaster.create({
        title: "success",
        description: message,
        type: "success",
        status: "success",
      });
    } else {
      toaster.create({
        title: "error ",
        description: message,
        type: "error",
        status: "error",
      });
    }
    setNewProduct({ name: "", price: "", image: "" });
    // Reset the form after submission
  };

  return (
    <Container>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          {" "}
          Create new Product{" "}
        </Heading>
        <Box
          w={"60%"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          shadow={"md"}
          rounded={"lg"}>
          <VStack spacing={4}>
            <Input
              placeholder='Product Name'
              name='name'
              type='text'
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
              placeholder='Price'
              name='price'
              type='number'
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
            <Input
              placeholder='Image URL'
              name='image'
              type='url'
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />
            <Button colorScheme='blue' onClick={handleCreateProduct}>
              Create Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
