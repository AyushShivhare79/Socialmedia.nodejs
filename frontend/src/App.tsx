import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/posts" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
