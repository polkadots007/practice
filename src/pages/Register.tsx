import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router";
import { Box, Card, Flex, Text, Separator } from "@chakra-ui/react";
import { Button, Input, Stack } from "@chakra-ui/react";
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
const isValidEmail = (email: string): boolean => {
  console.log(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [userProfile, setUserProfile] = useState({
    firstName: "",
    lastName: "",
    userName: "",
  });
  const [isTouched, setIsTouched] = useState(false); // Track when user interacts
  const [errors, setErrors] = useState<FormValues>({
    email: null,
    password: null,
  });
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const displayName = `${userProfile.firstName} ${userProfile.lastName} (${userProfile.userName})`;
      await updateProfile(userCredential.user!, { displayName });
      console.log("User registered successfully");
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        message:
          "FirebaseError: An Error occurred while trying to create account.",
      }));
      console.error("Error registering user:", error);
      return;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsTouched(true); // Mark field as interacted
      isValidEmail(email);
    }
  };

  const handleBlur = () => {
    setIsTouched(true); // Mark field as interacted
    isValidEmail(email);
  };

  const handleCreate = () => {
    if (
      !(email.length > 0 && isValidEmail(email)) &&
      !(password.length > 0 && password === password2)
    ) {
      setErrors((prev) => ({ ...prev, message: "Invalid inputs" }));
      return;
    }
    handleRegister();
    navigate("/");
  };

  const handleReset = () => {
    setEmail("");
    setPassword("");
    setPassword2("");
    setIsTouched(false);
    setErrors({
      email: null,
      password: null,
    });
  };

  const handleCancel = () => {
    setEmail("");
    setPassword("");
    setPassword2("");
    setIsTouched(false);
    setErrors({
      email: null,
      password: null,
    });
    navigate("/login");
  };

  return (
    <Box className="h-full w-full  flex justify-center items-center">
      <Box
        p="8"
        m="5rem"
        minH="70vh"
        minW="50%" // Ensures enough height
        borderColor="tomato"
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="md"
        className="flex items-center"
      >
        <Flex gap="4" justify="center" align="center" width="100%">
          <Logo text="6xl" wh="w-4/5 h-2" h="!h-12" />
          <Separator h="64" size="sm" orientation="vertical" pr="8" />
          <Card.Root width="100%">
            <Text
              color="red.500"
              fontSize="lg"
              visibility={errors.message ? "visible" : "hidden"}
              className="text-center !font-bold"
            >
              ERROR: {errors?.message ?? ""}
            </Text>
            <Card.Header>
              <Card.Title>Sign up</Card.Title>
              <Card.Description>
                Fill in the form below to create an account
              </Card.Description>
            </Card.Header>
            <Card.Body w="full">
              <Stack gap="4" w="full">
                <Field
                  invalid={isTouched && !isValidEmail(email)}
                  errorText={"Invalid Email ID"}
                  required
                  label="Email ID"
                >
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={handleKeyDown} // Validate on Enter
                    onBlur={handleBlur} // Validate on blur
                    placeholder="Enter your email"
                  />
                </Field>
                <Field label="Username">
                  <Input
                    value={userProfile.userName}
                    onChange={(e) =>
                      setUserProfile((prev) => ({
                        ...prev,
                        userName: e.target.value,
                      }))
                    }
                    placeholder="e.g. solo_roller007"
                  />
                </Field>
                <Field label="First Name">
                  <Input
                    value={userProfile.firstName}
                    onChange={(e) =>
                      setUserProfile((prev) => ({
                        ...prev,
                        firstName: e.target.value,
                      }))
                    }
                    placeholder="First Name"
                  />
                </Field>
                <Field label="Last Name">
                  <Input
                    value={userProfile.lastName}
                    onChange={(e) =>
                      setUserProfile((prev) => ({
                        ...prev,
                        lastName: e.target.value,
                      }))
                    }
                    placeholder="Last Name"
                  />
                </Field>
                <Field label="Password" required>
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
                    />
                  </InputGroup>
                </Field>
                <Field
                  invalid={password2?.length > 0 && password !== password2}
                  errorText={"Passwords do not match"}
                  label="Re-enter Password"
                  required
                >
                  <InputGroup
                    w="full"
                    endElement={
                      password2?.length > 0 && (
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
                      disabled={password?.length === 0}
                      value={password2}
                      onChange={(e) => setPassword2(e.target.value)}
                      type={show ? "text" : "password"}
                      placeholder="Re-enter password"
                    />
                  </InputGroup>
                </Field>
              </Stack>
            </Card.Body>
            <Card.Footer justifyContent="space-between">
              <Button
                borderColor="tomato"
                color="tomato"
                variant="outline"
                onClick={handleCancel}
                marginEnd="auto"
              >
                Cancel
              </Button>
              <Button
                colorPalette="red"
                color="tomato"
                variant="subtle"
                onClick={handleReset}
              >
                Reset
              </Button>
              <Button bg="tomato" variant="solid" onClick={handleCreate}>
                Create Account
              </Button>
            </Card.Footer>
          </Card.Root>
        </Flex>
      </Box>
    </Box>
  );
};

export default Register;
