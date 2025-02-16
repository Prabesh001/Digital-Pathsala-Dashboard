import axios from "axios";
const student_url = "http://localhost:5000/api/students";
const admin_url = "http://localhost:5000/api/admin/login";
const admin_verify_url = "http://localhost:5000/api/admin/verify";
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
    if (!emails.length) {
      return;
    }
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
    console.log(response)
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    return { error: error.response?.data?.error || "Login failed" };
  }
};


export const verifyAdmin = async () => {
  const token = localStorage.getItem("token");
  if (!token) return { error: "No token available" };

  try {
    const response = await axios.get(admin_verify_url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    return response.data;
  } catch (error) {
    console.error("Error verifying admin:", error);
    return { error: "Verification failed" };
  }
};


export const updateStudentStatus = async (id, updatedFields) => {
  try {
    const response = await axios.patch(`${student_url}/${id}`, updatedFields);
    return response.data;
  } catch (err) {
    console.error("Error updating student status:", err);
    throw err;
  }
};
