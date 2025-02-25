import { Route, Routes } from "react-router";
import { Home, Login, Register } from "./pages";
import { AuthGuard } from "./helpers";
import AuthProvider from "./firebase/AuthProvider";
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Routes>
          {/* Protected Home Page */}
          <Route element={<AuthGuard />}>
            <Route index element={<Home />} />
            {/* <Route path="dashboard" element={<DashboardLayout />}>
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} /> */}
          </Route>

          {/* Public Routes */}
          {/* <Route path="about" element={<About />} /> */}

          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </AuthProvider>
    </Provider>
  );
}

export default App;
