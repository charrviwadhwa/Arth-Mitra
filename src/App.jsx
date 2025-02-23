import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./Landing";
import AuthComponent from "./Otp";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/AuthComponent" element={<AuthComponent />} />
      </Routes>
    </Router>
  );
};

export default App;

