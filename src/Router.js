import {
    BrowserRouter as Router,
    Routes,
    Route
  } from "react-router-dom";
import Articles from "./components/Articles";
import SignupForm from "./components/Signup";
import VkForm from "./components/Vk";
import Logout from "./components/Logout";
import SignInForm from "./components/Signin";

const Routing = () => {
    return(
      <Router>
        <Routes>
          <Route exact path="/"  element={<Articles />} />
          <Route exact path="/articles/"  element={<Articles />} />
          <Route exact path="/signup/"  element={<SignupForm />} />
          <Route exact path="/signin/"  element={<SignInForm />} />
          <Route exact path="/logout/"  element={<Logout />} />
          <Route exact path="/signup/vk"  element={<VkForm />} />
        </Routes>
      </Router>
    )
}

export default Routing;