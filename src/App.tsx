import "./App.css";

import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import * as ROUTES from "./constants/routes";

const Home = lazy(() => import("./pages/Homepage"));
const AddNote = lazy(() => import("./pages/AddNote"));
const EditNote = lazy(() => import("./pages/EditNote"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <Router>
      <Suspense
        fallback={
          <p
            className="flex max-w-full h-screen 
          items-center justify-center font-bold
          text-2xl
          "
          >
            Loading...
          </p>
        }
      >
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.ADD} element={<AddNote />} />
          <Route path={ROUTES.EDIT} element={<EditNote />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
