import { Logo } from "@/components/items/logo";
import {
  Alert,
  Box,
  Button,
  Image,
  Circle,
  Container,
  Flex,
  Heading,
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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { auth } from "@/firebaseConfig";
import { signOut } from "firebase/auth";
import { logoutUser } from "@/store/authSlice";
import { useReadGoals } from "@/firebase/services";
import { uploadGoals } from "@/firebase/UploadData";
import { RootState } from "@/store";
import CreateGoal from "./AddGoal";

const Home = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const { goals, loading, error } = useReadGoals(user?.email || "");
  console.log("goals", goals);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fallbackImageURL = "./pupper.jpg";
  const handleLogout = async () => {
    await signOut(auth);
    dispatch(logoutUser());
    navigate("/login");
  };

  // useEffect(() => {
  //   uploadGoals();
  // }, []);

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
            <CreateGoal />
            <Button colorPalette="red" variant="outline">
              <RiDeleteBin6Line /> Delete Goal(s)
            </Button>
          </HStack>
        </Flex>
      </div>
      <Container w="100%" minH="60vh" display="flex" justifyContent="center">
        <SimpleGrid columns={[2, null, 3]} gap="40px" w="full">
          {loading &&
            Array.from({ length: 9 }).map((_, index) => (
              <Stack key={index} gap="6" maxW="xs">
                <Skeleton height="200px" />
                <HStack width="full">
                  <Skeleton width="10" height="10" borderRadius="50%" />
                  <Skeleton width="85%" height="10" />
                </HStack>
              </Stack>
            ))}
          {goals.map((goal) => {
            return (
              <Box key={goal.id}>
                <Box
                  background={goal.severityColor}
                  padding="4"
                  color="white"
                  height="20rem"
                >
                  <Heading as="h2">{goal.category}</Heading>
                  {goal.description}
                  <Image
                    src={fallbackImageURL}
                    height="200px"
                    alt="goal image"
                    borderRadius="md"
                    margin="auto"
                  />
                </Box>
                <HStack
                  width="full"
                  align="center"
                  mt="1"
                  border={`0.5px solid ${goal.severityColor}`}
                  borderRadius="md"
                  p="1"
                >
                  <Box
                    background={goal.severityColor}
                    width="30px"
                    height="30px"
                    borderRadius="full"
                  ></Box>
                  <Box width="85%" height="30px">
                    {goal.title}
                  </Box>
                </HStack>
              </Box>
            );
          })}
        </SimpleGrid>
      </Container>
      {(error || goals.length === 0) && (
        <Alert.Root
          status="info"
          colorPalette="teal"
          width="40%"
          height="fit-content"
          margin="0 auto"
        >
          <Alert.Indicator />
          <Alert.Title>No Goals Set</Alert.Title>
        </Alert.Root>
      )}
    </div>
  );
};

export default Home;
