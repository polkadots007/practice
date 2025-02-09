import { useState } from "react";
import { Button, HStack } from "@chakra-ui/react";
import { Home } from "./pages";

const Demo = () => {
  return (
    <HStack>
      <Button>Click me</Button>
      <Button>Click me</Button>
      <div className="!font-allura !text-9xl text-mint-500">habit tracker</div>
      <span className="absolute inset-0 h-[10px] w-full bg-gradient-to-r from-blue-500 via-blue-300 to-transparent blur-md opacity-80"></span>
      <p className="!font-script">This will use the Great Vibes font family.</p>
    </HStack>
  );
};
function App() {
  const [count, setCount] = useState(0);

  return <Home />;
}

export default App;
