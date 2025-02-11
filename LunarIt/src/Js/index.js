import axios from "axios";
const url = "http://localhost:5000/students";
const admin_url = "http://localhost:5000/admin";

export const insertStudent = async (mappedValues) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mappedValues),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to create student");
    }

    return await response.json();
  } catch (err) {
    console.error("Error:", err);
    throw err;
  }
};

export const fetchStudents = async () => {
  try {
    const response = await axios.get(url);
    if (response.status !== 200) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching items:", error);
    return [];
  }
};

export const fetchStudentsByEmail = async (email) => {
  try {
    const response = await axios.get(`${admin_url}/${email}`);

    if (response.status !== 200) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

export const deleteStudents = async (id) => {
  try {
    const response = await fetch(
      `${url}/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete item");
    }
  } catch (error) {
    console.error("Error deleting item");

  }
};

