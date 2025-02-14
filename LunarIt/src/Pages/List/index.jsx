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
import { MdUpdate } from "react-icons/md";

const Student = () => {
  const [team, setTeam] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const { popupVisibility, setPopupVisiblilty } = useContext(DigitalContext);
  const [updateRow, setUpdateRow] = useState(null);
  const [formData, setFormData] = useState({});

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
        toast.error("Error fetching students.");
      }
    };
    getStudents();
  }, []);

  const handleUpdate = () => {
    const neededRow = team.find(
      (ele) => ele.id === selectedRows[selectedRows.length - 1]
    );
    setUpdateRow(neededRow);
    setFormData({
      email: neededRow.email,
      phone: neededRow.phone,
      course: neededRow.course,
    });
    setPopupVisiblilty("update");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitUpdate = async () => {
    try {
      const neededUpdate = { ...formData, status: "Purchased" };
      await updateStudentStatus(updateRow.id, neededUpdate);
      toast.success("Student updated successfully!");
      setTeam(
        team.map((student) =>
          student.id === updateRow.id
            ? { ...student, ...neededUpdate }
            : student
        )
      );
      setSelectedRows([]);
      setPopupVisiblilty(null);
    } catch (err) {
      toast.error("Update failed: " + err.message);
    }
  };

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
      await sendEmails(emails);
      toast.success("Email Sent Successfully!");
      setSelectedRows([]);
    } catch (err) {
      toast.error("Failed to send emails: " + err.message);
    }
  };

  return (
    <Box m="20px">
      <ToastContainer />
      {popupVisibility === "update" && (
        <Popup
          icon={<MdUpdate />}
          greeting="Update"
          gs={"text-green-600"}
          message={
            <form className="flex flex-col gap-2 mt-3 text-[18px]">
              <input
                type="text"
                name="email"
                className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Email"
                value={formData.email}
                readOnly
              />
              <input
                type="text"
                name="phone"
                className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Phone no."
                value={formData.phone}
                onChange={handleChange}
              />
              <select
                className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500 px-2"
                name="course"
                value={formData.course}
                onChange={handleChange}
              >
                <option value="MERN">MERN</option>
                <option value="999 Offer">999 Offer</option>
                <option value="Python">Python</option>
              </select>
            </form>
          }
          fnBtn={
            <button
              onClick={handleSubmitUpdate}
              className="border-2 hover:bg-green-600 border-green-600 bg-green-700 transition-all duration-300 px-3 py-1 text-white rounded-[5px]"
            >
              Update
            </button>
          }
          closePopup={() => setPopupVisiblilty(null)}
        />
      )}
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
            minHeight: "20vh",
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
              },
            },
          }}
          rowSelectionModel={selectedRows}
          onRowSelectionModelChange={(newSelection) => {
            setSelectedRows(newSelection);
          }}
        />
      </Box>
      <Box
        display="flex"
        flexWrap={"wrap"}
        justifyContent="end"
        mt="20px"
        gap={1}
      >
        <Button
          color="primary"
          variant="outlined"
          onClick={handleUpdate}
          sx={{ mb: "8px", minWidth: "94px" }}
          disabled={selectedRows.length === 0}
        >
          Update ({selectedRows.length})
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={handleSendEmail}
          sx={{ mb: "8px", minWidth: "94px" }}
          disabled={selectedRows.length === 0}
        >
          Send Mail ({selectedRows.length})
        </Button>
        <Button
          color="secondary"
          variant="contained"
          onClick={handleDelete}
          sx={{ mb: "8px", minWidth: "94px" }}
          disabled={selectedRows.length === 0}
        >
          Delete ({selectedRows.length})
        </Button>
      </Box>
    </Box>
  );
};

export default Student;
