import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./Home";

/** Site-wide routes.
 *
 * Visiting a non-existant route redirects to the homepage.
 */

function Routes() {

  return (
    <div className="Routes">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/:id">
          <ImageDetails />
        </Route>

        <Route exact path="/add-image">
          <AddImageForm />
        </Route>

        <Route exact path="/:id/edit">
          <EditImageForm />
        </Route>

        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default Routes;