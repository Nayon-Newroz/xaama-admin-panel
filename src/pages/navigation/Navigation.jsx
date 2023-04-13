import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ForgotPassword from "../user-forms/ForgotPassword";
import Login from "../user-forms/Login";
import ResetPassword from "../user-forms/ResetPassword";
import Verify from "../user-forms/Verify";
import { AuthContext } from "../../context/AuthContext";
import NoMatch from "../NoMatch";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import PulseLoader from "react-spinners/PulseLoader";
import { makeStyles } from "@mui/styles";
import UserList from "../users/UserList";
import Department from "../configuration/Department";
import Dashboard from "../dashboard/Dashboard";
import AddCategory from "../category/AddCategory";
import UpdateCategory from "../category/UpdateCategory";
import CategoryList from "../category/CategoryList";
import LocationList from "../location/LocationList";
import AddLocation from "../location/AddLocation";
import UpdateLocation from "../location/UpdateLocation";
import FilterList from "../filter/FilterList";
import AddFilter from "../filter/AddFilter";
import UpdateFilter from "../filter/UpdateFilter";
import Test from "../../Test";
import UpdateProduct from "../product/UpdateProduct";
import AddProduct from "../product/AddProduct";
import ProductList from "../product/ProductList";
import OrderList from "../order/OrderList";

const useStyles = makeStyles((theme) => ({
  dialogStyle: {
    // backgroundColor: "red",
    "& .MuiDialog-paper": {
      backgroundColor: "transparent",
      boxShadow: "none",
    },
    // transparent
  },
}));

function PrivateRoute({ children }) {
  const { tuso_admin_panel } = useContext(AuthContext);

  return tuso_admin_panel.token ? children : <Navigate to="/" />;
}
function RedirectToHome({ children }) {
  const { tuso_admin_panel } = useContext(AuthContext);

  return !tuso_admin_panel.token ? children : <Navigate to="/dashboard" />;
}
const Navigation = ({ openLoadingDialog, setOpenLoadingDialog }) => {
  const classes = useStyles();
  const { tuso_admin_panel } = useContext(AuthContext);

  const handleClickOpen = () => {
    setOpenLoadingDialog(true);
  };

  const handleClose = () => {
    setOpenLoadingDialog(false);
  };
  return (
    <div>
      <Dialog
        open={openLoadingDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={classes.dialogStyle}
      >
        <DialogContent>
          <PulseLoader color={"black"} size={10} speedMultiplier={0.5} />{" "}
        </DialogContent>
      </Dialog>
      <Routes>
        <Route
          path="/"
          element={
            <RedirectToHome>
              <Login />
            </RedirectToHome>
          }
        />
        <Route
          path="verify"
          element={
            <RedirectToHome>
              <Verify />
            </RedirectToHome>
          }
        />
        <Route
          path="dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route
          path="change-password"
          element={
            <PrivateRoute>
              <ResetPassword />
            </PrivateRoute>
          }
        />
        <Route
          path="user-list"
          element={
            <PrivateRoute>
              <UserList />
            </PrivateRoute>
          }
        />
        <Route
          path="department"
          element={
            <PrivateRoute>
              <Department />
            </PrivateRoute>
          }
        />
        <Route
          path="add-category"
          element={
            <PrivateRoute>
              <AddCategory />
            </PrivateRoute>
          }
        />
        <Route
          path="update-category"
          element={
            <PrivateRoute>
              <UpdateCategory />
            </PrivateRoute>
          }
        />
        <Route
          path="category-list"
          element={
            <PrivateRoute>
              <CategoryList />
            </PrivateRoute>
          }
        />
        <Route
          path="location-list"
          element={
            <PrivateRoute>
              <LocationList />
            </PrivateRoute>
          }
        />

        <Route
          path="add-location"
          element={
            <PrivateRoute>
              <AddLocation />
            </PrivateRoute>
          }
        />
        <Route
          path="update-location"
          element={
            <PrivateRoute>
              <UpdateLocation />
            </PrivateRoute>
          }
        />
        <Route
          path="filter-list"
          element={
            <PrivateRoute>
              <FilterList />
            </PrivateRoute>
          }
        />
        <Route
          path="add-filter"
          element={
            <PrivateRoute>
              <AddFilter />
            </PrivateRoute>
          }
        />
        <Route
          path="update-filter"
          element={
            <PrivateRoute>
              <UpdateFilter />
            </PrivateRoute>
          }
        />
        <Route
          path="product-list"
          element={
            <PrivateRoute>
              <ProductList />
            </PrivateRoute>
          }
        />
        <Route
          path="add-product"
          element={
            <PrivateRoute>
              <AddProduct />
            </PrivateRoute>
          }
        />
        <Route
          path="update-product"
          element={
            <PrivateRoute>
              <UpdateProduct />
            </PrivateRoute>
          }
        />
        <Route
          path="order-list"
          element={
            <PrivateRoute>
              <OrderList />
            </PrivateRoute>
          }
        />
        <Route path="test" element={<Test />} />
        <Route
          path="*"
          element={!tuso_admin_panel.token ? <Navigate to="/" /> : <NoMatch />}
        />
      </Routes>
    </div>
  );
};

export default Navigation;
