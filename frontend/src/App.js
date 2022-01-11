import "./App.css";
import Register from "./comopnents/register";
import { Routes, Route, Link, useNavigate } from "react-router-dom";


function App() {
  return (
    <div className="App">
    <Routes>
          <Route path="/signup" element={<Register />} />
        </Routes>
    </div>
  );
}

export default App;
