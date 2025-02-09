import { Button, Container, Flex, HStack } from "@chakra-ui/react";
import { RiAddFill, RiDeleteBin6Line } from "react-icons/ri";

const Logo = () => {
  return (
    <div className="relative inline-block">
      <h1 className="!font-allura !text-9xl text-black relative z-10">
        habit tracker
      </h1>
      <div className="relative">
        <div className="w-4/5 h-2 bg-mint-500"></div>
        <img
          className="h-16 rotate-90 absolute -top-10 right-0 z-0"
          src="./strawberry.png"
        />
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div>
      <Flex justify="center">
        <Logo />
      </Flex>
      <div className="!my-10 !mx-5">
        <Flex justify="flex-end">
          <HStack mr="20">
            <Button colorPalette="teal" variant="solid">
              <RiAddFill /> Add a New Goal
            </Button>
            <Button colorPalette="red" variant="outline">
              <RiDeleteBin6Line /> Delete Goal(s)
            </Button>
          </HStack>
        </Flex>
      </div>
    </div>
  );
};

export default Home;
