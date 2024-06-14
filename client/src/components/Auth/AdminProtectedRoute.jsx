import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const { token, role,roleValue } = useSelector((state) => state.auth);

  if (!token && role !== "admin" && roleValue!=="admin") {
    return <Navigate to="/admin/login" replace />;
  }else{
    console.log('this runned');
  return children;
  }
};

export default AdminProtectedRoute;
