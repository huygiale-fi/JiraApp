import SignUp from "./containers/client/Auth/SignUp/SignUp";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import SignIn from "containers/client/Auth/SignIn/SignIn";
import OnBoarding from "containers/client/Auth/SignUp/OnBoarding/OnBoarding";
import CreateProject from "containers/client/Project/CreateProject/CreateProject";
import { jiraRoutes } from "routes";
import JiraLayout from "layouts/Layout";

function App() {

  const renderLayout=(routes,Layout)=>{
    return routes.map(route=>{
      const {path,component,exact,isPrivate} = route;
      return (
        <Layout path={path}
        component={component}
        exact={exact}
        isPrivate={isPrivate}
          />
      )
    })
  }
  return (
    <Router>
      <Switch>
        {renderLayout(jiraRoutes,JiraLayout)}
        <Route exact path="/" component={SignUp}/>
        <Route exact path="/login" component={SignIn}/>
        <Route exact path="/onboarding" component={OnBoarding}/>
        <Route exact path="/createproject" component={CreateProject}/>
      </Switch>
    </Router>
  );
}

export default App;
