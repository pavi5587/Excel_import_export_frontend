import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../index.css";
import { postLogin } from "../../service/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const handleSubmit = () => {
    postLogin({ email: email, password: password })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        toast.success("Login Successfully", { position: "top-center" });
        navigate("/upload");
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message, { position: "top-center" });
      });
  };
  return (
    <div class="row">
      <div class="col-md-12 div-center">
        <div class="card" style={{ width: 500, marginTop: 180 }}>
          <div class="card-body">
            <h3 className="font-color">LOGIN</h3>
            <div class="input-group mb-3 mt-5 custom-input-group">
              <span class="input-group-text" id="basic-addon1">
                <i class="bi bi-envelope"></i>
              </span>

              <input
                type="email"
                class="form-control no-focus-outline"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

            <div className="div-end mt-3">
              <a href="/register">Create User</a>
            </div>

            <button
              type="button"
              class="background-color mt-3"
              style={{ color: "white", width: "100%", height: 50 }}
              onClick={() => handleSubmit()}
            >
              LOGIN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
