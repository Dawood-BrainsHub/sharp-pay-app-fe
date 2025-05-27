import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../layouts/Header";

const Dashboard = () => {
  const { loading, error, user } = useSelector((state) => state.auth);
  return (
    <>
      <Typography variant="h2" mt={2}>
        Dashboard Page
      </Typography>
    </>
  );
};

export default Dashboard;
