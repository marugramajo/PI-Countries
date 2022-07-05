import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Detail from "./components/Detail/Detail";
import Home from "./components/Home";
import CreateActivity from "./components/CreateActivity/CreateActivity";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home" component={Home} />
          <Route exact path="/countries/:id" component={Detail} />
          <Route exact path="/create" component={CreateActivity} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
