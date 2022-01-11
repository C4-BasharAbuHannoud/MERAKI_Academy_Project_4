import "./App.css";
import Register from "./comopnents/register";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Login from "./comopnents/login";


function App() {
  return (
    <div className="App">
    <Routes>
          <Route path="/signup" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
    </div>
  );
}

export default App;

