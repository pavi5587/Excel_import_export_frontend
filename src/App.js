import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Upload from "./Pages/Upload";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <ToastContainer />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/upload" element={<Upload />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
