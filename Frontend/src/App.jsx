import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./LoginRegister/Login";
import Register from "./LoginRegister/Register";
import HomeFr from "./LoginRegister/Home";
import Manager from "./Components/Manager";
import Hire from "./EmployeMngmt/Hire";
import Employelist from "./EmployeMngmt/Employelist";
import Home from "./EmployeMngmt/Home";
import UnauthorizedPages from "./EmployeMngmt/UnauthorizedPages";
import Hr from "./EmployeMngmt/Hr";
import NormalUser from "./Components/NormalUser";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomeFr />} />
          <Route path="/manager" element={<Manager />} />
          <Route path="/normalUser" element={<NormalUser />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/hr/*" element={<Hr />}>
            <Route index element={<Navigate to="home" replace />} />
            <Route path="home" element={<Home />} />
            <Route path="hire" element={<Hire />} />
            <Route path="employelist" element={<Employelist />} />
            <Route path="*" element={<UnauthorizedPages />} />
          </Route>
          <Route path="*" element={<UnauthorizedPages />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
