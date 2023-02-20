import React, { useState, useEffect, useContext } from "react";
import { getDataWithToken } from "../../services/GetDataService";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FilterListIcon from "@mui/icons-material/FilterList";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import EditIcon from "@mui/icons-material/Edit";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { makeStyles } from "@mui/styles";
import Collapse from "@mui/material/Collapse";
import MenuItem from "@mui/material/MenuItem";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import TablePagination from "@mui/material/TablePagination";
import Avatar from "@mui/material/Avatar";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Skeleton from "@mui/material/Skeleton";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import PulseLoader from "react-spinners/PulseLoader";
import { useSnackbar } from "notistack";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
  tableBodyStyle: {
    "& tr:nth-of-type(odd)": {
      background: "#F8F9F9",
    },
    "& tr:last-child": {
      background: "none",
    },

    "& tr:hover": {
      // cursor: "pointer",
      background: "#F2F3F4",
    },
    "& tr:last-child:hover": {
      // cursor: "default",
      background: "none",
    },
    "& td": {
      // padding: "10px 16px",
    },
    [theme.breakpoints.down("xl")]: {
      "& td": {
        paddingTop: "12px",
        paddingBottom: "12px",
        // padding: "12px 6px",
      },
      // "& td:nth-child(n+3)": {
      //   paddingLeft: "0px",
      // },
    },
  },
  tableHeadStyle: {
    background: "#0E6251",
    // background: "#353b48",
    "& th": {
      color: "#fff",
      fontSize: "16px",
    },
    // [theme.breakpoints.down("xl")]: {
    //   "& th:nth-child(n+2)": {
    //     paddingLeft: "10px",
    //   },
    // },
  },
}));

