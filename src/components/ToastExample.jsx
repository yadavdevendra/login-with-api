import {
  Button,
  Toast
} from "@shopify/polaris";
const Dashboard = () => {
  const handleLogout = () => {
    console.log("Logout Clicked");
    navigate("/login");
  };
  return (
    <>
          <h1>Dashboard</h1>
          <h6 variant="h5">admin</h6>
          <h6 variant="h6">Password123</h6>
          <Button
            variant="contained"
            color="warning"
            size="large"
            onClick={handleLogout}
            sx={{ mt: 8 }}
          >
            Logout
          </Button>
    </>
  );
};

export default Dashboard;
