import { Logo } from "@/components/items/logo";
import {
  Box,
  Button,
  Center,
  Circle,
  Container,
  Flex,
  HStack,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
  SimpleGrid,
  Skeleton,
  Stack,
} from "@chakra-ui/react";
import { RiAddFill, RiDeleteBin6Line } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { auth } from "@/firebaseConfig";
import { signOut } from "firebase/auth";
import { logoutUser } from "@/store/authSlice";

const Home = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <div>
      <Flex justify="center" align="center">
        <Box flex="9">
          <Logo />
        </Box>
        <Box flex="1">
          <PopoverRoot
            open={open}
            onOpenChange={(e) => setOpen(e.open)}
            size="xs"
          >
            <PopoverTrigger>
              <Circle size="10" bg="teal" color="white">
                <FaRegUser />
              </Circle>
            </PopoverTrigger>
            <PopoverContent
              w="15rem"
              position="absolute"
              top="6rem"
              right="3rem"
            >
              <PopoverArrow />
              <PopoverBody>
                <Button onClick={handleLogout} variant="ghost" w="full">
                  Logout
                </Button>
              </PopoverBody>
            </PopoverContent>
          </PopoverRoot>
        </Box>
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
      <Container w="100%" minH="60vh">
        <SimpleGrid columns={[2, null, 3]} gap="40px">
          {Array.from({ length: 9 }).map((_, index) => (
            <Stack key={index} gap="6" maxW="xs">
              <Skeleton height="200px" />
              <HStack width="full">
                <Skeleton width="10" height="10" borderRadius="50%" />
                <Skeleton width="85%" height="10" />
              </HStack>
            </Stack>
          ))}
        </SimpleGrid>
      </Container>
    </div>
  );
};

export default Home;
