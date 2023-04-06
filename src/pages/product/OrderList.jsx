import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import { CartContext } from "../context/CartContext";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { makeStyles } from "@mui/styles";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import { useSnackbar } from "notistack";
const useStyles = makeStyles((theme) => ({
  cardHolder: {
    display: "flex",
    flexDirection: "colunm",
    alignItems: "center",
    height: "85vh",
    [theme.breakpoints.down("sm")]: {
      height: "75vh",
    },
  },
  card: {
    // width: "85%",
    margin: "auto",
    background: "#fff",
    padding: "20px 60px",
    borderRadius: "10px",
    boxSizing: "border-box",
    textAlign: "center",
    // boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",

    [theme.breakpoints.down("sm")]: {
      padding: "20px 20px",
    },
  },
  cardTitle: {
    fontSize: "30px",
    color: "#154360",
    fontWeight: 500,
    margin: "30px 0px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "17px",
    },
  },
  cardText: {
    fontSize: "25px",
    color: "#154360",
    fontWeight: 500,
    margin: "20px 0px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "12px",
    },
  },
  cardButton: {
    textTransform: "none !important",
    fontSize: "16px !important",
    borderRadius: "25px !important",
    marginTop: "20px !important",
    marginBottom: "20px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "8px !important",
    },
  },
  tableBodyStyle: {
    "& td": {
      [theme.breakpoints.down("sm")]: {
        padding: "5px !important",
      },
    },
  },
  imgDiv: {
    width: "65px",
    [theme.breakpoints.down("sm")]: {
      width: "65px",
    },
  },
  buttonGroup: {
    width: "200px !important",
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "25px !important",
      flexDirection: "column !important",
    },
  },
  removeButton: {
    width: "15px",
  },
  iconButton: {
    padding: "4px !important",
    border: "1px solid #c4c4c4 !important",
    borderRadius: "4px !important",
    [theme.breakpoints.down("sm")]: {
      padding: "5px 0",
    },
  },
  iconStyle: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "18px",
    },
  },
  input: {
    // textAlign: "center !important",
    "& input[type=number]": {
      "-moz-appearance": "textfield",
      fontSize: "12px",
      textAlign: "center",
      [theme.breakpoints.down("sm")]: {
        padding: "3px",
        textAlign: "center",
      },
    },
    "& input[type=number]::-webkit-outer-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
    "& input[type=number]::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
    width: "80px",
    [theme.breakpoints.down("sm")]: {
      width: "35px",
    },
  },
  titleStyle: {
    fontSize: "17px",
    color: "#154360",
    fontWeight: 600,
    margin: 0,
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px",
      marginBottom: "10px",
    },
  },
  titleStyle2: {
    fontSize: "30px",
    color: "#154360",
    fontWeight: 500,
    margin: "30px 0px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "17px",
    },
  },

  priceStyle: {
    color: "#95A5A6",
    margin: "5px 0 0 0",
    [theme.breakpoints.down("sm")]: {
      fontSize: "12px",
    },
  },
  cartImg: {
    width: "40px",
    height: "40px",
    [theme.breakpoints.down("sm")]: {
      width: "60px",
      height: "60px",
    },
  },
  forMobileView: {
    display: "none !important",
    [theme.breakpoints.down("sm")]: {
      display: "block !important",
    },
  },
  forOtherView: {
    [theme.breakpoints.down("sm")]: {
      display: "none !important",
    },
  },
  containerStyle: {
    [theme.breakpoints.down("sm")]: {
      padding: 0,
    },
  },
  quantityControler: {
    [theme.breakpoints.down("sm")]: {
      // width: "100%",
    },
  },
  amountTitle: {
    fontSize: "16px",
    fontWeight: 400,
    color: "#154360",
    margin: 0,
  },
  amountStyle: {
    fontSize: "16px",
    fontWeight: 500,
    textAlign: "right",
    color: "#154360",
    margin: 0,
  },
}));
const OrderList = ({
  orderItems,
  setOrderItems,
  handleOrderChange,
  handleOpenOrderListClose,
}) => {
  const classes = useStyles();

  const [address, setAddress] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [productTotalPrice, setProductTotalPrice] = useState(0);
  const [removeItemId, setRemoveItemId] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [refresh, setRefresh] = useState(false);
  const [tax, setTax] = useState(0);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const handleSnakbarOpen = (msg, vrnt) => {
    let duration;
    if (vrnt === "error") {
      duration = 3000;
    } else {
      duration = 1000;
    }
    enqueueSnackbar(msg, {
      variant: vrnt,
      autoHideDuration: duration,
    });
  };
  const sortByParentName = (a, b) => {
    const nameA = a.parent_name.toUpperCase();
    const nameB = b.parent_name.toUpperCase();

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    return 0;
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setRemoveItemId("");
  };

  const removeDialog = (id) => {
    console.log("id", id);
    handleClickOpen();
    setRemoveItemId(id);
  };
  const removelist = () => {
    console.log("removeItemId", removeItemId);
    handleOrderChange(removeItemId);
    handleClose();
  };

  const modifyArray = (value, row, i) => {
    console.log("value", value);

    if (parseInt(value) > parseInt(row?.stock_unit)) {
      handleSnakbarOpen(
        `Sorry! available stock is ${row?.stock_unit} unit${
          parseInt(row?.stock_unit) > 1 && "s"
        } `,
        "error"
      );
    } else {
      let newObject;
      if (!value) {
        newObject = { ...row, quantity: 0 };
      } else {
        newObject = { ...row, quantity: parseInt(value) };
      }
      console.log("newObject", newObject);
      let newOrderItems = orderItems.map((item) => {
        if (item._id === row._id) {
          return newObject;
        } else {
          return item;
        }
      });
      console.log("newOrderItems", newOrderItems);
      setOrderItems(newOrderItems);
    }
  };
  const increaseQuantity = (qty, row, i) => {
    console.log("qty", qty);
    let newqty = parseInt(qty) + 1;
    modifyArray(newqty, row, i);
  };
  const decreaseQuantity = (qty, row, i) => {
    let newqty = parseInt(qty) - 1;
    if (newqty > 0) {
      modifyArray(newqty, row, i);
    }
  };
  const fnTotalPrice = () => {
    console.log("fnTotalPrice");
    let total = 0;

    orderItems.map((item) => {
      let itemPrice;
      if (parseInt(item.discount_price) > 0) {
        itemPrice = parseInt(item.discount_price);
      } else {
        itemPrice = parseInt(item.price);
      }
      return (total += item.quantity * parseInt(itemPrice));
    });
    setProductTotalPrice(total);
  };
  useEffect(() => {
    fnTotalPrice();
  }, [orderItems]);
  const validation = () => {
    let isError = false;

    if (!address.trim()) {
      handleSnakbarOpen("Please enter shipping address", "error");
      document.getElementById("address").focus();
      return (isError = true);
    }

    return isError;
  };

  return (
    <div>
      {orderItems?.length < 1 ? (
        <div className={classes.cardHolder}>
          <div className={classes.card}>
            <p className={classes.cardTitle}>Order List</p>
            <p className={classes.cardText}>
              You have no items in your order list.
            </p>
            <Button
              variant="contained"
              disableElevation
              className={classes.cardButton}
              color="primary"
              // component={Link}
              // to="/products"
              onClick={handleOpenOrderListClose}
              startIcon={<KeyboardBackspaceIcon fontSize="large" />}
            >
              {/* Continue Shopping */}
              Back
            </Button>
          </div>
        </div>
      ) : (
        <>
          <Grid container>
            <Grid item xs={6} sm={6} md={6}>
              <p className={classes.titleStyle2}>Order List</p>
            </Grid>
            <Grid item xs={6} sm={6} md={6}>
              <p
                style={{
                  textAlign: "right",
                }}
                className={classes.titleStyle2}
              >
                {orderItems.length} Item{orderItems.length > 1 && "s"}
              </p>
            </Grid>
          </Grid>

          <TableContainer>
            <Table
              aria-label="simple table"
              //  style={{ border:"1px solid #c4c4c4",}}
            >
              <TableHead className={classes.forOtherView}>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Filters</TableCell>
                  <TableCell align="">In Stock</TableCell>
                  <TableCell align="center">Quantity</TableCell>
                  <TableCell align="right"> Price</TableCell>
                  <TableCell align="right"> Discount Price</TableCell>
                  <TableCell align="right">Total</TableCell>
                  <TableCell align="right">Remove</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className={classes.tableBodyStyle}>
                {orderItems &&
                  orderItems.map((row, i) => (
                    <TableRow
                      key={i}
                      sx={
                        {
                          // "&:last-child td, &:last-child th": { border: 0 },
                        }
                      }
                    >
                      <TableCell className={classes.imgDiv}>
                        {row?.images.length > 0 ? (
                          <img
                            src={row?.images[0].url}
                            alt=""
                            className={classes.cartImg}
                          />
                        ) : (
                          "No Image Available"
                        )}
                      </TableCell>
                      <TableCell>{row?.name}</TableCell>
                      <TableCell>
                        {" "}
                        {row?.filter_data.length > 0
                          ? row?.filter_data.sort(sortByParentName).map((e, i) => (
                              <label key={e._id}>
                                {i !== 0 && <>,&nbsp;&nbsp;</>}
                                <b>{e.parent_name}</b> : {e.name}
                              </label>
                            ))
                          : "N/A"}
                      </TableCell>
                      <TableCell>
                        {row?.stock_unit} unit
                        {parseInt(row?.stock_unit) > 1 && "s"}
                      </TableCell>

                      <TableCell style={{ whiteSpace: "nowrap" }}>
                        {" "}
                        <Grid
                          container
                          justifyContent="center"
                          alignItems="center"
                          className={classes.buttonGroup}
                        >
                          <Grid className={classes.quantityControler}>
                            <IconButton
                              onClick={() =>
                                decreaseQuantity(row.quantity, row, i)
                              }
                              className={classes.iconButton}
                            >
                              <RemoveIcon className={classes.iconStyle} />
                            </IconButton>
                            &nbsp;
                          </Grid>
                          <Grid className={classes.quantityControler}>
                            {" "}
                            <TextField
                              id="outlined-basic"
                              className={classes.input}
                              variant="outlined"
                              size="small"
                              // style={{ width: "50px"  }}
                              type="number"
                              value={
                                parseInt(row.quantity) === 0 ? "" : row.quantity
                              }
                              onChange={(e) => {
                                modifyArray(e.target.value, row, i);
                              }}
                            />
                          </Grid>
                          <Grid className={classes.quantityControler}>
                            &nbsp;
                            <IconButton
                              aria-label="AddIcon"
                              onClick={() =>
                                increaseQuantity(row.quantity, row, i)
                              }
                              className={classes.iconButton}
                            >
                              <AddIcon className={classes.iconStyle} />
                            </IconButton>
                          </Grid>
                        </Grid>
                        {/* <div className={classes.forMobileView}>
                            <br />
                            {row.quantity * row.price}
                          </div> */}
                      </TableCell>
                      <TableCell align="right" className={classes.forOtherView}>
                        {row.price}
                      </TableCell>
                      <TableCell align="right" className={classes.forOtherView}>
                        {parseInt(row.discount_price) > 0
                          ? row.discount_price
                          : "N/A"}
                      </TableCell>
                      <TableCell align="right" className={classes.forOtherView}>
                        {parseInt(row.discount_price) > 0
                          ? row.quantity * row.discount_price
                          : row.quantity * row.price}
                      </TableCell>
                      <TableCell
                        align="right"
                        // className={classes.forOtherView}
                        className={classes.removeButton}
                      >
                        <IconButton
                          aria-label="delete"
                          color="secondary"
                          onClick={() => removeDialog(row._id)}
                        >
                          <DeleteIcon style={{ color: "#95A5A6" }} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div style={{ width: "50%", marginTop: "20px", marginLeft: "auto" }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell
                    align="right"
                    style={{ border: "none", padding: "5px" }}
                  >
                    <p className={classes.amountTitle}>SubTotal Cost</p>
                  </TableCell>
                  <TableCell
                    align="right"
                    style={{ border: "none", padding: "5px" }}
                  >
                    <p className={classes.amountStyle}>
                      Tk. {productTotalPrice}
                    </p>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    align="right"
                    style={{ border: "none", padding: "5px" }}
                  >
                    <p className={classes.amountTitle}>TAX</p>
                  </TableCell>
                  <TableCell
                    align="right"
                    style={{ border: "none", padding: "5px" }}
                  >
                    <p className={classes.amountStyle}>{tax.toFixed(2)}%</p>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    align="right"
                    style={{ border: "none", padding: "5px" }}
                  >
                    <p className={classes.amountTitle}>Total Cost</p>
                  </TableCell>
                  <TableCell
                    align="right"
                    style={{ border: "none", padding: "5px" }}
                  >
                    <p className={classes.amountStyle}>
                      Tk. {productTotalPrice + (productTotalPrice * tax) / 100}
                    </p>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          {/* <Grid container alignItems="right" justifyContent="flex-end">
            <Grid item>
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: 400,
                  color: "#154360",
                }}
              >
                SubTotal Cost
              </p>
            </Grid>
            <Grid item>
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: 500,
                  textAlign: "right",
                  color: "#154360",
                }}
              >
                Tk. {productTotalPrice}
              </p>
            </Grid>
          </Grid> */}

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Remove Alart?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to remove this Item ?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} style={{ color: "#AAB7B8" }}>
                Cancel
              </Button>
              <Button
                autoFocus
                onClick={() => {
                  removelist();
                }}
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default OrderList;
