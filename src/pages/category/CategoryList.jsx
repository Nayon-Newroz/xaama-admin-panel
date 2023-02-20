import React, { useState, useEffect, useContext } from "react";
import { getDataWithToken } from "../../services/GetDataService";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TablePagination from "@mui/material/TablePagination";
import Skeleton from "@mui/material/Skeleton";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Link } from "react-router-dom";
import TableChartIcon from "@mui/icons-material/TableChart";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import PulseLoader from "react-spinners/PulseLoader";
import { useSnackbar } from "notistack";
import axios from "axios";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { AuthContext } from "../../context/AuthContext";
const CategoryList = () => {
  const [tableDataList, setTableDataList] = useState([]);
  const [page, setPage] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [deleteData, setDeleteData] = useState({});
  const { enqueueSnackbar } = useSnackbar();
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
  const handleDeleteDialogClose = () => {
    setDeleteDialog(false);
    setDeleteData({});
  };

  const handleDeleteDialog = (i, row) => {
    setDeleteData({ index: i, row: row });
    setDeleteDialog(true);
  };

  const pageLoading = () => {
    let content = [];

    for (let i = 0; i < 10; i++) {
      content.push(
        <TableRow key={i}>
          {[...Array(7).keys()].map((e, i) => (
            <TableCell key={i}>
              <Skeleton></Skeleton>
            </TableCell>
          ))}
        </TableRow>
      );
    }
    return content;
  };
  const handleDelete = async () => {
    try {
      setLoading2(true);
      let response = await axios({
        url: `/api/v1/category/delete/${deleteData.row._id}`,
        method: "delete",
      });
      if (response.status >= 200 && response.status < 300) {
        handleSnakbarOpen("Deleted successfully", "success");
        getData();
      }
      setDeleteDialog(false);
      setLoading2(false);
    } catch (error) {
      console.log("error", error);
      setLoading2(false);
      handleSnakbarOpen(error.response.data.message.toString(), "error");
      setDeleteDialog(false);
    }
  };

  const handleChangePage = (event, newPage) => {
    getData(newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, rowsPerPage));
    setPage(0);
  };

  const getData = async (pageNO) => {
    try {
      setLoading(true);
      let newPageNO = page;
      if (pageNO) {
        newPageNO = pageNO;
      }

      const allDataUrl = `${process.env.REACT_APP_BASE_URL}/api/v1/category`;
      let allData = await getDataWithToken(allDataUrl);

      if (allData.status >= 200 && allData.status < 300) {
        setTableDataList(allData?.data?.data);
        setRowsPerPage(allData?.data?.limit);
        setTotalData(allData?.data?.totalData);

        if (allData.data.data.length < 1) {
          setMessage("No data found");
        }
      }
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
      handleSnakbarOpen(error.response.data.message.toString(), "error");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div
        style={{
          background: "#fff",
          border: "1px solid #ddd",
          borderRadius: "5px",
          overflow: "hidden",
        }}
      >
        <Typography
          variant="body1"
          color="info"
          gutterBottom
          component="div"
          style={{ background: "#ddd", padding: "10px 16px" }}
        >
          <TableChartIcon
            style={{ position: "relative", top: "4px", fontSize: "20px" }}
          />{" "}
          Category List
        </Typography>

        <div
          style={{
            overflowX: "auto",

            minWidth: "100%",
            // width: "Calc(100vw - 367px)",
            padding: "10px 16px 0px",
            boxSizing: "border-box",
          }}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!loading &&
                tableDataList.length > 0 &&
                tableDataList.map((row, i) => (
                  <TableRow
                    key={i}
                    // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{row?.name}</TableCell>

                    <TableCell align="center">
                      {row?.status ? (
                        <>
                          <TaskAltOutlinedIcon
                            style={{
                              color: "#10ac84",
                              height: "20px",
                              position: "relative",
                              top: "5px",
                            }}
                          />{" "}
                          Active
                        </>
                      ) : (
                        <>
                          <HighlightOffOutlinedIcon
                            style={{
                              color: "#ee5253",
                              height: "20px",
                              position: "relative",
                              top: "5px",
                            }}
                          />
                          Inactive
                        </>
                      )}
                    </TableCell>

                    <TableCell align="center">
                      <IconButton
                        variant="contained"
                        // color="success"
                        disableElevation
                        component={Link}
                        to={`/update-category`}
                        state={{ row }}
                      >
                        <EditOutlinedIcon />
                      </IconButton>

                      <IconButton
                        variant="contained"
                        disableElevation
                        onClick={() => handleDeleteDialog(i, row)}
                      >
                        <DeleteOutlineIcon color="error" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}

              {!loading && tableDataList.length < 1 ? (
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
        {tableDataList.length > 0 ? (
          <div>
            <TablePagination
              style={{ display: "block", border: "none" }}
              rowsPerPageOptions={[]}
              count={totalData}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        ) : (
          <br />
        )}
      </div>
      <Dialog
        open={deleteDialog}
        onClose={handleDeleteDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div style={{ padding: "10px", minWidth: "300px" }}>
          <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You want to delete {deleteData?.row?.name}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteDialogClose}>cancel</Button>
            <Button
              variant="contained"
              disabled={loading2}
              onClick={handleDelete}
              style={{ minWidth: "100px", minHeight: "35px" }}
              autoFocus
              disableElevation
            >
              <PulseLoader
                color={"#353b48"}
                loading={loading2}
                size={10}
                speedMultiplier={0.5}
              />{" "}
              {loading2 === false && "Confirm"}
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </>
  );
};

export default CategoryList;
