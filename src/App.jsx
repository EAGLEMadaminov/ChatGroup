import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home.jsx";
import Main from "./Pages/Main.jsx";
import Groups from "./Pages/Groups.jsx";
import MainLayout from "./Layouts/Main.jsx";
import NotFound from "./Pages/NotFound.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />

        <Route path="/" element={<MainLayout />}>
          <Route path="/main" element={<Main />} />
          <Route path="/groups/:groupsID" element={<Groups />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
