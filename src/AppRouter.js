import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "pages";
import { ThemeProvider } from "theme";
import NavBar from "components/NavBar";
import {Favorites} from "pages";
import { usePeopleFetch } from "hooks";

const AppRouter = () => {
  const { users, isLoading } = usePeopleFetch();
  return (
    <ThemeProvider>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/favorites"><Favorites users = {users} isLoading = {isLoading}/></Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default AppRouter;