const UserList = () => {
  const classes = useStyles();
  let navigate = useNavigate();
  const [mobileNumber, setMobileNumber] = useState("");
  const [storeId, setStoreId] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [storeType, setStoreType] = useState("");
  const [status, setStatus] = useState("");
  const [visibility, setVisibility] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [category, setCategory] = useState("");
  const [userList, setUserList] = useState([]);

  // const [open, setOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(true);
  const [switchOpen, setSwitchOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [categoryMessage, setCategoryMessage] = useState("");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [updateLoading, setUpdateLoading] = useState(false);
  const { tuso_admin_panel } = useContext(AuthContext);
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

  // const handleClose = () => {
  //   setOpen(false);
  // };
  const handleSwitchClose = () => {
    setSwitchOpen(false);
  };

  const pageLoading = () => {
    let content = [];

    for (let i = 0; i < 10; i++) {
      content.push(
        <TableRow key={i}>
          <TableCell colSpan={2}>
            <Skeleton></Skeleton>
          </TableCell>
          <TableCell>
            <Skeleton></Skeleton>
          </TableCell>
          <TableCell>
            <Skeleton></Skeleton>
          </TableCell>
          <TableCell>
            <Skeleton></Skeleton>
          </TableCell>
          <TableCell>
            <Skeleton></Skeleton>
          </TableCell>
          <TableCell>
            <Skeleton></Skeleton>
          </TableCell>
        
        
      
        </TableRow>
      );
    }
    return content;
  };

  const handleChangePage = (event, newPage) => {
    let pageNo = newPage + 1;
    getData(pageNo);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getData = async (pageNO, newUrl) => {
    try {
      setLoading(true);

      let allUser = await getDataWithToken("/users");
      console.log("allUser", allUser);
      if (allUser.status === 200) {
        setUserList(allUser.data);
        setTotalData(10);
        if (allUser.data.length < 1) {
          setMessage("No data found");
        }
      } else {
        setMessage("Something went wrong");
      }

      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setMessage("Something went wrong");
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <TableContainer
        component={Paper}
        style={{ padding: "20px 16px 16px", boxSizing: "border-box" }}
      >
        <Grid container columnSpacing={3} style={{ padding: "16px 0" }}>
          <Grid item lg={9} xl={9}>
            <Typography variant="h4" color="info" gutterBottom component="div">
              User List
            </Typography>
          </Grid>
          <Grid item lg={3} xl={3} style={{ textAlign: "right" }}>
            <Button
              disableElevation
              variant="contained"
              size="large"
              color="info"
              // startIcon={<FilterListIcon />}
              onClick={() => setFilterOpen(!filterOpen)}
            >
              {filterOpen ? <FilterListOffIcon /> : <FilterListIcon />}
            </Button>
          </Grid>
          <br />
          <Grid item xs={12}>
            <Collapse in={filterOpen} timeout="auto" unmountOnExit>
              <br />
              <Grid container spacing={3}>
                <Grid item xs={3}>
                  <TextField
                    id="mobile-no"
                    fullWidth
                    size="small"
                    variant="outlined"
                    label="User Name"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="store-id"
                    fullWidth
                    size="small"
                    variant="outlined"
                    label="Email"
                    value={storeId}
                    onChange={(e) => setStoreId(e.target.value)}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="businessName"
                    fullWidth
                    size="small"
                    variant="outlined"
                    label="Website"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="businessName"
                    fullWidth
                    size="small"
                    variant="outlined"
                    label="City"
                   
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="businessName"
                    fullWidth
                    size="small"
                    variant="outlined"
                    label="Street"
                   
                  />
                </Grid>
              
              
                <Grid item xs={3}>
                  <FormControl variant="outlined" fullWidth size="small">
                    <InputLabel id="demo-is-assigned-outlined-label">
                      Status
                    </InputLabel>
                    <Select
                      labelId="demo-is-assigned-outlined-label"
                      id="demo-is-assigned-outlined"
                      label="Status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <MenuItem value="None">None</MenuItem>
                      <MenuItem value={1}>Active</MenuItem>
                      <MenuItem value={0}>Inactive</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={3}>
                  <FormControl variant="outlined" fullWidth size="small">
                    <InputLabel id="demo-is-assigned-outlined-label">
                      Visibility
                    </InputLabel>
                    <Select
                      labelId="demo-is-assigned-outlined-label"
                      id="demo-is-assigned-outlined"
                      label="Visibility"
                      value={visibility}
                      onChange={(e) => setVisibility(e.target.value)}
                    >
                      <MenuItem value="None">None</MenuItem>
                      <MenuItem value={1}>Visible</MenuItem>
                      <MenuItem value={0}>Not Visible</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={3}>
                  <Grid container spacing={{ lg: 6, xl: 3 }}>
                    <Grid item xs={3}>
                      <Button
                        variant="contained"
                        disableElevation
                        size="large"
                        fullWidth
                        style={{ background: "#21618C"}}
                        // onClick={(event) => clearFilter(event, 0)}
                      >
                        <RestartAltIcon />
                      </Button>
                    </Grid>
                    <Grid item xs={9}>
                      <Button
                        variant="contained"
                        disableElevation
                        // color="success"
                        style={{ padding: "6.7px 22px" }}
                        size="large"
                        startIcon={<SearchIcon />}
                        fullWidth
                        // onClick={(event) => handleChangePage(event, 0)}
                      >
                        Search
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Collapse>
          </Grid>
        </Grid>
        <br />
        <Paper>
          <div
            style={{
              overflowX: "auto",
              minWidth: "100%",
              width: "Calc(100vw - 367px)",
            }}
          >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead className={classes.tableHeadStyle}>
                <TableRow>
                  <TableCell colSpan={2} style={{ minWidth: "250px" }}>
                    User
                  </TableCell>

                  <TableCell style={{ whiteSpace: "nowrap" }}>
                    Website
                  </TableCell>
                  <TableCell style={{ minWidth: "120px" }}>City</TableCell>
                  <TableCell style={{ minWidth: "120px" }}>Street</TableCell>
                  <TableCell style={{ minWidth: "120px" }}>Zip Code</TableCell>

                  <TableCell align="center" style={{ minWidth: "120px" }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className={classes.tableBodyStyle}>
                {!loading &&
                  userList.length > 0 &&
                  userList.map((row, i) => (
                    <TableRow
                      key={i}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell style={{ paddingRight: 0, width: "50px" }}>
                        <Avatar
                          alt=""
                          src="/image/user.jpg"
                          sx={{ width: 45, height: 45 }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography
                          gutterBottom
                          component="div"
                          style={{ fontSize: "16px", fontWeight: 500 }}
                        >
                          {row?.name}
                        </Typography>
                        {row?.email}
                      </TableCell>
                      <TableCell style={{ whiteSpace: "nowrap" }}>
                        {row?.website}
                      </TableCell>
                      <TableCell style={{ whiteSpace: "nowrap" }}>
                        {row?.address?.city}
                      </TableCell>
                      <TableCell style={{ whiteSpace: "nowrap" }}>
                        {row?.address?.street}
                      </TableCell>
                      <TableCell style={{ whiteSpace: "nowrap" }}>
                        {row?.address?.zipcode}
                      </TableCell>
                      
                      <TableCell align="center">
                        <IconButton
                          onClick={() => {
                            navigate(`/store-detail/${row.id}`);
                          }}
                        >
                          <VisibilityIcon />
                        </IconButton>

                        <IconButton
                          onClick={() => {
                            navigate(`/update-store-detail/${row.id}`);
                          }}
                        >
                          <EditIcon color="info"  />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}

                {!loading && userList.length < 1 ? (
                  <TableRow>
                    <TableCell colSpan={9} style={{ textAlign: "center" }}>
                      <strong> {message}</strong>
                    </TableCell>
                  </TableRow>
                ) : null}
                {loading && pageLoading()}
              </TableBody>
            </Table>
          </div>
          {userList.length > 0 && (
            <div>
              <TablePagination
                style={{ display: "block", borderBottom: "none" }}
                rowsPerPageOptions={[]}
                // count={rows.length}
                count={totalData}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </div>
          )}
        </Paper>
      </TableContainer>
    </>
  );
};

export default UserList;
