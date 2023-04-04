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
    [theme.breakpoints.down("sm")]: {
      width: "65px",
    },
  },
  buttonGroup: {
    width: "150px !important",
    [theme.breakpoints.down("sm")]: {
      width: "25px !important",
      flexDirection: "column !important",
    },
  },
  removeButton: {
    width: "15px",
  },
  iconButton: {
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
    width: "50px",
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
    width: "80px",
    height: "80px",
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
}));
const CartItems = ({ orderItems, handleOpenOrderListClose }) => {
  const classes = useStyles();

  const [address, setAddress] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [productTotalPrice, setProductTotalPrice] = useState(0);
  const [removeItemId, setRemoveItemId] = useState({});
  const [loading, setLoading] = useState(false);
  // const { updatelist, removelist, list } = useContext(CartContext);
  const [open, setOpen] = React.useState(false);

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setRemoveItemId("");
  };

  const removeDialog = (id) => {
    handleClickOpen();
    setRemoveItemId(id);
  };
  const modifyArray = (value, row) => {
    let newObject;
    if (!value) {
      newObject = { ...row, quantity: 0 };
    } else {
      newObject = { ...row, quantity: parseInt(value) };
    }

    // updatelist(newObject);
  };
  const increaseQuantity = (qty, row) => {
    let newqty = parseInt(qty) + 1;
    modifyArray(newqty, row);
  };
  const decreaseQuantity = (qty, row) => {
    let newqty = parseInt(qty) - 1;
    if (newqty > 0) {
      modifyArray(newqty, row);
    }
  };
  const fnTotalPrice = () => {
    let total = 0;

    orderItems.map((item) => {
      return (total += item.quantity * item.price);
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
  // const submit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     let err = validation();

  //     if (err) {
  //       return;
  //     } else {
  //       setLoading(true);
  //       let uuid = uuidv4();
  //       let splitId = uuid.split("-");
  //       let newUUID = splitId.join("");
  //       let cartData = [];
  //       list.map((item) => {
  //         cartData.push({
  //           name: item.title,
  //           qty: item.quantity,
  //           unit_price: item.price,
  //           sub_total: item.quantity * item.price,
  //         });
  //       });
  //       const cardJSON = JSON.stringify(cartData);

  //       let data = {
  //         store_id: "748911_366",
  //         store_password: "Password100@",
  //         order_id: newUUID,
  //         bill_amount: productTotalPrice,
  //         currency: "IQD",
  //         cart: cardJSON,
  //         // cart: [{ name: "Scarf", qty: 1, unit_price: 5000, sub_total: 5000 }],
  //       };
  //       let response = await axios({
  //         method: "post",
  //         url: "https://staging-apigw-merchant.fast-pay.iq/api/v1/public/pgw/payment/initiation",
  //         data: data,
  //         headers: { "content-type": "application/json" },
  //       });

  //       if (response.data.code === 422 && response.data.messages.length) {
  //         handleSnakbarOpen(response.data.messages.toString(), "error");
  //       }
  //       if (response.data.code === 200) {
  //         window.location.href = response.data.data.redirect_uri;
  //       }
  //       setLoading(false);
  //     }
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };
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
        <Container maxWidth="lg" className={classes.containerStyle}>
          <Grid container>
            <Grid
              item
              xs={12}
              sm={12}
              md={9}
              style={{ padding: "20px", background: "#fff" }}
            >
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

              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead className={classes.forOtherView}>
                    <TableRow>
                      <TableCell>Product Details</TableCell>
                      <TableCell>Title</TableCell>
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
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
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
                          <TableCell>
                            <p className={classes.titleStyle}> {row?.name}</p>
                            <div className={classes.forMobileView}>
                              <p className={classes.priceStyle}>
                                {row?.price}{" "}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <p className={classes.titleStyle}> {row?.name}</p>
                            <div className={classes.forMobileView}>
                              <p className={classes.priceStyle}>
                                {row?.discount_price}{" "}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
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
                                    decreaseQuantity(row.quantity, row)
                                  }
                                  className={classes.iconButton}
                                >
                                  <RemoveIcon className={classes.iconStyle} />
                                </IconButton>
                              </Grid>
                              <Grid className={classes.quantityControler}>
                                {" "}
                                <TextField
                                  id="outlined-basic"
                                  className={classes.input}
                                  variant="outlined"
                                  size="small"
                                  // style={{ width: "50px" }}
                                  type="number"
                                  value={row.quantity}
                                  onChange={(e) => {
                                    modifyArray(e.target.value, row);
                                  }}
                                />
                              </Grid>
                              <Grid className={classes.quantityControler}>
                                <IconButton
                                  aria-label="AddIcon"
                                  onClick={() =>
                                    increaseQuantity(row.quantity, row)
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
                          <TableCell
                            align="right"
                            className={classes.forOtherView}
                          >
                            {row.price}
                          </TableCell>
                          <TableCell
                            align="right"
                            className={classes.forOtherView}
                          >
                            {row.discount_price}
                          </TableCell>
                          <TableCell
                            align="right"
                            className={classes.forOtherView}
                          >
                            {row.quantity * row.price}
                          </TableCell>
                          <TableCell
                            align="right"
                            // className={classes.forOtherView}
                            className={classes.removeButton}
                          >
                            <IconButton
                              aria-label="delete"
                              color="secondary"
                              onClick={() => removeDialog(row.id)}
                            >
                              <DeleteIcon style={{ color: "#95A5A6" }} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <br />
              <Button
                variant="contained"
                disableElevation
                style={{
                  background: "none",
                  textTransform: "none",
                  fontSize: "16px",
                  color: "#154360",
                }}
                color="primary"
                component={Link}
                to="/products"
                startIcon={<KeyboardBackspaceIcon fontSize="large" />}
              >
                Continue Shopping
              </Button>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={3}
              style={{ padding: "20px", background: "#f3f3f3" }}
            >
              <Grid container>
                <Grid item md={12}>
                  <p className={classes.titleStyle2}>Order Summary</p>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6}>
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: 500,
                    }}
                  >
                    Item{orderItems.length > 1 && "s"} {orderItems.length}
                  </p>
                </Grid>
                <Grid item xs={6}>
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: 500,
                      textAlign: "right",
                    }}
                  >
                    TK. {productTotalPrice}
                  </p>
                </Grid>
              </Grid>
              <div>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                >
                  Shipping Address
                </p>
                <TextField
                  style={{ marginBottom: "20px" }}
                  id="address"
                  size="small"
                  fullWidth
                  multiline
                  rows={4}
                  variant="outlined"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                >
                  Promo Code
                </p>
                <TextField
                  style={{ marginBottom: "20px" }}
                  id="promo-code"
                  size="small"
                  fullWidth
                  variant="outlined"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <Button
                  variant="contained"
                  disableElevation
                  color="secondary"
                  style={{
                    textTransform: "none",
                    fontSize: "16px",
                    width: "180px",
                    textAlign: "center",
                  }}
                >
                  Apply
                </Button>
              </div>
              <br />
              <hr />
              <div>
                <Grid container>
                  <Grid item xs={6}>
                    <p
                      style={{
                        fontSize: "18px",
                        fontWeight: 500,
                        color: "#154360",
                      }}
                    >
                      Total Cost
                    </p>
                  </Grid>
                  <Grid item xs={6}>
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
                </Grid>
                <Button
                  fullWidth
                  variant="contained"
                  disableElevation
                  style={{
                    textTransform: "none",
                    fontSize: "16px",
                    textAlign: "center",
                    marginTop: "6px",
                  }}
                  // onClick={submit}
                >
                  {" "}
                  {loading && (
                    <CircularProgress
                      size={18}
                      style={{
                        color: "#fff",
                      }}
                    />
                  )}{" "}
                  CheckOut
                </Button>
              </div>
            </Grid>
          </Grid>
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
                  // removelist(removeItemId);
                  handleClose();
                }}
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      )}
    </div>
  );
};

export default CartItems;
