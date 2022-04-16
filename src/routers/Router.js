import {
    BrowserRouter as Router,
    Routes,
    Route
  } from "react-router-dom";
import Articles from "../controllers/Articles";
import SignForm from "../controllers/Signup";
import VkForm from "../controllers/Vk";

const Routing = () => {
    return(
      <Router>
        <Routes>
          {/* <Route path="/articles/*"  exact component={ArticlesApp} /> */}
          <Route exact path="/"  element={<Articles />} />
          <Route exact path="/articles/"  element={<Articles />} />
          <Route exact path="/signup/"  element={<SignForm />} />
          <Route exact path="/signup/vk"  element={<VkForm />} />
          {/* <Route exact path="games/" element={<GamesApp />}/> */}
        </Routes>
      </Router>
    )
}

export default Routing;