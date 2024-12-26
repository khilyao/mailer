import { Navigate } from "react-router-dom";

interface IProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: IProtectedRouteProps) => {
  const userCredentials = localStorage.getItem("userCredentials");

  if (!userCredentials) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
