import { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router";
import { Box, Flex, HStack, Link, Separator } from "@chakra-ui/react";
import { Button, Input, Stack, Text } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { Logo } from "@/components/items/logo";
import { InputGroup } from "@/components/ui/input-group";

interface FormValues {
  email: {
    message?: string;
  } | null;
  password: {
    message?: string;
  } | null;
  message?: string;
}

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormValues>({
    email: null,
    password: null,
  });
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const handleLogin = async () => {
    try {
      console.log("props", email, password);
      if (!email || email.length === 0) {
        setErrors((prev: FormValues) => ({
          ...prev,
          email: {
            message: "Email is required",
          },
        }));
        return;
      }
      if (!password || password.length === 0) {
        setErrors((prev: FormValues) => ({
          ...prev,
          password: {
            message: "Password is required",
          },
        }));
        return;
      }
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); // Redirect to home after login
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrors((prev) => ({ ...prev, message: error.message }));
        console.error("Login failed", error.message);
      } else {
        console.error("An unknown error occured", error);
      }
    }
  };

  const handleReset = () => {
    setEmail("");
    setPassword("");
    setErrors({
      email: null,
      password: null,
    });
  };

  useEffect(() => {
    console.log("Errors", errors, errors.email?.message);
  }, [errors]);

  return (
    <Box className="h-full w-full">
      <Box
        p="8"
        m="5rem"
        minH="70vh" // Ensures enough height
        borderColor="tomato"
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="md"
        className="flex justify-center items-center"
      >
        <Flex gap="4" justify="center" align="middle">
          <Logo text="6xl" wh="w-4/5 h-2" h="!h-12" />
          <Separator h="48" orientation="vertical" pr="8" />
          <Stack gap="4" align="flex-start" maxW="sm">
            <Field
              label="Email"
              invalid={!!errors.email}
              errorText={errors.email?.message}
              w={"20rem"}
            >
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                w="full"
                required
              />
            </Field>
            <Field
              label="Password"
              invalid={!!errors.password}
              errorText={errors.password?.message}
              w={"20rem"}
            >
              <InputGroup
                w="full"
                endElement={
                  password?.length > 0 && (
                    <Button
                      h="1.75rem"
                      size="sm"
                      bg="tomato"
                      onClick={handleClick}
                    >
                      {show ? "Hide" : "Show"}
                    </Button>
                  )
                }
              >
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={show ? "text" : "password"}
                  placeholder="Enter password"
                  w="full"
                />
              </InputGroup>
            </Field>
            <Flex gap="4" align="flex-start">
              <Button type="submit" bg="tomato" onClick={handleLogin}>
                Login
              </Button>
              <Button
                colorPalette="orange"
                variant="outline"
                onClick={handleReset}
              >
                Reset
              </Button>
            </Flex>
            <Text
              color="red.500"
              fontSize="sm"
              visibility={errors.message ? "visible" : "hidden"}
            >
              {errors?.message ?? ""}
            </Text>
            <HStack>
              Do not have an account?{" "}
              <Link href="/register" color="tomato">
                Register
              </Link>
            </HStack>
          </Stack>
        </Flex>
      </Box>
    </Box>
  );
};

export default Login;
