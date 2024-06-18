import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const adminToken=localStorage.getItem("adminToken")

  if ( !adminToken ) {
    return <Navigate to="/admin/login" replace />;
  }else{
    console.log('this runned');
  return children;
  }
};

export default AdminProtectedRoute;
