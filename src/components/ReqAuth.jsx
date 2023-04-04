import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ReqAuth = ({ children }) => {
  const isAuth = useSelector((store) => store.LoginReducer.isAuth);
  if (!isAuth) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ReqAuth;
