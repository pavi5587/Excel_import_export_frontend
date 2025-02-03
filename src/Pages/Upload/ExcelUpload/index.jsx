import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  DeleteUsers,
  ExportUsers,
  GetUsers,
  UpdateUsers,
  UploadUsers,
} from "../../../service/api";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const ExcelUpload = () => {
  const [data, setData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editRow, setEditRow] = useState({});
  const navigate = useNavigate();
  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    console.log("file", file);

    const fileExtension = file.name.split(".").pop();
    if (fileExtension !== "xlsx") {
      setData([]);
      toast.error("Only .xlsx files are allowed!", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      UploadUsers(formData)
        .then((res) => {
          console.log("res", res);
          toast.success("User Upload successfully", {
            position: "top-center",
          });
          GetUserData();
        })
        .catch((err) => {
          console.log("err", err);
          toast.error(err.response.data.error || err.response.data.message, {
            position: "top-center",
          });
        });
    }
    // const reader = new FileReader();
    // reader.readAsBinaryString(file);

    // reader.onload = (e) => {
    //   const binaryStr = e.target?.result;
    //   const workbook = XLSX.read(binaryStr, { type: "binary" });

    //   const sheetName = workbook.SheetNames[0];
    //   const sheet = workbook.Sheets[sheetName];
    //   const parsedData = XLSX.utils.sheet_to_json(sheet);

    //   setData(parsedData);
    // };
  };

  const handleDelete = (id) => {
    DeleteUsers(id)
      .then((res) => {
        console.log("res", res);
        toast.success("User Deleted successfully", {
          position: "top-center",
        });
        GetUserData();
      })
      .catch((err) => {
        console.log("err", err);
        toast.error("User not Deleted", {
          position: "top-center",
        });
      });
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditRow(data[index]);
  };

  const handleInputChange = (event, key) => {
    setEditRow({ ...editRow, [key]: event.target.value });
  };

  function formatDateToISO(dateString) {
    const [day, month, year] = dateString.split("-");
    const date = new Date(Date.UTC(year, month - 1, day));
    return date.toISOString();
  }
  
  const handleSave = (id) => {
    console.log("editRow", editRow);
    const dobDate = formatDateToISO(editRow.dob);
    editRow.dob = dobDate;
    if (editIndex !== null) {
      UpdateUsers(id, editRow)
        .then((res) => {
          console.log("res", res);
          toast.success("User Updated successfully", {
            position: "top-center",
          });
          GetUserData();
        })
        .catch((err) => {
          console.log("err", err);
          toast.error("User not Updated", {
            position: "top-center",
          });
        });
      setEditIndex(null);
    }
  };

  const GetUserData = () => {
    GetUsers()
      .then((res) => {
        console.log("res", res);
        setData(res.data);
      })
      .catch((err) => {
        console.log("err", err);
        toast.error(err.response.data, {
          position: "top-center",
        });
        err.response.data == "Invalid token !" && navigate("/");
      });
  };
  const ExportUserData = () => {
    ExportUsers()
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "users.xlsx");
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Export Error:", error);
        toast.error("Failed to export users");
      });
  };
  useEffect(() => {
    GetUserData();
  }, []);

  return (
    <div className="container mt-5">
      <ToastContainer />
      <h3 className="mb-4">Upload an Excel File</h3>
      <input
        type="file"
        className="form-control mb-3"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
      />
      {data.length > 0 && (
        <>
          <h3 className="mb-4">Export an Excel File</h3>
          <button
            className="btn btn-success btn-sm me-2"
            onClick={() => ExportUserData()}
          >
            Export
          </button>
        </>
      )}
      {data.length > 0 && (
        <table className="table table-bordered mt-5">
          <thead className="table-dark">
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Role</th>
              <th>DOB</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>City</th>
              <th>State</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>
                  {editIndex === index ? (
                    <input
                      type="text"
                      className="form-control"
                      value={editRow["first_name"] || ""}
                      onChange={(e) => handleInputChange(e, "first_name")}
                    />
                  ) : (
                    row.first_name
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <input
                      type="text"
                      className="form-control"
                      value={editRow["last_name"] || ""}
                      onChange={(e) => handleInputChange(e, "last_name")}
                    />
                  ) : (
                    row.last_name
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <input
                      type="text"
                      className="form-control"
                      value={editRow["role"] || ""}
                      onChange={(e) => handleInputChange(e, "role")}
                    />
                  ) : (
                    row.role
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <input
                      type="text"
                      className="form-control"
                      value={editRow["dob"] || ""}
                      onChange={(e) => handleInputChange(e, "dob")}
                    />
                  ) : (
                    moment(row.dob).format("DD-MM-YYYY")
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <input
                      type="text"
                      className="form-control"
                      value={editRow["gender"] || ""}
                      onChange={(e) => handleInputChange(e, "gender")}
                    />
                  ) : (
                    row.gender
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <input
                      type="text"
                      className="form-control"
                      value={editRow["email"] || ""}
                      onChange={(e) => handleInputChange(e, "email")}
                    />
                  ) : (
                    row.email
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <input
                      type="text"
                      className="form-control"
                      value={editRow["mobile"] || ""}
                      onChange={(e) => handleInputChange(e, "mobile")}
                    />
                  ) : (
                    row.mobile
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <input
                      type="text"
                      className="form-control"
                      value={editRow["city"] || ""}
                      onChange={(e) => handleInputChange(e, "city")}
                    />
                  ) : (
                    row.city
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <input
                      type="text"
                      className="form-control"
                      value={editRow["state"] || ""}
                      onChange={(e) => handleInputChange(e, "state")}
                    />
                  ) : (
                    row.state
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => handleSave(row._id)}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(row._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ExcelUpload;
