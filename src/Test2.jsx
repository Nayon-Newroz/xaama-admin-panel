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
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";
import PulseLoader from "react-spinners/PulseLoader";
import { useSnackbar } from "notistack";
import { InputAdornment } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
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
    fontSize: "42px",
    color: "#154360",
    fontWeight: 500,
    margin: "30px 0px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "17px",
    },
  },
  cardSubtitle: {
    fontSize: "20px",
    color: "#154360",
    fontWeight: 500,
    margin: "10px 0px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "17px",
    },
  },
  cardSubtitle2: {
    fontSize: "16px",
    color: "#154360",
    fontWeight: 500,
    margin: "5px 0px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "17px",
    },
  },
  cardText: {
    fontSize: "13px",
    color: "#303030",
    // color: "#154360",
    // fontWeight: 500,
    margin: "5px 0",
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
  input2: {
    // textAlign: "center !important",
    "& input[type=number]": {
      "-moz-appearance": "textfield",
      fontSize: "16px",
      fontWeight: 500,
      textAlign: "right",
      color: "#154360",
      border: "none",
      [theme.breakpoints.down("sm")]: {
        padding: "3px",
        textAlign: "right",
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
    // width: "250px",
    [theme.breakpoints.down("sm")]: {
      width: "35px",
    },
  },
  input3: {
    // textAlign: "center !important",
    "& input[type=text]": {
      "-moz-appearance": "textfield",
      fontSize: "16px",
      fontWeight: 500,
      // textAlign: "right",
      color: "#154360",
      border: "none",
      [theme.breakpoints.down("sm")]: {
        padding: "3px",
        textAlign: "right",
      },
    },
    "& input[type=text]::-webkit-outer-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
    "& input[type=text]::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
    // width: "250px",
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
    fontSize: "22px",
    color: "#154360",
    fontWeight: 500,
    margin: "0 0 20px 0px",
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
  tableStyle: {
    // border: "1px solid #ddd",
    "& thead": {
      background: "#f1f1f1",
      "& tr": {
        "& th": {
          paddingTop: "8px",
          paddingBottom: "8px",
        },
      },
    },
    "& tbody": {
      "& tr": {
        "& td": {
          // paddingTop: "2px",
          // paddingBottom: "2px",
        },
      },
    },
  },
  select: {
    "& .MuiSelect-select": {
      fontWeight: 500,
      color: "#154360 !important",
    },
  },
  logoStyle: {
    cursor: "pointer",
    width: "175px",
    height: "75px",
  },
}));

const Test2 = () => {
  const classes = useStyles();
  let orderListItems = [1, 2, 3, 4, 5, 6];
  return (
    <div
      style={{
        background: "#fff",
        width: "793.7007874px",
        height: "1122.519685px",
        margin: "auto",
        padding: "30px",
        boxSizing: "boder-box",
      }}
    >
      <Grid container alignItems="center">
        <Grid item xs={6}>
          <p className={classes.cardTitle}>Invoice</p>
          <Grid container alignItems="center">
            <Grid item xs={4}>
              <p className={classes.cardText}>
                <b>Invoice No</b>
              </p>
            </Grid>
            <Grid item xs={8}>
              <p className={classes.cardText}>ORD100005</p>
            </Grid>
            <Grid item xs={4}>
              <p className={classes.cardText}>
                <b>Invoice Date</b>
              </p>
            </Grid>
            <Grid item xs={8}>
              <p className={classes.cardText}>12 April, 2023</p>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <img src="/image/demo.png" alt="" className={classes.logoStyle} />
        </Grid>
      </Grid>
      <hr />
      <Grid container alignItems="center" spacing={6}>
        <Grid item xs={5}>
          <p className={classes.cardSubtitle}>Invoice To</p>

          <Grid container>
            <Grid item xs={2.5}>
              <p className={classes.cardText}>
                <b>Name</b>
              </p>
            </Grid>
            <Grid item xs={8.5}>
              <p className={classes.cardText}>Jhon Doe</p>
            </Grid>
            <Grid item xs={2.5}>
              <p className={classes.cardText}>
                <b>Phone</b>
              </p>
            </Grid>
            <Grid item xs={8.5}>
              <p className={classes.cardText}>+12345678912</p>
            </Grid>
            <Grid item xs={2.5}>
              <p className={classes.cardText}>
                <b>Email</b>
              </p>
            </Grid>
            <Grid item xs={8.5}>
              <p className={classes.cardText}>jhondeo@gmail.com</p>
            </Grid>
            <Grid item xs={2.5}>
              <p className={classes.cardText}>
                <b>Address</b>
              </p>
            </Grid>
            <Grid item xs={8.5}>
              <p className={classes.cardText}>
                15205 North Kierland Blvd. Suite 100. Scottsdale.
              </p>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={5}>
          <p className={classes.cardSubtitle}>Invoice From</p>

          <Grid container>
            <Grid item xs={2.5}>
              <p className={classes.cardText}>
                <b>Name</b>
              </p>
            </Grid>
            <Grid item xs={8.5}>
              <p className={classes.cardText}>Jhon Doe</p>
            </Grid>
            <Grid item xs={2.5}>
              <p className={classes.cardText}>
                <b>Phone</b>
              </p>
            </Grid>
            <Grid item xs={8.5}>
              <p className={classes.cardText}>+12345678912</p>
            </Grid>
            <Grid item xs={2.5}>
              <p className={classes.cardText}>
                <b>Email</b>
              </p>
            </Grid>
            <Grid item xs={8.5}>
              <p className={classes.cardText}>jhondeo@gmail.com</p>
            </Grid>
            <Grid item xs={2.5}>
              <p className={classes.cardText}>
                <b>Address</b>
              </p>
            </Grid>
            <Grid item xs={8.5}>
              <p className={classes.cardText}>
                15205 North Kierland Blvd. Suite 100. Scottsdale.
              </p>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <br />
      <br />
      <TableContainer>
        <Table
          aria-label="simple table"
          className={classes.tableStyle}
          //  style={{ border:"1px solid #c4c4c4",}}
        >
          <TableHead className={classes.tableStyle}>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Specification</TableCell>

              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right"> Price</TableCell>

              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.tableBodyStyle}>
            {orderListItems.length > 0 ? (
              <>
                {" "}
                {orderListItems?.map((row, i) => (
                  <TableRow
                    key={i}
                    sx={
                      {
                        // "&:last-child td, &:last-child th": { border: 0 },
                      }
                    }
                  >
                    <TableCell>Iphone 14 pro</TableCell>
                    <TableCell>
                      {/* {" "}
                      {row?.filter_data.length > 0
                        ? row?.filter_data
                            .sort(sortByParentName)
                            .map((e, i) => (
                              <label key={e._id}>
                                {i !== 0 && <>,&nbsp;&nbsp;</>}
                                <b>{e.parent_name}</b> : {e.name}
                              </label>
                            ))
                        : "N/A"} */}
                      <b>Brand</b> : Iphone, <b>Color</b> : Silver, <b>Ram</b> :
                      4 GB, <b>ROM</b> : 128 GB
                    </TableCell>
                    <TableCell align="right" className={classes.forOtherView}>
                      45000.00
                    </TableCell>
                    <TableCell align="right" className={classes.forOtherView}>
                      5
                    </TableCell>
                    <TableCell align="right" className={classes.forOtherView}>
                      100000.00
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ) : (
              <TableRow>
                <TableCell colSpan={9} style={{ textAlign: "center" }}>
                  <strong> Please add some products</strong>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Grid container alignItems="center">
        <Grid item xs={7}>
          <p className={classes.cardSubtitle}>Payment Info :</p>
          <p className={classes.cardText}>
            <b>Patment Method :</b> Cash
          </p>
        </Grid>
        <Grid item xs={5}>
          <Grid
            container
            style={{ background: "antiquewhite", padding: "10px" }}
          >
            <Grid item xs={6}>
              <p className={classes.cardSubtitle2}>Subtotal</p>
            </Grid>
            <Grid item xs={6}>
              <p
                className={classes.cardSubtitle2}
                style={{ textAlign: "right" }}
              >
                {" "}
                200000.00{" "}
              </p>
            </Grid>
            <Grid item xs={6}>
              <p className={classes.cardSubtitle2}>Discount</p>
            </Grid>
            <Grid item xs={6} style={{ borderBottom: "1px solid" }}>
              <p
                className={classes.cardSubtitle2}
                style={{ textAlign: "right" }}
              >
                {" "}
                2000.00{" "}
              </p>
            </Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={6}>
              <p
                className={classes.cardSubtitle2}
                style={{ textAlign: "right" }}
              >
                180000.00{" "}
              </p>
            </Grid>

            <Grid item xs={6}>
              <p className={classes.cardSubtitle2}>TAX</p>
            </Grid>
            <Grid item xs={6} style={{ borderBottom: "1px solid" }}>
              <p
                className={classes.cardSubtitle2}
                style={{ textAlign: "right" }}
              >
                {" "}
                10%
              </p>
            </Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={6}>
              <p
                className={classes.cardSubtitle2}
                style={{ textAlign: "right" }}
              >
                {" "}
                198,000.00
              </p>
            </Grid>
            <Grid item xs={6}>
              <p className={classes.cardSubtitle2}>Paid Amount</p>
            </Grid>
            <Grid item xs={6} style={{ borderBottom: "1px solid" }}>
              <p
                className={classes.cardSubtitle2}
                style={{ textAlign: "right" }}
              >
                {" "}
                190000.00{" "}
              </p>
            </Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={6}>
              <p
                className={classes.cardSubtitle2}
                style={{ textAlign: "right" }}
              >
                {" "}
                8000.00{" "}
              </p>
            </Grid>
            <Grid item xs={6}>
              <p className={classes.cardSubtitle2}>Due Amount</p>
            </Grid>
            <Grid item xs={6} style={{ borderBottom: "1px solid" }}>
              <p
                className={classes.cardSubtitle2}
                style={{ textAlign: "right" }}
              >
                {" "}
                8000.00{" "}
              </p>
            </Grid>
            <Grid item xs={6}>
              <p className={classes.cardSubtitle2}>Total</p>
            </Grid>
            <Grid item xs={6}>
              <p
                className={classes.cardSubtitle2}
                style={{ textAlign: "right" }}
              >
                {" "}
                35000.00{" "}
              </p>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item xs={7}>
          <p className={classes.cardSubtitle}>Terms and Conditions :</p>
          <p className={classes.cardText}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s,
          </p>
        </Grid>
        <Grid item xs={5} style={{ textAlign: "center" }}>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          -------------------------------
          <p className={classes.cardSubtitle}>Singature</p>
        </Grid>
      </Grid>
    </div>
  );
};

export default Test2;
