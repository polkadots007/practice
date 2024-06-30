import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import { JSComponent } from "./components";

const App = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="javascript-board/" element={<JSComponent />} />
        {/* <Route path="dashboard" element={<Dashboard />} /> */}
        {/* ... etc. */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
