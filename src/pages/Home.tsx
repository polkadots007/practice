import { Logo } from "@/components/items/logo";
import {
  Box,
  Button,
  Image,
  Container,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Skeleton,
  Stack,
} from "@chakra-ui/react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useReadGoals } from "@/firebase/services";
// import { uploadGoals } from "@/firebase/UploadData";
import { RootState } from "@/store";
import CreateGoal from "../components/items/AddGoal";
import DeleteGoal from "../components/items/DeleteGoal";
import MarkDone from "../components/items/MarkDone";
import GoalProgress from "../components/items/GoalProgress";
import Profile from "@/components/items/Profile";
import AlertNoGoal from "@/components/items/AlertNoGoal";

const Home = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { goals, loading, error } = useReadGoals(user?.email || "");
  console.log("goals", goals);
  const fallbackImageURL = "./pupper.jpg";

  // useEffect(() => {
  //   uploadGoals();
  // }, []);

  return (
    <div>
      <Container w="100%">
        <Flex justify="center" align="center">
          <Box flex="9">
            <Logo />
          </Box>
          <Profile />
        </Flex>
        <div className="!my-10 w-full">
          <Flex justify="flex-end" align="center" w="full">
            <HStack>
              <CreateGoal />
              <Button colorPalette="red" variant="outline">
                <RiDeleteBin6Line /> Delete Goal(s)
              </Button>
            </HStack>
          </Flex>
        </div>
      </Container>
      <Container w="100%" minH="60vh">
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
                  height="4rem"
                >
                  <Heading as="h2">{goal.category}</Heading>
                  {goal.description}
                </Box>
                <Box padding="8" background={goal.severityColor}>
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
                  height="fit-content"
                  align="center"
                  justify="space-between" // Ensures spacing and prevents overflow
                  mt="1"
                  border={`0.5px solid ${goal.severityColor}`}
                  borderRadius="md"
                  p="1"
                  flexWrap="wrap"
                >
                  <Box
                    background={goal.severityColor}
                    width="30px"
                    height="30px"
                    borderRadius="full"
                    flexShrink={0}
                  ></Box>
                  <Box
                    width={["100px", "150px", "200px"]}
                    flex="1"
                    height="30px"
                    minWidth="100px" // Ensure minimum width
                    overflow="hidden" // Prevent content overflow
                    textOverflow="ellipsis" // Shows "..." if text is too long
                    whiteSpace="nowrap" // Keeps text on a single line
                  >
                    {goal.title}
                  </Box>
                  <Flex gap="1" minWidth="50px" ml="auto" flexShrink={0}>
                    <GoalProgress goal={goal} />
                    <MarkDone goal={goal} />
                    <DeleteGoal goal={goal} />
                  </Flex>
                </HStack>
              </Box>
            );
          })}
        </SimpleGrid>
      </Container>
      {!loading && (error || goals.length === 0) && <AlertNoGoal />}
    </div>
  );
};

export default Home;
