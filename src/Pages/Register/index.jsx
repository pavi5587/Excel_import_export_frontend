import React, { useState } from "react";
import { postRegister } from "../../service/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postRegister({
      firstName,
      lastName,
      email,
      phoneNumber: Number(phoneNumber),
      password,
      confirmPassword,
    })
      .then((res) => {
        console.log("res", res);
        toast.success("User Add Successfully", { position: "top-center" });
        navigate("/login");
      })
      .catch((error) => {
        console.log("error", error);
        toast.error(error?.response?.data?.message, { position: "top-center" });
      });
  };

  return (
    <div class="row">
      <div className="col-md-12 div-center">
        <div className="card" style={{ width: 500, marginTop: 70 }}>
          <div className="card-body">
            <h3 className="font-color">REGISTER</h3>
            <form onSubmit={handleSubmit}>
              <div className="input-group mb-3 mt-5 custom-input-group">
                <input
                  type="text"
                  className="form-control no-focus-outline"
                  placeholder="Enter your FirstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="input-group mb-3 mt-3 custom-input-group">
                <input
                  type="text"
                  className="form-control no-focus-outline"
                  placeholder="Enter your LastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="input-group mb-3 mt-3 custom-input-group">
                <input
                  type="email"
                  className="form-control no-focus-outline"
                  placeholder="Enter your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-group mb-3 mt-3 custom-input-group">
                <input
                  type="number"
                  className="form-control no-focus-outline"
                  placeholder="Enter your PhoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="input-group mt-4 custom-input-group">
                <span className="input-group-text">
                  <i className="bi bi-lock"></i>
                </span>
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  className="form-control no-focus-outline"
                  id="password"
                  placeholder="Enter your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={togglePasswordVisibility}
                >
                  <i
                    className={
                      isPasswordVisible ? "bi bi-eye-slash" : "bi bi-eye"
                    }
                  ></i>
                </button>
              </div>
              <div className="input-group mt-4 custom-input-group">
                <span className="input-group-text">
                  <i className="bi bi-lock"></i>
                </span>
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  className="form-control no-focus-outline"
                  id="confirmPassword"
                  placeholder="Enter your ConfirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={togglePasswordVisibility}
                >
                  <i
                    className={
                      isPasswordVisible ? "bi bi-eye-slash" : "bi bi-eye"
                    }
                  ></i>
                </button>
              </div>
              <button
                type="submit"
                className="background-color mt-5"
                style={{ color: "white", width: "100%", height: 50 }}
              >
                REGISTER
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
