import "./App.css";
import { Navbar } from "./Compo/Navabr";
import { UserState } from "./Context/UserState";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./Compo/Login";
import { Signup } from "./Compo/Signup";
import { Home } from "./Compo/Home";
import { Project } from "./Compo/Project";
import { CreateProject } from "./Compo/CreateProject";
import { Profile } from "./Compo/Profile";
import { UserProfile } from "./Compo/UserProfile";
import { ApplyProject } from "./Compo/ApplyProject";
function App() {
  return (
    <UserState>
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user/:userId" element={<Profile />} />
            <Route path="/p/:userId" element={<UserProfile />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/project/:projectId" element={<Project />} />
            <Route
              path="/project/apply/:projectId"
              element={<ApplyProject />}
            />
            <Route path="/create/" element={<CreateProject />} />
          </Routes>
        </div>
      </BrowserRouter>
    </UserState>
  );
}

export default App;
