import React, { useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { team, columns } from "../../Js/data";

const Student = () => {
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectionModelChange = (newSelection) => {
    setSelectedRows(newSelection);
  };

  const handleDelete = async () => {
    try {
      if (selectedRows.length === 0) {
        alert("Please select at least one row to delete.");
        return;
      }

      const response = await fetch("http://localhost:5000/students", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: selectedRows }),
      });

      if (response.ok) {
        alert("Data deleted successfully");
        // Optionally, refetch data to update grid
        // You can add code to refresh data here
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (err) {
      alert("Error deleting data.");
      console.error(err);
    }
  };

  return (
    <Box m="20px">
      <Button
        color="secondary"
        variant="contained"
        onClick={handleDelete}
        sx={{ mb: "20px" }}
      >
        Delete Selected
      </Button>
      <Box
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            minWidth: "100px",
          },
          "& .MuiDataGrid-columnHeaders": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
          },
        }}
      >
        <DataGrid
          rows={team}
          columns={columns}
          checkboxSelection
          onSelectionModelChange={handleSelectionModelChange}
        />
      </Box>
    </Box>
  );
};

export default Student;
