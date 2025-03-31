import { Button, Container, Flex, HStack, Text } from "@chakra-ui/react";
import React, { use } from "react";
import { Link } from "react-router-dom";
import { FaPlusSquare } from "react-icons/fa";
import { useColorMode, useColorModeValue } from "../components/ui/color-mode"; // Fixed import
import { LuMoon, LuSun } from "react-icons/lu";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container maxW={"1140px"} px={4} >
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{ base: "column", sm: "row" }}>
        <Text fontSize={"2xl"} fontWeight={"bold"} color={"blue.500"}>
          <Link to={"/"}> Product Store </Link>
        </Text>
        <HStack spacing={2} alignItems={"center"} mt={{ base: 4, sm: 0 }}>
          <Link to={"/create"}>
            <Button aria-label='Create Product'>
              <FaPlusSquare fontSize={20} />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === "dark" ? <LuSun/> : <LuMoon/>}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
