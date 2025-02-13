import axios from "axios";
const student_url = "http://localhost:5000/api/students";
const admin_url = "http://localhost:5000/api/admin/login";
const email_url = "http://localhost:5000/api/send-emails";


export const fetchStudents = async () => {
  try {
    const response = await axios.get(student_url);
    if (response.status !== 200) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching items:", error);
    return [];
  }
};

export const insertStudent = async (mappedValues) => {
  try {
    const response = await axios.post(student_url, mappedValues, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (err) {
    console.error("Error:", err);
    throw err;
  }
};

export const deleteStudents = async (id) => {
  try {
    const response = await axios.delete(`${student_url}/${id}`);

    if (response.status !== 200) {
      throw new Error("Failed to delete item");
    }
  } catch (error) {
    console.error("Error deleting item", error);
  }
};

export const sendEmails = async (emails) => {
  try {
    const response = await axios.post(
      email_url,
      { emails },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status !== 200) {
      throw new Error(response.data.message || "Failed to send emails");
    }

    return response.data;
  } catch (err) {
    console.error("Error sending emails:", err);
    throw err;
  }
};

export const loginAdmin = async (email, password) => {
  try {
    const response = await axios.post(`${admin_url}`, { email, password });

    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    return { error: error.response?.data?.error || "Login failed" };
  }
};