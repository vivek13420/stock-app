import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ReqAdminAuth = ({ children }) => {
  const isAdmin = useSelector((store) => store.LoginReducer.isAdmin);
  if (!isAdmin) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ReqAdminAuth;
