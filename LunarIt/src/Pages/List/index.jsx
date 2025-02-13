import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { columns } from "../../Js/data";
import { Button } from "@mui/material";
import {
  updateStudentStatus,
  fetchStudents,
  deleteStudents,
  sendEmails,
} from "../../Js/index";
import Popup from "../../Template/Popup";
import { ToastContainer, toast } from "react-toastify";
import { DigitalContext } from "../../Components/Dashboard";

const Student = () => {
  const [team, setTeam] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const { popupVisibility, setPopupVisiblilty } = useContext(DigitalContext);

  const updateStatus = async () => {
    try {
      for (const id of selectedRows) {
        await updateStudentStatus(id);
      }
      toast.success("Students Status updated successfully!");
      setSelectedRows([]);
    } catch (err) {
      toast.error("Update failed: " + err.message);
    }
  };

  const handleUpdate = () => {
    setPopupVisiblilty("update");
  };

  useEffect(() => {
    const getStudents = async () => {
      try {
        const studentsData = await fetchStudents();
        const data = studentsData.map((ele, i) => ({
          id: ele._id,
          rank: i + 1,
          ...ele,
        }));
        setTeam(data);
      } catch (err) {
        console.error("Error fetching students: " + err.message);
        toast.error("Error fetching students.");
      }
    };
    getStudents();
  }, []);

  const handleDelete = async () => {
    try {
      for (const id of selectedRows) {
        await deleteStudents(id);
      }
      toast.success("Students deleted successfully!");
      setSelectedRows([]);
      setTeam(team.filter((student) => !selectedRows.includes(student.id)));
    } catch (err) {
      toast.error("Delete failed: " + err.message);
    }
  };

  const handleSendEmail = async () => {
    try {
      const selectedStudents = team.filter((student) =>
        selectedRows.includes(student.id)
      );
      const emails = selectedStudents.map((student) => student.email);

      const data = await sendEmails(emails);
      toast.success("Email Sent Sucessfully!");
      setSelectedRows([]);
    } catch (err) {
      toast.error("Failed to send emails: " + err.message);
    }
  };

  return (
    <Box m="20px">
      <ToastContainer />
      {popupVisibility === "update" ? (
        <Popup
          greeting="Update Student's Info"
          message={
            <form className="flex flex-col gap-2 mt-3 text-[18px]">
              <input type="text" className="border-1 p-1" />
              <input type="text" className="border-1 p-1" />
              <select className="border-1 p-1" name="hlo">
                <option value="Select your value" selected disabled>Select your value</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </form>
          }
          fnBtn={
            <button className="bg-green-600 px-3 text-white rounded-[5px]">
              Update
            </button>
          }
          closePopup={() => setPopupVisiblilty("")}
        />
      ) : null}
      <Box
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .name-column--cell": { minWidth: "100px" },
          "& .MuiDataGrid-columnHeaders": { borderBottom: "none" },
          "& .MuiDataGrid-footerContainer": { borderTop: "none" },
        }}
      >
        <DataGrid
          rows={team}
          columns={columns}
          checkboxSelection
          sx={{
            maxHeight: "74vh",
            boxShadow: "1px 0 3px lightgray, -1px 0 3px lightgray",
            "& .MuiDataGrid-columnHeaders": {
              fontSize: "16px",
              fontWeight: "bold",
              border: "1px solid lightgray",
            },
          }}
          slots={{
            toolbar: GridToolbar,
          }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              sx: {
                backgroundColor: "#fafafa",
                "& .MuiTypography-root": {
                  color: "black",
                },
                "& .MuiButton-root": {
                  color: "black",
                },
                "& .MuiInputBase-root": {},
                "& .MuiFormControl-root": {},
              },
            },
          }}
          rowSelectionModel={selectedRows}
          onRowSelectionModelChange={(newSelection) => {
            setSelectedRows(newSelection);
          }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 25,
              },
            },
          }}
          pageSizeOptions={[25]}
        />
      </Box>
      <Box display="flex" justifyContent="end" mt="20px" gap={1}>
        <Button
          color="primary"
          variant="outlined"
          sx={{ mb: "20px" }}
          onClick={handleUpdate}
          disabled={selectedRows.length === 0}
        >
          Update to Purchased ({selectedRows.length})
        </Button>

        <Button
          color="primary"
          variant="contained"
          sx={{ mb: "20px" }}
          onClick={handleSendEmail}
          disabled={selectedRows.length === 0}
        >
          Send Mail ({selectedRows.length})
        </Button>

        <Button
          color="secondary"
          variant="contained"
          onClick={handleDelete}
          sx={{ mb: "20px" }}
          disabled={selectedRows.length === 0}
        >
          Delete Selected ({selectedRows.length})
        </Button>
      </Box>
    </Box>
  );
};

export default Student;
