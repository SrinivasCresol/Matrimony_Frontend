import { Route, Routes } from "react-router-dom";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import Edit from "./Pages/Edit";
import Header from "./Components/Header";
import Footer from "./Pages/Footer";
import Login from "./Pages/Login";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" component={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
