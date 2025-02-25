import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const AuthGuard = () => {
  const { user, loading } = useSelector((state: RootState) => state.auth);

  if (loading) return <p>Loading...</p>; // Show loading state until Firebase confirms auth

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AuthGuard;
