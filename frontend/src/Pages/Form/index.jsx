import * as React from "react";
import {
  Box,
  Button,
  TextField,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  FormHelperText,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { toast, ToastContainer } from "react-toastify";
import { insertStudent } from "../../Js/index";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values, { resetForm }) => {
    try {
      const mappedValues = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        course: values.course,
        status: values.status,
        date: new Date().toLocaleDateString("en-GB"),
        remarks: values.remarks,
      };

      const data = await insertStudent(mappedValues);
      toast.success("Student added successfully!");
      resetForm();
    } catch (err) {
      console.error("Error:", err);
      toast.error("Something went wrong!");
    }
  };

  return (
      <Box m="20px">
        <ToastContainer />
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <TextField
                  fullWidth
                  type="text"
                  label="Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  name="name"
                  error={!!touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  type="text"
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  type="phone"
                  label="Phone"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.phone}
                  name="phone"
                  error={!!touched.phone && !!errors.phone}
                  helperText={touched.phone && errors.phone}
                  sx={{ gridColumn: "span 4" }}
                />
                <Box
                  display="flex"
                  sx={{
                    flexWrap: { sm:"nowrap" ,xs: "wrap" },
                  }}
                  gap={3}
                >
                  <FormControl
                    sx={{ mt: 1, minWidth: 150 }}
                    error={!!touched.course && !!errors.course}
                  >
                    <InputLabel id="course-select-label">Course</InputLabel>
                    <Select
                      labelId="course-select-label"
                      id="course-select"
                      value={values.course}
                      label="Course"
                      name="course"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoWidth
                    >
                      <MenuItem value="999 Offer">999 Offer</MenuItem>
                      <MenuItem value="MERN">MERN</MenuItem>
                      <MenuItem value="Python">Python</MenuItem>
                    </Select>
                    <FormHelperText>
                      {touched.course && errors.course}
                    </FormHelperText>
                  </FormControl>
  
                  <FormControl
                    sx={{ mt: 1, minWidth: 120 }}
                    error={!!touched.status && !!errors.status}
                  >
                    <InputLabel id="status-select-label">Status</InputLabel>
                    <Select
                      labelId="status-select-label"
                      id="status-select"
                      value={values.status}
                      label="Status"
                      name="status"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoWidth
                    >
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="Purchased">Purchased</MenuItem>
                      <MenuItem value="Follow Up">Follow Up</MenuItem>
                    </Select>
                    <FormHelperText>
                      {touched.status && errors.status}
                    </FormHelperText>
                  </FormControl>
                </Box>
  
                <TextField
                  fullWidth
                  type="remarks"
                  label="Remarks"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.remarks}
                  name="remarks"
                  error={!!touched.remarks && !!errors.remarks}
                  helperText={touched.remarks && errors.remarks}
                  sx={{ gridColumn: "span 4" }}
                />
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  Save
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
  );
};

const checkoutSchema = yup.object().shape({
  name: yup.string(),
  remarks: yup.string(),
  email: yup.string().required("required"),
  phone: yup
    .string()
    .matches(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format")
    .required("Phone number is required"),
  course: yup.string().required("required"),
  status: yup.string().required("required"),
});

const initialValues = {
  name: "",
  email: "",
  phone: "",
  course: "999 Offer",
  status: "Pending",
  remarks: "",
};

export default Form;
