import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import Home from "./pages/Home/Home";
import CreatePost from "./pages/CreatePost/CreatePost";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthRoute from "./components/AuthRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthRoute />}>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/create" element={<CreatePost />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
