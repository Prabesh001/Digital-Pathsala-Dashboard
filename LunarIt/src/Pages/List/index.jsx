import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { columns } from "../../Js/data";
import { Button } from "@mui/material";
import { fetchStudents, deleteStudents } from "../../Js/index";
import { ToastContainer, toast } from "react-toastify";

const Student = () => {
  const [team, setTeam] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  console.log(selectedRows);

  useEffect(() => {
    const getStudents = async () => {
      try {
        const studentsData = await fetchStudents();
        const data = studentsData.map((ele) => ({
          id: ele._id,
          ...ele,
        }));
        setTeam(data);
      } catch (err) {
        console.error("Error fetching students: " + err.message);
        toast.error("Error fetching students.");
      }
    };
    getStudents();
  }, [team]);

  const handleDelete = async () => {
    try {
      await deleteStudents(selectedRows);
      toast.success("Students deleted successfully!");
      setSelectedRows([]);
      setTeam(team);
    } catch (err) {
      toast.error("Delete failed: " + err.message);
    }
  };

  return (
    <Box m="20px">
      <ToastContainer />
      <Box
        height="70vh"
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
      <Box display="flex" justifyContent="end" mt="20px" gap={1}>
        <Button
          color="primary"
          variant="contained"
          sx={{ mb: "20px" }}
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
