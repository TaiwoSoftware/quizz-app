import "./App.css";
import Login from "./component/auth/Login";
import SignIn from "./component/auth/SignIn";
import Css from "./component/Css/Css";
import Html from "./component/Html/Html";
import JavaScript from "./component/JavaScript/JavaScript";
import LandingPage from "./component/LandingPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "./component/React/React";
// import QuizPage from "./QuizPage"; 
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route  path="/" element={<LandingPage />} />
          <Route path="/create-account" element={<SignIn />} />
          <Route path="/login" element={<Login />} />
          <Route path="/css" element={<Css />} />
          <Route path="/html" element={<Html />} />
          <Route path="/javaScript" element={<JavaScript />} />
          <Route path="/react" element={<React />} />
          {/* <Route path="/quiz/:id" element={<QuizPage />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
